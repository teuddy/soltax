#!/bin/sh

echo "waiting for db"

while ! nc -z db 3306; do
  sleep 1
done

echo "db up and running"

# Start the Node.js backend
node src/index.js 
