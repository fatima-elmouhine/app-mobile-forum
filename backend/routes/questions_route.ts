import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/questions', (req, res) => {

});

app.get('/questions/:id', (req, res) => {
    
});

app.post('/questions', (req, res) => {

});

app.update('/questions/:id', (req, res) => {
    
});

app.delete('/questions/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});