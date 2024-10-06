<script>

// import Titles from "@/components/Titles.vue";

import axios from "axios";
import { formatDate } from "../../../utils/formatDate";
import { getCookie } from "../../../utils/cookieUtils";
import { jwtDecode } from "jwt-decode";
const URL = import.meta.env.VITE_URL;

export default {
  name: "notProcessComplaint",
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
      role: 'admin',
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
        const response = await axios.get(URL+'/complaint/notProcessedComplaint', {
          headers: {
            'role': decodedToken.role
          }
        });

        this.complaints = response.data;
        console.log(response.data.length);
        
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
  <!--  <div class="ml-5 mt-5 mb-2 text-h5">Not Process Complaint</div>-->

  <v-card flat>
    <v-card-title style="height: 70px" class="d-flex align-center pe-2 text-h5 mb-2">
      <v-icon icon="mdi-alert-circle"></v-icon> &nbsp;
      Not Processed Complaints

      <!--          <v-spacer></v-spacer>-->
      <v-label class="ml-16 pl-16">Filter</v-label>
      <v-select clearable class="mx-5 mt-5" width="0" density="compact" label="Select Type" :items="type"
        v-model="selectedType" variant="solo"></v-select>

      <v-text-field v-model="search" density="compact" label="Search by Email or Complaint ID"
        prepend-inner-icon="mdi-magnify" variant="outlined" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <!-- Use filteredComplaints for the v-data-table items -->
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
        <v-btn size="small" style="width: 90px; font-size: 10px;" color="red-lighten-1" variant="flat">{{ item.status
          }}</v-btn>
      </template>

      <template v-slot:item.remainingDays="{ item }">
        <div>{{ formatRemainingDays(item.remainingDays) }}</div>
      </template>
    </v-data-table>
  </v-card>
</template>

<!--<template>-->
<!--  <v-card flat>-->
<!--    <v-card-title class="d-flex align-center pe-2">-->
<!--      <v-icon icon="mdi-alert-circle"></v-icon> &nbsp;-->
<!--      Not Processed Complaints-->

<!--      <v-spacer></v-spacer>-->

<!--      <v-text-field-->
<!--        v-model="search"-->
<!--        density="compact"-->
<!--        label="Search"-->
<!--        prepend-inner-icon="mdi-magnify"-->
<!--        variant="solo-filled"-->
<!--        flat-->
<!--        hide-details-->
<!--        single-line-->
<!--      ></v-text-field>-->
<!--    </v-card-title>-->

<!--    <v-divider></v-divider>-->

<!--    <v-data-table-->
<!--      v-model:search="search"-->
<!--      :items="complaints"-->
<!--      :headers="[-->
<!--        { text: 'Complain No', value: '_id' },-->
<!--        { text: 'Complainant Email', value: 'complainantEmail' },-->
<!--        { text: 'Reg Date', value: 'createdAt' },-->
<!--        { text: 'Status', value: 'status' },-->
<!--        { text: 'Action', value: 'action' },-->
<!--        { text: 'Remaining Days', value: 'remainingDays' }-->
<!--      ]"-->
<!--      item-value="_id"-->
<!--    >-->
<!--      <template v-slot:item.complainantEmail="{ item }">-->
<!--        <div>{{ item.anonymous === 'anonymous' ? 'Anonymous' : item.complainantEmail }}</div>-->
<!--      </template>-->

<!--      <template v-slot:item.createdAt="{ item }">-->
<!--        <div>{{ formatDate(item.createdAt) }}</div>-->
<!--      </template>-->

<!--      <template v-slot:item.status="{ item }">-->
<!--        <v-btn size="small" color="red-lighten-1" variant="flat">{{ item.status }}</v-btn>-->
<!--      </template>-->

<!--      <template v-slot:item.action="{ item }">-->
<!--        <v-btn size="small" :to="`complaint-details/${item._id}`">View Details</v-btn>-->
<!--      </template>-->

<!--      <template v-slot:item.remainingDays="{ item }">-->
<!--        <div>{{ item.remainingDays }} Days</div>-->
<!--      </template>-->
<!--    </v-data-table>-->
<!--  </v-card>-->
<!--</template>-->

<!--<template>-->
<!--&lt;!&ndash;  <Titles title="Not Process Complaint"/>&ndash;&gt;-->
<!--  -->

<!--  <div class="ml-5 mt-5 mb-2 text-h5">Not Process Complaint</div>-->
<!--  <div style="background-color: greenyellow">filter</div>-->
<!--  <v-table-->
<!--    class="mx-5"-->
<!--    height="430px"-->
<!--    fixed-header-->
<!--  >-->
<!--    <thead>-->
<!--    <tr>-->
<!--      <th class="text-left font-weight-black">-->
<!--        Complain No-->
<!--      </th>-->
<!--      <th class="text-left font-weight-black">-->
<!--        Complainant Email-->
<!--      </th>-->
<!--      <th class="text-left font-weight-black">-->
<!--        Reg Date-->
<!--      </th>-->
<!--      <th class="text-left font-weight-black">-->
<!--        Status-->
<!--      </th>-->
<!--      <th class="text-left font-weight-black">-->
<!--        Action-->
<!--      </th>-->
<!--      <th class="text-left font-weight-black">-->
<!--        Remaining Days-->
<!--      </th>-->
<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody>-->
<!--    <tr-->
<!--      v-for="item in complaints"-->
<!--      :key="item._id"-->
<!--    >-->
<!--      <td>{{ item._id }}</td>-->
<!--      <td>{{ item.anonymous === 'anonymous' ? 'Anonymous' : item.complainantEmail }}</td>-->
<!--      <td>{{ formatDate(item.createdAt) }}</td>-->
<!--      <td><v-btn size="small" color="red-lighten-1" variant="flat">{{ item.status }}</v-btn></td>-->
<!--      <td><v-btn size="small" :to="`complaint-details/${item._id}`">View Details</v-btn></td>-->
<!--      <td>{{ item.remainingDays }} Days</td>-->
<!--    </tr>-->
<!--    </tbody>-->
<!--  </v-table>-->

<!--</template>-->
