const express = require('express');
const morgan = require('morgan')
const helment = require('helmet')
const server = express();
const usersRouter = require('./users/users-router')
const {logger,validateUserId,validateUser,validatePost} = require('./middleware/middleware')

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(helment())
server.use(morgan('dev'))

// global middlewares and the user's router need to be connected here
server.use('/api/users',usersRouter,logger,validateUserId,validateUser,validatePost)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
