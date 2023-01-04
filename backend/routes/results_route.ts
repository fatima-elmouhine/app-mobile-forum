import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/results', (req, res) => {

});

app.get('/results/:id', (req, res) => {
    
});

app.post('/results', (req, res) => {

});

app.update('/results/:id', (req, res) => {
    
});

app.delete('/results/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});