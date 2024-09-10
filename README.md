## Description

This repository contains my solution for the [tech task](https://gist.github.com/PayseraGithub/ef12dabace4c00a3f450f9a9f259d3cd)  
The application is built using the NestJS framework.

## Routes

The application exposes three routes:

- GET /  
  Retrieves data from a file and prints calculated fees.
- GET /data  
  Fetches mock data from a JSON file.
- POST /  
  Calculates fees based on the data provided in the request body.

## Installation

```bash
$ npm install
```

## Running the app

All commands to run the app can receive second argument  
which can specify path to json file  
otherwise default json file will be used

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod

# with custom json file
$ npm run start:dev ../pathToFile/myFile.json
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
