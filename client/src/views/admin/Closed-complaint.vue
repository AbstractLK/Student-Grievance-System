<script>

// import Titles from "@/components/Titles.vue";

import { formatDate } from "../../../utils/formatDate";
import axios from "axios";
import { getCookie } from "../../../utils/cookieUtils";
import { jwtDecode } from "jwt-decode";

export default {
  name: "closedComplaint",
  // components: {Titles},
  data() {
    return {
      type: [
        'Admission ',
        'Finance ',
        'exams ',
        'Lecture ',
        'Timetable ',
        'paper & Re-evaluation ',
        'Other '
      ],
      selectedType: null,
      complaints: [],
      search: '',
      headers: [
        { title: 'Complain No', align: 'start', key: '_id' },
        { title: 'Complainant Email', key: 'complainantEmail' },
        { title: 'Type', key: 'type' },
        { title: 'Reg Date', key: 'createdAt' },
        { title: 'Status', key: 'status' },
        { title: 'Action', key: 'action', sortable: false },
        { title: 'Remaining Days', key: 'remainingDays' },
      ],
    }
  },

  computed: {
    // Filter complaints based on selected type and search
    filteredComplaints() {
      return this.complaints.filter(complaint => {
        const matchesType = this.selectedType ? complaint.type.trim().toLowerCase() === this.selectedType.trim().toLowerCase() : true;
        const matchesSearch = this.search ? complaint.complainantEmail.includes(this.search) || complaint._id.includes(this.search) : true;
        //console.log(matchesType, matchesSearch);
        // console.log("complaint type: ", complaint.type.trim().toLowerCase(), "selected type: ", this.selectedType.trim().toLowerCase());
        // console.log(this.selectedType, this.search);
        return matchesType && matchesSearch;
      });
    }
  },

  methods: {
    formatDate,
    formatRemainingDays(days) {
      if (days >= 0) {
        return (days + ' Days')
      } else if (days < 0) {
        return ("Overdue " + (days * -1) + " Days")
      }
    },
    async fetchNotProcessedComplaints() {
      try {
        const token = getCookie("jwt");
        const decodedToken = jwtDecode(token);
        const response = await axios.get('http://localhost:3001/complaint/closedComplaint', {
          headers: {
            'role': decodedToken.role
          }
        });
        this.complaints = response.data;
        
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

      <!--          <v-spacer></v-spacer>-->
      <v-label class="ml-16 pl-16">Filter</v-label>
      <v-select clearable class="mx-5 mt-5" width="0" density="compact" label="Select Type" :items="type"
        v-model="selectedType" variant="solo"></v-select>

      <v-text-field v-model="search" density="compact" label="Search by Email or Complaint ID"
        prepend-inner-icon="mdi-magnify" variant="outlined" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table :headers="headers" :items="filteredComplaints" :search="search" class="mx-5" height="430px"
      fixed-header>
      <template v-slot:item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template v-slot:item.complainantEmail="{ item }">
        {{ item.anonymous === 'anonymous' ? 'Anonymous' : item.complainantEmail }}
      </template>

      <template v-slot:item.type="{ item }">
        {{ item.type }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn size="small" :to="`complaint-details/${item._id}`">View Details</v-btn>
      </template>

      <template v-slot:item.status="{ item }">
        <v-btn size="small" style="width: 90px; font-size: 10px;" color="green-lighten-1" variant="flat">{{ item.status
          }}</v-btn>
      </template>

      <template v-slot:item.remainingDays="{ item }">
        <div>{{ formatRemainingDays(item.remainingDays) }}</div>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped></style>
