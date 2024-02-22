const express = require("express");
const app = express();
const port = 8080;

app.listen(port, (err) => {
  if (err) {
    console.log("Server Unavailable");
  } else {
    console.log(`Server Connected at ${port}....`);
  }
});
