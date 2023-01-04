import express from 'express';
import dotenv from 'dotenv';
import answersRouter from './routes/answers';
import coursesRouter from './routes/courses';
import messagesRouter from './routes/messages';
import qcmsRouter from './routes/qcms';
import questionsRouter from './routes/questions';
import resultsRouter from './routes/results';
import themesRouter from './routes/themes';
import topicsRouter from './routes/topics';
import typesRouter from './routes/types';
import usersRouter from './routes/users';


const app = express();
dotenv.config();

// start the server
app.listen(process.env.BACK_PORT, () => {
    console.log(
      `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
    );
  });