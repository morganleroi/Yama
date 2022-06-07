# Hi ! Welcome to Yama** ! 

**Stands for "Yet another movie app". 

### You can play with this awesome app at https://yama.azureedge.net/

### Yama Architecture
This WebApp architecture is quite simple.
The front end is built using React + Typescript stack. Vite and Vitest are used to build the bundle and runs unit test.
The CSS is built using TailWind.
For the e2e part we use Codecept with the awesome Playright.
The backend part is built using NestJs (With Express).
Off course Algolia is there to search and index document ! ...and it's blazing fast ! 🤯 

## Reauirements
You need to have the following tools in order to build & run the app
- Docker
- Node >= 16
- Npm >= 8
- pnpm >= 7

WebApp is available at http://localhost:3000 and the api at http://localhost:3001

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

## Running automated tests

### e2e (Folder e2e)
```shell
npm i
npx codeceptjs run --steps
```

### Yama api (Folder Api)
```shell
npm i
npm run test
```

### Yama app (Folder App)
```shell
pnpm i
pnpm test
```

## Build API manually

To build the Node App
```shell
npm i
npm run build
```

To build the docker image

```shell
docker build -t morganleroi/yama-api .
```

## Build App manually

To build the React App (Prod package)
```shell
pnpm i
npm build
```

To build the docker image

```shell
docker build -t morganleroi/yama-api .
```

## Cloud Deployment
- App is deployed using Azure Static Website and exposed by Azure CDN Endpoint (https://yama.azureedge.net/)
- Api is deployed using Azure App Container Service. (Swagger def : https://yama-api.graycliff-9f6918ac.westeurope.azurecontainerapps.io/api/)

## What is (still) missing to be "Production Reqdy"?

- [ ] API Healthchecks (Algolia monitoring status, Log indexes, Node Process).
- [ ] Push structured log somewhere.
- [ ] A fully working CI and CD.
- [ ] A secure way to protect Admin route.
- [ ] TLS Certificates (Domain + Api).
- [ ] Alerting and Monitoring of user interaction and service outages
