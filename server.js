const express = require('express');
const { db, syncAndSeed } = require('./db');

const app = express();

app.get('/', (req, res, next) => {
  try {
    res.send('hi')
  } catch(err) {
    next();
  }
})

const init = async() => {
  try {
    await db.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    await app.listen(port, () => console.log(`listening on port ${port}`));
  } catch(err) {
    console.log(err);
  }
};
init();
