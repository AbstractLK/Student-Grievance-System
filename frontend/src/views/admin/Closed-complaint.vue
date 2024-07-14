<script>

// import Titles from "@/components/Titles.vue";

import {formatDate} from "../../../utils/formatDate";
import axios from "axios";

export default {
  name: "closedComplaint",
  // components: {Titles},
  data () {
    return {
      complaints: {},
      complains: [
        {
          number: 1,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'Closed',
          action: 'View Details'
        },
        {
          number: 2,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'Closed',
          action: 'View Details'
        },
        {
          number: 3,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'Closed',
          action: 'View Details'
        },
        {
          number: 4,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'Closed',
          action: 'View Details'
        },
        {
          number: 5,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'Closed',
          action: 'View Details'
        },

      ],
    }
  },

  methods: {
    formatDate,
    async fetchNotProcessedComplaints() {
      try {
        const response = await axios.get('http://localhost:3001/complaint/closedComplaint');
        this.complaints = response.data;
        // console.log(response.data);
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
<!--  <Titles title="Closed Complaint"/>-->

  <div class="ml-5 mt-5 mb-2 text-h5">Closed Complaint</div>
  <v-table
    class="mx-5"
    height="430px"
    fixed-header
  >
    <thead>
    <tr>
      <th class="text-left font-weight-black">
        Complain No
      </th>
      <th class="text-left font-weight-black">
        Complainant Email
      </th>
      <th class="text-left font-weight-black">
        Reg Date
      </th>
      <th class="text-left font-weight-black">
        Status
      </th>
      <th class="text-left font-weight-black">
        Action
      </th>
      <th class="text-left font-weight-black">
        Remaining Days
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in complaints"
      :key="item._id"
    >
      <td>{{ item._id }}</td>
      <td>{{ item.anonymous === 'anonymous' ? 'Anonymous' : item.complainantEmail }}</td>
      <td>{{ formatDate(item.createdAt) }}</td>
      <td><v-btn size="small" color="green-lighten-1" variant="flat">{{ item.status }}</v-btn></td>
      <td><v-btn size="small" :to="`complaint-details/${item._id}`">View Details</v-btn></td>
      <td>{{ item.remainingDays }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
