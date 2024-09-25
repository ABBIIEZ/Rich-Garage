// controllers/customerController.js
const { Customer } = require('../models/customer');

// GET all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST (create) a new customer
exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = await Customer.create(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT (update) customer by ID
exports.updateCustomer = async (req, res) => {
    try {
        const updated = await Customer.update(req.body, { where: { customerID: req.params.id } });
        if (!updated[0]) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await Customer.destroy({ where: { customerID: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
