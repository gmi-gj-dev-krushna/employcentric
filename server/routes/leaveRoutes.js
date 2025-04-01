
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { leaveValidation } = require('../utils/validation');
const validate = require('../middlewares/validator');
const { isAuthenticated, hasRole } = require('../middlewares/auth');

// Get all leaves
router.get('/', isAuthenticated, leaveController.getAllLeaves);

// Create new leave request
router.post('/', isAuthenticated, validate(leaveValidation), leaveController.createLeave);

// Approve leave request
router.put('/:id/approve', isAuthenticated, hasRole(['admin', 'hr']), leaveController.approveLeave);

// Reject leave request
router.put('/:id/reject', isAuthenticated, hasRole(['admin', 'hr']), leaveController.rejectLeave);

module.exports = router;
