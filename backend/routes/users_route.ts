import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/users', (req, res) => {

});

app.get('/users/:id', (req, res) => {
    
});

app.post('/user', (req, res) => {

});

app.update('/users/:id', (req, res) => {
    
});

app.delete('/users/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});