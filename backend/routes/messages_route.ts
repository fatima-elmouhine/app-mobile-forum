import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/messages', (req, res) => {

});

app.get('/messages/:id', (req, res) => {
    
});

app.post('/messages', (req, res) => {

});

app.update('/messages/:id', (req, res) => {
    
});

app.delete('/messages/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});