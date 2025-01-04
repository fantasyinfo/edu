import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const config = {
  service: "gmail",
  host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT, 10),
  //   secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_EMAIL_USER,
    pass: process.env.SMTP_EMAIL_PASS,
  },
};

export const transporter = nodemailer.createTransport(config);

export const newUserStudentRegisterEmailWithLoginDetails = (
  name,
  email,
  password,
  date
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User/Student Registration</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0F172A;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            background-color: #f4f4f4;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New User/Student Registration</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>you have successfully register with us, below is your login details, please login.</p>
            <p><strong>User Details:</strong></p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Password:</strong> ${password}</li>
                <li><strong>Registration Date:</strong> ${date}</li>
            </ul>
            <p>Best regards,</p>
            <p>${process.env.SMTP_COMPANY}</p>
        </div>
        <div class="footer">
            &copy; 2024 ${process.env.SMTP_COMPANY}. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

export const newUserStudentPasswordEmailWithLoginDetails = (
  name,
  email,
  password,
  date
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New User/Student Password</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #0F172A;
              color: #ffffff;
              padding: 10px 0;
              text-align: center;
          }
          .header h1 {
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .content p {
              font-size: 16px;
              line-height: 1.5;
          }
          .footer {
              text-align: center;
              padding: 10px 0;
              background-color: #f4f4f4;
              font-size: 12px;
              color: #666666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>New User/Student Password</h1>
          </div>
          <div class="content">
              <p>Dear ${name},</p>
              <p>you have successfully reset your password with us, below is your new login details, please login.</p>
              <p><strong>User Details:</strong></p>
              <ul>
                  <li><strong>Name:</strong> ${name}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>New Password:</strong> ${password}</li>
                  <li><strong>Registration Date:</strong> ${date}</li>
              </ul>
              <p>Best regards,</p>
              <p>${process.env.SMTP_COMPANY}</p>
          </div>
          <div class="footer">
              &copy; 2024 ${process.env.SMTP_COMPANY}. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;

export const newUserFacultyRegisterEmailWithLoginDetails = (
  name,
  email,
  password,
  date
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Faculty Registration</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #0F172A;
              color: #ffffff;
              padding: 10px 0;
              text-align: center;
          }
          .header h1 {
              margin: 0;
          }
          .content {
              padding: 20px;
          }
          .content p {
              font-size: 16px;
              line-height: 1.5;
          }
          .footer {
              text-align: center;
              padding: 10px 0;
              background-color: #f4f4f4;
              font-size: 12px;
              color: #666666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>New Faculty Registration</h1>
          </div>
          <div class="content">
              <p>Dear ${name},</p>
              <p>you have successfully registered with us, below is your login details, please login.</p>
              <p><strong>User Details:</strong></p>
              <ul>
                  <li><strong>Name:</strong> ${name}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Password:</strong> ${password}</li>
                  <li><strong>Registration Date:</strong> ${date}</li>
              </ul>
              <p>Best regards,</p>
              <p>${process.env.SMTP_COMPANY}</p>
          </div>
          <div class="footer">
              &copy; 2024 ${process.env.SMTP_COMPANY}. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;

export const notificationEmail = (message) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #0F172A;
                color: #ffffff;
                padding: 10px 0;
                text-align: center;
            }
            .header h1 {
                margin: 0;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <p>${message}</p>
                <p>Best regards,</p>
                <p>${process.env.SMTP_COMPANY}</p>
            </div>
            <div class="footer">
                &copy; 2024 ${process.env.SMTP_COMPANY}. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
const day = String(currentDate.getDate()).padStart(2, "0");
const hours = String(currentDate.getHours()).padStart(2, "0");
const minutes = String(currentDate.getMinutes()).padStart(2, "0");
const seconds = String(currentDate.getSeconds()).padStart(2, "0");

export const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
