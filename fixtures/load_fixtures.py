#!/bin/python3

import yaml, json
import os, shutil
import mysql.connector

import PIL.Image as Image
import PIL.ImageOps

def get_public_folder():
    d = os.path.dirname(os.path.realpath(__file__))
    d = os.path.join(d, "../public/")
    return d

def get_thumb_folder():
    return os.path.join(get_public_folder(), "thumbnails/")

def get_script_folder():
    return os.path.dirname(os.path.realpath(__file__))

def remove_content(folder):
    for the_file in os.listdir(folder):
        file_path = os.path.join(folder, the_file)
        if os.path.isfile(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)

def resize_and_crop(img_path, modified_path, size):
    img = Image.open(img_path)
    img2 = PIL.ImageOps.fit(img, size)
    directory = os.path.dirname(modified_path)
    if not os.path.exists(directory):
            os.makedirs(directory)
    img2.save(modified_path)

def load_authors(cursor):
    author_ids = {}
    with open(os.path.join(get_script_folder(), "authors.yml")) as handler:
        data = yaml.load(handler)
        for k, v in data['authors'].items():
            name = v.get('name', None)
            email = v.get('email', None)
            about = v.get('about', None)
            cursor.execute("""
                INSERT INTO `author` (`name`, `email`, `about`) VALUES
                (%s, %s, %s);
            """, (name, email, about))
            author_ids[k] = cursor.lastrowid
    
    return author_ids

def load_languages(cursor, author_ids):
    thumb_folder = get_thumb_folder()
    remove_content(thumb_folder)

    with open(os.path.join(get_script_folder(), "languages.yml")) as handler:
        data = yaml.load(handler)
        for k, v in data['languages'].items():
            name = v.get('name', None)
            glottonym = v.get('glottonym', None)
            family = v.get('family', None)
            position = v.get('position', None)
            content = v.get('content', None)
            country = v.get('country', None)
            speakers = v.get('speakers', None)
            audio = v.get('audio', None)
            images = v.get('images', None)
            status = v.get('status', 'vivante')

            if images is not None and len(images) == 0:
                images = None

            if images is not None:
                for img_path in images:
                    path = os.path.join(get_public_folder(), img_path)
                    thumbnail = os.path.join(get_thumb_folder(), img_path)
                    resize_and_crop(path, thumbnail, (200,200))

                images = json.dumps(images, ensure_ascii=False)
                 
            
            cursor.execute("""
                INSERT INTO `language` (`id`, `name`, `glottonym`, `family`, `position`, `content`, `speakers`, `audio`, `images`, `country`, `status`) VALUES
                (%s, %s,%s,%s,%s,%s, %s, %s, %s, %s, %s);
            """, (k, name, glottonym, family, position, content, speakers, audio, images, country, status))
            
            for author in v.get("authors", ()):
                cursor.execute("""
                    INSERT INTO `language_author` (`author_id`, `language_id`) VALUES
                    (%s,%s);
                """, (author_ids[author], k))

try:
    with open(os.path.join(get_script_folder(), "../config.json")) as handler:
        data = json.load(handler)
    config = {}
    config["host"] = data["db"]["host"]
    config["user"] = data["db"]["user"]
    config["password"] = data["db"]["password"]
    config["database"] = data["db"]["database"]
    if "socketPath" in data["db"]:
        config["unix_socket"] = data["db"]["socketPath"]

    con = mysql.connector.connect(**config)
        
    cur = con.cursor()
    
    cur.execute("SET NAMES 'utf8'")
    
    cur.execute("SET FOREIGN_KEY_CHECKS=0;")
    cur.execute("SET FOREIGN_KEY_CHECKS=0;")
    cur.execute("DROP TABLE IF EXISTS `author`;")
    cur.execute("DROP TABLE IF EXISTS `language`;")
    cur.execute("DROP TABLE IF EXISTS `language_author`;")
    cur.execute("SET FOREIGN_KEY_CHECKS=1;")
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS `author` (
          `id` int(11) NOT NULL,
          `name` varchar(255) COLLATE utf8_bin NOT NULL,
          `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `about` text COLLATE utf8_bin
        ) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    """)
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS `language` (
          `id` varchar(100) NOT NULL,
          `name` varchar(255) COLLATE utf8_bin NOT NULL,
          `glottonym` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `family` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `country` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `position` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `speakers` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `content` text COLLATE utf8_bin NOT NULL,
          `images` text COLLATE utf8_bin DEFAULT NULL,
          `audio` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `status` enum('vivante','dangers','morte') COLLATE utf8_bin NOT NULL DEFAULT 'vivante'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    """)
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS `language_author` (
          `author_id` int(11) NOT NULL,
          `language_id` varchar(100) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    """)
    
    cur.execute("ALTER TABLE `author` ADD PRIMARY KEY (`id`);")

    cur.execute("""ALTER TABLE `language`
          ADD PRIMARY KEY (`id`);
    """)

    cur.execute("""ALTER TABLE `language_author`
          ADD PRIMARY KEY (`author_id`,`language_id`),
          ADD KEY `fk_language_id` (`language_id`);
    """)

    cur.execute("""ALTER TABLE `author`
          MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
    """)

    cur.execute("""ALTER TABLE `language_author`
          ADD CONSTRAINT `fk_author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE,
          ADD CONSTRAINT `fk_language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE;
    """)
    
    author_ids = load_authors(cur)
    load_languages(cur, author_ids)
    
    con.commit()
    
except mysql.connector.Error as e:
    print("MySQL Error")
    print(e)
except Exception as e:
    print(e)

finally:
    if cur:
        cur.close()
    if con:
        con.close()

