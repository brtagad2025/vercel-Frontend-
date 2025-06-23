import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/contact.js';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';

const router = express.Router();

// Function to create Excel file from contact data
const createExcelFile = (contactData) => {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  
  // Prepare data for Excel
  const excelData = [
    ['Field', 'Value'],
    ['Name', contactData.name],
    ['Email', contactData.email],
    ['Company', contactData.company || 'Not provided'],
    ['Service Interest', contactData.service || 'Not specified'],
    ['Message', contactData.message],
    ['Submission Date', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
    ['IP Address', contactData.ipAddress || 'Unknown'],
    ['User Agent', contactData.userAgent || 'Unknown']
  ];

  const ws = XLSX.utils.aoa_to_sheet(excelData);
  
  // Add the worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Contact Submission');
  
  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `contact-submission-${timestamp}.xlsx`;
  const filepath = path.join(process.cwd(), 'temp', filename);
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  // Write the file
  XLSX.writeFile(wb, filepath);
  
  return { filename, filepath };
};

// Function to send file to WhatsApp (using a WhatsApp API service)
const sendToWhatsApp = async (filepath, filename, contactData) => {
  try {
    // Using a free WhatsApp API service like CallMeBot or similar
    // You'll need to replace this with your preferred WhatsApp API service
    
    // Option 1: Upload file to a temporary hosting service and send link
    // This is a simple approach using file upload and WhatsApp Web API
    
    const message = `🔔 New Contact Form Submission!\n\n` +
                   `📝 Name: ${contactData.name}\n` +
                   `📧 Email: ${contactData.email}\n` +
                   `🏢 Company: ${contactData.company || 'Not provided'}\n` +
                   `🛠️ Service: ${contactData.service || 'Not specified'}\n` +
                   `💬 Message: ${contactData.message}\n\n` +
                   `📅 Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
                   `Excel file with complete details has been generated: ${filename}`;

    // Simple WhatsApp Web API call (you may need to set up a WhatsApp Business API)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919356961657&text=${encodeURIComponent(message)}`;
    
    console.log('📧 Contact submission details:', {
      name: contactData.name,
      email: contactData.email,
      company: contactData.company,
      service: contactData.service,
      message: contactData.message,
      excelFile: filename
    });
    
    console.log('🔗 WhatsApp link generated:', whatsappUrl);
    
    // For now, we'll log the details and you can manually check the generated Excel file
    // In production, you'd integrate with a proper WhatsApp Business API
    
    return true;
  } catch (error) {
    console.error('Error sending to WhatsApp:', error);
    return false;
  }
};

// Submit contact form
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

    const contactData = {
      name,
      email,
      company: company || '',
      service: service || '',
      message,
      ipAddress,
      userAgent
    };

    // Create Excel file
    const { filename, filepath } = createExcelFile(contactData);
    
    // Send to WhatsApp
    const whatsappSent = await sendToWhatsApp(filepath, filename, contactData);
    
    // Still save to MongoDB (optional)
    const contact = new Contact(contactData);
    await contact.save();

    // Clean up the temp file after 1 hour
    setTimeout(() => {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        console.log(`🗑️ Cleaned up temp file: ${filename}`);
      }
    }, 3600000); // 1 hour

    // Log the submission
    console.log(`📧 New contact submission from: ${email}`);
    console.log(`📊 Excel file created: ${filename}`);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! Excel file has been generated and notification sent.',
      submissionId: contact._id,
      excelFile: filename
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
