<script>

// import Titles from "@/components/Titles.vue";
import { getCookie } from "../../../utils/cookieUtils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
// import PieChart from "@/components/PieChart.vue";

export default {
  name: "AdminDashboard",
  components: {},
  data() {
    return {
      subtitle: "",
      complaints: [
        {
          title: 'Complaints not process yet',
          icon: 'mdi-file-chart-outline',
          count: 0,
          route: '/admin/notprocess-complaint',
          color: 'error'
        },
        {
          title: 'Complaints In Process',
          icon: 'mdi-progress-clock',
          count: 0,
          route: '/admin/inprocess-complaint',
          color: 'amber-accent-2'
        },
        {
          title: 'Complaints are closed',
          icon: 'mdi-check-circle-outline',
          count: 0,
          route: '/admin/closed-complaint',
          color: 'green-accent-3'
        },
      ]
    }
  },

  methods: {
    async fetchData(){
      const token = getCookie("jwt");
      const decodedToken = jwtDecode(token);
      if (decodedToken.role == "admin") {
        this.subtitle = "Admin Dashboard";
      } else if (decodedToken.role == "facultyAdmin") {
        this.subtitle = "Faculty Admin Dashboard"
      } else if (decodedToken.role == "universityAdmin") {
        this.subtitle = "University Admin Dashboard"
      }

      try {
        const response1 = await axios.get(URL+'/complaint/notProcessedComplaint', {
          headers: {
            'role': decodedToken.role
          }
        });
        this.complaints[0].count = response1.data.length;

        const response2 = await axios.get(URL+'/complaint/inProcessedComplaint', {
          headers: {
            'role': decodedToken.role
          }
        });
        this.complaints[1].count = response2.data.length;

        const response3 = await axios.get(URL+'/complaint/closedComplaint', {
          headers: {
            'role': decodedToken.role
          }
        });
        this.complaints[2].count = response3.data.length;

      } catch (error) {
        console.error(error);
      }
    }

  },

  mounted() {
    this.fetchData();
  }
}
</script>

<template>
  <!--  <Titles title="Admin Dashboard"/>-->
  <!--  <h1 class="ml-5 mt-5 mb-5 " style="font-size: 28px">Admin Dashboard</h1>-->
  <div class="ml-5 mt-5 mb-5 text-h5">{{ subtitle }}</div>

  <v-sheet class="mx-5">
    <v-row>
      <v-col cols="12" md="4" v-for="item in complaints" :key="item.title">
        <v-card class="mx-auto" max-width="350" elevation="5" :color="item.color">
          <v-card-item :title="item.title" prepend-icon="mdi-file-chart-outline">
          </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col class="text-h2" cols="6">
                {{ item.count }}
              </v-col>

              <v-col class="text-right" cols="6">
                <v-icon :color="item.color" icon="mdi-weather-hurricane" size="88"></v-icon>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn :to="item.route" variant="elevated" size="small">Full Report</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Include the PieChart component -->
    <!--    <v-row>-->
    <!--      <v-col cols="12">-->
    <!--        <PieChart/>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
  </v-sheet>

</template>

<style scoped></style>
