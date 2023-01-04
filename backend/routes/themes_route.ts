import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/themes', (req, res) => {

});

app.get('/themes/:id', (req, res) => {
    
});

app.post('/themes', (req, res) => {

});

app.update('/themes/:id', (req, res) => {
    
});

app.delete('/themes/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});