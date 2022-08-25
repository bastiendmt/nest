
```sh
# init container
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

# run 
docker container start postgres-nest
```