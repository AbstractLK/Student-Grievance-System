<script>

import axios from "axios";
import {tokenAttach} from "../../utils/tokenAttach";

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
    async changePassword() {
      tokenAttach(); // Attach token to axios request
      try {
        const response = await axios.put('http://localhost:3001/user/change-password', {
          currentPass: this.currentPass,
          newPass: this.newPass
        });
        console.log(response);
        alert(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to change password');
      }
    }
  }
}
</script>

<template>
  <v-card class="mx-auto rounded-lg mt-8" max-width="900" elevation="5" title="Change password">
    <v-divider></v-divider>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="px-4 py-3">
        <v-row>
          <v-col cols="12" md="4">
            <v-label>Current Password</v-label>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              density="compact"
              v-model="currentPass"
              label="Current Password"
              variant="filled"
              :rules="[rules.required]"
              type="password"
              outlined
              class="w-100"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-label>New Password</v-label>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              density="compact"
              v-model="newPass"
              label="New password"
              variant="filled"
              :rules="[rules.required, rules.minLength]"
              type="password"
              outlined
              class="w-100"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-label>Confirm New Password</v-label>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              density="compact"
              v-model="confirmNewPass"
              label="Confirm New password"
              variant="filled"
              :rules="[rules.required, rules.passwordMatch]"
              type="password"
              outlined
              class="w-100"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="validate" class="my-2">
            Save
            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<style scoped>
  @media (max-width: 600px) {
    .v-text-field {
      width: 100% !important;
    }
    .v-card {
      padding: 16px !important;
    }
  }
</style>

<!-- <template>
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
</template>

<style scoped>

</style> -->
