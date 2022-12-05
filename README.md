<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

This is a project for my graduation, his architecture is based in microservices and there is two more projects that are my microservices (https://github.com/hythan/app-courses and https://github.com/hythan/app-certifications). Also has 2 front-end applications: https://github.com/hythan/front-admin and https://github.com/hythan/front-public.

## Installation
After cloning all the projects in the same folder, go into the folder app-tcc (if you dont change the name), and run the following commands (you need to do this commands only in the first time running this app, in the other times just run docke-compose up):

### Installation of app-gateway:
First of all, configure the .env file with the admin and student secret keys for generate the tokens and manage the logins, after that you can run the commands:

```bash
$ npm run install:app-gateway
```

### Installation of app-courses:
Run the command:

```bash
$ npm run install:app-courses
```

### Installation of app-certifications:
Run the command:

```bash
$ npm run install:app-certifications
```

## Running the app

```bash
# serve with will listen localhost:5000
$ npm run docker:start or docker:start:dev (to keep the console)
```

This will start the aplication in the http://localhost:5000.
