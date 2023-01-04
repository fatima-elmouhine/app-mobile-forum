import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/courses', (req, res) => {

});

app.get('/courses/:id', (req, res) => {
    
});

app.post('/courses', (req, res) => {

});

app.update('/courses/:id', (req, res) => {
    
});

app.delete('/courses/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});