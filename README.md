# PepoFut APP API

This is the PepoFut APP API, an API that allows you to manage soccer championships, as well as all related entities (Rounds, Matches, Teams, Players and Clubs).

## Data model diagram

An simple E/R diagram is attached to better understand the data model defined

<p style="text-align: center;"><img src="https://i.ibb.co/Bjqcjhj/Pepo-Fut-drawio.png" width="100%"></p>

## API Docs - Swagger

The API documentation is public and is available here:

- [Swagger Doc](https://pepo-fut.herokuapp.com/api/v1/docs/)

## Stack and other relevant dependencies

- [NodeJS v14.17.6 LTS](https://nodejs.org/es/)
- [PostgreSQL 11.2](https://www.postgresql.org/)
- [NestJS v8.0.6](https://nestjs.com)
- [Express](https://expressjs.com)
- [TypeORM v0.2.37](https://typeorm.io/)
- [Nx](https://nx.dev/)
- [Docker 20.10.6](https://www.docker.com/)
- [Swagger](https://swagger.io/)

## Required dependencies and config

For run this project in local mode, you have to been installed (locally or in Docker container ) Node, PostgreSQL. To show the configurations you have two environment files at project:

## Application scripts

### Install dependencies

Run `npm i` script to install project dependencies

### Deploy

Run `npm run deploy:api` to deploy project locally, with production configuration, into 2 docker containers. One is the PostgreSQL database, named as `pepo-fut-db` and the other is the api server project named as `pepo-fut`. To run this command Docker must be installed previously.
This command is executed with the configuration defined in the project's Dockerfile and ups two containers (database and server app) using the docker-compose.yml file.

### Development server

Run `npm run start:api` for a run local server with DEV configuration. Navigate to http://localhost:3333/api/v1/docs.This shows te Swagger interactive documentation.
If you run this command, you have to been installed PostgreSQL previously.

### Build

Run `npm run build:api` to build the project with development config. The build artifacts will be stored in the `dist/` directory. Use the `npm run build:api:prod` script for a production build.

### Running unit tests

Run `npm run test` to execute the unit and e2e tests via [Jest](https://jestjs.io).

Two unit tests are defined, which cover the use cases of teams.service and teams controller.

In adition, an e2e test is defined that covers the coverage of the authentication module.

With `npm run test:coverage`script you can see the coverage of this tests.

## Some needed improvements and coments

- The Swagger examples are not as defined as I would like.
- It can be used dotenv for environments instead enviroment.prod.ts and enviroment.ts fields . I used it by default due to use NX library.
- It can be used a CRUD interface for services and controllers too.
- It is pending to implement migrations for the production environment and to be able to dump more data into the database
- There are 4 teams created by default, with 5 players for team, into the database. The rest of the tables are empty. You can do operations through this models.
- The frontend app is not developed. I used NX to develop the frontend app easier.
- Builds are deployed using Docker, docker-compose and Heroku .
