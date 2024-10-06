<script>
//import login from '@/services/AuthService';
import axios from "axios";
import router from "@/router";
// import {getCookie} from "../../utils/cookieUtils";


export default {
  name: "Login",

  data: () => ({

    credential: {
      email: '',
      pass: ""
    },
    checkCookieInterval: null

  }),
  methods: {
    async logicAct() {
      await axios.post('http://localhost:3001/auth', this.credential)
        .then(async response => {
          // console.log(response.data.accessToken);
          if (response.data == "Invalid Email or Password!") {
            alert(response.data);
          } else if (response.data == "All inputs are required!") {
            alert(response.data);
          } else {
            await this.addToCookie(response.data.accessToken);
            const role = response.data.role;
            // console.log(response);
            // alert("Successfully login");
            if (role == "admin" || role == "facultyAdmin" || role == "universityAdmin") await router.push('/admin');
            if (role == "student") await router.push('/student');
          }

        })
        .catch(error => {
          console.error(error + '');
        });

      // const payload = {email:this.email, pass:this.password};
      //console.log(this.credential);
    },

    // addToCookie(jwtToken){
    //   const expirationTime = new Date();
    //   expirationTime.setTime(expirationTime.getTime() + (1000)); // 1 hour expiration
    //   const cookieValue = `jwt=${jwtToken}; Secure; SameSite=Strict; Expires=${expirationTime.toUTCString()}`;
    //   document.cookie = cookieValue;
    // }

    addToCookie(jwtToken) {
      // console.log(jwtToken);
      // axios.defaults.headers.common['x-access-token'] = jwtToken;
      const expirationTime = new Date();
      expirationTime.setTime(expirationTime.getTime() + (1000 * 60 * 60 * 2)); // 1 hour expiration
      const cookieValue = `jwt=${jwtToken}; SameSite=Strict; Expires=${expirationTime.toUTCString()}; Path=/`;
      document.cookie = cookieValue;

      // Set timeout to show alert after 1 minute
      // setTimeout(() => {
      //   alert("Your session has expired. Please log in again.");
      // }, 1000 * 60); // 1 minute in milliseconds
    },
  },
}
</script>

<template>
  <div class="background-image">
    <div>
      <div class="pt-10" rounded>
        <v-card elevation="12" rounded="lg" class="mx-auto pa-12 py-8 " max-width="370px" max-height="420px">
          <div class="mb-8 text-center" style="color: #525252;">
            <h2 class="text-blue-grey" style="font-size: 25px; line-height: 90%">Student Grievance System </h2>
            <h5 class="mt-1">Sign in to Continue</h5>
          </div>

          <v-form>
            <v-text-field v-model="credential.email" density="comfortable" class="mb-2" clearable label="Email"
              variant="outlined"></v-text-field>

            <v-text-field v-model="credential.pass" density="comfortable" variant="outlined" type="password" clearable
              label="Password" placeholder="Enter your password"></v-text-field>

            <v-btn variant="plain" size="small" class="mb-3 text-none" to="/auth/reset">
              <span class="text-amber-darken-4 ">Forget password?</span>
            </v-btn>

            <br>

            <v-btn block color="blue-grey" size="large" variant="elevated" @click="logicAct">
              Sign In
            </v-btn>
            <div class="text-center">
              <v-btn variant="plain" size="small" class="text-none mt-3" to="/auth/register">
                <span class="text-black ">Create Account</span>
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </div>
    </div>
  </div>
</template>



<style scoped>
.background-image {
  background-image: url('../assets/25582.jpg');
  background-repeat: no-repeat;
  /* Optional: Control how the image repeats */
  background-size: cover;
  /* Optional: Adjust how the image fills the background */
  background-position: center;
  /* Optional: Position the image within the element */
}
</style>
