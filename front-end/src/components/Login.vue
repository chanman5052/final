<template>
<div class="app">
<div class="login">
  <form class="box">
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="username" v-model="usernameLogin" placeholder="e.g. cosmo.cougar">
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
    <label class="label">Name</label>
    <div class="control">
      <input class="input" type="name" placeholder="e.g. Cosmo Cougar" v-model="name">
    </div>
    <br/>
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="username" placeholder="e.g. cosmo.cougar" v-model="username">
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
    name: 'Login',
    data() {
        return {
        name: '',
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
        if (!this.name || !this.username || !this.password) {
            return;
        }
        try {
            let response = await axios.post('/api/users', {
            name: this.name,
            username: this.username,
            password: this.password,
            });
            this.$root.$data.user = response.data.user;
        } catch(error) {
            this.error = error.response.data.message;
            this.$root.$data.user = null;
        }
        },
        async login() {
        if (!this.usernameLogin || !this.passwordLogin) {
            return;
        }
        try {
            let response = await axios.post('/api/users/login', {
            username: this.usernameLogin,
            password: this.passwordLogin,
            });
            this.$root.$data.user = response.data.user;
        } catch(error) {
            this.$root.$data.user = null;
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