<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: this.$route.query.email || '',
      code: '',
      valid: false,
      timer: 60,
      rules: {
        required: value => !!value || 'Required.',
        minLength: v => v.length >= 6 || 'Required 6 character',
      }
    };
  },
  created() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        }
      }, 1000);
    },
    async verifyCode() {
      try {
        await axios.post('http://localhost:3001/reset-password/verify-code', { email: this.email, code: this.code });
        this.$router.push({ path: 'reset-password', query: { email: this.email } });
        // alert('code valid');
        // console.log(this.email);
      } catch (error) {
        alert('Invalid code');
      }
    },
    async resendCode() {
      try {
        await axios.post('http://localhost:3001/reset-password/send-code', { email: this.email });
        this.timer = 60;
      } catch (error) {
        alert('Error resending code');
      }
    }
  },
  // mounted() {
  //   console.log(this.email);
  // }
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
            <h2 class="text-blue-grey">Email Verification</h2>
            <h5 style="font-size: 11px; font-weight: 500; color: gray; padding-top: 7px">We have sent a code to your email {{this.email}}</h5>
          </div>

          <v-form v-model="valid">
            <v-text-field
              v-model="code"
              label="Verification Code"
              :rules="[rules.required, rules.minLength]"
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
              @click="verifyCode" :disabled="!valid"
            >
              verify Code
            </v-btn>
            <div class="text-center mt-3">
              <v-label style="font-size: small">Didn't receive a code?</v-label>
              <v-btn variant="plain" size="small" class="text-none px-1" @click="resendCode" :disabled="timer > 0">
                <span class="text-black ">Resend Code</span>
              </v-btn>
              <v-label style="font-size: small" v-if="timer > 0">in {{ timer }}s</v-label>

            </div>

<!--            <v-btn @click="resendCode" :disabled="timer > 0">Resend Code</v-btn>-->
          </v-form>
        </v-card>
      </v-sheet>
    </v-container>
  </div>
</template>

<style scoped>
</style>
