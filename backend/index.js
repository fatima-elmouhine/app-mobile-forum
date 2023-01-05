const express  = require('express');
const dotenv  = require('dotenv');
// const answersRouter  = require('./routes/answers');
// const coursesRouter  = require('./routes/courses');
// const messagesRouter  = require('./routes/messages');
// const qcmsRouter  = require('./routes/qcms');
// const questionsRouter  = require('./routes/questions');
// const resultsRouter  = require('./routes/results');
// const themesRouter  = require('./routes/themes');
// const topicsRouter  = require('./routes/topics');
// const typesRouter  = require('./routes/types');
const usersRouter  = require('./routes/users');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config();

// start the server
// app.listen(process.env.BACK_PORT, () => {
//     console.log(
//       `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
//     );
//   });
app.use('/api/users', usersRouter);

  app.listen(3000, () => {
    console.log('listening on port 3000');
});