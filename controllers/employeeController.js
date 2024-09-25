const { Employee } = require('../models/employee');

// GET all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new employee
exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT (update) employee by ID
exports.updateEmployee = async (req, res) => {
    try {
        const updated = await Employee.update(req.body, { where: { employeeID: req.params.id } });
        if (!updated[0]) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.destroy({ where: { employeeID: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
