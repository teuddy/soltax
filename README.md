[![Deploy to ECR](https://github.com/teuddy/soltax/actions/workflows/deploy.yml/badge.svg?branch=develop)](https://github.com/teuddy/soltax/actions/workflows/deploy.yml)

# Soltax

This is a database-driven system designed for the Dominican Republic that tracks and manages taxes paid on imported cars. It uses Amazon RDS, Node.js, and React.js. The system provides transparency and accuracy in the import process, ensuring compliance with tax regulations in the country.

The Node.js backend is designed to work with different databases depending on the environment. During development, we use a local Docker database that can be easily set up and torn down as needed. However, when the application is deployed to a staging environment, we switch to using Amazon RDS for our database needs. This allows us to take advantage of the scalability and reliability of a managed database service while still keeping our development environment lightweight and flexible.

![Soltax Homepage](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGNlOWQwMTM4MTUzZmRjYWIyZWFlODlhNWYwMjVmNTc3ODkzZDFmZiZjdD1n/LyNKtN6tchhxwFbWyv/giphy.gif)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- [Node.js](https://nodejs.org/): a JavaScript runtime environment that allows developers to build scalable network applications.
- [Tailwind](https://tailwindcss.com/): a utility-first CSS framework that helps developers rapidly build custom designs.
- [Express](https://expressjs.com/): a fast, unopinionated, minimalist web framework for Node.js.
- [Knex.js](http://knexjs.org/): a SQL query builder that is flexible, portable, and fun to use.
- [Docker](https://www.docker.com/): a tool designed to make it easier to create, deploy, and run applications by using containers.
- [Docker Compose](https://docs.docker.com/compose/): a tool for defining and running multi-container Docker applications.
- [GitHub Actions](https://github.com/features/actions): a tool for automating software workflows, including building, testing, and deploying code changes.
- [AWS RDS](https://aws.amazon.com/es/rds/): is a managed relational database service offered by Amazon Web Services(AWS).
- [AWS ECR](https://aws.amazon.com/ecr/): a fully-managed Docker container registry that makes it easy to store, manage, and deploy Docker container images.

## Installation

To run Soltax on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/{your-username}/soltax.git
