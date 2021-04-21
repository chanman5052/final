<template>
<div class= "body">
    <h1>{{$root.$data.user.name}}'s Profile</h1>
    <br/>
    <h2>Completed Applications</h2>
     <div class="jobs">
    <div class="job" v-for="application in applications" :key="application.id">
        <div class="info">
          <div class="card">
            
            <header class="header">
            <p class="card-header-title">{{ application.name }}</p>
            </header>
            <div class="card-content">
                
            <p class="is-size-6">Contact: {{ application.contact }}</p>
            <p class="is-size-6">Degree: {{ application.degree }}</p>
            <p class="is-size-6">Interview Availability: {{ application.availability }}</p>
            <p class="is-size-6">About: {{ application.pitch }}</p>
          </div>
            <button class="auto button is-rounded is-link is-centered" @click= "selectApp(application)">Edit</button>
            <button class="button is-rounded is-danger" @click= "deleteApp(application)">Delete</button>
          </div>
        </div>
    </div>
    </div>
    
    <div class="app" v-if="findApp">
        <h1>Edit Your Application</h1>
      <input
        class="input is-normal"
        v-model="findApp.name"
        type="text"
        placeholder="Company Name"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="findApp.contact"
        type="text"
        placeholder="Contact"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="findApp.degree"
        type="text"
        placeholder="Degree"
      />
      <br />
      <br />
      <input
        class="input is-normal"
        v-model="findApp.availability"
        type="text"
        placeholder="Interview Availability"
      />
      <br />
      <br />
      <textarea
        class= "textarea"
        v-model="findApp.pitch"></textarea>
      <button class="button is-rounded is-primary" @click="editJob(findApp)">
        Save
      </button>
    </div>
  <button class="button is rounded is-danger" @click.prevent="logout">Logout</button>
  
</div>

</template>
<script>
import axios from 'axios'
export default {
    name: "SaveApp",
    data() {
        return {
            applications: [],
            users: [],
            user_name: "",
            findApp: null,
        }

    },
    computed: {
      user() {
        return this.$root.$data.user;
      },
    },
    created() {
        this.getApps();
        this.getUsers();
    },
    methods: {
         async getUsers() {
            try {
                let response = await axios.get("/api/users");
                this.users = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async getApps() {
            try {
                let response = await axios.get("/api/applications");
                this.applications = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        selectApp(application) {
            this.findApp = application;
        },
      async editJob(application) {
        try {
          await axios.put("/api/applications/" + application._id, {
          name: this.findApp.name,
          contact: this.findApp.contact,
          degree: this.findApp.degree,
          availability: this.findApp.availability,
          pitch: this.findApp.pitch,
        });
        this.findApp = null;
        this.getApps();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
     async deleteApp(application) {
      try {
        await axios.delete("/api/applications/" + application._id);
        this.findApp = null;
        this.getApps();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch(error) {
        this.$root.$data.user = null;
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
  margin-bottom: 50px;
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