<script>
import axios from 'axios';
const URL = import.meta.env.VITE_URL;

export default {
  data() {
    return {
      email: '',
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'Invalid email.'
      }
    };
  },
  methods: {
    async sendCode() {
      try {
        await axios.post(URL+'/reset-password/send-code', { email: this.email });
        this.$router.push({ path: 'verify-code', query: { email: this.email } });
      } catch (error) {
        alert('Email not found!');
      }
    }
  }
}
</script>

<template>
  <v-app-bar flat title=" " class="bg-blue-grey-lighten-3 mb-10">
    <h1 class="ml-16 pl-4">Student Grievance System</h1>
    <v-spacer></v-spacer>
    <v-btn
      class="text-none"
      color="medium-emphasis"
      min-width="92"
      rounded
      variant="outlined"
      to="/auth"
    >
      Login
    </v-btn>
  </v-app-bar>

  <div class="bg-blue-grey pa-1 mb-10">
    <div class="text-center">
      <span></span>
    </div>
  </div>

  <div class="mb-16 mt-15" >
    <v-container>
      <v-sheet class="mb-16" >
        <v-card elevation="12" rounded="lg" class="mx-auto pa-12 pt-8 " max-width="450" >
          <div class="mb-12 text-center" style="color: #525252; ">
            <h2 class="text-blue-grey">Reset Password</h2>
            <h5 style="font-size: 11px">Enter your Email</h5>
          </div>

          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              density="comfortable"
              class="mb-2"
              clearable
              label="Email"
              variant="outlined"
            ></v-text-field>

            <v-btn
              class="mt-7"
              block
              color="blue-grey"
              size="large"
              variant="elevated"
              @click="sendCode" :disabled="!valid"
            >
              Send Code
            </v-btn>
          </v-form>
        </v-card>
      </v-sheet>
    </v-container>
  </div>
</template>

<style scoped>
</style>
