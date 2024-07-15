<script>

export default {
  name: "ChangePass",
  data () {
    return {
      currentPass: '',
      newPass: '',
      confirmNewPass: '',
      rules: {
        required: value => !!value || 'Required.',
        minLength: v => v.length >= 8 || 'Min 8 characters',
        passwordMatch: () => this.newPass === this.confirmNewPass || 'Passwords do not match'
      },
      valid: false
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.changePassword();
      } else alert('not valid');
    },
    changePassword() {
      // Logic to change the password
      alert('Password changed successfully!');
    }
  }
}
</script>

<template>
  <v-card
    class="mx-auto rounded-lg mt-8"
    max-width="900"
    elevation="5"
    title="Change password"
  >
    <v-divider></v-divider>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="mx-16 my-3">
        <v-container>
          <v-row>
            <v-col cols="3" class=""><v-label>Current Password</v-label></v-col>
            <v-col cols="9">
              <v-text-field
                density="compact"
                v-model="currentPass"
                color="primary"
                label="Current Password"
                variant="filled"
                :rules="[rules.required]"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class=""><v-label>New Password</v-label></v-col>
            <v-col cols="9">
              <v-text-field
                density="compact"
                v-model="newPass"
                color="primary"
                label="New password"
                variant="filled"
                :rules="[rules.required, rules.minLength]"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class=""><v-label>Confirm New Password</v-label></v-col>
            <v-col cols="9">
              <v-text-field
                density="compact"
                v-model="confirmNewPass"
                color="primary"
                label="Confirm New password"
                variant="filled"
                :rules="[rules.required, rules.passwordMatch]"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="validate">
            Save
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-form>

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
