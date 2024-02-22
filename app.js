const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT || 8080
const userRouter = require('./routes/user.router');
const bookRouter = require('./routes/book.router');

app.use(bodyParser.json())
app.use(cors());
app.use(userRouter);
app.use(bookRouter);

app.listen(port, (err) => {
  if (err) {
    console.log("Server Unavailable");
  } else {
    console.log(`Server Connected at ${port}....`);
  }
});
