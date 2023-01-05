#!/bin/bash

for arg in "$@" ; do
   shift
   case "$arg" in
      run) echo 'Lancement des machines virtuelles...'
      docker compose up -d
        echo "En attente du lancement du serveur SQL..." 
      while ! docker-compose logs | grep "ready for connections"; do
        sleep 1
      done
      echo 'Machines virtuelles lancées.'
      sleep 20
      echo 'Lancement des migrations...'
      node ./backend/models/index.js
      ;;
      stop) docker compose down -v
      ;;
      restart) 
      docker compose down -v
      docker compose up -d
        echo "En attente du lancement du serveur SQL..." 
      while ! docker-compose logs | grep "ready for connections"; do
        sleep 1
      done
      echo 'Machines virtuelles lancées.'
      sleep 20
      echo 'Lancement des migrations...'
      node ./backend/models/initDB.js
      ;;
      makemigration) node ./backend/models/initDB.js
      ;;
      *) echo "aucune option"
         exit 1
      ;;
   esac
done