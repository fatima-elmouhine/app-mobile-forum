import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/topics', (req, res) => {

});

app.get('/topics/:id', (req, res) => {
    
});

app.post('/topics', (req, res) => {

});

app.update('/topics/:id', (req, res) => {
    
});

app.delete('/topics/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});