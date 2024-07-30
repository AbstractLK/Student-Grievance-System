<script>

import Titles from "@/components/Titles.vue";
import {getCookie} from "../../../utils/cookieUtils";
import {jwtDecode} from "jwt-decode";

export default {
  name: "AdminDashboard",
  components: {Titles},
  data(){
    return {
      subtitle: "",
      complaints : [
        {
          title: 'Complaints not process yet',
          icon: 'mdi-file-chart-outline',
          count: 12,
          route: '/admin/notprocess-complaint',
          color: 'error'
        },
        {
          title: 'Complaints In Process',
          icon: 'mdi-progress-clock',
          count: 8,
          route: '/admin/inprocess-complaint',
          color: 'amber-accent-2'
        },
        {
          title: 'Complaints are closed',
          icon: 'mdi-check-circle-outline',
          count: 5,
          route: '/admin/closed-complaint',
          color: 'green-accent-3'
        },
      ]
    }
  },

  methods: {

  },

mounted(){
    const token = getCookie("jwt");
    const decodedToken = jwtDecode(token);
    if(decodedToken.role=="teacher"){
      this.subtitle = "Admin Dashboard";
    }else if(decodedToken.role=="facultyAdmin"){
      this.subtitle = "Faculty Admin Dashboard"
    }else if(decodedToken.role=="universityAdmin"){
      this.subtitle = "University Admin Dashboard"
    }
  }
}
</script>

<template>
<!--  <Titles title="Admin Dashboard"/>-->
<!--  <h1 class="ml-5 mt-5 mb-5 " style="font-size: 28px">Admin Dashboard</h1>-->
  <div class="ml-5 mt-5 mb-5 text-h5">{{ subtitle }}</div>

  <v-sheet class="mx-5">
    <v-row>
      <v-col cols="12" md="4" v-for="item in complaints"
             :key="item.title">
        <v-card class="mx-auto" max-width="350" elevation="5" :color="item.color">
          <v-card-item :title="item.title" prepend-icon="mdi-file-chart-outline">
          </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col
                class="text-h2"
                cols="6"
              >
                {{item.count}}
              </v-col>

              <v-col class="text-right" cols="6">
                <v-icon
                  :color="item.color"
                  icon="mdi-weather-hurricane"
                  size="88"
                ></v-icon>
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
  </v-sheet>

</template>

<style scoped>

</style>
