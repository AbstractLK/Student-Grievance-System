<script>
import axios from 'axios';
const URL = import.meta.env.VITE_URL;

export default {
  data() {
    return {
      email: this.$route.query.email || '',
      newPass: '',
      confirmNewPass: '',
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        minLength: v => v.length >= 8 || 'Min 8 characters',
        passwordMatch: () => this.newPass === this.confirmNewPass || 'Passwords do not match'
      }
    };
  },
  methods: {
    async resetPassword() {
      try {
        await axios.post(URL+'/reset-password/reset', { email: this.email, newPass: this.newPass });
        alert('Password reset successfully!');
        this.$router.push('/');
      } catch (error) {
        alert('Error resetting password!');
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
            <h2 class="text-blue-grey">Enter New Password</h2>
<!--            <h5>Sign in to Continue</h5>-->
          </div>

          <v-form v-model="valid">
            <v-text-field
              v-model="newPass"
              label="New Password"
              :rules="[rules.required, rules.minLength]"
              type="password"
              density="comfortable"
              class="mb-2"
              clearable
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="confirmNewPass"
              label="Confirm Password"
              :rules="[rules.required, rules.passwordMatch]"
              type="password"
              density="comfortable"
              class="mb-2"
              clearable
              variant="outlined"
            ></v-text-field>

            <v-btn
              class="mt-7"
              block
              color="blue-grey"
              size="large"
              variant="elevated"
              @click="resetPassword"
              :disabled="!valid"
            >
              Reset Password
            </v-btn>
          </v-form>
        </v-card>
      </v-sheet>
    </v-container>
  </div>
</template>

<style scoped>
</style>
