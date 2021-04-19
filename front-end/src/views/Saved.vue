<template>

    <div>
      <h1><b>Saved Jobs</b></h1>
    
      <div class="wrapper">
      <div class="jobs">
        <div class="job" v-for="job in saved_jobs" :key="job.id">
        <div class= "card">
          <header class="header">
            <p class="card-header-title">{{ job.company_name }}</p>
          </header>
          <div class="card-content">
            <p class="is-size-6">Job Title: {{ job.job_title }}</p>
            <p class="is-size-6">Start Date: {{ job.start_date }}</p>
          </div>

          <button class="button is-rounded is-link is-centered" @click= "applyJob(job)">Apply</button>
          <br/>
          <button class="button is-rounded is-danger" @click= "removeJob(job)">Remove</button>
        </div>
        </div>
      </div>
    
    <h1 v-if="$root.$data.saved_jobs.length === 0"><b>Playa... get up and go SAVE some jobs</b></h1>
  </div>
</div>
</template>
<script>
export default {
    name: "Saved",
    components: {},
    data() {
        return{}
    },
    computed: {
        saved_jobs() {
            return this.$root.$data.saved_jobs;
        }
    },
    methods: {
        removeJob(job) {
            this.$root.$data.saved_jobs.splice(job, 1);
        },
        applyJob(job) {
            this.$root.$data.my_applications.push(job);
            
        }
    }
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
  width: 30%;
}
.button {
  text-align: center;
  margin-bottom: 10px;
}
h1 {
    margin-top: 100px;
}
</style>