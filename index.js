const express = require('express');
const app = express();
app.use(express.json());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "saranyagudluri_02052004";
    const email = "saranyagudluri254@gmail.com";
    const roll_number = "21bce9138";

    const numbers = [];
    const alphabets = [];
    let highestLowercase = "";

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercase) {
                highestLowercase = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
