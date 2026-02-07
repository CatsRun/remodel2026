const express = require('express');
const router = express.Router();
const welcomeMessage = `
    <h1>Welcome to Remodel 2026 Home Page!</h1>
    <ul>
      <li>For a list of <strong>Materials</strong> → <code>/materials</code></li>
      <li>For a list of <strong>Locations</strong> → <code>/locations</code></li>
    </ul>`;

router.get('/', (req, res) => {
  res.send(welcomeMessage);
});

// router.use('/jobs', require('./jobs'));
router.use('/materials', require('./materials'));
router.use('/locations', require('./locations'));

module.exports = router;