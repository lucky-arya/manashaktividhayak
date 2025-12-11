const express = require('express');
const { body, validationResult } = require('express-validator');
const Registration = require('../models/Registration');

const router = express.Router();

// Validation middleware
const registrationValidation = [
  body('teamName')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Team name must be between 3 and 100 characters'),
  
  body('teamLeader')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Team leader name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .matches(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,9}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('teamSize')
    .isInt({ min: 2, max: 5 })
    .withMessage('Team size must be between 2 and 5 members'),
  
  body('problemChoice')
    .isIn(['edu1', 'health1', 'env1', 'social1'])
    .withMessage('Please select a valid problem statement')
];

// @route   POST /api/registrations
// @desc    Create a new registration
// @access  Public
router.post('/', registrationValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    const { teamName, teamLeader, email, phone, teamSize, problemChoice } = req.body;

    // Check if email already exists
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'This email has already been registered for the hackathon'
      });
    }

    // Create new registration
    const registration = new Registration({
      teamName,
      teamLeader,
      email,
      phone,
      teamSize: parseInt(teamSize),
      problemChoice
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful! We will contact you soon with further details.',
      data: {
        id: registration._id,
        teamName: registration.teamName,
        teamLeader: registration.teamLeader,
        email: registration.email,
        problemTitle: registration.problemTitle,
        registrationDate: registration.registrationDate
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @route   GET /api/registrations
// @desc    Get all registrations (for admin purposes)
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const registrations = await Registration.find()
      .sort({ registrationDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Registration.countDocuments();

    res.json({
      success: true,
      data: registrations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations'
    });
  }
});

// @route   GET /api/registrations/:id
// @desc    Get a single registration by ID
// @access  Public (should be protected in production)
router.get('/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).select('-__v');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      data: registration
    });

  } catch (error) {
    console.error('Fetch registration error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching registration'
    });
  }
});

// @route   GET /api/registrations/stats
// @desc    Get registration statistics
// @access  Public (should be protected in production)
router.get('/admin/stats', async (req, res) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    
    const problemStats = await Registration.aggregate([
      {
        $group: {
          _id: '$problemChoice',
          count: { $sum: 1 }
        }
      }
    ]);

    const teamSizeStats = await Registration.aggregate([
      {
        $group: {
          _id: '$teamSize',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        total: totalRegistrations,
        byProblem: problemStats,
        byTeamSize: teamSizeStats
      }
    });

  } catch (error) {
    console.error('Fetch stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;
