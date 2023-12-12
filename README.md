---
title: Getting Started
description: How to setup the local environment for this repository
tags: ['setup']
---

## Local environment

The only requirement is Node.js v18.4.0 or higher.

There are different ways to install it:

- Download it from [the website](https://nodejs.org/)
- Use [nvm, Node Version Manager](https://github.com/nvm-sh/nvm)
- Use [asdf, another version manager](https://github.com/asdf-vm/asdf), in this case it's not just for Node.

It's recommended to use a version manager, so the Node version can be easily changed. Then, asdf is just better than nvm because you can also manage other software with it.

## Install

Clone the repository:

    git clone  https://github.com/dhristoskov/module-federation-demo

Install dependencies for every project:

    npm install

## Run

Run the project on your local:

    npm run start

The web app will connect to the backend, make sure it's running on port 3000

