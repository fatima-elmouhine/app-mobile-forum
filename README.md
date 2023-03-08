# App-mobile-forum - Medenpharmakine

Cette application est à destination des étudiants de médecine pour préparer le concours de première année. 

Ce projet contient :  
- une application mobile réalisé en React Native (la V1 est destiné pour les appareils Android)
- une API réalisée en Node.js et utilise Sequelize comme ORM afin de manipuler le système de gestion de bases de données relationnelles MySQL.
- le back-end est conteneurisé avec Docker 
- une interface web admin réalisé avec le framework React, NextJS

## Pour démarrer le backend :

### ✅ 🐳 Docker 

- Lancer ces scripts à la racine :
  -  ./start.sh stop
  -  ./start.sh run
  -  ./start.sh makemigration


Le "stop" nous permet d'arrêter tout docker qui a été précédemment lancé
Le "run" nous permet de lancer un container avec une image MySQL
Le "makemigration" nous permet de lancer des fixtures dans notre base donnée

⚠️ Si ce script ne fonctionne pas (parfois sur environnement windows), il faut :
- Pour lancer docker
  - cd backend
  - docker compose up
- Pour lancer les migration, vous devez :
  - cd backend/models
  - node initDB.js

### ✅ 💡 API

- cd backend
- npm i
- npm start

## Pour démarrer le frontend :

### ✅ 📲 React Native

- À la racine :
  - cd frontend
  - npm i
  - expo start --clear

## Pour démarrer le côté admin 🖥️ :

- À la racine :
  - cd admin
  - npm i
  - npm run dev


------------------------------------------------------


