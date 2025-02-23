const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.post('/login', employeeController.loginEmployee);


module.exports = router;
