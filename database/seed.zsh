eval $(docker-machine env service-1)
docker cp /Users/robertheler/Desktop/pollee-server/database/schema.sql pollee-server_postgres_1:/db
docker exec -t -i pollee-server_postgres_1 /bin/bash
cd /db
psql -U postgres < schema.sql


eval $(docker-machine env service-1)

to server:
docker cp /Users/robertheler/Desktop/Hack\ Reactor/pollee-server/database/index.js pollee-server_server_1:/src/app/database/index.js
docker cp /Users/robertheler/Desktop/Hack\ Reactor/pollee-server/server/index.js pollee-server_server_1:/src/app/server/index.js

to postgres:
docker cp /Users/robertheler/Desktop/pollee-server/database/schema.sql pollee-server_server_1:/src/app/database/schema.sql
docker cp /Users/robertheler/Desktop/pollee-server/database/schema.sql pollee-server_postgres_1:/db/schema.sql


docker cp pollee-server_server_1:/src/app/database/index.js /Users/robertheler/Desktop/pollee-server/database/index.js