<template>
  <div class="body">
    <h1>Add a Job Listing</h1>
    <div class="app">
      <input
        class="input is-normal"
        v-model="company_name"
        type="text"
        placeholder="Company Name"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="job_title"
        type="text"
        placeholder="Job Title"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="salary"
        type="text"
        placeholder="Starting Salary (in thousands)"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="start_date"
        type="text"
        placeholder="Start Date"
      />
      <br />
      <br />
      <button class="button is-rounded is-link" @click="submitJob()">
        Submit
      </button>

    </div>
    <div class="submitJob" v-if="addJob">
      <div class="card">
        <header class="header">
          <p class="card-header-title">{{ addJob.company_name }}</p>
        </header>
        <div class="card-content">
          <p class="is-size-6">Job Title: {{ addJob.job_title }}</p>
          <p class="is-size-6">
            Starting Salary (in thousands): {{ addJob.salary }}
          </p>
          <p class="is-size-6">Start Date: {{ addJob.start_date }}</p>
        </div>
      </div>
    </div>
    <h1>Edit Job Listing</h1>
    <div class="edit">
      <div class="jobs">
      <div class="job" v-for="job in jobs" :key="job.id">
      <label class="checkbox">
      <input type="checkbox" @click= "selectJob(job)">
        {{ job.job_title }} : {{ job.company_name }}
      </label>
      </div>
      </div>
      <div class="app" v-if="findJob">
      <input
        class="input is-normal"
        v-model="findJob.company_name"
        type="text"
        placeholder="Company Name"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="findJob.job_title"
        type="text"
        placeholder="Job Title"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="findJob.salary"
        type="text"
        placeholder="Starting Salary (in thousands)"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="findJob.start_date"
        type="text"
        placeholder="Start Date"
      />
      <br />
      <br />
      <button class="button is-rounded is-primary" @click="editJob(findJob)">
        Save
      </button>
    </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Employers",
  data() {
    return {
      company_name: "",
      job_title: "",
      salary: "",
      start_date: "",
      jobs: [],
      addJob: null,
      findJob: null,
      canEdit: false,
    };
  },

  created() {
    this.getJobs();
  },
  methods: {
    async submitJob() {
      try {
        let r1 = await axios.post("/api/jobs", {
          company_name: this.company_name,
          job_title: this.job_title,
          salary: this.salary,
          start_date: this.start_date,
        });
        this.addJob = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getJobs() {
      try {
        let response = await axios.get("/api/jobs");
        this.jobs = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectJob(job) {
      this.findJob = job;
    },
    async editJob(job) {
      try {
        await axios.put("/api/jobs/" + job._id, {
          company_name: this.findJob.company_name,
          job_title: this.findJob.job_title,
          salary: this.findJob.salary,
          start_date: this.findJob.start_date,
        });
        this.findJob = null;
        this.getJobs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.select {
  margin-bottom: 150px;
  }

.jobs {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.job {
  margin: 10px;
  margin-top: 50px;
  width: 30%
}

</style>