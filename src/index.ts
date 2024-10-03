// server.js
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import svgCaptcha from "svg-captcha";

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware for session handling
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in production
  })
);

// // Route to generate CAPTCHA
// app.get('/captcha', (req, res) => {
//   const captcha = svgCaptcha.create({size:6, noise:4});
//   req.session.captcha = captcha.text; // Store CAPTCHA text in session
//   res.type('svg');
//   res.status(200).send(captcha.data); // Send CAPTCHA image as SVG
// });

// // Route to verify CAPTCHA
// app.post('/verify-captcha', (req, res) => {
//   const { captcha } = req.body;
//   if (captcha === req.session.captcha) {
//     res.send('CAPTCHA verification successful!');
//   } else {
//     res.send('CAPTCHA verification failed!');
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
