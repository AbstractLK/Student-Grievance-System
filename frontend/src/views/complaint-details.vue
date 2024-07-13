<script>

// import Titles from "@/components/Titles.vue";

import axios from "axios";
// import {id} from "vuetify/locale";
import {formatDate} from "../../utils/formatDate";

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
      complaint: {},
      dialog: false,
      editComplaint: [
        { name: '' }
      ],
      statusItem: [
        'in process',
        'closed'
      ],
      status: 'in process',


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
      this.dialog = true;
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
          <td class="text-left" colspan="3">
            {{ formatDate(complaint.createdAt) }}
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
          <th class="pl-5 font-weight-black borderR">File</th>
          <td colspan="5">no file</td>
        </tr>
        <tr>
          <th class="pl-5 font-weight-black borderR">Final Status</th>
          <td colspan="5">{{ complaint.status }}</td>
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
                  <v-label class="ml-2">07</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2" class="mt-5">
                  <v-label>Status</v-label>
                </v-col>
                <v-col cols="3">
                  <v-sheet>
                    <v-select v-model="status" :items="statusItem" :rules="[v => !!v || 'Item is required']"
                      label="Select Status" required></v-select>
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2"><v-label>Remark</v-label></v-col>
                <v-col cols="">
                  <v-sheet>
                    <v-textarea v-model="editComplaint.name" label="Enter Remark *"
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
            <v-btn color="blue-darken-1" variant="text">
              Save
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
