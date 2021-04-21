<template>

<div>
  <Employer v-if="employer" />
  <EmployerLogin v-else />
  
</div>
</template>
<script>
import axios from 'axios';
import Employer from '@/components/Employer.vue';
import EmployerLogin from '@/components/EmployerLogin.vue';
export default {
  name: 'Employers',
  components: {
    Employer,
    EmployerLogin,
  },
  async created() {
    try {
      let response = await axios.get('/api/employers');
      this.$root.$data.employer = response.data.employer;
    } catch (error) {
      this.$root.$data.employer = null;
    }
  },
  computed: {
    employer() {
      return this.$root.$data.employer;
    }
  },


}
</script>