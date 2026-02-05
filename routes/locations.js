const express = require('express');
const router = express.Router();
const controller = require('../controllers/locations');

// get all contacts
router.get('/', controller.getAll);

// get single contact by id
router.get('/:id', controller.getSingle);

// create new contact (post can be used for create or update depending on the function)
router.post('/', controller.createContact);

// update contact by id, replaces old data
router.put('/:id', controller.updateContact);   

// delete contact by id
router.delete('/:id', controller.deleteContact);  

module.exports = router;