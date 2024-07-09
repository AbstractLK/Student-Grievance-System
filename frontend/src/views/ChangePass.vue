<script>

export default {
  name: "ChangePass"
}
</script>

<template>
<!--  <h1>Change Pass</h1>-->

  <v-card
    class="mx-auto rounded-lg mt-8"
    max-width="900"
    elevation="5"
    title="Change password"
  >
    <v-divider></v-divider>
    <div class="mx-16 my-3">
    <v-container>
      <v-row>
        <v-col cols="3" class=""><v-label>Current Password</v-label></v-col>
        <v-col cols="9">
          <v-text-field
            density="compact"
            v-model="first"
            color="primary"
            label="Current Password"
            variant="filled"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class=""><v-label>Current Password</v-label></v-col>
        <v-col cols="9">
          <v-text-field
            density="compact"
            v-model="last"
            color="primary"
            label="New password"
            variant="filled"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class=""><v-label>Current Password</v-label></v-col>
        <v-col cols="9">
          <v-text-field
            density="compact"
            v-model="email"
            color="primary"
            label="Confirm New password"
            variant="filled"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success">
        Save
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
    </div>
  </v-card>

<!--  <div class="ml-5 mt-5 mb-2 text-h5">Change Admin password</div>-->
<!--  <v-card variant="outlined" class="mx-5 my- py-2 rounded-lg">-->
<!--    <v-card-title>-->
<!--&lt;!&ndash;      <span class="text-h5">Change Admin password</span>&ndash;&gt;-->
<!--    </v-card-title>-->
<!--    <v-card-text>-->
<!--      <v-container>-->
<!--        <v-row>-->
<!--          <v-col cols="2" class="mt-3"><v-label>Current Password</v-label></v-col>-->
<!--          <v-col cols="5">-->
<!--            <v-text-field-->
<!--              variant="outlined"-->
<!--              v-model="editUser"-->
<!--              label="Name"-->
<!--              required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-col cols="2" class="mt-3"><v-label>Current Password</v-label></v-col>-->
<!--          <v-col cols="5">-->
<!--            <v-text-field-->
<!--              variant="outlined"-->
<!--              v-model="editUser"-->
<!--              label="Name"-->
<!--              required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-col cols="2" class="mt-3"><v-label>Current Password</v-label></v-col>-->
<!--          <v-col cols="5">-->
<!--            <v-text-field-->
<!--              variant="outlined"-->
<!--              v-model="editUser"-->
<!--              label="Name"-->
<!--              required-->
<!--            ></v-text-field>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
<!--    </v-card-text>-->
<!--    <v-card-actions>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn-->
<!--        color="blue-darken-1"-->
<!--        variant="text"-->
<!--        @click="updateUser(this.editUser._id, this.editUser)"-->
<!--      >-->
<!--        Save-->
<!--      </v-btn>-->
<!--    </v-card-actions>-->
<!--  </v-card>-->
</template>

<style scoped>

</style>
