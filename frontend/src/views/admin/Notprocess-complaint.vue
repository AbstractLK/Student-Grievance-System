<script>

// import Titles from "@/components/Titles.vue";

import axios from "axios";
import {formatDate} from "../../../utils/formatDate";

export default {
  name: "notProcessComplaint",
  // components: {Titles},
  data () {
    return {
      complaints: {},
      // complains: [
      //   {
      //     number: 1,
      //     name: 'Amila',
      //     regDate: '2024-06-30',
      //     remainDays: '15 days left',
      //     status: 'Not process yet',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 2,
      //     name: 'Amila',
      //     regDate: '2024-06-30',
      //     remainDays: '15 days left',
      //     status: 'Not process yet',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 3,
      //     name: 'Amila',
      //     regDate: '2024-06-30',
      //     remainDays: '15 days left',
      //     status: 'Not process yet',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 4,
      //     name: 'Amila',
      //     regDate: '2024-06-30',
      //     remainDays: '15 days left',
      //     status: 'Not process yet',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 5,
      //     name: 'Amila',
      //     regDate: '2024-06-30',
      //     remainDays: '15 days left',
      //     status: 'Not process yet',
      //     action: 'View Details'
      //   },
      //
      // ],
    }
  },

  methods: {
    formatDate,
    async fetchNotProcessedComplaints() {
      try {
        const response = await axios.get('http://localhost:3001/complaint/notProcessedComplaint');
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
<!--  <Titles title="Not Process Complaint"/>-->

  <div class="ml-5 mt-5 mb-2 text-h5">Not Process Complaint</div>
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
      <td><v-btn size="small" color="red-lighten-1" variant="flat">{{ item.status }}</v-btn></td>
      <td><v-btn size="small" :to="`complaint-details/${item._id}`">View Details</v-btn></td>
      <td>{{ item.remainingDays }} Days</td>
    </tr>
    </tbody>
  </v-table>

</template>


