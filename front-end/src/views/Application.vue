<template>
  <div>
    <h1>Applications</h1>
    <br/>
    <br/>  
    <p>
      <b>*This is a common application that will be sent to all the employers listed</b>
    </p>
     <article v-if="deleted" class="message is-danger">
        <div class="message-header">
            <p>Application(s) deleted</p>
            <button class="delete" aria-label="delete" @click= "deleteMessage2"></button>
        </div>
        <div class="message-body">
            Application was successfully cancelled
        </div>
    </article>
    <article v-if="submit" class="message is-success" id="message">
        <div class="message-header">
            <p>Application(s) submitted</p>
            <button class="delete" aria-label="delete" @click= "deleteMessage"></button>
        </div>
        <div class="message-body">
            Please wait 3-5 business days for a response.
        </div>
    </article>
    <h1 v-if="$root.$data.my_applications.length === 0" class= "no-app"><b>No Applications...go APPLY bro</b></h1>
    
    <div v-else>

    <div class="wrapper">
      <div class="jobs">
        <div class="job" v-for="job in my_applications" :key="job.id">
            <ul><b>{{job.company_name}}</b></ul>
            <ul>{{job.job_title}}</ul>
        </div>
      </div>
    </div>
    <div class= "app">
    <input class="input is-normal" v-model="name" type="text" placeholder="Name">
    <br/>
    <br/>
    <input class="input is-normal" v-model="contact" type="text" placeholder="Email">
    <br/>
    <br/>
    <input class="input is-normal" v-model="degree" type="text" placeholder="Degree">
    <br/>
    <br/>
    <input class="input is-normal" v-model="availability" type="text" placeholder="Available Interview Days (mm/dd/yyyy)">
    <br/>
    <br/>
    <textarea class="textarea" v-model="pitch" placeholder="Pitch Yourself" rows="10"></textarea>    
    <button class= "button is-rounded is-link" @click= "submitApp()">Submit</button>
    <button class= "button is-rounded is-danger" @click= "deleteApp()">Cancel</button>
    </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "Application",
    components: {},
    data() {
        return{
            submit: false,
            deleted: false,
        }
    },
    computed: {
        my_applications(){
            return this.$root.$data.my_applications;
        }
    },
    methods: {

        deleteApp(){
            this.$root.$data.my_applications = [];
            this.name= "";
            this.contact= "";
            this.degree="";
            this.availability="";
            this.pitch= "";
            this.deleted = true;
        },
        deleteMessage() {
            this.submit = false;
        },
        deleteMessage2() {
            this.deleted = false;
            this.$root.$data.my_applications.length === 0;
        },
        async submitApp() {
        try {
            let r1 = await axios.post("/api/applications", {
            name: this.name,
            contact: this.contact,
            degree: this.degree,
            availability: this.availability,
            pitch: this.pitch
            
            });
            this.addApp = r1.data;
            this.submit = true;
            this.$root.$data.my_applications = [];
        } catch (error) {
            console.log(error);
        }
    },
        
    }
}
</script>

<style>
.app {
    align-content: center;
    width: 50%;
    text-align: center;
    margin-left:25%;
}
.button {
    margin:10px
}
.no-app {
    margin-top:200px;
    font-size: x-large;
}
h1 {
    font-size: x-large;
    font-weight: bold;
}
article {
    width: 50%;
    margin-left: 340px;
}
</style>