import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/answers', (req, res) => {

});

app.get('/answers/:id', (req, res) => {
    
});

app.post('/answers', (req, res) => {

});

app.update('/answers/:id', (req, res) => {
    
});

app.delete('/answers/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});