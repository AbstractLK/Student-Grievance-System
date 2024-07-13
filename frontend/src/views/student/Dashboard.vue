<script>

// import Titles from "@/components/Titles.vue";
import axios from "axios";
import {tokenAttach} from "../../../utils/tokenAttach";

export default {
  name: "Dashboard",
  // components: {Titles},
  data () {
    return {
      complaints: null,

      complains: [
        {
          number: 1,
          status: 'in progress',
          remark: 'okay'
        },
        {
          number: 2,
          status: 'in progress',
          remark: 'okay'
        },
        {
          number: 3,
          status: 'closed',
          remark: 'okay'
        },
        {
          number: 4,
          status: 'in progress',
          remark: 'okay'
        },
        {
          number: 5,
          status: "closed",
          remark: 'okay'
        },

      ],
    }
  },

  methods: {
    async getComplaint() {
      try {
        const response = await axios.get('http://localhost:3001/complaint/getAllComplaint');
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
  <div class="ml-5 mt-5 mb-2 text-h5">Student Dashboard</div>

  <v-row align="center" justify="center" dense>
    <v-col cols="12" md="4">
      <v-card
        class="mx-5 mt-5 bg-red-accent-2"
        max-width="344"
        prepend-icon="mdi-file-chart-outline"
        rel="noopener"
        subtitle="12 Complaints not Process yet"
        title="12"
      ></v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card
        class="mx-5 mt-5 bg-amber-accent-2"
        max-width="344"
        prepend-icon="mdi-file-chart-outline"
        rel="noopener"
        subtitle="4 Complaints Status in process"
        title="4"
      ></v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card
        class="mx-5 mt-5 bg-green-accent-3"
        max-width="344"
        prepend-icon="mdi-file-chart-outline"
        rel="noopener"
        subtitle="4 Complaint has been closed"
        title="4"
      ></v-card>
    </v-col>
  </v-row>

  <div class="text-center mt-10 mb-5" style="font-size: 22px">Complaint Details</div>
  <v-table
    class="mx-5"
    height="330px"
    fixed-header
  >
    <thead>
    <tr>
      <th class="text-left font-weight-black">
        Complain number
      </th>
      <th class="text-left font-weight-black">
        Status
      </th>
      <th class="text-left font-weight-black">
        Remark
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in complaints"
      :key="item._id"
    >
      <td>{{ item._id }}</td>
      <td>{{ item.status }}</td>
      <td>{{ item.remark }}</td>
    </tr>
    </tbody>
  </v-table>

</template>

<style scoped>

</style>
