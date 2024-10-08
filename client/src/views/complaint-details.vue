<script>

// import Titles from "@/components/Titles.vue";

import axios from "axios";
// import {id} from "vuetify/locale";
import { formatDate } from "../../utils/formatDate";
import { getCookie } from "../../utils/cookieUtils";
import { jwtDecode } from "jwt-decode";
const URL = import.meta.env.VITE_URL;

export default {
  name: "ComplainDetails",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chatDialog: false,
      messages: [],
      newMessage: '',

      filePath: '/uploads/Image.png',
      complaint: '',
      dialog: false,
      studentDialog: false,
      chatInterval: null,
      statusItem: [
        'not process',
        'in process',
        'closed'
      ],


    };
  },

  methods: {
    formatDate,
    async fetchComplaintDetails() {
      try {
        const response = await axios.get(URL+`/complaint/getOneComplaint/${this.id}`);
        this.complaint = response.data;
        // console.log(this.complaint);
      } catch (error) {
        console.error(error);
        // Handle error response
      }
    },

    action() {
      const token = getCookie("jwt");
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken.role);
      if (decodedToken.role == "student") {
        this.studentDialog = true;
      } else
        this.dialog = true;
    },

    async updateComplaint(role) {
      if (role == 'student') {
        this.complaint.remark = 'The complaint has canceled by student';
        this.complaint.status = 'closed'
      }
      this.studentDialog = false;
      this.dialog = false;
      try {
        const response = await axios.put(URL+'/complaint/update-complaint/' + this.complaint._id, this.complaint);
        console.log(response.data);
        // if (response.data) {
        //   alert("Complaint updated successfully");
        // }
      } catch (e) {
        console.error(e);
      }
    },

    async fetchMessages() {
      try {
        const response = await axios.get(URL+`/complaint/getMessages/${this.id}`);
        // console.log(response.data);
        this.messages = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async sendMessage() {
      const token = getCookie("jwt");
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      const email = decodedToken.email;

      try {
        await axios.post(URL+'/complaint/sendMessage', {
          complaintID: this.id,
          userRole,
          email,
          message: this.newMessage
        });
        this.newMessage = '';
        await this.fetchMessages(); // Refresh messages after sending
        this.scrollToBottom();
      } catch (error) {
        console.error(error);
      }
    },

    openChatbox() {
      this.chatDialog = true;
      // console.log("chat box open")
      this.fetchMessages(); // Fetch messages initially when chatbox opens
      this.scrollToBottom();
      this.chatInterval = setInterval(this.fetchMessages, 1000); // Start interval to fetch messages every second
    },
    closeChatbox() {
      this.chatDialog = false;
      // console.log("chat box closed")
      clearInterval(this.chatInterval); // Clear the interval when chatbox closes
      this.chatInterval = null; // Reset the interval ID
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const element = document.getElementById("content");
        element.scrollTop = element.scrollHeight
        // console.log(element.scrollHeight);
      });
    }

  },

  mounted() {
    this.fetchComplaintDetails();
    this.fetchMessages();
  }
}
</script>

<template>
  <v-row>
    <v-col cols="9">
      <v-sheet class="pl-10 ma-2">
        <div class="mt-5 mb-2 text-h5">Complaint Details</div>
      </v-sheet>
    </v-col>
    <v-col>
      <div class="pa-4 text-end">
        <v-btn size="large" color="success" density="comfortable" rounded="pill" class="pe-5 pt-1 pb-1 mr-5"
          prepend-icon="mdi-message-text" variant="elevated" @click="openChatbox">
          CHAT
        </v-btn>
      </div>
    </v-col>
  </v-row>

  <!-- Chat box window -->
  <v-dialog v-model="chatDialog" max-width="550" scrollable>
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <div class="text-h5 ps-2">Complaint Discussion</div>
        <v-btn icon="mdi-close" variant="text" @click="closeChatbox"></v-btn>
      </v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text id="content" class="chat-box">
        <v-timeline density="compact" side="end">
          <v-timeline-item v-for="msg in messages" :key="msg._id">
            <template v-slot:icon>
              <v-avatar image="https://i.pravatar.cc/64"></v-avatar>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="text-h6">{{ msg.userRole }}</v-card-title>
              <v-card-text>{{ msg.message }}</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-divider class="mt-2"></v-divider>
      <v-card-actions>
        <v-textarea v-model="newMessage" class="mt-4 mx-3" rows="1" density="comfortable"
                    variant="outlined" persistent-counter counter="300"></v-textarea>
        <v-btn class="mr-1" color="primary" rounded="xl" @click="sendMessage">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

<!--  <v-dialog v-model="chatDialog" max-width="550" scrollable>-->
<!--    <v-card rounded="lg">-->
<!--      <v-card-title class="d-flex justify-space-between align-center">-->
<!--        <div class="text-h5 text-medium-emphasis ps-2">-->
<!--          Complaint Discussion-->
<!--        </div>-->

<!--        <v-btn icon="mdi-close" variant="text" @click="closeChatbox"></v-btn>-->
<!--      </v-card-title>-->

<!--      <v-divider class="mb-4"></v-divider>-->

<!--      <v-card-text id="content" style="max-width: 540px; height: 380px; padding-left: 50px;">-->
<!--        <v-timeline density="compact" side="end">-->
<!--          <v-timeline-item size="default" v-for="msg in messages" :key="msg._id">-->
<!--            <template v-slot:icon>-->
<!--              <v-avatar image="https://i.pravatar.cc/64"></v-avatar>-->
<!--            </template>-->
<!--            <v-card class="elevation-2">-->
<!--              <v-card-title class="text-h6">-->
<!--                {{ msg.userRole }}-->
<!--              </v-card-title>-->
<!--              <v-card-text style="width: 370px">{{ msg.message }} </v-card-text>-->
<!--            </v-card>-->
<!--          </v-timeline-item>-->
<!--        </v-timeline>-->
<!--      </v-card-text>-->

<!--      <v-divider class="mt-2"></v-divider>-->

<!--      <v-card-actions class="my-2 d-flex justify-end">-->
<!--        <v-textarea v-model="newMessage" :counter="300" class="mt-4 mx-3" rows="1" density="comfortable"-->
<!--          variant="outlined" persistent-counter></v-textarea>-->

<!--        <v-btn class="text-none mr-1" color="primary" rounded="xl" text="Send" variant="flat"-->
<!--          @click="sendMessage"></v-btn>-->
<!--      </v-card-actions>-->
<!--    </v-card>-->
<!--  </v-dialog>-->


  <v-card>
    <v-table class="mx-10 border border-opacity-50 rounded-lg" height="" fixed-header>
      <tbody>
        <tr>
          <th class="pl-5 text-left font-weight-black borderR">
            Complain No
          </th>
          <td class="borderR">
            {{ complaint._id }}
          </td>
          <th class="text-left font-weight-black borderR">
            Reg Date
          </th>
          <td class="text-left borderR" colspan="">
            {{ formatDate(complaint.createdAt) }}
          </td>
          <th class="text-left font-weight-black borderR">
            Last updated Date
          </th>
          <td class="text-left" colspan="">
            {{ formatDate(complaint.updatedAt) }}
          </td>
        </tr>
        <tr>
          <th class="pl-5 text-left font-weight-black borderR">
            Category
          </th>
          <td class="borderR">
            {{ complaint.category1 }}
          </td>
          <th class="borderR font-weight-black">
            Department
          </th>
          <td class="borderR">
            {{ complaint.department }}
          </td>
          <th class="borderR font-weight-black">
            Complaint Type
          </th>
          <td class="text-left">
            {{ complaint.type }}
          </td>
        </tr>
        <tr>
          <th class="pl-5 font-weight-black borderR">Complain Details</th>
          <td colspan="5">{{ complaint.complaintDescription }}</td>
        </tr>
        <tr>
          <th class="pl-5 font-weight-black borderR">Final Status</th>
          <td colspan="1" class="borderR">{{ complaint.status }}</td>
          <th class="pl-5 font-weight-black borderR"></th>
          <th class="pl-5 font-weight-black borderR">Attached File</th>
          <td colspan="2">
            <a :href="filePath" download>
              Image.png
            </a>
          </td>
        </tr>
        <tr>
          <th class="pl-5 font-weight-black borderR">Remarks</th>
          <td colspan="5">{{ complaint.remark }}</td>
        </tr>
        <tr>
          <th class="pl-5 font-weight-black borderR">Action</th>
          <td class="font-weight-black "><v-btn size="small" color="blue-darken-3" @click="action">Take action</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>


  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">

      <v-card class="rounded-lg">
        <v-card-title class="mt-1 ml-6">
          <span class="">Complaint Action</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-sheet class="mx-10 mb-3">
          <v-card-text>
            <v-container class="">
              <v-row>
                <v-col cols="2">
                  <v-label>Complaint No</v-label>
                </v-col>
                <v-col cols="">
                  <v-label class="ml-2">{{ complaint._id }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2" class="mt-5">
                  <v-label>Status</v-label>
                </v-col>
                <v-col cols="3">
                  <v-sheet>
                    <v-select v-model="complaint.status" :items="statusItem" :rules="[v => !!v || 'Item is required']"
                      label="Select Status" required></v-select>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2"><v-label>Remark</v-label></v-col>
                <v-col cols="">
                  <v-sheet>
                    <v-textarea v-model="complaint.remark" label="Enter Remark *"
                      :rules="[v => !!v || 'Remark is required']" auto-grow rows="3" required></v-textarea>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="updateComplaint('notStudent')">
              Save
            </v-btn>
          </v-card-actions>
        </v-sheet>
      </v-card>
    </v-dialog>
  </v-row>

  <v-row justify="center">
    <v-dialog v-model="studentDialog" persistent width="1024">

      <v-card class="rounded-lg">
        <v-card-title class="mt-1 ml-6">
          <span class="">Complaint Action</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-sheet class="mx-10 mb-3">
          <v-card-text>
            <v-container class="">
              <v-row>
                <v-col cols="2">
                  <v-label>Complaint No</v-label>
                </v-col>
                <v-col cols="">
                  <v-label class="ml-2">{{ complaint._id }}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2"><v-label>Complaint Details: </v-label></v-col>
                <v-col cols="">
                  <v-label class="ml-2">{{ complaint.complaintDescription }}</v-label>
                  <!--                  <v-sheet>-->
                  <!--                    <v-textarea disabled v-model="complaint.complaintDescription"-->
                  <!--                                 auto-grow rows="3"></v-textarea>-->
                  <!--                  </v-sheet>-->
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="studentDialog = false">
              Close
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="updateComplaint('student')">
              Cancel Complaint
            </v-btn>
          </v-card-actions>
        </v-sheet>
      </v-card>
    </v-dialog>
  </v-row>


</template>

<style scoped>
.borderR {
  border-right: 1px solid rgba(0, 0, 0, .5);
}
.chat-box{
  height: 300px;
}
</style>
