const express = require('express');
const Router = express.Router();
const { googleAuth } = require('../Controllers/AuthControllers.jsx');

Router.get("/google", googleAuth);

module.exports = Router;