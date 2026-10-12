## IMPORTANTE

Hice la implementacio real de las bases Mongo y Postgres

Hace un:

```bash
cp .env_example .env 
```

y cambia los valores de los secretos

Luego ejecuta:

```bash
npm run init
```

O si queres hacerlo manualmente, importante hacelo en este orden:

```bash
docker compose up -d
node index.js
```


## En este README dejo nota de documentacion util enontrada en la web que me ayudo a completar los desafios

### Persistencia real de PostgreSQL
https://medium.com/@izhekka/connecting-postgresql-with-node-js-f3e7d41a7537

### Persistencia real de Mongo_DB
https://www.mongodb.com/resources/languages/mongodb-with-nodejs
https://gist.github.com/Klerith/f735a02c547933585e7486d0318d3ae8
https://www.mongodb.com/community/forums/t/mongodb-username-password-ip-address-27017-ip-address-what-does-it-mean-hear/144429

### Uso de la libreria dotenv
https://thegeekplanets.medium.com/managing-environment-variables-in-node-js-using-the-dotenv-package-2a5c8eee61a8

### Uso libreria/driver pg
https://sql.holt.courses/lessons/data/nodejs-and-postgresql

### Uso de rutas en Express
https://medium.com/@finnkumar6/understanding-router-in-express-js-a-complete-guide-7d2cece2b757

### Como enviar json desde el dispositivo
https://esp32.com/viewtopic.php?t=6584

### Como obtener la MAC del esp32
https://randomnerdtutorials.com/esp-idf-esp32-mac-address/

### Doc util que me sirvio para implementar el desafio temp_internal
https://www.cyberciti.biz/faq/bash-infinite-loop/
https://askubuntu.com/questions/1059170/how-do-i-find-the-temperatures-without-3rd-party-software
https://stackoverflow.com/questions/4651437/how-do-i-set-a-variable-to-the-output-of-a-command-in-bash