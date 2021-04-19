<template>
  <div id="app">
    <div id="nav">
      <nav class="breadcrumb has-bullet-separator has-text-white" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/">E720</router-link></li>
          <li><router-link to="/job">Job Listing</router-link></li>
          <li> <router-link to="/saved"> Saved Jobs ({{ $root.$data.saved_jobs.length }})</router-link></li>
          <li><router-link to="/application">My Applications ({{ $root.$data.my_applications.length }})</router-link></li>   
          <li><router-link to="/saveapp">Submitted Applications</router-link></li>
          <li><router-link to="/employers">Employers</router-link></li>
        </ul>
      </nav>

    </div>
    <router-view />
    <div class="footer">
    
      <a href= "https://github.com/chanman5052/cp4">Github</a>
  </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-color: black;
  
}
#nav a {
  font-weight: bold;
  color: white;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  margin-top: 50px;
  font-size: 20px;
}
</style>