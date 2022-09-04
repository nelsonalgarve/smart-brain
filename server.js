const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-updated');
const cors = require ('cors');

// CONTROLLERS
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// DB CON
const db = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'nelson',
      password : 'nelson',
      database : 'smart-brain'
    }
  });
  

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());


app.get('/', (req, res) => {
  res.send('success');
})

//SIGNIN ROUTE
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

//REGISTER ROUTE
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//USER PROFILE ROUTE
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

// IMAGE ENTRIES
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

