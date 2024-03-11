const nodemailer = require('nodemailer');

const sendmailForAdmin = (from_email, to_email, tutorDetails) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "akmishra6614@gmail.com",
            pass: "xacx qzsn yrqv oahd"
        }
    });
    const emailContent = createEmailContentForAdmin(tutorDetails);
    // Compose the email
    const mailoptions = {
        from: from_email,
        to: to_email,
        subject: 'Tutor Details Review',
        html: emailContent
    };

    // Send the email
    transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            return console.error('Error:', error);
        }
        console.log('Email sent:', info.response);
    });

    // Close the transporter when done (optional)
    transporter.close();

};

const sendmailForTutor = (from_email, to_email, tutorDetails) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "akmishra6614@gmail.com",
            pass: "xacx qzsn yrqv oahd"
        }
    });
    const emailContent = createEmailContentForTutor(tutorDetails);
    // Compose the email
    const mailoptions = {
        from: from_email,
        to: to_email,
        subject: 'Tutor Details Review',
        html: emailContent
    };

    // Send the email
    transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            return console.error('Error:', error);
        }
        console.log('Email sent:', info.response);
    });

    // Close the transporter when done (optional)
    transporter.close();

};

const  createEmailContentForAdmin = (details) => {
    const htmlString = `
      <html>
        <head>
          <style>
            /* Add some basic styling if needed */
            body {
              font-family: Arial, sans-serif;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <p>Hi Admin\n Please find below Tutor Details. \nKindly review and check:</p>
          <table>
            <tr>
              <th>Fields</th>
              <th>Data</th>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>${details.fullName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${details.email}</td>
            </tr>
            <tr>
              <td>Subject</td>
              <td>${details.subject}</td>
            </tr>
            <tr>
              <td>Experience</td>
              <td>${details.experience}</td>
            </tr>
            <tr>
              <td>Qualification</td>
              <td>${details.qualification}</td>
            </tr>
            <tr>
              <td>Availability</td>
              <td>${details.availability}</td>
            </tr>
          </table>

          <p>Thanks & Regards</p>
          <p>Pursuit System</p>
        </body>
      </html>
    `;

    return htmlString;
}

const  createEmailContentForTutor = (details) => {
    const htmlString = `
      <html>
        <head>
          <style>
            /* Add some basic styling if needed */
            body {
              font-family: Arial, sans-serif;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <p>Hi Tutor, Your Account has been Approved</p>
          <p>  Please find your below login details</p>
          <table>
            <tr>
              <th>Fields</th>
              <th>Data</th>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>${details.fullName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${details.email}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>${details.password}</td>
            </tr>
          </table>
          <p>Thanks & Regards</p>
          <p>Pursuit System</p>
          
        </body>
      </html>
    `;

    return htmlString;
}

module.exports = {
    sendmailForAdmin,
    sendmailForTutor
};

