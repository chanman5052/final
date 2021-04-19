<template>
  <div class="wrapper">
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
              
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "JobListing",

  data() {
    return {
      jobs: [],
    }
  },
  created() {
    this.getJobs();
  },
  methods: {
    saveJob(job) {
      this.$root.$data.saved_jobs.push(job);
    },
    async getJobs() {
      try {
        let response = await axios.get("/api/job");
        this.job = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
}
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