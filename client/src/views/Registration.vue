<script>
//const apiURL = "localhost:3000/auth"
import axios from 'axios'
import router from "@/router";

export default {
  name: "Registration",
  components: {},
  data: () => ({
    tab: null,
    terms: false,
    valid: false, // For form validation

    user: {
      name: '',
      email: "",
      pass: '',
      age: null,
      address: '',
      contact: null,
      role: ""
    },

    // Validation rules
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be at least 6 characters'
    ],
    ageRules: [
      v => !!v || 'Age is required',
      v => (v && v > 0) || 'Age must be a positive number'
    ],
    addressRules: [
      v => !!v || 'Address is required'
    ],
    contactRules: [
      v => !!v || 'Contact is required',
      v => (v && v.toString().length === 10) || 'Contact must be a 10 digit number'
    ],
    termsRules: [
      v => !!v || 'You must agree to the terms and conditions'
    ]

  }),

  methods: {
    async callRestAPI(role) {
      await this.$refs.form.validate();
      if (this.valid) {
        this.user.role = role;
        await axios.post('http://localhost:3001/auth/registration', this.user)
          .then(response => {
            console.log(response.data);
            if (response.data) {
              alert("Registration successful");
              router.push('/auth');
            } else {
              alert("Already registered");
              location.reload();
            }
          })
          .catch(error => {
            console.error(error);
            // Handle error response
          });
      } else {
        alert("Please Enter Valid Data");
      }
    }
  }

}
</script>

<template>

  <v-app-bar flat title=" " class="bg-blue-grey-lighten-3 mb-10">
    <h1 class="ml-16 pl-4">Create Account</h1>
    <v-spacer></v-spacer>
    <v-btn class="text-none" color="medium-emphasis" min-width="92" rounded variant="outlined" to="/auth">
      Login
    </v-btn>
  </v-app-bar>

  <div class="bg-blue-grey pa-1 mb-10">
    <div class="text-center">
      <span>It's quick and easy.</span>
    </div>
  </div>



  <v-card>
    <v-sheet max-width="500px" class="mx-auto">
      <v-tabs v-model="tab" color="deep-purple-accent-4" fixed-tabs>
        <v-tab value="one">Student</v-tab>
        <!--        <v-tab value="two">admin</v-tab>-->
      </v-tabs>
    </v-sheet>
    <v-window v-model="tab">
      <v-container class="mx-auto my-16">
        <v-window-item value="one">
          <v-card elevation="5" rounded="lg" class="mx-auto px-10 pt-5" max-width="480">
            <div class="py-4 text-center text-h6">Student Registration</div>
            <v-container>
              <v-form v-model="valid" ref="form">
                <v-text-field v-model="user.name" :rules="nameRules" color="primary" label="Name"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.email" :rules="emailRules" color="primary" label="Email"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.pass" :rules="passwordRules" color="primary" label="Password"
                  type="password" variant="underlined"></v-text-field>

                <v-text-field v-model="user.age" :rules="ageRules" color="primary" label="Age" type="number"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.address" :rules="addressRules" color="primary" label="Address"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.contact" :rules="contactRules" color="primary" label="Contact" type="number"
                  variant="underlined"></v-text-field>

                <v-checkbox v-model="terms" :rules="termsRules" color="secondary"
                  label="I agree to site terms and conditions"></v-checkbox>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn @click="callRestAPI('student')" color="success">
                    Complete Registration

                    <v-icon icon="mdi-chevron-right" end></v-icon>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-container>
          </v-card>
        </v-window-item>

        <v-window-item value="two">
          <v-card elevation="5" rounded="lg" class="mx-auto px-10 pt-5" max-width="480">
            <div class="py-4 text-center text-h6">admin Registration</div>
            <v-container>
              <v-form v-model="valid" ref="form">
                <v-text-field v-model="user.name" :rules="nameRules" color="primary" label="Name"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.email" :rules="emailRules" color="primary" label="Email"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.pass" :rules="passwordRules" color="primary" label="Password"
                  type="password" variant="underlined"></v-text-field>

                <v-text-field v-model="user.age" :rules="ageRules" color="primary" label="Age" type="number"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.address" :rules="addressRules" color="primary" label="Address"
                  variant="underlined"></v-text-field>

                <v-text-field v-model="user.contact" :rules="contactRules" color="primary" label="Contact" type="number"
                  variant="underlined"></v-text-field>

                <v-checkbox v-model="terms" :rules="termsRules" color="secondary"
                  label="I agree to site terms and conditions"></v-checkbox>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn @click="callRestAPI('admin')" color="success">
                    Complete Registration

                    <v-icon icon="mdi-chevron-right" end></v-icon>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-container>
          </v-card>
        </v-window-item>
      </v-container>
    </v-window>
  </v-card>

</template>

<style scoped></style>
