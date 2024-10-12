const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();
const Employee = require('../models/employee');

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);


module.exports = router;
