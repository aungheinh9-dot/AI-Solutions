const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Contact form submission
router.post('/contact', async (req, res) => {
    try {
        const { name, email, company, phone, country, jobTitle, jobDetails } = req.body;
        
        // Validate required fields
        if (!name || !email || !jobDetails) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'Name, email, and job details are required'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Invalid email format',
                message: 'Please provide a valid email address'
            });
        }
        
        // Create inquiry object
        const inquiry = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            company: company ? company.trim() : '',
            phone: phone ? phone.trim() : '',
            country: country ? country.trim() : '',
            jobTitle: jobTitle ? jobTitle.trim() : '',
            jobDetails: jobDetails.trim(),
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Save to Firebase
        const docRef = await db.collection('inquiries').add(inquiry);
        
        // Log the submission
        console.log('New inquiry submitted:', {
            id: docRef.id,
            name: inquiry.name,
            email: inquiry.email,
            company: inquiry.company
        });
        
        res.status(201).json({ 
            success: true,
            message: 'Inquiry submitted successfully',
            inquiryId: docRef.id
        });
        
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Failed to submit inquiry. Please try again later.'
        });
    }
});

// Get all inquiries (for admin panel)
router.get('/inquiries', async (req, res) => {
    try {
        const snapshot = await db.collection('inquiries')
            .orderBy('createdAt', 'desc')
            .get();
        
        const inquiries = [];
        snapshot.forEach(doc => {
            inquiries.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        res.json({ inquiries });
        
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Failed to fetch inquiries'
        });
    }
});

// Update inquiry status
router.put('/inquiries/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!status || !['new', 'contacted', 'in-progress', 'completed', 'closed'].includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status',
                message: 'Status must be one of: new, contacted, in-progress, completed, closed'
            });
        }
        
        await db.collection('inquiries').doc(id).update({
            status,
            updatedAt: new Date().toISOString()
        });
        
        res.json({ 
            success: true,
            message: 'Inquiry status updated successfully'
        });
        
    } catch (error) {
        console.error('Error updating inquiry status:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Failed to update inquiry status'
        });
    }
});

// Delete inquiry
router.delete('/inquiries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        await db.collection('inquiries').doc(id).delete();
        
        res.json({ 
            success: true,
            message: 'Inquiry deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Failed to delete inquiry'
        });
    }
});

// Get inquiry statistics
router.get('/stats', async (req, res) => {
    try {
        const snapshot = await db.collection('inquiries').get();
        
        const stats = {
            total: snapshot.size,
            new: 0,
            contacted: 0,
            inProgress: 0,
            completed: 0,
            closed: 0
        };
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const status = data.status || 'new';
            stats[status] = (stats[status] || 0) + 1;
        });
        
        res.json({ stats });
        
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Failed to fetch statistics'
        });
    }
});

module.exports = router;
