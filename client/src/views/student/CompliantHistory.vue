<script>

// import Titles from "@/components/Titles.vue";

import axios from "axios";
import { tokenAttach } from "../../../utils/tokenAttach";
import {formatDate} from "../../../utils/formatDate";
const URL = import.meta.env.VITE_URL;

export default {
  name: "ComplaintHistory",
  data() {
    return {
      complaints: null,
      // complains: [
      //   {
      //     number: 1,
      //     regDate: '2024-06-30',
      //     updateDate: '2024-06-30',
      //     status: 'in progress',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 2,
      //     regDate: '2024-06-30',
      //     updateDate: '2024-06-30',
      //     status: 'in progress',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 3,
      //     regDate: '2024-06-30',
      //     updateDate: '2024-06-30',
      //     status: 'Closed',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 4,
      //     regDate: '2024-06-30',
      //     updateDate: '2024-06-30',
      //     status: 'in progress',
      //     action: 'View Details'
      //   },
      //   {
      //     number: 5,
      //     regDate: '2024-06-30',
      //     updateDate: '2024-06-30',
      //     status: 'Closed',
      //     action: 'View Details'
      //   },
      //
      // ],

    }
  },

  methods: {
    formatDate,
    async getComplaint() {
      try {
        const response = await axios.get(URL+'/complaint/getAllComplaint');
        this.complaints = response.data;
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    },


  },

  mounted() {
    tokenAttach();
    this.getComplaint();

  }
}
</script>

<template>
  <!--  <Titles title="Your Complaint History"/>-->
  <div class="ml-5 mt-5 mb-2 text-h5">Your Complaint History</div>
  <v-table class="mx-5" height="430px" fixed-header>
    <thead>
      <tr>
        <th class="text-left font-weight-black">
          Complain number
        </th>
        <th class="text-left font-weight-black">
          Reg Date
        </th>
        <th class="text-left font-weight-black">
          Last Updated Date
        </th>
        <th class="text-left font-weight-black">
          Status
        </th>
        <th class="text-left font-weight-black">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in complaints" :key="item._id">
        <td>{{ item._id }}</td>
        <td>{{ formatDate(item.createdAt) }}</td>
        <td>{{ formatDate(item.updatedAt) }}</td>
        <td>{{ item.status }}</td>
        <td><v-btn size="small" :to="`complaint-details/${item._id}`">View Details</v-btn></td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped></style>
