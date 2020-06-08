eval $(docker-machine env service-1)
docker cp /Users/robertheler/Desktop/pollee-server/database/schema.sql pollee-server_postgres_1:/db
docker exec -t -i pollee-server_postgres_1 /bin/bash
cd /db
psql -U postgres < schema.sql

