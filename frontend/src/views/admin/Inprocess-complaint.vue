<script>

import Titles from "@/components/Titles.vue";

export default {
  name: "InProcessComplaint",
  components: {Titles},
  data () {
    return {
      complains: [
        {
          number: 1,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'in process',
          action: 'View Details'
        },
        {
          number: 2,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'in process',
          action: 'View Details'
        },
        {
          number: 3,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'in process',
          action: 'View Details'
        },
        {
          number: 4,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'in process',
          action: 'View Details'
        },
        {
          number: 5,
          name: 'Amila',
          regDate: '2024-06-30',
          status: 'in process',
          action: 'View Details'
        },

      ],
    }
  },
}
</script>

<template>
<!--  <Titles title="In Process Complaint"/>-->

  <div class="ml-5 mt-5 mb-2 text-h5">In Process Complaint</div>
  <v-table
    class="mx-5"
    height="330px"
    fixed-header
  >
    <thead>
    <tr>
      <th class="text-left font-weight-black">
        Complain No
      </th>
      <th class="text-left font-weight-black">
        Complainant name
      </th>
      <th class="text-left font-weight-black">
        Reg Date
      </th>
      <th class="text-left font-weight-black">
        Status
      </th>
      <th class="text-left font-weight-black">
        Action
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in complains"
      :key="item.number"
    >
      <td>{{ item.number }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.regDate }}</td>
      <td><v-btn size="small" color="orange-lighten-1" variant="flat">{{ item.status }}</v-btn></td>
      <td><v-btn size="small" to="/admin/complaint-details">{{ item.action }}</v-btn></td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
