const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post(
  "/signup",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name is required")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Signup Success</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <div class="success-message">
            Signup successful!<br>
            Name: ${name}<br>
            Email: ${email}<br>
            Password: ${password}
          </div>
        </body>
        </html>
      `);
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});