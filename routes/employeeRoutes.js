const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router.get('/', employeeController.getAllEmployees); // Get all employees
router.get('/:id', employeeController.getEmployeeById); // Get an employee by ID
router.post('/', employeeController.createEmployee); // Create a new employee
router.put('/:id', employeeController.updateEmployeeById); // Update an employee by ID
router.delete('/:id', employeeController.deleteEmployeeById); // Delete an employee by ID

module.exports = router;
