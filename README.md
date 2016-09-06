#system

```
# apt-get install mysql-server 
# apt-get install nodejs nodejs-legacy npm 
```

#database 
```
CREATE USER 'someuser'@'localhost' IDENTIFIED BY 'somepassword';
GRANT ALL PRIVILEGES ON 'someuser'.* TO 'somedatabase'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE somedatabase;
```

```
$ mysql -u someuser -p somedatabase < db_backup/somedatabase.backup.sql 
```

#config.json

```
{
    "db":
    {   
        "host": "localhost",
        "user": "someuser",
        "password": "somepassword",
        "database": "somedatabase",
        "socketPath": "/var/run/mysqld/mysqld.sock" 
    },  
    "server":
    {   
        "port": 80, 
        "path": "/cartographies/"
    }   
}
```




# cartographies.sonores
Paysages géographiques et sonores des langues du monde

## Installation
First install dependencies:
npm set python "/usr/bin/python2"
npm install

Load initial data:
node load_fixtures.js

Running the application (localhost:8080):
node index.js
