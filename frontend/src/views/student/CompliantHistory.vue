<script>

// import Titles from "@/components/Titles.vue";

export default {
  name: "ComplaintHistory",
  data () {
    return {
      complains: [
        {
          number: 1,
          regDate: '2024-06-30',
          updateDate: '2024-06-30',
          status: 'in progress',
          action: 'View Details'
        },
        {
          number: 2,
          regDate: '2024-06-30',
          updateDate: '2024-06-30',
          status: 'in progress',
          action: 'View Details'
        },
        {
          number: 3,
          regDate: '2024-06-30',
          updateDate: '2024-06-30',
          status: 'Closed',
          action: 'View Details'
        },
        {
          number: 4,
          regDate: '2024-06-30',
          updateDate: '2024-06-30',
          status: 'in progress',
          action: 'View Details'
        },
        {
          number: 5,
          regDate: '2024-06-30',
          updateDate: '2024-06-30',
          status: 'Closed',
          action: 'View Details'
        },

      ],
    }
  },
}
</script>

<template>
<!--  <Titles title="Your Complaint History"/>-->
  <div class="ml-5 mt-5 mb-2 text-h5">Your Complaint History</div>
  <v-table
    class="mx-5"
    height="330px"
    fixed-header
  >
    <thead>
    <tr>
      <th class="text-left font-weight-black">
        Complain number
      </th>
      <th class="text-left font-weight-black">
        Reg Date
      </th>
      <th class="text-left font-weight-black">
        Last Updated Date
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
      <td>{{ item.regDate }}</td>
      <td>{{ item.updateDate }}</td>
      <td>{{ item.status }}</td>
      <td><v-btn size="small">{{ item.action }}</v-btn></td>
    </tr>
    </tbody>
  </v-table>

</template>

<style scoped>

</style>
