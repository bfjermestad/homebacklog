var express = require('express');
var router = express.Router();
const todolistdb = require(`../data/todolistdb`);

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await todolistdb.queryTodolist();
    res.render('users', { rader: rows, title: 'Express' });
  } catch(err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
