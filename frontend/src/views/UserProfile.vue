<script>
export default {
  name: "UserProfile",
  data() {
    return {
      valid: false,
      userDetails: {
        name: 'Kaveesha',
        email: 'kaveesha@gmail.com',
        age: '25',
        address: 'Gampaha',
        contact: '0712536987',
        regDate: '2024-07-29'
      },
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        age: value => value > 0 || 'Age must be positive.',
        contact: value => {
          const pattern = /^[0-9]{10}$/;
          return pattern.test(value) || 'Invalid contact number.';
        }
      }
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.saveProfile();
      } else {
        alert('Please fill out the form correctly.');
      }
    },
    saveProfile() {
      // Logic to save user profile
      alert('Profile saved successfully!');
    }
  }
}
</script>

<template>
  <v-card
    class="mx-auto rounded-lg mt-8"
    max-width="900"
    elevation="5"
    title="Profile"
  >
    <v-divider></v-divider>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="mx-10 my-3">
        <v-container>
          <v-row>
            <v-col cols="1" class=""><v-label>Name</v-label></v-col>
            <v-col cols="5">
              <v-text-field
                density="compact"
                v-model="userDetails.name"
                variant="filled"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class=""><v-label>Email</v-label></v-col>
            <v-col cols="5">
              <v-text-field
                disabled
                density="compact"
                v-model="userDetails.email"
                variant="filled"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" class=""><v-label>Address</v-label></v-col>
            <v-col cols="5">
              <v-text-field
                density="compact"
                v-model="userDetails.address"
                variant="filled"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class=""><v-label>Age</v-label></v-col>
            <v-col cols="5">
              <v-text-field
                density="compact"
                v-model="userDetails.age"
                variant="filled"
                :rules="[rules.required, rules.age]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1" class=""><v-label>Contact</v-label></v-col>
            <v-col cols="5">
              <v-text-field
                density="compact"
                v-model="userDetails.contact"
                variant="filled"
                :rules="[rules.required, rules.contact]"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class=""><v-label>Reg Date </v-label></v-col>
            <v-col cols="5">
              <v-text-field
                disabled
                density="compact"
                v-model="userDetails.regDate"
                variant="filled"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
<!--          <v-row>-->
<!--            <v-col cols="3" class="pl-10"><v-label>Name</v-label></v-col>-->
<!--            <v-col cols="9">-->
<!--              <v-text-field-->
<!--                density="compact"-->
<!--                v-model="currentPass"-->
<!--                variant="filled"-->
<!--                :rules="[rules.required]"-->
<!--              ></v-text-field>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row>-->
<!--            <v-col cols="3" class="pl-10"><v-label>Email</v-label></v-col>-->
<!--            <v-col cols="9">-->
<!--              <v-text-field-->
<!--                density="compact"-->
<!--                v-model="currentPass"-->
<!--                variant="filled"-->
<!--                :rules="[rules.required]"-->
<!--              ></v-text-field>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row>-->
<!--            <v-col cols="3" class="pl-10"><v-label>Address</v-label></v-col>-->
<!--            <v-col cols="9">-->
<!--              <v-text-field-->
<!--                density="compact"-->
<!--                v-model="currentPass"-->
<!--                variant="filled"-->
<!--                :rules="[rules.required]"-->
<!--              ></v-text-field>-->
<!--            </v-col>-->
<!--          </v-row>-->
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
