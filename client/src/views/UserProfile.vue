<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../utils/cookieUtils.js";

export default {
  name: "UserProfile",
  data() {
    return {
      valid: false,
      userId: '',
      userDetails: {},
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        age: value => value > 0 || 'Age must be positive.',
        contact: value => {
          const pattern = /^[0-9]{10}$/;
          return pattern.test(value) || 'Invalid contact number.';
        }
      }
    }
  },
  methods: {
    async getAll() {
      const token = getCookie("jwt");
      const decodedToken = jwtDecode(token);
      this.userId = decodedToken.id;
      // console.log(decodedToken.id);
      try {
        const response = await axios.get('http://localhost:3001/user/getAll')
        this.userDetails = response.data.filter(user => user._id === this.userId)[0];
        // console.log(this.userDetails);
      } catch (error) {
        console.error(error);
      }
    },

    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.saveProfile();
      } else {
        alert('Please fill out the form correctly.');
      }
    },
    async saveProfile() {
      try {
        const response = await axios.put('http://localhost:3001/user/update-user/' + this.userId, this.userDetails);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      // Logic to save user profile
      alert('Profile saved successfully!');
    }
  },

  mounted() {
    this.getAll();
  },
}
</script>

<template>
  <v-card class="mx-auto rounded-lg mt-8" :max-width="'100%'" elevation="5" title="Profile">
    <v-divider></v-divider>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="mx-5 my-3">
        <v-container>
          <!-- Name and Email row -->
          <v-row>
            <v-col cols="12" md="1">
              <v-label>Name</v-label>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field density="compact" v-model="userDetails.name" variant="filled"
                :rules="[rules.required]" full-width></v-text-field>
            </v-col>

            <v-col cols="12" md="1">
              <v-label>Email</v-label>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field disabled density="compact" v-model="userDetails.email" variant="filled"
                :rules="[rules.required, rules.email]" full-width></v-text-field>
            </v-col>
          </v-row>

          <!-- Address and Age row -->
          <v-row>
            <v-col cols="12" md="1">
              <v-label>Address</v-label>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field density="compact" v-model="userDetails.address" variant="filled"
                :rules="[rules.required]" full-width></v-text-field>
            </v-col>

            <v-col cols="12" md="1">
              <v-label>Age</v-label>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field density="compact" v-model="userDetails.age" variant="filled"
                :rules="[rules.required, rules.age]" full-width></v-text-field>
            </v-col>
          </v-row>

          <!-- Contact and Reg Date row -->
          <v-row>
            <v-col cols="12" md="1">
              <v-label>Contact</v-label>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field density="compact" v-model="userDetails.contact" variant="filled"
                :rules="[rules.required, rules.contact]" full-width></v-text-field>
            </v-col>

            <v-col cols="12" md="1">
              <v-label>Reg Date</v-label>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field disabled density="compact" v-model="userDetails.reg_date" variant="filled"
                :rules="[rules.required]" full-width></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="validate" class="mx-auto">
            Save
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-form>
  </v-card>
</template>

<!-- <template>
  <v-card class="mx-auto rounded-lg mt-8" max-width="900" elevation="5" title="Profile">
    <v-divider></v-divider>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="mx-10 my-3">
        <v-container>
          <v-row>
            <v-col cols="1" class=""><v-label>Name</v-label></v-col>
            <v-col cols="5">
              <v-text-field density="compact" v-model="userDetails.name" variant="filled"
                :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="1" class=""><v-label>Email</v-label></v-col>
            <v-col cols="5">
              <v-text-field disabled density="compact" v-model="userDetails.email" variant="filled"
                :rules="[rules.required, rules.email]"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" class=""><v-label>Address</v-label></v-col>
            <v-col cols="5">
              <v-text-field density="compact" v-model="userDetails.address" variant="filled"
                :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="1" class=""><v-label>Age</v-label></v-col>
            <v-col cols="5">
              <v-text-field density="compact" v-model="userDetails.age" variant="filled"
                :rules="[rules.required, rules.age]"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" class=""><v-label>Contact</v-label></v-col>
            <v-col cols="5">
              <v-text-field density="compact" v-model="userDetails.contact" variant="filled"
                :rules="[rules.required, rules.contact]"></v-text-field>
            </v-col>
            <v-col cols="1" class=""><v-label>Reg Date </v-label></v-col>
            <v-col cols="5">
              <v-text-field disabled density="compact" v-model="userDetails.reg_date" variant="filled"
                :rules="[rules.required]"></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="validate">
            Save
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-form>

  </v-card>
</template> -->

<style scoped>
  @media (max-width: 600px) {
    .mx-5 {
      margin-left: 10px;
      margin-right: 10px;
    }
    .my-3 {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>
