const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

router.use('/jobs', require('./jobs'));
router.use('/materials', require('./materials'));
router.use('/locations', require('./locations'));

module.exports = router;