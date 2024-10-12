const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// กำหนดเส้นทาง
router.post('/', customerController.createCustomer); // สำหรับสร้างลูกค้าใหม่
router.get('/', customerController.getCustomer); // สำหรับดึงข้อมูลลูกค้าทั้งหมด
router.get('/:id', customerController.getCustomerById); // สำหรับดึงข้อมูลลูกค้าตาม ID
router.put('/:id', customerController.updateCustomer); // สำหรับอัปเดตข้อมูลลูกค้าตาม ID
router.delete('/:id', customerController.deleteCustomer); // สำหรับลบลูกค้าตาม ID

// ส่งออก router
module.exports = router;
