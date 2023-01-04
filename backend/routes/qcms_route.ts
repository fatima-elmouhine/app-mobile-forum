import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// routes
app.get('/qcms', (req, res) => {

});

app.get('/qcms/:id', (req, res) => {
    
});

app.post('/qcms', (req, res) => {

});

app.update('/qcms/:id', (req, res) => {
    
});

app.delete('/qcms/:id', (req, res) => {
    
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});