const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const PORT = 3000;

// MySQL Connection Setup
const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process if the connection fails
    }
    console.log('MySQL Connected...');
});

// Middleware
app.use(express.json());

// Multer Setup for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Routes

// 1. Root Route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// 2. Upload Image Route
app.post('/uploadImage', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).send({ message: 'Multer error occurred while uploading file.' });
        } else if (err) {
            return res.status(500).send({ message: 'An unknown error occurred while uploading file.' });
        }
        res.status(200).send({ message: 'File uploaded successfully' });
    });
});

// 3. Save Information Route
app.post('/saveInfo', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';

    db.query(query, [name, email, age], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ message: 'Failed to save user information' });
        }
        res.status(200).send({ message: 'User information saved successfully' });
    });
});

// 4. Send Email Route
app.post('/sendEmail', async (req, res) => {
    const { recipient_email, OTP } = req.body;

    if (!recipient_email || !OTP) {
        return res.status(400).send({ message: 'Recipient email and OTP are required' });
    }

    try {
        await sendEmail({ recipient_email, OTP });
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error in /sendEmail route:', error);
        res.status(500).send({ message: 'Failed to send email' });
    }
});

// 5. Get User Information Route
app.get('/userInfo', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ message: 'Failed to fetch user information' });
        }
        if (result.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).json(result[0]);
    });
});

// Function to Send Email
function sendEmail({ recipient_email, OTP }) {
    return new Promise((resolve, reject) => {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MY_EMAIL,
                    pass: process.env.MY_PASSWORD,
                },
            });

            const mail_configs = {
                from: process.env.MY_EMAIL,
                to: recipient_email,
                subject: 'Your OTP Code',
                text: `Your OTP code is: ${OTP}`,
            };

            transporter.sendMail(mail_configs, function (error, info) {
                if (error) {
                    console.error('Error sending email:', error);
                    return reject({ message: 'Failed to send email' });
                }
                return resolve({ message: 'Email sent successfully' });
            });
        } catch (error) {
            console.error('Unexpected error in sendEmail:', error);
            return reject({ message: 'Unexpected error occurred' });
        }
    });
}

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong! Please try again later.',
    });
});

// Uncaught Exceptions and Unhandled Rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('HTTP server closed.');
        db.end(() => {
            console.log('Database connection closed.');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    server.close(() => {
        console.log('HTTP server closed.');
        db.end(() => {
            console.log('Database connection closed.');
            process.exit(0);
        });
    });
});

// Start Server with Error Handling
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});
