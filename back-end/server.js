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
  useNewUrlParser: true
});

const jobSchema = new mongoose.Schema ({
    company_name: String,
    job_title: String,
    salary: String,
    start_date: String,
})
const Job = mongoose.model('Job', jobSchema);

app.post('/api/jobs', async (req,res) => {
    const job = new Job ({
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

app.get('/api/jobs', async (req, res) => {
    try {
        let jobs = await Job.find();
        res.send(jobs); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/jobs/:id', async (req, res) =>{
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

app.delete('/api/jobs/:id', async (req, res) => {
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

const applicationSchema = new mongoose.Schema ({
    name: String,
    degree: String,
    contact: String,
    availability: String,
    pitch: String,
})
 
const App = mongoose.model('App', applicationSchema);

app.post('/api/applications', async (req, res) => {
    const app = new App ({
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
app.get('/api/applications', async (req, res) => {
    try {
        let applications = await App.find();
        res.send(applications); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.delete('/api/applications/:id', async (req, res) => {
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

app.listen(3000, () => console.log('Server listening on port 3000!'));