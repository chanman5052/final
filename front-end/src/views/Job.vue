<template>
  <div class="body">
    <div class="title">
      <h1><b>Job Listings</b></h1>
    </div>
    <div class="jobs">
    <div class="job" v-for="job in jobs" :key="job.id">
        <div class="info">
          <div class="card">
            
            <header class="header">
            <p class="card-header-title">{{ job.company_name }}</p>
            </header>
            <div class="card-content">
                
            <p class="is-size-6">Job Title: {{ job.job_title }}</p>
            <p class="is-size-6">Starting Salary (in thousands): {{ job.salary }}</p>
            <p class="is-size-6">Start Date: {{ job.start_date }}</p>
          </div>
          <button class="auto button is-rounded is-link is-centered" @click= "saveJob(job)">Save</button>
          <button class="button is-rounded is-danger" @click= "deleteJob(job)">Delete</button>
        </div>
      </div>
    </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: "Job",

  data() {
    return {
      jobs: []
    };
  },
  created() {
    this.getJobs();
  },
  methods: {
    async getJobs() {
      try {
        let response = await axios.get("/api/jobs");
        this.jobs = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    saveJob(job) {
      this.$root.$data.saved_jobs.push(job);
    },
    async deleteJob(job) {
      try {
        await axios.delete("/api/jobs/" + job._id);
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
  .card-content {
    text-align: left;
    padding: 10px 30px;
    height: 150px;
  }
.jobs {
 
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.job {
  margin: 10px;
  margin-top: 50px;
  width: 30%
}
.button {
  text-align: center;
  margin-bottom: 10px;
}

</style>