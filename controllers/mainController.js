import path from 'path';

const User = require('../models/User');

export const mainPage = (req, res) => {
  res.render('main');
};

export const succLogin = (req, res) => {
  console.log(req.params.id);
  res.render('succMain', { id: req.params.id });
};

export const output = {
  home: (req, res) => {
    res.render('home/index');
  },
  login: (req, res) => {
    res.render('home/login');
  },
  register: (req, res) => {
    res.render('home/register');
  },
};

export const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },
};
