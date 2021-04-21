<template>
<div class="app">
<div class="login">
  <form class="box">
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="username" v-model="usernameLogin" placeholder="e.g. byu.cougars">
    </div>
  </div>

  <div class="field">
    <label class="label">Password</label>
    <div class="control">
      <input class="input" type="password" v-model="passwordLogin" placeholder="********">
    </div>
  </div>

  <button class="button is-primary" @click.prevent="login">Sign in</button>
</form>
</div>
  <div class="register">
  <form class="box">
  <div class="field">
    <label class="label">Company</label>
    <div class="control">
      <input class="input" type="company" placeholder="e.g. BYU" v-model="company">
    </div>
    <br/>
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="username" placeholder="e.g. byu.cougar" v-model="username">
    </div>
  </div>

  <div class="field">
    <label class="label">Password</label>
    <div class="control">
      <input class="input" type="password" placeholder="********" v-model="password">
    </div>
  </div>

  <button class="button is-primary" @click.prevent="register">Register</button>
</form>
</div>
<p v-if="error" class="error">{{error}}</p>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'EmployerLogin',
    data() {
        return {
        company: '',
        username: '',
        password: '',
        usernameLogin: '',
        passwordLogin: '',
        error: '',
        }
    },
    methods: {
        async register() {
        this.error = '';
        if (!this.company || !this.username || !this.password) {
            return;
        }
        try {
            let response = await axios.post('/api/employers', {
            name: this.company,
            username: this.username,
            password: this.password,
            });
            this.$root.$data.employer = response.data.employer;
        } catch(error) {
            this.error = error.response.data.message;
            this.$root.$data.employer = null;
        }
        },
        async login() {
        if (!this.usernameLogin || !this.passwordLogin) {
            return;
        }
        try {
            let response = await axios.post('/api/employers/login', {
            username: this.usernameLogin,
            password: this.passwordLogin,
            });
            this.$root.$data.employer = response.data.employer;
        } catch(error) {
            this.$root.$data.employer = null;
        }
        },
    },
}
</script>
<style>
.field {
    align-content: center;
    width: 50%;
    text-align: center;
    margin-left:25%;
    margin-bottom: 20px;
}
</style>