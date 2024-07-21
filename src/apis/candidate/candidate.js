const db = require('../../config/db');





async function get_jobs_list(req, res) {
    try {
        const [rows, fields] = await db.query('SELECT j.*, r.company_name  FROM jobs as j  LEFT JOIN recruiters as r on j.recruiter_id = r.user_id');
        // res.json(rows);
        res.status(200).json({ error:false, message: "Data fetched successfully !", joblist:res.json(rows) });
    } catch (error) {
        res.status(500).json({ error:true, message: error.message });
    }
}


async function add_details(req, res) {
    const { user_id, first_name, last_name, experience, dob, domain, linkedin, phone, description, profile, resume_path, current_ctc, expected_ctc, shift, address, preferred_location, notice_period } = req.body.data;
    try {
        // Check if the user already exists in the candidate table
        const [existingUser] = await db.query('SELECT * FROM candidates WHERE user_id = ?', [user_id]);
        
        if (existingUser.length > 0) {
            // Update the user details in the candidate table
            const updateResult = await db.query('UPDATE candidates SET first_name = ?, last_name = ?, experience = ?, dob = ?, domain = ?, linkedin = ?, phone = ?, description = ?, profile = ?, resume_path = ?, current_ctc = ?, expected_ctc = ?, shift = ?, address = ?, preferred_location = ?, notice_period = ? WHERE user_id = ?', [first_name, last_name, experience, dob, domain, linkedin, phone, description, profile, resume_path, current_ctc, expected_ctc, shift, address, preferred_location, notice_period, user_id]);
            return res.status(200).json({ error: false, message: 'User Details updated successfully', userId: user_id });
        } else {
           
           console.log("insert query") // Insert the user details into the candidate table if the user doesn't exist
            const insertResult = await db.query('INSERT INTO candidates (user_id, first_name, last_name, experience, dob, domain, linkedin, phone, description, profile, resume_path, current_ctc, expected_ctc, shift, address, preferred_location, notice_period) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)', [user_id, first_name, last_name, experience, dob, domain, linkedin, phone, description, profile, resume_path, current_ctc, expected_ctc, shift, address, preferred_location, notice_period]);
            console.log(db.query   )
            return res.status(201).json({ error: false, message: 'User Details added successfully', userId: insertResult.insertId });
        }
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }
}





// async function login_user(req, res) {
//     const { email, password } = req.body.data;

//     try {
//         // Check if the user exists
//         const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//         if (existingUser.length === 0) {
//             return res.status(400).json({ error:true, message: 'Invalid email or password' });
//         }

//         const user = existingUser[0];

//         // Compare the provided password with the hashed password in the database
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             return res.status(400).json({ error:true, message: 'Invalid email or password' });
//         }

//         // Fetch menus based on role_id
//         const [menus] = await db.query('SELECT menu FROM menus WHERE role_id = ?', [user.role_id]);
//         if (menus.length === 0) {
//             return res.status(400).json({ error: 'Menu items not found for this role' });
//         }

//         const menu = JSON.parse(menus[0].menu); // Parse the JSON string

//         // Generate and return JWT token
//         const token = jwt.sign({ userId: user.id, role: user.role_id }, jwtSecret, { expiresIn: jwtExpirationTime });

//         res.json({ message: 'Login successful', token, menu });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }



module.exports = {
    add_details
    // register_user,
    // login_user
};
