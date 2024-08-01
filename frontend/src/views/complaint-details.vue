<script>

// import Titles from "@/components/Titles.vue";

import axios from "axios";
// import {id} from "vuetify/locale";
import {formatDate} from "../../utils/formatDate";
import {getCookie} from "../../utils/cookieUtils";
import {jwtDecode} from "jwt-decode";

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
      filePath: '/uploads/Image.png',
      complaint: '',
      dialog: false,
      studentDialog: false,
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
        const response = await axios.get(`http://localhost:3001/complaint/getOneComplaint/${this.id}`);
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
      if(role== 'student'){
        this.complaint.remark = 'The complaint has canceled by student';
        this.complaint.status = 'closed'
      }
      this.studentDialog = false;
      this.dialog = false;
      try {
        const response = await axios.put('http://localhost:3001/complaint/update-complaint/' + this.complaint._id, this.complaint);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.fetchComplaintDetails();
  }
}
</script>

<template>
  <!--  <Titles title="ComplainDetails"/>-->
  <div class="ml-5 mt-5 mb-2 text-h5">Complaint Details</div>

  <v-card>
    <v-table class="mx-10 border border-opacity-50 rounded-lg" height="" fixed-header>
      <tbody>
        <tr>
          <th class="pl-5 text-left font-weight-black borderR">
            Complain No
          </th>
          <td class="borderR">
            {{complaint._id}}
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
                  <v-label class="ml-2">{{complaint._id}}</v-label>
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
                  <v-label class="ml-2">{{complaint._id}}</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2"><v-label>Complaint Details: </v-label></v-col>
                <v-col cols="">
                  <v-label class="ml-2">{{complaint.complaintDescription}}</v-label>
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
</style>
