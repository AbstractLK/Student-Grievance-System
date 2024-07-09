<script>

import Titles from "@/components/Titles.vue";
import axios from "axios";
// import router from "@/router";
import {getCookie} from "../../../utils/cookieUtils";


export default {
  name: "RegisterComplaint",
  components: {Titles},
  data:() => ({

    complaint:{
      category1: null,
      department: null,
      type: null,
      year: [ ],
      complaintDescription: '',
      anonymous: '',
    },

    cat1: [
      'Department Level',
      'Faculty Level',
      'University Level'
    ],


    cat2: [
      'Applied computing',
      'Computer System Engineering',
      'Software engineering',
    ],


    cat3: [
      'Admission ',
      'Finance ',
      'exams ',
      'Lecture ',
      'Timetable ',
      'paper & Re-evaluation ',
      'Other '
    ],
  }),

  methods: {
    async submitComplaint() {

      // alert('complaint');
      await axios.post('http://localhost:3001/user/submit-complaint', this.complaint)
        .then(response => {
          console.log(response.data);
          if (response.data) {
            alert("complaint submitted!");
            // router.push('/auth');
          } else {
            alert("not");
            // location.reload();
          }
        })
        .catch(error => {
          console.error(error);
          // Handle error response
        });
    },
  },

  mounted() {
    // Get the JWT from the cookie named 'jwt'
    const jwtToken = getCookie('jwt');
    if (jwtToken) {
      axios.defaults.headers.common['x-access-token'] = jwtToken;
    } else {
      console.log('JWT not found in cookies');
    }
  },
}
</script>

<template>
<!--  <Titles title="Register Complaint"/>-->

    <div class="ml-5 mt-3 text-h5">Register Complaint</div>
    <v-sheet border class="rounded-lg mt-2 mx-5 px-10 py-7">
      <v-row no-gutters class="text-center ">
        <v-col
          cols="12"
          md="6"
        >
          <v-sheet class="mx-5 px-2">
            <v-select
              v-model="complaint.category1"
              :items="cat1"
              :rules="[v => !!v || 'Item is required']"
              label="Select Category *"
              required
            ></v-select>
          </v-sheet>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-sheet class="mx-5 px-2">
            <v-select
              v-model="complaint.department"
              :items="cat2"
              label="Select Department"
              required
            ></v-select>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row no-gutters class="text-center ">
        <v-col
          cols="12"
          md="6"
        >
          <v-sheet class="mx-5 px-2">
            <v-select
              v-model="complaint.type"
              :items="cat3"
              :rules="[v => !!v || 'Item is required']"
              label="Select Type *"
              required
            ></v-select>
          </v-sheet>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-sheet class="mx-5 px-2">
            <v-row>
              <v-col md="3">
                <v-checkbox
                  v-model="complaint.year"
                  color="red"
                  label="year 1"
                  value="year1"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col md="3">
                <v-checkbox
                  v-model="complaint.year"
                  color="indigo"
                  label="year 2"
                  value="year2"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col md="3">
                <v-checkbox
                  v-model="complaint.year"
                  color="orange"
                  label="year 3"
                  value="year3"
                  hide-details
                ></v-checkbox>
              </v-col>

              <v-col md="3">
                <v-checkbox
                  v-model="complaint.year"
                  color="blue"
                  label="year 4"
                  value="year4"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters class="text-center ">
        <v-col cols="12" md="12">
          <v-sheet class="mx-5 px-2">
            <v-textarea
              v-model="complaint.complaintDescription"
              label="Complaint Description *"
              :rules="[v => !!v || 'Description is required']"
              auto-grow
              rows="5"
              required
            ></v-textarea>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row no-gutters class="text-center mx-5">
        <v-col md="3">
          <v-checkbox
            v-model="complaint.anonymous"
            color="red"
            label="Send as anonymous"
            value="anonymous"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <V-btn class="mx-16 mt-5" color="indigo-darken-3" @click="submitComplaint">Submit</V-btn>
    </v-sheet>


</template>

<style scoped>

</style>
