import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/types', (req, res) => {

});

app.get('/types/:id', (req, res) => {
    
});

app.post('/types', (req, res) => {

});

app.update('/types/:id', (req, res) => {
    
});

app.delete('/types/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});