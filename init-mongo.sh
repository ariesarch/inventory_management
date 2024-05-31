#!/bin/bash

# Wait for the MongoDB instances to be ready
sleep 10

# Execute mongosh commands for initializing config server, shards, and router
docker-compose exec configsvr01 sh -c "mongosh < scripts/init-configserver.js"
docker-compose exec shard01-a sh -c "mongosh < scripts/init-shard01.js"
docker-compose exec shard02-a sh -c "mongosh < scripts/init-shard02.js"
docker-compose exec router01 sh -c "mongosh < scripts/init-router.js"

# Connect to MongoDB shell and execute additional setup commands
docker-compose exec router01 mongosh --port 27017 <<EOF
sh.enableSharding("inventory_db")
use config
db.settings.updateOne({ _id: "chunksize" }, { $set: { _id: "chunksize", value: 5 } }, { upsert: true })
db.adminCommand({ shardCollection: "inventory_db.orders", key: { oemNumber: "hashed", zipCode: 1, supplierId: 1 } })
EOF