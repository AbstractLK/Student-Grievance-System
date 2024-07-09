<script>

// import Titles from "@/components/Titles.vue";

export default {
  name: "ComplainDetails",
  data() {
    return {
      dialog: false,
      editComplaint: [
        { name: ''}
      ],
      statusItem:[
        'in process',
        'closed'
      ],
      status: 'in process',

      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Age', value: 'age' },
        { text: 'Address', value: 'address' },
      ],
      items: [
        { name: 'John Doe', age: 25, address: '123 Main St' },
        { name: 'Jane Doe', age: 30, address: '456 Maple Ave' },
        { name: 'Sam Smith', age: 22, address: '789 Elm St' },
      ]
    };
  },

  methods:{
    action(){
      // alert("say hi");
      this.dialog = true;
    }
  }
}
</script>

<template>
<!--  <Titles title="ComplainDetails"/>-->
  <div class="ml-5 mt-5 mb-2 text-h5">Complaint Details</div>
<!--  <v-container class="border">-->
<!--    <v-row no-gutters class="border">-->
<!--      <v-col cols="12" md="2" class="border">Complaint No</v-col>-->
<!--      <v-col cols="12" md="2" class="border">7</v-col>-->
<!--      <v-col cols="12" md="2">Category</v-col>-->
<!--      <v-col cols="12" md="2">1</v-col>-->
<!--      <v-col cols="12" md="2">Reg Date</v-col>-->
<!--      <v-col cols="12" md="2">2024-03-30 22:50:56</v-col>-->
<!--    </v-row>-->
<!--  </v-container>-->


 <v-card>
   <v-table
     class="mx-10 border border-opacity-50 rounded-lg"
     height=""
     fixed-header
   >
     <tbody>
     <tr>
       <th class="pl-5 text-left font-weight-black borderR">
         Complain No
       </th>
       <td class="borderR">
         7
       </td>
       <th class="text-left font-weight-black borderR">
         Reg Date
       </th>
       <td class="text-left" colspan="3">
         2024-03-30 22:50:56
       </td>
     </tr>
     <tr>
       <th class="pl-5 text-left font-weight-black borderR">
         Category
       </th>
       <td class="borderR">
         department
       </td>
       <th class="borderR font-weight-black">
         Department
       </th>
       <td class="borderR">
         Applied Computing
       </td>
       <th class="borderR font-weight-black">
         Complaint Type
       </th>
       <td class="text-left">
         exam
       </td>
     </tr>
     <tr>
       <th class="pl-5 font-weight-black borderR">Complain Details</th>
       <td colspan="5">not available learning resources</td>
     </tr>
     <tr>
       <th class="pl-5 font-weight-black borderR">File</th>
       <td colspan="5">fdh fdhfdh fdhf</td>
     </tr>
     <tr>
       <th class="pl-5 font-weight-black borderR">Final Status</th>
       <td colspan="5">in process</td>
     </tr>
     <tr>
       <th class="pl-5 font-weight-black borderR">Action</th>
       <td class="font-weight-black "><v-btn size="small" color="blue-darken-3" @click="action">Take action</v-btn></td>
     </tr>

     <!--    <tr-->
     <!--      v-for="item in complains"-->
     <!--      :key="item.number"-->
     <!--    >-->
     <!--      <td>{{ item.number }}</td>-->
     <!--      <td>{{ item.name }}</td>-->
     <!--      <td>{{ item.regDate }}</td>-->
     <!--      <td><v-btn size="small" color="green-lighten-1" variant="flat">{{ item.status }}</v-btn></td>-->
     <!--      <td><v-btn size="small" to="/admin/complaint-details">{{ item.action }}</v-btn></td>-->
     <!--    </tr>-->
     </tbody>
   </v-table>
 </v-card>


<!--  <v-container>-->
<!--    <v-data-table-->
<!--      :headers="headers"-->
<!--      :items="items"-->
<!--      class="elevation-1 bordered-table"-->
<!--    >-->
<!--      <template v-slot:top>-->
<!--        <v-toolbar flat>-->
<!--          <v-toolbar-title>My Table with Borders</v-toolbar-title>-->
<!--          <v-divider class="mx-4" inset vertical></v-divider>-->
<!--        </v-toolbar>-->
<!--      </template>-->
<!--      <template v-slot:item="{ item }">-->
<!--        <tr>-->
<!--          <td>{{ item.name }}</td>-->
<!--          <td>{{ item.age }}</td>-->
<!--          <td>{{ item.address }}</td>-->
<!--        </tr>-->
<!--      </template>-->
<!--    </v-data-table>-->
<!--  </v-container>-->


  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >

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
                  <v-select
                    v-model="status"
                    :items="statusItem"
                    :rules="[v => !!v || 'Item is required']"
                    label="Select Status"
                    required
                  ></v-select>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"><v-label>Remark</v-label></v-col>
              <v-col cols="">
                <v-sheet>
                  <v-textarea
                    v-model="editComplaint.name"
                    label="Enter Remark *"
                    :rules="[v => !!v || 'Remark is required']"
                    auto-grow
                    rows="3"
                    required
                  ></v-textarea>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="updateUser(this.editComplaint._id, this.editComplaint)"
          >
            Save
          </v-btn>
        </v-card-actions>
        </v-sheet>
        </v-card>
    </v-dialog>
  </v-row>


</template>

<style scoped>
  .borderR{
    border-right: 1px solid rgba(0, 0, 0, .5);
  }
</style>
