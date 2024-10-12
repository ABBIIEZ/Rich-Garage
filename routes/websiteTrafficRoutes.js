const express = require('express');
const websiteTrafficController = require('../controllers/websiteTrafficController');
const router = express.Router();

router.post('/', websiteTrafficController.recordTraffic);
router.get('/', websiteTrafficController.getWebsiteTraffic);
router.get('/:id', websiteTrafficController.getWebsiteTrafficById);
router.put('/:id', websiteTrafficController.updateWebsiteTraffic);
router.delete('/:id', websiteTrafficController.deleteWebsiteTraffic);

module.exports = router;
