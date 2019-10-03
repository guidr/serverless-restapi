# Severless RESTful API

This is a RESTful API service developed on a AWS serverless architecture using API Gateway, Lambda functions and DynamoDB.

The codebase is organized on a monorepo structure and contain 2 packages:

* **@restapi/functions**: Lambdas implementation and schema validation
* **@restapi/core**: Core functionality and helpers

## Instalation

In order to install the project, please run the following commands in the terminal:

```
# install all dependencies and link packages
$ yarn install

# setup local DynamoDB for development with seed data
$ yarn bootstrap
```

## Running the project

The following command will run the API Gateway on `http://localhost:3000` and DynamoDB on `http://localhost:8000`. Please make sure these ports are not in use.

```
$ lerna dev
```

## Lint

Code styling is following Node.js recommended settings.

```
$ lerna lint
```

## ToDo

This is a WIP project and new features are to come:

* [] Unit Tests using Jest
* [] Schema documentation with Swagger
* [] Deplyoment scripts 