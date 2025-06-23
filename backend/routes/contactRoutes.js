import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/contact.js';

const router = express.Router();

// Submit contact form (public route)
router.post('/submit', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),
  body('service')
    .optional()
    .isIn([
      'E-Commerce Development',
      'Mobile App Development', 
      'Business Websites',
      'Digital Marketing',
      'ERP Solutions',
      'Project Management Software',
      'Email Marketing',
      'Salesforce Integration',
      'Other',
      ''
    ])
    .withMessage('Invalid service selection'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation errors', 
        errors: errors.array() 
      });
    }

    const { name, email, company, service, message } = req.body;

    // Get client IP and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create new contact submission
    const contact = new Contact({
      name,
      email,
      company: company || '',
      service: service || '',
      message,
      ipAddress,
      userAgent
    });

    await contact.save();

    // Log the submission
    console.log(`📧 New contact submission from: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! We will get back to you soon.',
      submissionId: contact._id
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit contact form. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all contact submissions (no authentication for now)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      data: contacts
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve contact submissions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
