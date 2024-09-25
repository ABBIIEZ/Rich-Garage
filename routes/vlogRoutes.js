const express = require('express');
const vlogController = require('../controllers/vlogController');
const router = express.Router();

router.get('/', vlogController.getAllVlogs); // Get all vlogs
router.get('/:id', vlogController.getVlogById); // Get a vlog by ID
router.post('/', vlogController.createVlog); // Create a new vlog
router.put('/:id', vlogController.updateVlogById); // Update a vlog by ID
router.delete('/:id', vlogController.deleteVlogById); // Delete a vlog by ID

module.exports = router;
