const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js');
const User = require('../models/user');
const card = require('../models/card.js');

const request = supertest(app);

// USERS DATA
let token;
let selectedUser;

const validUser = {
  email: 'test@test.com',
  password: 'test1234',
};

const invalidFieldsUser = {
  email: '',
  password: '',
};

const invalidEmail = {
  email: 'tst@test.com',
  password: 'test1234',
};
const invalidPassword = {
  email: 'test@test.com',
  password: 'tst1234',
};

// CARDS DATA

const validCard = {
  name: 'Test',
  link: 'https://images.unsplash.com/photo-1721697310377-1a70ae366cb2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

let createdCard;

afterAll(async () => {
  await card.findByIdAndDelete(createdCard._id);
  await User.findOneAndDelete(validUser.email);
  await User.findOneAndDelete(invalidFieldsUser.email);
  await mongoose.connection.close();
});

// USERS ROUTES

describe('POST "/signup"', () => {
  it('#Success signup, response with token and status 200', async () => {
    const response = await request.post('/signup').send(validUser).set('Accept', 'application/json');
    const { body, header, status } = response;
    const newUser = body;
    expect(header['content-type']).toMatch(/json/);
    expect(status).toBe(200);
  });
  it('#User already exists, response with error message and status 400 ', async () => {
    const response = await request.post('/signup').send(validUser).set('Accept', 'application/json');
    const { status, body } = response;
    expect(body.message).toBe('The provided key already exists.');
    expect(status).toBe(400);
  });
  it('#Invalid fields, response with error message and status 400', async () => {
    const response = await request.post('/signup').send(invalidFieldsUser).set('Accept', 'application/json');
    const { status, body } = response;
    expect(typeof body.message).toBe('string');
    expect(status).toBe(400);
  });
});

describe('POST "/signin"', () => {
  it('#Success signin, response with token and status 200', async () => {
    const response = await request.post('/signin').send(validUser).set('Accept', 'application/json');
    const { body, header, status } = response;
    token = body.token;
    expect(body).toHaveProperty('token');
    expect(header['content-type']).toMatch(/json/);
    expect(status).toBe(200);
  });
  it('#Invalid e-mail, response status 401 and error message', async () => {
    const response = await request.post('/signin').send(invalidEmail).set('Accept', 'application/json');
    const { status } = response;
    expect(status).toBe(401);
    expect(response.body.message).toBe('Email or password is incorrect.');
  });
  it('#Invalid password, response status 401 and error message', async () => {
    const response = await request.post('/signin').send(invalidPassword).set('Accept', 'application/json');
    const { status } = response;
    expect(status).toBe(401);
    expect(response.body.message).toBe('Email or password is incorrect.');
  });
});

describe('GET "/users"', () => {
  it('#Success get users data, response with users data and status 200', async () => {
    const response = await request
      .get('/users')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    expect(header['content-type']).toMatch(/json/);
    body.forEach((card) => {
      const { _id, name, about, avatar, email } = card;
      selectedUser = card;
      expect(typeof _id).toBe('string');
      expect(typeof name).toBe('string');
      expect(typeof about).toBe('string');
      expect(typeof avatar).toBe('string');
      expect(typeof email).toBe('string');
    });
    expect(status).toBe(200);
  });
});

describe('GET "/users/:userId"', () => {
  it('#Success get user by ID, response with users data and status 200', async () => {
    const response = await request
      .get(`/users/${selectedUser._id}`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

describe('GET "/users/me"', () => {
  it('#Success get authenticated user, response with users data and status 200', async () => {
    const response = await request
      .get('/users/me')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

describe('PATCH "/users/me"', () => {
  const updateData = {
    name: 'John',
    about: 'Dev',
  };
  it('#Success update name and about fields of authenticated user, response with users data and status 200', async () => {
    const response = await request
      .patch('/users/me')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(updateData);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

describe('PATCH "/users/me/avatar"', () => {
  const updateData = {
    avatar:
      'https://images.unsplash.com/photo-1721697310377-1a70ae366cb2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };
  it('#Success update name and about fields of authenticated user, response with users data and status 200', async () => {
    const response = await request
      .patch('/users/me/avatar')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(updateData);
    const { header, status, body } = response;
    const { _id, name, about, avatar, email } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof _id).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof about).toBe('string');
    expect(typeof avatar).toBe('string');
    expect(typeof email).toBe('string');
    expect(status).toBe(200);
  });
});

// CARDS ROUTES

describe('POST "/cards"', () => {
  it('#Success create a card, response with cards data and status 200', async () => {
    const response = await request
      .post('/cards')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(validCard);
    const { header, status, body } = response;
    createdCard = body;
    const { name, link, owner, likes, _id, createdAt } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof name).toEqual('string');
    expect(typeof link).toEqual('string');
    expect(typeof owner).toEqual('string');
    expect(likes).toHaveLength(0);
    expect(typeof _id).toEqual('string');
    expect(typeof createdAt).toEqual('string');
    expect(status).toBe(200);
  });
});

describe('GET "/cards"', () => {
  it('#Success get cards data, response with cards data and status 200', async () => {
    const response = await request
      .get('/cards')
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { body, header, status } = response;
    expect(header['content-type']).toMatch(/json/);
    body.forEach((card) => {
      const { name, link, owner, likes, _id, createdAt } = card;
      expect(typeof name).toEqual('string');
      expect(typeof link).toEqual('string');
      expect(typeof owner).toEqual('string');
      expect(likes).toHaveLength(0);
      expect(typeof _id).toEqual('string');
      expect(typeof createdAt).toEqual('string');
    });
    expect(status).toBe(200);
  });
});

describe('PUT "/:cardId"', () => {
  it('#Success - add user ID to the likes property of selected card, response with card data and status 200', async () => {
    const response = await request
      .put(`/cards/${createdCard._id}/likes`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { name, link, owner, likes, _id, createdAt } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof name).toEqual('string');
    expect(typeof link).toEqual('string');
    expect(typeof owner).toEqual('string');
    expect(likes).toHaveLength(1);
    expect(typeof _id).toEqual('string');
    expect(typeof createdAt).toEqual('string');
    expect(status).toBe(200);
  });
});

describe('DELETE "/:cardId/likes"', () => {
  it('#Success - remove user ID from likes property of selected card, response with card data and status 200', async () => {
    const response = await request
      .delete(`/cards/${createdCard._id}/likes`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { header, status, body } = response;
    const { name, link, owner, likes, _id, createdAt } = body;
    expect(header['content-type']).toMatch(/json/);
    expect(typeof name).toEqual('string');
    expect(typeof link).toEqual('string');
    expect(typeof owner).toEqual('string');
    expect(likes).toHaveLength(0);
    expect(typeof _id).toEqual('string');
    expect(typeof createdAt).toEqual('string');
    expect(status).toBe(200);
  });
});

describe('DELETE "/:cardId"', () => {
  it('#Success - delete card by ID, response with status 200', async () => {
    const response = await request
      .delete(`/cards/${createdCard._id}/likes`)
      .set('accept', 'application/json')
      .set('authorization', `Bearer ${token}`);
    const { status } = response;
    expect(status).toBe(200);
  });
});
