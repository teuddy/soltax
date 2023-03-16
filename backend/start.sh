

# Start the Node.js backend
echo "Your are in "$NODE_ENV" so lets wait for the db to be up"
node src/index.js
if [ "$NODE_ENV" = "development" ]; then
  echo "waiting for db"
  echo "$DATABASE_HOST and $DATABASE_PORT"
  while ! nc -z  $DATABASE_HOST $DATABASE_PORT; do
    sleep 1
  done
  echo "db up and running"
    # node src/index.js --inspect=0.0.0.0:9229
    #this should be nodemom
    node src/index.js
else
  # production or staging
  echo "probably you are in production or staging and the db is already up"
  node src/index.js
fi