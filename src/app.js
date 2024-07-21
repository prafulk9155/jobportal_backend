const express = require('express');
const app = express();
const exampleMiddleware = require('./middleware/middleware');
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Specify your React app's URL

// Use relevant middleware
app.use(exampleMiddleware);

// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes');
const recruiterRouter = require('./routes/recruiter/recruiter');
const candidateRouter = require('./routes/candidate/candidate');
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/recruiter', recruiterRouter);
app.use('/candidate', candidateRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
