<script>

import axios from "axios";
import Titles from "@/components/Titles.vue";
// import { getCookie } from '/utils/cookieUtils';
import { tokenAttach } from "/utils/tokenAttach";
const URL = import.meta.env.VITE_URL;
// import router from "@/router";

export default {
  name: "Students",
  components: { Titles },
  data() {
    return {
      users: null,
      editUser: null,
      dialog: false
    }
  },
  methods: {

    async getAll() {
      try {
        const response = await axios.get(URL+'/auth/getAll')
        this.users = response.data.filter(user => user.role === "student");
        // console.log(this.users);
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    },

    async deleteUser(id) {
      try {
        const response = await axios.delete(URL+'/auth/delete-user/' + id)
        console.log(response.data);
        await this.getAll();
      } catch (error) {
        console.error(error);
      }
    },

    edit(user) {
      this.dialog = true;
      this.editUser = user;
      //console.log(user);
    },

    async updateUser(userId, updatedData) {
      this.dialog = false;
      // console.log(userId);
      // console.log(updatedData);
      try {
        const response = await axios.put(URL+'/auth/update-user/' + userId, updatedData);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    },

    // verifyCookie() {
    //   const jwt = getCookie('jwt');
    //   if (!jwt) {
    //     clearInterval(this.checkCookieInterval);
    //     alert("Your session has expired. Please log in again.");
    //     router.push('/auth');
    //   }
    // },

    // startCookieCheck() {
    //   this.checkCookieInterval = setInterval(() => {
    //     this.verifyCookie();
    //   }, 1000); // Check every second
    // }
  },

  mounted() {
    // this.startCookieCheck();

    tokenAttach();
    this.getAll();
  },

  // beforeUnmount() {
  //   if (this.checkCookieInterval) {
  //
  //   }
  // }
}
</script>

<template>

  <div class="d-flex justify-space-between">
    <div>
      <Titles title="admin Dashboard" subtitle="Students Details" />
    </div>

    <v-btn class="mx-5 text-none text-subtitle-1 mt-16 mdi mdi-plus-thick px-2" color="blue" variant="flat"
      to="/auth/register">
      Add students
    </v-btn>
  </div>

  <hr />
  <v-card-text>
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left text-black">
            Name
          </th>
          <th class="text-left text-black">
            Email
          </th>
          <th class="text-left text-black">
            Register Date
          </th>
          <th class="text-left text-black">
            Role
          </th>
          <th class="text-left text-black">
            Age
          </th>
          <th class="text-left text-black">
            Address
          </th>
          <th class="text-left text-black">
            Contact
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.reg_date }}</td>
          <td>{{ item.role }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.contact }}</td>
          <td><v-btn size="small" color="red" @click="deleteUser(item._id)">Delete</v-btn></td>
          <td><v-btn size="small" color="orange" @click="edit(item)">Edit</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </v-card-text>

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">

      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field v-model="editUser.name" label="Name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editUser.address" label="Address" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editUser.age" label="Age"
                  hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editUser.contact" label="Contact"
                  hint="example of helper text only on focus"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="updateUser(this.editUser._id, this.editUser)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped></style>
