const Vlog = require('../models/vlog');

// Get all vlogs
exports.getAllVlogs = async (req, res) => {
    try {
        const vlogs = await Vlog.findAll();
        res.json(vlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a vlog by ID
exports.getVlogById = async (req, res) => {
    try {
        const vlog = await Vlog.findByPk(req.params.id);
        if (!vlog) {
            return res.status(404).json({ message: 'Vlog not found' });
        }
        res.json(vlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new vlog
exports.createVlog = async (req, res) => {
    try {
        const { Title, Url, Description, date_posted, employee_id } = req.body;
        const newVlog = await Vlog.create({ Title, Url, Description, date_posted, employee_id });
        res.status(201).json(newVlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a vlog by ID
exports.updateVlogById = async (req, res) => {
    try {
        const { Title, Url, Description, date_posted, employee_id } = req.body;
        const vlog = await Vlog.findByPk(req.params.id);
        if (!vlog) {
            return res.status(404).json({ message: 'Vlog not found' });
        }
        await vlog.update({ Title, Url, Description, date_posted, employee_id });
        res.json(vlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a vlog by ID
exports.deleteVlogById = async (req, res) => {
    try {
        const vlog = await Vlog.findByPk(req.params.id);
        if (!vlog) {
            return res.status(404).json({ message: 'Vlog not found' });
        }
        await vlog.destroy();
        res.json({ message: 'Vlog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
