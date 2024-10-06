<script>
import axios from 'axios';
import { formatDate } from "../../../utils/formatDate"; // Ensure you have a utility to format the date
const URL = import.meta.env.VITE_URL;

export default {
  name: "viewReport",
  data() {
    return {
      startDate: '',
      endDate: '',
      complaints: [],
      valid: false,
      showPrintButton: false
    };
  },
  methods: {
    async fetchComplaints() {
      try {
        const response = await axios.get(URL+`/complaint/report`, {
          params: {
            startDate: this.startDate,
            endDate: this.endDate
          }
        });
        console.log(response.data.complaints);
        this.complaints = response.data.complaints;
      } catch (error) {
        console.error("Error fetching complaints", error);
      }
    },
    printReport() {
      const printContent = document.getElementById('printSection').innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent; // Replace the body content with the print section
      window.print(); // Open the print dialog

      document.body.innerHTML = originalContent; // Revert to the original content after printing
      window.location.reload(); // Reload the page to restore the original state
    },
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.fetchComplaints();
        this.showPrintButton = true;
      } else
        alert('Please Select Date Correctly.');
    },
    formatDate,
  }
}
</script>


<template>
  <v-card class="mx-auto rounded-lg mt-8" max-width="900" elevation="5">
    <v-cart-title class="pl-5 text-h5">
      Grievance Report
    </v-cart-title>
    <v-divider></v-divider>
    <!-- Form Section -->
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="mx-3 my-3">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                type="date"
                :rules="[value => !!value || 'Required.']"
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="endDate"
                label="End Date"
                type="date"
                :rules="[value => !!value || 'Required.']"
                required
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="validate">
            Generate Report
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-form>

    <div id="printSection">
      <v-card-text v-if="complaints.length">
        <div class="text-center mb-4">
          <h1>Student Grievance System</h1>
          <p style="font-size: 18px">Summery report of student grievances</p>
          <br>
          <div>Report Period: {{ startDate }} to {{ endDate }}</div>
        </div>

        <v-table>
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Received Date</th>
              <th>Complaint Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="complaint in complaints" :key="complaint._id">
              <td>{{ complaint._id }}</td>
              <td>{{ formatDate(complaint.createdAt) }}</td>
              <td>{{ complaint.type }}</td>
              <td>{{ complaint.status }}</td>
            </tr>
          </tbody>
        </v-table>

        <div class="mt-4 text-right">
          <div>Total Complaints: {{ complaints.length }}</div>
          <div>Report Generated on: {{ formatDate(new Date()) }}</div>
        </div>
      </v-card-text>
    </div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="showPrintButton" color="primary" @click="printReport">Print Report</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
