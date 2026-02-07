const express = require('express');
const router = express.Router();
const controller = require('../controllers/jobs');

// get all contacts
router.get('/', controller.getAll);

// get single contact by id
router.get('/:id', controller.getSingle);

// create new contact (post can be used for create or update depending on the function)
router.post('/', controller.createJobs);

// update Jobs by id, replaces old data
router.put('/:id', controller.updateJobs);   

// delete Jobs by id
router.delete('/:id', controller.deleteJobs); 

// how do I get the route to go to viewJobs and not the default home?
// create view of workOrder
router.get('/', controller.viewJobs);

module.exports = router;