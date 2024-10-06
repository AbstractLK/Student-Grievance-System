<script setup>
import { ref, onMounted } from 'vue'
import { jwtDecode } from "jwt-decode";
import { getCookie } from '../../utils/cookieUtils'

const drawer = ref(true)

const items = ref([
  {
    title: 'Dashboard',
    prependIcon: 'mdi-view-dashboard-outline',
    link: true,
    value: "Dashboard",
    to: "/admin/dashboard"
  },
  {
    title: 'Not Process Complaint',
    prependIcon: 'mdi mdi-note-alert-outline',
    link: true,
    value: "notprocess-complaint",
    to: "/admin/notprocess-complaint"
  },
  {
    title: 'Pending Complaint ',
    prependIcon: 'mdi mdi-note-search-outline',
    link: true,
    value: "inprocess-complaint",
    to: "/admin/inprocess-complaint"
  },
  {
    title: 'Closed Complaint ',
    prependIcon: 'mdi mdi-note-check-outline',
    link: true,
    value: "closed-complaint",
    to: "/admin/closed-complaint"
  },
  {
    title: 'View Report ',
    prependIcon: 'mdi-file-chart-outline',
    link: true,
    value: "view-report",
    to: "/admin/view-report"
  },
  // {
  //   title: 'students ',
  //   prependIcon: 'mdi-file-chart-outline',
  //   link: true,
  //   value: "students",
  //   to: "/admin/students"
  // },


])

const email = ref('');
const name = ref('');

const changePassword = () => {
  const token = getCookie("jwt");
  const decodedToken = jwtDecode(token);
  email.value = decodedToken.email;
  name.value = decodedToken.name;
  // console.log(email.value, name.value);
}

onMounted(() => {
  changePassword();
  // console.log(email.value, name.value);
});

</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" class="pt-2 bg-blue-grey-darken-1 no-print">
      <v-list>
        <v-list-item prepend-avatar="../assets/avatar.png" :subtitle="email" :title="name"></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" item-props :items="items" nav />
      <template #append>
        <v-list-item class="ma-2 " link nav prepend-icon="mdi-logout" title="Logout" to="/auth/" />
      </template>
    </v-navigation-drawer>



    <v-app-bar border="b" class="ps-4" flat>
      <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />

      <h1 class="ma-5 text-uppercase" style="font-size: 28px">Student Grievance System</h1>
      <!--      <h2 class="ma-5" style="font-size: " >Student Grievance System</h2>-->
      <!--      <v-app-bar-title>Student Grievance System</v-app-bar-title>-->

      <template #append>
        <v-btn class="text-none me-2" height="48" icon slim>
          <v-avatar color="surface-light" size="32">
            <v-icon icon="mdi-cog-outline"></v-icon>
          </v-avatar>

          <v-menu activator="parent">
            <v-list density="compact" nav>
              <!--              <v-list-item append-icon="mdi-account-circle" link title="Profile" value="Profile" to="/student/user-profile" />-->
              <v-list-item append-icon="mdi-cog-outline" link title="Change password" value="changePass"
                to="/admin/change-password" />
              <v-divider />
              <v-list-item append-icon="mdi-logout" link title="Logout" value="Logout" to="/auth/" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <div class="pa-4">
        <v-sheet>

          <router-view />
        </v-sheet>
      </div>
    </v-main>
  </v-layout>
</template>

<!--<template>-->
<!--  <v-card>-->
<!--    <v-layout>-->
<!--      <v-navigation-drawer-->
<!--        expand-on-hover-->
<!--        rail-->
<!--      >-->
<!--        <v-list>-->
<!--          <v-list-item-->
<!--            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"-->
<!--            title="Sandra Adams"-->
<!--            subtitle="sandra_a88@gmailcom"-->
<!--          ></v-list-item>-->
<!--        </v-list>-->

<!--        <v-divider></v-divider>-->

<!--        <v-list density="compact" nav>-->
<!--          <v-list-item prepend-icon="mdi mdi-monitor-dashboard" title="Dashboard" value="Dashboard" to="/student/dashboard"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi mdi-message-text" title="Messages" value="Messages" to="/student/messages"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi mdi-notebook-edit-outline" title="Reports" value="Reports" to="/student/reports"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi-folder" title="Classes" value="Classes" to="/student/classes"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>-->
<!--          <v-list-item prepend-icon="mdi mdi-logout" title="Logout" value="Logout" to="/auth/"></v-list-item>-->
<!--        </v-list>-->
<!--      </v-navigation-drawer>-->

<!--      <v-main >-->
<!--        <router-view/>-->
<!--      </v-main>-->
<!--    </v-layout>-->
<!--  </v-card>-->
<!--</template>-->

<style scoped></style>
