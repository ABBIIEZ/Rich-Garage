const express = require('express');
const websiteTrafficController = require('../controllers/websiteTrafficController');
const router = express.Router();

router.get('/', websiteTrafficController.getAllWebsiteTraffic); // Get all website traffic records
router.get('/:id', websiteTrafficController.getWebsiteTrafficById); // Get website traffic by ID
router.post('/', websiteTrafficController.createWebsiteTraffic); // Create a new website traffic record
router.put('/:id', websiteTrafficController.updateWebsiteTrafficById); // Update a website traffic record by ID
router.delete('/:id', websiteTrafficController.deleteWebsiteTrafficById); // Delete a website traffic record by ID

module.exports = router;
