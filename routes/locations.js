const express = require('express');
const router = express.Router();
const controller = require('../controllers/locations');

// get all locations
router.get('/', controller.getAll);

// get single locations by id
router.get('/:id', controller.getSingle);

// create new locations (post can be used for create or update depending on the function)
router.post('/', controller.createLocations);

// update locations by id, replaces old data
router.put('/:id', controller.updateLocations);   

// delete locations by id
router.delete('/:id', controller.deleteLocations);  

module.exports = router;