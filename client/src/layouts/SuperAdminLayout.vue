<script setup>
import { ref, onMounted } from 'vue'
import { jwtDecode } from "jwt-decode";
import { getCookie } from '../../utils/cookieUtils'

const drawer = ref(true)

const items = ref([
  {
    title: 'Manage Accounts',
    prependIcon: 'mdi-view-dashboard-outline',
    link: true,
    value: "accounts",
    to: "/super-admin/accounts"
  },
  {
    title: 'Add Accounts',
    prependIcon: 'mdi-file-chart-outline',
    link: true,
    value: "addAccounts",
    to: "/super-admin/add-account"
  },
  // {
  //   title: 'Complain History ',
  //   prependIcon: 'mdi-calendar',
  //   link: true,
  //   value: "complaint-history",
  //   to: "/student/complaint-history"
  // },
  // {
  //   title: 'Team',
  //   prependIcon: 'mdi-account-group',
  //   link: true,
  //   value: "Messages",
  //   to: "/student/messages"
  // },
  // {
  //   title: 'Projects',
  //   prependIcon: 'mdi-briefcase-outline',
  //   link: true,
  //   value: "Classes",
  //   to: "/student/classes"
  // },


])

const email = ref('');
const name = ref('');

const fetchUserName = () => {
  const token = getCookie("jwt");
  const decodedToken = jwtDecode(token);
  email.value = decodedToken.email;
  name.value = decodedToken.name;
  // console.log(email.value, name.value);
}

onMounted(() => {
  fetchUserName();
  // console.log(email.value, name.value);
});


</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" class="pt-2 bg-blue-grey-darken-1">
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
              <!-- <v-list-item append-icon="mdi-cog-outline" link title="Change password" value="changePass"
                to="/admin/change-password" /> -->
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

<style scoped></style>
