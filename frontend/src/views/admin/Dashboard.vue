<script>

import Titles from "@/components/Titles.vue";

export default {
  name: "AdminDashboard",
  components: {Titles},
  data(){
    return {
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
  }
}
</script>

<template>
<!--  <Titles title="Admin Dashboard"/>-->
<!--  <h1 class="ml-5 mt-5 mb-5 " style="font-size: 28px">Admin Dashboard</h1>-->
  <div class="ml-5 mt-5 mb-5 text-h5">Admin Dashboard</div>

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



<!--  <v-row align="center" justify="center" dense>-->
<!--    <v-col cols="12" md="4">-->
<!--      <v-card-->
<!--        class="mx-5 mt-5 bg-red-accent-2"-->
<!--        to="notprocess-complaint"-->
<!--        max-width="344"-->
<!--        prepend-icon="mdi-file-chart-outline"-->
<!--        rel="noopener"-->
<!--        subtitle="12 Complaints not Process yet"-->
<!--        title="12"-->
<!--      ></v-card>-->
<!--    </v-col>-->

<!--    <v-col cols="12" md="4">-->
<!--      <v-card-->
<!--        class="mx-5 mt-5 bg-amber-accent-2"-->
<!--        to="inprocess-complaint"-->
<!--        max-width="344"-->
<!--        prepend-icon="mdi-file-chart-outline"-->
<!--        rel="noopener"-->
<!--        subtitle="4 Complaints Status in process"-->
<!--        title="4"-->
<!--      ></v-card>-->
<!--    </v-col>-->

<!--    <v-col cols="12" md="4">-->
<!--      <v-card-->
<!--        class="mx-5 mt-5 bg-green-accent-3"-->
<!--        to="closed-complaint"-->
<!--        max-width="344"-->
<!--        prepend-icon="mdi-file-chart-outline"-->
<!--        rel="noopener"-->
<!--        subtitle="4 Complaint has been closed"-->
<!--        title="4"-->
<!--      ></v-card>-->
<!--    </v-col>-->
<!--  </v-row>-->

</template>

<style scoped>

</style>
