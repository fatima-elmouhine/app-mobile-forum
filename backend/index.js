const express  = require('express');
// const dotenv  = require('dotenv');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const answersRouter  = require('./routes/answers');
const coursesRouter  = require('./routes/courses');
const messagesRouter  = require('./routes/messages');
const qcmsRouter  = require('./routes/qcms');
const qcmQuestionRouter  = require('./routes/qcmQuestions');
const questionsRouter  = require('./routes/questions');
const resultsRouter  = require('./routes/results');
const themesRouter  = require('./routes/themes');
const topicsRouter  = require('./routes/topics');
const typesRouter  = require('./routes/types');
const usersRouter  = require('./routes/users');
const searchRouter  = require('./routes/search');

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));





// start the server
// app.listen(process.env.BACK_PORT, () => {
//     console.log(
//       `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
//     );
//   });
app.use('/api/users', usersRouter);
app.use('/api/types', typesRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/themes', themesRouter);
app.use('/api/results', resultsRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/qcms', qcmsRouter);
app.use('/api/qcmQuestions', qcmQuestionRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/answers', answersRouter);
app.use('/api/search', searchRouter);


  app.listen(3000, () => {
    console.log('listening on port 3000');
});