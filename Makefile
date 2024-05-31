.PHONY: up init all

up:
	docker-compose up -d

init:
	./init-mongo.sh
seed:
	docker-compose exec server npm run db:seed
	
all: up init
