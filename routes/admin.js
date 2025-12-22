const express = require('express');
const router = express.Router();
const path = require('path');

// Admin login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'login.html'));
});

// Admin API routes
router.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Admin credentials
        const adminEmail = 'admin2025@gmail.com';
        const adminPassword = 'admin2025';
        
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        
        // Check credentials
        if (email.trim() === adminEmail && password.trim() === adminPassword) {
            // Successful login
            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    email: adminEmail
                }
            });
        } else {
            // Failed login
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Token verification (for checking if user is logged in)
router.get('/api/verify', (req, res) => {
    // Simple verification - in production, use JWT tokens
    res.json({
        success: true,
        message: 'Token verified'
    });
});

module.exports = router;

