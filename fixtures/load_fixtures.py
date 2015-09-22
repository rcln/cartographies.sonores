#!/bin/python

import yaml
import mysql.connector

def load_authors(cursor):
    author_ids = {}
    with open("./authors.yml") as handler:
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
    with open("./languages.yml") as handler:
        data = yaml.load(handler)
        for k, v in data['languages'].items():
            name = v.get('name', None)
            glottonym = v.get('glottonym', None)
            family = v.get('family', None)
            position = v.get('position', None)
            content = v.get('content', None)
            speakers = v.get('speakers', None)
            audio = v.get('audio', None)
            
            cursor.execute("""
                INSERT INTO `language` (`name`, `glottonym`, `family`, `position`, `content`, `speakers`, `audio`) VALUES
                (%s,%s,%s,%s,%s, %s, %s);
            """, (name, glottonym, family, position, content, speakers, audio))
            language_id = cursor.lastrowid
            
            for author in v.get("authors", ()):
                cursor.execute("""
                    INSERT INTO `language_author` (`author_id`, `language_id`) VALUES
                    (%s,%s);
                """, (author_ids[author], language_id))

try:
    con = mysql.connector.connect(host="localhost", user="root", password="root", database="cartographies")
        
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
          `id` int(11) NOT NULL,
          `name` varchar(255) COLLATE utf8_bin NOT NULL,
          `glottonym` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `family` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `country` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `position` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `speakers` varchar(255) COLLATE utf8_bin DEFAULT NULL,
          `content` text COLLATE utf8_bin NOT NULL,
          `audio` varchar(255) COLLATE utf8_bin DEFAULT NULL
        ) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
    """)
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS `language_author` (
          `author_id` int(11) NOT NULL,
          `language_id` int(11) NOT NULL
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

    cur.execute("""ALTER TABLE `language`
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
    print(e)

finally:
    if cur:
        cur.close()
    if con:
        con.close()

