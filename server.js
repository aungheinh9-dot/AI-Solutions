const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(cors({
    origin: true,
    credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes
app.use('/api', require('./routes/api'));

// Admin routes
app.use('/admin', require('./routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    
    // For API routes, return JSON
    if (req.path.startsWith('/api') || req.path.startsWith('/admin/api')) {
        return res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: err.message || 'Something went wrong!'
        });
    }
    
    // For other routes, return JSON or HTML
    res.status(500).json({ 
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    // For API routes, return JSON 404
    if (req.path.startsWith('/api') || req.path.startsWith('/admin/api')) {
        return res.status(404).json({ 
            success: false,
            error: 'Not found',
            message: 'The requested resource was not found'
        });
    }
    
    // For other routes, return 404 page
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log('');
    console.log('========================================');
    console.log('   ✅ Server is running!');
    console.log('========================================');
    console.log('');
    console.log(`🌐 Website: http://localhost:${PORT}`);
    console.log(`🔐 Admin Login: http://localhost:${PORT}/admin/login`);
    console.log('');
    console.log('📝 Admin Credentials:');
    console.log('   Email: admin2025@gmail.com');
    console.log('   Password: admin2025');
    console.log('');
    console.log('⚠️  Press Ctrl+C to stop the server');
    console.log('');
    console.log('========================================');
    console.log('');
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('');
        console.error('❌ ERROR: Port', PORT, 'is already in use!');
        console.error('');
        console.error('Solutions:');
        console.error('1. Close the other application using port', PORT);
        console.error('2. Or change PORT in .env file');
        console.error('');
        process.exit(1);
    } else {
        console.error('');
        console.error('❌ ERROR: Failed to start server');
        console.error(err);
        console.error('');
        process.exit(1);
    }
});

