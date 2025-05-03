const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app.js');
const User = require('../models/user');

const request = supertest(app);

let token;
let selectedUser;

const user = {
  name: 'Ronaldo',
  about: 'sonic',
  avatar:
    'www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg',
  email: 'geraldo3@geraldo.com',
  password: 'ronaldo',
};
const userInvalidUrl = {
  name: 'Ronaldo',
  about: 'sonic',
  avatar: 'avatar.jpg',
  email: 'geraldo4@geraldo.com',
  password: 'ronaldo',
};

const test = [
  {
    _id: 3213,
    name: 'dasdsa',
    about: 'sonic',
    avatar: 'avatar.jpg',
    email: 'geraldo4@geraldo.com',
    password: 'asdas',
  },
];

const SigninValidUser = {
  email: 'geraldo3@geraldo.com',
  password: 'ronaldo',
};
const SigninInvalidEmail = {
  email: 'geraldo3@geraldo.com',
  password: 'ronaldoooo',
};
const SigninInvalidPassword = {
  email: 'geraldao3@geraldo.com',
  password: 'ronaldoooo',
};

afterAll(async () => {
  await User.findOneAndDelete(user.email);
  await User.findOneAndDelete(userInvalidUrl.email);
  await mongoose.connection.close();
});

describe('POST "/signup"', () => {
  it('#Success signup, response with token and status 200', async () => {
    const response = await request
      .post('/signup')
      .send(user)
      .set('Accept', 'application/json');
    const { body, header, status } = response;
    const newUser = body;
    expect(header['content-type']).toMatch(/json/);
    expect(status).toBe(200);
  });
  it('#User already exists, response with error message and status 400 ', async () => {
    const response = await request
      .post('/signup')
      .send(user)
      .set('Accept', 'application/json');
    const { status, body } = response;
    expect(body.message).toBe('The provided key already exists.');
    expect(status).toBe(400);
  });
  it('#Invalid fields, response with error message and status 400', async () => {
    const response = await request
      .post('/signup')
      .send(userInvalidUrl)
      .set('Accept', 'application/json');
    const { status, body } = response;
    expect(typeof body.message).toBe('string');
    expect(status).toBe(400);
  });
});

describe('POST "/signin"', () => {
  it('#Success signin, response with token and status 200', async () => {
    const response = await request
      .post('/signin')
      .send(SigninValidUser)
      .set('Accept', 'application/json');
    const { body, header, status } = response;
    token = body.token;
    expect(body).toHaveProperty('token');
    expect(header['content-type']).toMatch(/json/);
    expect(status).toBe(200);
  });
  it('#Invalid e-mail, response status 401 and error message', async () => {
    const response = await request
      .post('/signin')
      .send(SigninInvalidEmail)
      .set('Accept', 'application/json');
    const { status } = response;
    expect(status).toBe(401);
    expect(response.body.message).toBe('Email or password is incorrect.');
  });
  it('#Invalid password, response status 401 and error message', async () => {
    const response = await request
      .post('/signin')
      .send(SigninInvalidPassword)
      .set('Accept', 'application/json');
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
    selectedUser = body[0];
    expect(header['content-type']).toMatch(/json/);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          about: expect.any(String),
          avatar: expect.any(String),
          email: expect.any(String),
        }),
      ]),
    );
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
    console.log(selectedUser);
    expect(header['content-type']).toMatch(/json/);
    expect(body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        name: expect.any(String),
        about: expect.any(String),
        avatar: expect.any(String),
        email: expect.any(String),
      }),
    );
    expect(status).toBe(200);
  });
});
