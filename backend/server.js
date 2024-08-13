const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const nodemailer = require('nodemailer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// SSL certificate
const caCert = fs.readFileSync('./ca.pem');

// MySQL connection
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true
  }
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('MySQL Connected...');
});



function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
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
      subject: 'PASSWORD RECOVERY',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>OTP Email Template</title>
        </head>
        <body>
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Siddha Viddhai</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
            <p style="font-size:0.9em;">Regards,<br />Siddha Viddhai</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Siddha Viddhai</p>
              <p>CSE C</p>
              <p>KIOT</p>
            </div>
          </div>
        </div>
        </body>
        </html>`,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        return reject({ message: 'An error has occurred' });
      }
      return resolve({ message: 'Email sent successfully' });
    });
  });
}

app.post('/send_recovery_email', async (req, res) => {
  const { recipient_email, OTP } = req.body;

  try {
    // Check if user exists in the MySQL database
    const checkUserQuery = 'SELECT * FROM login WHERE email = ?';
    db.query(checkUserQuery, [recipient_email], (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ message: 'Internal server error', success: false });
      }

      if (results.length === 0) {
        return res.json({ message: 'User not found', success: false });
      }

      // Send the recovery email if the user exists
      sendEmail({ recipient_email, OTP })
        .then((response) => res.json({ message: response.message, success: true }))
        .catch((error) => res.status(500).json({ message: error.message, success: false }));
    });
  } catch (err) {
    console.error('Error in /send_recovery_email:', err);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});


app.post("/reset-password", async (req, res) => {
  const { Email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the MySQL database
    const updatePasswordQuery = 'UPDATE login SET password = ? WHERE email = ?';
    db.query(updatePasswordQuery, [hashedPassword, Email], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: "Password reset successfully" });
    });
  } catch (error) {
    console.error('Error in /reset-password:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});




// Delete file utility function
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully');
    }
  });
};

// Routes
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM login WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.length > 0) {
        return res.status(400).send('User already exists');
      }

      const generateUserId = async () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetters = letters.charAt(Math.floor(Math.random() * letters.length)) + letters.charAt(Math.floor(Math.random() * letters.length));
        const randomNumbers = Math.floor(100 + Math.random() * 900); 
        const userId = randomLetters + randomNumbers;

        const checkIdQuery = 'SELECT * FROM login WHERE User_id = ?';
        return new Promise((resolve, reject) => {
          db.query(checkIdQuery, [userId], (err, results) => {
            if (err) {
              return reject(err);
            }
            if (results.length > 0) {
              resolve(generateUserId()); 
            } else {
              resolve(userId);
            }
          });
        });
      };

      const userId = await generateUserId();
      console.log('Generated User ID:', userId);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds for better security
      console.log('Hashed Password:', hashedPassword);
      console.log(name);
      // Insert new user into the login table
      const insertLoginQuery = 'INSERT INTO login (User_id, name, email, password) VALUES (?, ?, ?, ?)';
      db.query(insertLoginQuery, [userId, name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting data into login table:', err);
          return res.status(500).send('Internal Server Error');
        }

        // Insert into profile_details table
        const insertProfileDetailsQuery = 'INSERT INTO profile_details (User_id, name) VALUES (?, ?)';
        db.query(insertProfileDetailsQuery, [userId, name], (err, result) => {
          if (err) {
            console.error('Error inserting profile details:', err);
            return res.status(500).send('Internal Server Error');
          }

          // Insert into career_details table
          const insertCareerDetailsQuery = 'INSERT INTO career_details (User_id) VALUES (?)';
          db.query(insertCareerDetailsQuery, [userId], (err, result) => {
            if (err) {
              console.error('Error inserting career details:', err);
              return res.status(500).send('Internal Server Error');
            }

            // Insert into lifestyle_family table
            const insertLifestyleFamilyQuery = 'INSERT INTO lifestyle_family (User_id, status) VALUES (?, ?)';
            db.query(insertLifestyleFamilyQuery, [userId, 'inactive'], (err, result) => {
              if (err) {
                console.error('Error inserting lifestyle family details:', err);
                return res.status(500).send('Internal Server Error');
              }
              
              // Insert into payment table
            const insertLifestyleFamilyQuery = 'INSERT INTO payment (User_id) VALUES (?)';
            db.query(insertLifestyleFamilyQuery, [userId], (err, result) => {
              if (err) {
                console.error('Error inserting lifestyle family details:', err);
                return res.status(500).send('Internal Server Error');
              }
              res.send('Signup successful');
            });
          });
        });
      });
    });
  });
  } catch (error) {
    console.error('Error processing signup:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(password);

  try {
    const query = `
      SELECT 
        u.User_id, u.email, u.password, 
        pd.name, pd.mother_tongue, pd.marital_status, pd.dob, pd.gender,
        cd.highest_degree, cd.employed_in, cd.annual_income, cd.express_yourself,
        lf.family_type, lf.father_occupation, lf.mother_occupation, lf.brother, lf.sister, 
        lf.family_living_location, lf.contact_address, lf.about_family, lf.status
      FROM 
        login u
        INNER JOIN profile_details pd ON u.User_id = pd.User_id
        INNER JOIN career_details cd ON u.User_id = cd.User_id
        INNER JOIN lifestyle_family lf ON u.User_id = lf.User_id
      WHERE 
        u.email = ?
    `;

    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ msg: 'Server error' });
      }

      console.log(results);

      if (results.length === 0) {
        return res.status(400).json({ msg: 'User doesn\'t exist' });
      }

      const user = results[0];
      if (!user.password) {
        return res.status(400).json({ msg: 'Incorrect Password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect Password' });
      }

      delete user.password;
      res.json(user);
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/getDetails', (req, res) => {
  const status = 'admin';
  console.log(status);
  try {
    const query = `
      SELECT 
        u.User_id, u.email, u.password, 
        pd.name, pd.mother_tongue, pd.marital_status, pd.dob, pd.gender,
        cd.highest_degree, cd.employed_in, cd.annual_income, cd.express_yourself,
        lf.family_type, lf.father_occupation, lf.mother_occupation, lf.brother, lf.sister, 
        lf.family_living_location, lf.contact_address, lf.about_family, lf.status,
        py.transaction_id
      FROM 
        login u
        INNER JOIN profile_details pd ON u.User_id = pd.User_id
        INNER JOIN career_details cd ON u.User_id = cd.User_id
        INNER JOIN lifestyle_family lf ON u.User_id = lf.User_id
        INNER JOIN payment py ON u.User_id  = py.User_id
      WHERE 
        lf.status != ?
    `;

    db.query(query, [status], (err, results) => {
      if (err) {
        console.error('Error during searching:', err);
        return res.status(500).json({ msg: 'Server error' });
      }

      console.log(results);

      if (results.length === 0) {
        return res.status(400).json({ msg: 'No Records Found.' });
      }
    
      res.json(results); // Send results instead of a non-existent user variable
    });
  } catch (err) {
    console.error('Error during searching:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/getDetails1', (req, res) => {
  const {User_id} = req.body;
  console.log(User_id)
  try {
    const query = `
      SELECT 
        u.User_id, u.email, u.password, 
        pd.name, pd.mother_tongue, pd.marital_status, pd.dob,  pd.gender,
        cd.highest_degree, cd.employed_in, cd.annual_income, cd.express_yourself,
        lf.family_type, lf.father_occupation, lf.mother_occupation, lf.brother, lf.sister, 
        lf.family_living_location, lf.contact_address, lf.about_family, lf.status,
        py.transaction_id
      FROM 
        login u
        INNER JOIN profile_details pd ON u.User_id = pd.User_id
        INNER JOIN career_details cd ON u.User_id = cd.User_id
        INNER JOIN lifestyle_family lf ON u.User_id = lf.User_id
        INNER JOIN payment py ON u.User_id  = py.User_id
      WHERE 
        u.User_id = ?
    `;

    db.query(query, [User_id], (err, results) => {
      if (err) {
        console.error('Error during searching:', err);
        return res.status(500).json({ msg: 'Server error' });
      }

      console.log(results);

      if (results.length === 0) {
        return res.status(400).json({ msg: 'No Records Found.' });
      }
    
      res.json(results); // Send results instead of a non-existent user variable
    });
  } catch (err) {
    console.error('Error during searching:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


app.post('/updateProfileDetails', async (req, res) => {
  const { User_id, name, mother_tongue, marital_status, dob, gender } = req.body;
  console.log(User_id);
  try {
    const updateProfileQuery = `
      UPDATE profile_details
      SET 
        name = ?, 
        mother_tongue = ?, 
        marital_status = ?, 
        dob = ?, 
        gender = ?
      WHERE User_id = ?
    `;

    db.query(updateProfileQuery, [name, mother_tongue, marital_status, dob, gender, User_id], (err, result) => {
      if (err) {
        console.error('Error updating profile details:', err);
        return res.status(500).send('Internal Server Error');
      }
      const query = `
      SELECT 
        u.User_id, u.email, u.password, 
        pd.name, pd.mother_tongue, pd.marital_status, pd.dob, pd.gender,
        cd.highest_degree, cd.employed_in, cd.annual_income, cd.express_yourself,
        lf.family_type, lf.father_occupation, lf.mother_occupation, lf.brother, lf.sister, 
        lf.family_living_location, lf.contact_address, lf.about_family, lf.status
      FROM 
        login u
        INNER JOIN profile_details pd ON u.User_id = pd.User_id
        INNER JOIN career_details cd ON u.User_id = cd.User_id
        INNER JOIN lifestyle_family lf ON u.User_id = lf.User_id
      WHERE 
        u.User_id = ?
    `;

    db.query(query, [User_id], async (err, results) => {
      if (err) {
        console.error('Error during fetching:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      console.log(results[0]);
      res.status(200).send({ message: 'Profile details updated successfully' ,updatedDetails: results[0]});
    });
    });
  } catch (error) {
    console.error('Error processing profile details update:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/updateCareerDetails', async (req, res) => {
  const { User_id, highest_degree, employed_in, annual_income, express_yourself } = req.body;
  console.log(User_id);
  try {
    const updateCareerQuery = `
      UPDATE career_details
      SET 
        highest_degree = ?, 
        employed_in = ?, 
        annual_income = ?, 
        express_yourself = ?
      WHERE User_id = ?
    `;

    db.query(updateCareerQuery, [highest_degree, employed_in, annual_income, express_yourself, User_id], (err, result) => {
      if (err) {
        console.error('Error updating career details:', err);
        return res.status(500).send('Internal Server Error');
      }
      const query = `
      SELECT 
        u.User_id, u.email, u.password, 
        pd.name, pd.mother_tongue, pd.marital_status, pd.dob, pd.gender,
        cd.highest_degree, cd.employed_in, cd.annual_income, cd.express_yourself,
        lf.family_type, lf.father_occupation, lf.mother_occupation, lf.brother, lf.sister, 
        lf.family_living_location, lf.contact_address, lf.about_family, lf.status
      FROM 
        login u
        INNER JOIN profile_details pd ON u.User_id = pd.User_id
        INNER JOIN career_details cd ON u.User_id = cd.User_id
        INNER JOIN lifestyle_family lf ON u.User_id = lf.User_id
      WHERE 
        u.User_id = ?
    `;

    db.query(query, [User_id], async (err, results) => {
      if (err) {
        console.error('Error during fetching:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      
      res.status(200).send({ message: 'Career details updated successfully' ,updatedDetails: results[0]});
    });
    });
  } catch (error) {
    console.error('Error processing career details update:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/updateFamilyDetails', async (req, res) => {
  const { User_id, family_type, father_occupation, mother_occupation, brother, sister, family_living_location, contact_address, about_family, status } = req.body;
  console.log(User_id);
  try {
    const updateFamilyQuery = `
      UPDATE lifestyle_family
      SET 
        family_type = ?, 
        father_occupation = ?, 
        mother_occupation = ?, 
        brother = ?, 
        sister = ?, 
        family_living_location = ?, 
        contact_address = ?, 
        about_family = ?,
        status = ?
      WHERE User_id = ?
    `;

    db.query(updateFamilyQuery, [family_type, father_occupation, mother_occupation, brother, sister, family_living_location, contact_address, about_family, status, User_id], (err, result) => {
      if (err) {
        console.error('Error updating family details:', err);
        return res.status(500).send('Internal Server Error');
      }
      const query = `
      SELECT 
        u.User_id, u.email, u.password, 
        pd.name, pd.mother_tongue, pd.marital_status, pd.dob, pd.gender,
        cd.highest_degree, cd.employed_in, cd.annual_income, cd.express_yourself,
        lf.family_type, lf.father_occupation, lf.mother_occupation, lf.brother, lf.sister, 
        lf.family_living_location, lf.contact_address, lf.about_family, lf.status
      FROM 
        login u
        INNER JOIN profile_details pd ON u.User_id = pd.User_id
        INNER JOIN career_details cd ON u.User_id = cd.User_id
        INNER JOIN lifestyle_family lf ON u.User_id = lf.User_id
      WHERE 
        u.User_id = ?
    `;

    db.query(query, [User_id], async (err, results) => {
      if (err) {
        console.error('Error during fetching:', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      
      res.status(200).send({ message: 'Details updated successfully' ,updatedDetails: results[0]});
    });
    });
  } catch (error) {
    console.error('Error processing family details update:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/activateUser/:User_id', (req, res) => {
  const { User_id } = req.params;

  // SQL query to update the status field to 'active'
  const updateStatusQuery = 'UPDATE lifestyle_family SET status = ? WHERE User_id = ?';

  db.query(updateStatusQuery, ['active', User_id], (err, result) => {
    if (err) {
      console.error('Error activating user account:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.affectedRows > 0) {
      res.status(200).send({ message: 'User account activated successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

app.post('/deactivateUser/:User_id', (req, res) => {
  const { User_id } = req.params;

  // SQL query to update the status field to 'active'
  const updateStatusQuery = 'UPDATE lifestyle_family SET status = ? WHERE User_id = ?';

  db.query(updateStatusQuery, ['inactive', User_id], (err, result) => {
    if (err) {
      console.error('Error deactivating user account:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.affectedRows > 0) {
      res.status(200).send({ message: 'User account deactivated successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
