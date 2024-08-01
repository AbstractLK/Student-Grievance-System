<script>

// import Titles from "@/components/Titles.vue";

import {formatDate} from "../../../utils/formatDate";
import axios from "axios";
import {getCookie} from "../../../utils/cookieUtils";
import {jwtDecode} from "jwt-decode";

export default {
  name: "closedComplaint",
  // components: {Titles},
  data () {
    return {
      complaints: [],
      search: '',
      headers: [
        { title: 'Complain No', align: 'start', key: '_id' },
        { title: 'Complainant Email', key: 'complainantEmail' },
        { title: 'Reg Date', key: 'createdAt' },
        { title: 'Status', key: 'status' },
        { title: 'Action', key: 'action', sortable: false },
        { title: 'Remaining Days', key: 'remainingDays' },
      ],
    }
  },

  methods: {
    formatDate,
    async fetchNotProcessedComplaints() {
      try {
        const response = await axios.get('http://localhost:3001/complaint/closedComplaint');
        const token = getCookie("jwt");
        const decodedToken = jwtDecode(token);
        if(decodedToken.role=="teacher"){
          this.complaints = response.data;
        }else if(decodedToken.role=="facultyAdmin"){
          this.complaints = response.data.filter(complaint => complaint.remainingDays < 0 );
        }else if(decodedToken.role=="universityAdmin"){
          this.complaints = response.data.filter(complaint => complaint.remainingDays < -15 );
        }
      } catch (error) {
        console.error(error);
      }
    }
  },

  mounted() {
    this.fetchNotProcessedComplaints();
  }
}
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2 text-h5 mb-2 mt-4 ml-5">
      Closed Complaint

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search by Email or Complaint ID"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="complaints"
      :search="search"
      class="mx-5"
      height="430px"
      fixed-header
    >
      <template v-slot:item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template v-slot:item.complainantEmail="{ item }">
        {{ item.anonymous === 'anonymous' ? 'Anonymous' : item.complainantEmail }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn size="small" :to="`complaint-details/${item._id}`">View Details</v-btn>
      </template>

      <template v-slot:item.status="{ item }">
        <v-btn size="small" color="green-lighten-1" variant="flat">{{ item.status }}</v-btn>
      </template>

      <template v-slot:item.remainingDays="{ item }">
        <div>{{ item.remainingDays }} Days</div>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>

</style>
