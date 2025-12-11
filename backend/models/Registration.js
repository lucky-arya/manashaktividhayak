const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true,
    minlength: [3, 'Team name must be at least 3 characters long'],
    maxlength: [100, 'Team name cannot exceed 100 characters']
  },
  teamLeader: {
    type: String,
    required: [true, 'Team leader name is required'],
    trim: true,
    minlength: [2, 'Team leader name must be at least 2 characters long'],
    maxlength: [100, 'Team leader name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,5}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,9}$/,
      'Please provide a valid phone number'
    ]
  },
  teamSize: {
    type: Number,
    required: [true, 'Team size is required'],
    min: [1, 'Team must have at least 1 member'],
    max: [5, 'Team cannot exceed 5 members']
  },
  problemChoice: {
    type: String,
    required: [true, 'Problem statement selection is required'],
    enum: {
      values: ['ps1', 'ps2', 'ps3', 'ps4', 'ps5', 'ps6', 'ps7'],
      message: '{VALUE} is not a valid problem statement'
    }
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
registrationSchema.index({ email: 1 }, { unique: true });
registrationSchema.index({ registrationDate: -1 });

// Virtual for problem statement title
registrationSchema.virtual('problemTitle').get(function() {
  const problemMap = {
    'ps1': 'Website UI/UX - The "Clutter" Problem',
    'ps2': 'Manatarang App UI/UX - The "Ease" Problem',
    'ps3': 'Magazine Subscription - The "Conversion" Problem',
    'ps4': 'Suggested Methods - The "Impact Tracking" Problem',
    'ps5': 'Manashakti Wisdom - The "Discovery" Problem',
    'ps6': 'Seeding Success - The "Retention" Problem',
    'ps7': 'Mind Gym - The "Engagement" Problem'
  };
  return problemMap[this.problemChoice] || 'Unknown';
});

// Include virtuals in JSON output
registrationSchema.set('toJSON', { virtuals: true });
registrationSchema.set('toObject', { virtuals: true });

// Pre-save middleware to prevent duplicate email registrations
registrationSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }
  
  const existingRegistration = await this.constructor.findOne({ 
    email: this.email 
  });
  
  if (existingRegistration) {
    const error = new Error('This email has already been registered');
    error.statusCode = 400;
    return next(error);
  }
  
  next();
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
