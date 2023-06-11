import path from 'path';

export const join = (req, res) => {
  res.send('join!');
};

export const login = (req, res) => {
  res.render('login');
};

export const handleEditUser = (req, res) => {
  res.send('EditUserInfo');
};

export const handleDelete = (req, res) => {
  res.send('Delete');
};
