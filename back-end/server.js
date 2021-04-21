const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/joblisting', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const employers = require("./employers.js");
app.use("/api/employers", employers.routes);

const Employer = employers.model;
const validEmployer = employers.valid;

const jobSchema = new mongoose.Schema ({
    employer: {
        type: mongoose.Schema.ObjectId,
        ref: "Employer"
    },
    company_name: String,
    job_title: String,
    salary: String,
    start_date: String,
})
const Job = mongoose.model('Job', jobSchema);

app.post('/api/jobs', validEmployer, async (req,res) => {
    const job = new Job ({
        employer: req.employer,
        company_name: req.body.company_name,
        job_title: req.body.job_title,
        salary: req.body.salary,
        start_date: req.body.start_date,
    });
    try {
        await job.save();
        res.send(job);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/jobs', validEmployer, async (req, res) => {
    try {
        let jobs = await Job.find({
            employer: req.employer
        });
        res.send(jobs); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get("/api/jobs/all", async (req, res) => {
    try {
      let jobs = await Job.find().sort({
        created: -1
      }).populate('employer');
      return res.send(jobs);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

app.put('/api/jobs/:id', validEmployer, async (req, res) =>{
    try {
        let job = await Job.findOne ({
            _id: req.params.id
        });
        job.company_name = req.body.company_name;
        job.job_title = req.body.job_title;
        job.salary = req.body.salary;
        job.start_date = req.body.start_date;
        await job.save(job);
        res.send(job);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/jobs/:id', validEmployer, async (req, res) => {
    try {
        await Job.deleteOne({
            _id: req.params.id
        });
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

const User = users.model;
const validUser = users.valid;

const applicationSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    name: String,
    degree: String,
    contact: String,
    availability: String,
    pitch: String,
})
 
const App = mongoose.model('App', applicationSchema);

app.post('/api/applications', validUser, async (req, res) => {
    const app = new App ({
        user: req.user,
        name: req.body.name,
        degree: req.body.degree,
        contact: req.body.contact,
        availability: req.body.availability,
        pitch: req.body.pitch
    });
    try {
        await app.save();
        res.send(app);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.put('/api/applications/:id', validUser, async (req, res) =>{
    try {
        let app = await App.findOne ({
            _id: req.params.id,
            user:req.user
        });
        app.name = req.body.name;
        app.degree = req.body.degree;
        app.contact = req.body.contact;
        app.availability = req.body.availability;
        app.pitch = req.body.pitch;
        await app.save(app);
        res.send(app);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.get('/api/applications', validUser, async (req, res) => {
    try {
        let applications = await App.find({
            user: req.user
        });
        res.send(applications); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.delete('/api/applications/:id',validUser, async (req, res) => {
    try {
        await App.deleteOne({
            _id: req.params.id
        });
          res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});



app.listen(3003, () => console.log('Server listening on port 3003!'));