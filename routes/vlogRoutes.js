const express = require('express');
const vlogController = require('../controllers/vlogController');
const router = express.Router();

router.post('/', vlogController.createVlog);
router.get('/', vlogController.getVlogs);
router.get('/:id', vlogController.getVlogById);
router.put('/:id', vlogController.updateVlog);
router.delete('/:id', vlogController.deleteVlog);

module.exports = router;
