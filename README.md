# Hi ! Welcome to Yama** ! 

**Stands for "Yet another movie app". 

## Test in local 
You need to have the following tools in order to build & run the app
- Docker
- Node >= 16
- Npm >= 8
- pnpm >= 7

To quickly test the App, the best way is to use docker compose. You can run the following commands at the root of the git repository.

```shell
docker-compose build
```

Then, you can start the `api` and the `app` using

```shell
docker-compose up
```

if you only need to runs one service, then use

```shell
docker-compose up -d (app|api)
```
