#!/bin/bash

npm install prisma @prisma/client
npx prisma generate
until npx prisma db push; do
  echo "Waiting for database to be ready..."
  sleep 5
done
node ./server.js
