const express = require('express');
const router = express.Router();
const controller = require('../controllers/materials');

// get all contacts
router.get('/', controller.getAll);

// get single contact by id
router.get('/:id', controller.getSingle);

// create new contact (post can be used for create or update depending on the function)
router.post('/', controller.createMaterial);

// update contact by id, replaces old data
router.put('/:id', controller.updateMaterial);   

// delete contact by id
router.delete('/:id', controller.deleteMaterial);  

module.exports = router;