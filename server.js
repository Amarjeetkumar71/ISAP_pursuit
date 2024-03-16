const express = require("express"); //express package initiated
const app = express(); // express instance has been created and will be access by app variable
const path = require('path');
const userRouter = require("./api/users/user.router");   // to use router module
const courseRouter = require("./api/course/course.route");
const multer = require('multer');
const mongoose = require('mongoose');
const crypto = require('crypto');
const connectDB = require('./config/mongo');
const mailer = require('./mail');

app.set("view engine", "ejs");   //ejs template for sending data from backend to frontend
app.set('views', path.join(__dirname, 'views'));  // saying where our view folder is
//app.set('views',  'views');
var bodyParser = require("body-parser");      // used for getting data from frontend
app.use(bodyParser.urlencoded({ extended: true }));     // say to get url link data
app.use(bodyParser.json());            //say to get json data from frontend
app.use(express.json());

const connection = require("./config/db");       // need to acces db.js file
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');

connectDB();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const courseSchema = new mongoose.Schema({
  course: Object,
  modules: Object,
  quiz: Object,
  tutor_email: String,
});

const Course = mongoose.model('Course', courseSchema);

const hashPassword = (password) => {
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return hash;
};

const secretKey = 'your-secret-key';
app.use(express.static(path.join(__dirname, 'public')));    //builtin middleware to allow to use all file in public
 app.use(express.static(path.join(__dirname, 'views')));    //builtin middleware to allow to use all file in public


app.use(express.json());
app.use(cookie());

// Middleware function for authentication
function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Login route to generate JWT
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    let hashPwd = hashPassword(password);
    // Check the user credentials against the MySQL database
    const query = 'SELECT * FROM users WHERE email = $1';

    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      console.log(err);
      results = results.rows;
      // Check if a user with the provided credentials exists
      if (results.length === 0 || results[0].password !== hashPwd) {
        //return res.status(401).json({ message: 'Invalid credentials' });
        res.render("invalid_id.ejs");
      }
      // User authentication successful, generate JWT token
      else {
        const user = results[0];
        //console.log(user);
        let user_name = (user.firstname);

        // Render the course.ejs template and pass user information
        res.render('course_2', { user_name });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/tutor_course', (req, res) => {
  try {
    const { email } = req.query;
    const query = 'SELECT * FROM tutor_approved_list WHERE email = $1';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      results = results.rows;
      let user_name = (results[0].firstname);
      res.render('course_22', { user_name, email });
    });
  } catch (err) {
    console.log(err);
  }
});


app.get('/logout', (req, res) => {
  //res.json({ message: 'Logout successful' });
  res.render("index");
});

app.get('/betutor', (req, res) => {
  //res.json({ message: 'Logout successful' });
  res.render("tutor");
});

app.get('/enroll', (req, res) => {
  //res.json({ message: 'Logout successful' });
  res.render("course101");
});

app.get('/admin_login', (req, res) => {
  //res.json({ message: 'Logout successful' });
  res.render("admin_login");
});

app.get("/", (req, res) => {
  console.log("Home page entered");
  
  res.sendFile(path.join(__dirname, "index.html"));

});
// to refer on sign page
app.get('/sign', (req, res) => {
  res.render('sign');
});

app.get('/course', (req, res) => {
  res.render('course.ejs');
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

app.get('/reset', (req, res) => {
  res.render('reset.ejs');
});

app.get("/admin", (req, res) => {
  res.redirect("/admin.html");
});

app.post('/contact', (req, res) => {
  mailer.sendmailForContactUs('akmishra6614@gmail.com', 'amarjeet_k@pursuitsoftware.biz', req.body);
  res.render('contact_response');
});

app.post("/upload-course", (req, res) => {
  res.render("upload_msg");
});

app.get("/register", (req, res) => {
  res.redirect("/register.html");
});
app.get('/redirect', (req, res) => {
  console.log(" button click register");
  res.render("register.ejs");
});

app.post('/submit_quiz', (req, res) => {
  const userAnswers = req.body;

  // Define the correct answers and corresponding marks
  /*const correctAnswers = {
    q1: 'b',
    q2: 'c',
    q3: 'c',
    q4: 'c',
    q5: 'c',
    q6: 'b',
    q7: 'c',
    q8: 'b',
    q9: 'c',
    q10: 'c',
  };

  let totalMarks = 0;

  // Check user answers and calculate marks
  for (const question in correctAnswers) {
    if (userAnswers.hasOwnProperty(question) && userAnswers[question] === correctAnswers[question]) {
      totalMarks += 10; // Each correct answer is worth 10 marks
    }
  }

  // Redirect based on total marks
  if (totalMarks > 50) {
    //res.redirect('/pass'); // Redirect to a pass page
    res.render('pass', { marks: totalMarks });
  } else {
    //res.redirect('/fail'); // Redirect to a fail page
    res.render('fail', { marks: totalMarks });
  }
  */

});

app.post("/create", (req, res) => {
  try {
    console.log(req.body);
  }
  catch (err) {
    console.log(err);
  }
});
var user_name = "";
app.get("/data", (req, res) => {
  const allData = "select * from users";
  var my_name = "Ranjeet"
  connection.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      // res.json({ rows });
      res.render("read.ejs", { user_name });    //render use to send the data in html
    }
  });
});
app.post("/register_user_data", (req, res) => {
  console.log(req.body);
  var f_name = req.body.firstname;
  var l_name = req.body.lastname;
  var email = req.body.email;
  var pass = req.body.password;
  const hashPwd = hashPassword(pass);
  user_name = f_name + " " + l_name;
  try {

    connection.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      (error, results) => {
        results = results.rows;
        if (error) {
          console.error('Error querying MySQL:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        } if (results.length > 0) {
          // Email is already in use
          res.render("email_already_exist.ejs");
        } else {
          connection.query(
            "INSERT into users (firstname,lastname,email,password) values($1,$2,$3,$4)",
            [f_name, l_name, email, hashPwd],
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                // res.json({ result });
                res.redirect("/data");
              }
            }
          );
        }
      })
  } catch (err) {
    res.send(err);
  }
});

app.post('/course_upload', upload.single('courseFile'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const jsonData = JSON.parse(fileBuffer.toString());

    const { course, modules, quiz  } = jsonData;

    const newCourse = new Course({
      course,
      modules,
      quiz,
      tutor_email: req.query.email
    });

    await newCourse.save();

    console.log('Course data inserted successfully');
    res.render('course_uploaded');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/get_courses', async (req, res) => {
  try {
    // Retrieve all courses from the MongoDB collection
    let courses = await Course.find();
    let course_id = req.query.course_id;
    if (course_id) {
      courses = courses.filter(c => c._id == course_id);
      if (courses && courses.length) {
        res.json(courses[0]);
      } else {
        res.json([]);
      }

    } else {
      res.json(courses);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/get_tutor_courses', async (req, res) => {
  try {
    // Retrieve all courses from the MongoDB collection
    let courses = await Course.find({ tutor_email: req.query.email});
    let course_id = req.query.course_id;
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/show_course', async (req, res) => {
  try {
    res.render('course_dynamic', { co_id: req.query.course_id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/delete_course', async (req, res) => {
  try {
    let course_id = req.query.course_id;
    console.log(course_id, '456789098765');
    let courses = await Course.deleteOne({ _id : course_id });
    res.status(200).json({ success: true});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/tutor_register', (req, res) => {
  try {
    connection.query(
      'SELECT * FROM tutors WHERE email = $1',
      [req.body.email],
      (error, results) => {
        results = results.rows;
        if (error) {
          console.error('Error querying MySQL:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        } if (results.length > 0) {
          // Email is already in use
          res.render("email_already_exist.ejs");
        } else {
          const { fullName, email, subject, experience, qualification, availability } = req.body;

          const insertQuery = `
      INSERT INTO tutors (fullName, email, subject, experience, qualification, availability,approve)
      VALUES ($1, $2, $3, $4, $5, $6,0)`
            ;
          console.log([fullName, email, subject, experience, qualification, availability]);

          connection.query(insertQuery, [fullName, email, subject, experience, qualification, availability], (err, result) => {
            if (err) {
              console.error('Error inserting data:', err);
              res.status(500).send('Error inserting data');
            } else {
              const admin_email = 'amarjeet_k@pursuitsoftware.biz';
              mailer.sendmailForAdmin('akmishra6614@gmail.com', admin_email,
                { fullName, email, subject, experience, qualification, availability });
              console.log('Data inserted successfully');
              res.render("tutor_msg");
            }
          });
        }
      })
  } catch (err) {
    res.send(err);
  }
});




app.get("/tutor_login", (req, res) => {
  res.render("tutor_login");
});

app.get("/reupload", (req, res) => {
  res.render("tutor_upload");
});
app.post('/tutor_login_action', (req, res) => {
  console.log("tutor action hit.....");
  const email = req.body.email;
  const password = req.body.password;
  const hashPwd = hashPassword(password);
  console.log(email, " ", password);
  // Check the database for authentication
  const query = 'SELECT * FROM tutor_approved_list WHERE email = $1 AND password = $2';
  connection.query(query, [email, hashPwd], (err, results) => {
    results = results.rows;
    if (err) {
      console.error('Database query error:', err);
      res.render('error');
    } else {
      if (results.length > 0) {
        // Authentication successful
       console.log('hello', email);
        res.render('tutor_upload', { email } );
      } else {
        // Invalid login
        res.render('tutor_invalid');
      }
    }
  });
});

app.post('/admin_login', (req, res) => {
  const { email, password } = req.body;
  const hashPwd = hashPassword(password);
  // Query to find the user by email
  const sql = 'SELECT * FROM admin_users WHERE email = $1';

  connection.query(sql, [email], (err, results) => {
    results = results.rows
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // Check if user exists and password is correct
    if (results.length > 0 && hashPwd === results[0].password) {
      // Successful login
      console.log("admin logeedd again");
      res.redirect('/display');
    } else {
      // Failed login
      res.render('admin_login_failed');
    }
  });
});


app.post('/admin_register', (req, res) => {
  var f_name = req.body.firstname;
  var l_name = req.body.lastname;
  var email = req.body.email;
  var pass = req.body.password;
  const hashPwd = hashPassword(pass);
  try {
    connection.query(
      'SELECT * FROM admin_users WHERE email = $1',
      [email],
      (error, results) => {
        results = results.rows;
        if (error) {
          console.error('Error querying MySQL:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        } if (results.length > 0) {
          // Email is already in use
          return res.json({});
        } else {
          connection.query(
            "INSERT into admin_users (firstname,lastname,email,password) values($1,$2,$3,$4)",
            [f_name, l_name, email, hashPwd],
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                return res.json({});
              }
            }
          );
        }
      })
  } catch (err) {
    res.send(err);
  }
});

app.get('/display', (req, res) => {
  const query = 'SELECT * FROM tutors where approve=0';

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    results = results.rows;
    res.render('admin_manage', { tutors: results });
  });
});

app.post('/approve/:id', (req, res) => {
  const tutorId = req.params.id;
  const { fullName, email, password } = req.body;

  const hashPwd = hashPassword(password);
  connection.query(
    'INSERT INTO tutor_approved_list (full_name, email, password) VALUES ($1, $2, $3)',
    [fullName, email, hashPwd],
    (error) => {
      if (error) throw error;
      console.lo
    }
  );

  //Update approved value in tutors table
  connection.query(
    'UPDATE tutors SET approve = 1 WHERE id = $1',
    [tutorId],
    (updateError) => {
      if (updateError) throw updateError;
      res.render('tutor_approved', { fullName });
    }
  );

  mailer.sendmailForTutor('akmishra6614@gmail.com', [email],
    { fullName, email, password }
  )
});

app.post('/reset-password', (req, res) => {
  const {  email, newPassword } = req.body;
  const hashPwd = hashPassword(newPassword);
  // Check if the user with the provided details exists in the database
  connection.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (err, results) => {
      if (err) throw err;
      results = results.rows;

      if (results.length === 0) {
        return res.status(404).send('User not found or details do not match');
      }

      // Update the user's password
      connection.query(
        'UPDATE users SET password = $1 WHERE email = $2',
        [hashPwd, email],
        (updateErr, updateResults) => {
          if (updateErr) throw updateErr;

          res.render('reset_msg.ejs');
        }
      );
    }
  );
});



const port = process.env.PORT || 4600;
app.listen(port, () => {
  console.log(`Server running.... on port ${port}`);
});
console.log("Server running.... on port 4600");
