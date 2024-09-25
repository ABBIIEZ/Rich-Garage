const WebsiteTraffic = require('../models/websiteTraffic');

// Get all website traffic data
exports.getAllWebsiteTraffic = async (req, res) => {
    try {
        const trafficData = await WebsiteTraffic.findAll();
        res.json(trafficData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get website traffic by ID
exports.getWebsiteTrafficById = async (req, res) => {
    try {
        const traffic = await WebsiteTraffic.findByPk(req.params.id);
        if (!traffic) {
            return res.status(404).json({ message: 'Website traffic record not found' });
        }
        res.json(traffic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new website traffic record
exports.createWebsiteTraffic = async (req, res) => {
    try {
        const { Province, Timestamp, page_view_count, car_id, customer_id } = req.body;
        const newTraffic = await WebsiteTraffic.create({ Province, Timestamp, page_view_count, car_id, customer_id });
        res.status(201).json(newTraffic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a website traffic record by ID
exports.updateWebsiteTrafficById = async (req, res) => {
    try {
        const { Province, Timestamp, page_view_count, car_id, customer_id } = req.body;
        const traffic = await WebsiteTraffic.findByPk(req.params.id);
        if (!traffic) {
            return res.status(404).json({ message: 'Website traffic record not found' });
        }
        await traffic.update({ Province, Timestamp, page_view_count, car_id, customer_id });
        res.json(traffic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a website traffic record by ID
exports.deleteWebsiteTrafficById = async (req, res) => {
    try {
        const traffic = await WebsiteTraffic.findByPk(req.params.id);
        if (!traffic) {
            return res.status(404).json({ message: 'Website traffic record not found' });
        }
        await traffic.destroy();
        res.json({ message: 'Website traffic record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
