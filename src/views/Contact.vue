<template>
  <div>
    <sidebar />
    <div class="contactpage">
      <div>
        <!-- <div style="background-color: #563d7c; padding: 3%; margin-left: -11px">
          <span
            style="color: white; float: right; margin-top: -1%; cursor: pointer"
            v-on:click="Logout"
            >Logout</span
          >
        </div> -->
        <md-button
          class="md-primary md-raised"
          style="float: center"
          @click="showDialogcreate = true"
          >Create Contact</md-button
        >
        <md-button
          class="md-primary md-raised"
          style="float: center"
          @click="lastContact = true"
          >Latest Contact</md-button
        >
        <!-- <a
          style="
            float: right;
            margin-top: 2%;
            margin-right: 2%;
            margin-bottom: 0%;
            margin-left: 0%;
            cursor: pointer;
          "
          v-on:click="Logout"
          >Logout</a
        > -->
        <md-table v-model="contactlist" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Contacts</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name" md-sort-by="name">{{
              item.name
            }}</md-table-cell>
            <md-table-cell md-label="FirstName" md-sort-by="firstName">{{
              item.firstName
            }}</md-table-cell>
            <md-table-cell md-label="LastName" md-sort-by="lastName">{{
              item.lastName
            }}</md-table-cell>
            <md-table-cell md-label="EmailAddress" md-sort-by="emailAddress">{{
              item.emailAddress
            }}</md-table-cell>
            <md-table-cell md-label="PhoneNumber" md-sort-by="phone">{{
              item.phones[3].phoneNumber
            }}</md-table-cell>
            <md-table-cell md-label="Action">
              <md-button class="md-accent" @click="editContact(item)"
                ><md-icon>mode_edit</md-icon></md-button
              >
              <md-button class="md-accent" @click="deleteContact(item)"
                ><md-icon>delete</md-icon></md-button
              >
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div>
        <md-dialog :md-active.sync="lastContact">
          <md-dialog-title>Latest Contact</md-dialog-title>
          <md-dialog-content>
            <md-table>
              <md-table-row>
                <md-table-head md-numeric>Name</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head>PhoneNumber</md-table-head>
                <md-table-head>Updated Date</md-table-head>
              </md-table-row>
              <md-table-row>
                <md-table-cell>{{ latestcontactList.name }}</md-table-cell>
                <md-table-cell>{{
                  latestcontactList.emailAddress
                }}</md-table-cell>
                <md-table-cell>{{
                  latestcontactList.phones["3"].phoneNumber
                }}</md-table-cell>
                <md-table-cell>{{
                  latestcontactList.updatedDateUTC
                }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-primary" @click="lastContact = false"
              >Close</md-button
            >
          </md-dialog-actions>
        </md-dialog>
      </div>
      <!-- <button v-on:click="createConatct">createConatct</button> -->
      <!-- <button v-on:click="updateConatct">updateConatct</button> -->
      <div>
        <md-dialog :md-active.sync="showDialogcreate">
          <md-dialog-title>Create Contact</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label>Name</label>
              <md-input v-model="contact.name"></md-input>
            </md-field>
            <md-field>
              <label>First Name</label>
              <md-input v-model="contact.firstName"></md-input>
            </md-field>
            <md-field>
              <label>Last Name</label>
              <md-input v-model="contact.lastName"></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="contact.emailAddress"></md-input>
            </md-field>
            <md-field>
              <label>Phone Number</label>
              <md-input v-model="contact.mobile"></md-input>
            </md-field>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-primary" @click="showDialogcreate = false"
              >Close</md-button
            >
            <md-button
              v-if="createcontact"
              class="md-primary"
              @click="createConatct"
              >Save</md-button
            >
            <md-button
              v-if="editcontact"
              class="md-primary"
              @click="updateContact"
              >Update</md-button
            >
          </md-dialog-actions>
        </md-dialog>
      </div>
      <div style="background-color: #563d7c; padding: 2%; margin-left: -11px">
        <span style="color: white; padding-left: 5%"
          >Last Sync Time : {{ this.lastsyncTime }}</span
        ><span style="color: white; padding-left: 5%">
          Next Sync Time : {{ this.lastsyncTime }}</span
        >
      </div>
    </div>
  </div>
</template>
<style lang="css">
.contactpage {
  margin-left: 25%;
}
/* .md-table-cell-container {
    padding: 0px !important;
    padding: -1px 32px 6px 24px !important */
/* } */
.md-dialog {
  z-index: 9999 !important;
}
.md-table-cell-container {
  padding: 0px !important;
}
.md-table-head-label {
  padding-left: 0px !important;
}
@media only screen and (max-width: 600px) {
  .contactpage {
    margin-left: 0%;
  }
}
.md-table-head-container {
  color: black;
  background-color: #e0dddb;
}
</style>
<script>
import sidebar from "../views/Bsidebar";
import Swal from "sweetalert2";
import bars from "../components/globalcomponent";
import moment from "moment";
export default {
  data() {
    return {
      showDialogcreate: false,
      contact: {},
      contactlist: [],
      createcontact: true,
      editcontact: false,
      lastContact: false,
      latestcontactList: [],
      lastsyncTime: "",
    };
  },
  components: {
    sidebar,
  },
  created() {
    bars.is_loading = true;
    this.getConatcts();
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    createConatct() {
      this.axios
        .post("http://localhost:5000/xero/createConatct", {
          userId: localStorage.getItem("userid"),
          name: this.contact.name,
          firstName: this.contact.firstName,
          lastName: this.contact.lastName,
          emailAddress: this.contact.emailAddress,
          mobile: this.contact.mobile,
        })
        .then(() => {
          Swal.fire("Success", "Your Data Is Created", "success");
          this.showDialogcreate = false;
          this.getConatcts();
        })
        .catch((err) => console.log(err))
        .finally(() => (this.loading = false));
    },
    editContact(e) {
      this.showDialogcreate = true;
      this.createcontact = false;
      this.editcontact = true;
      this.contact.name = e.name;
      this.contact.firstName = e.firstName;
      this.contact.lastName = e.lastName;
      this.contact.emailAddress = e.emailAddress;
      this.contact.mobile = e.phones[3].phoneNumber;
      this.contact.contactId = e.contactID;
      // console.log(e)
    },
    deleteContact(e) {
      Swal.fire({
        title: "Are you sure delete this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .put("http://localhost:5000/xero/deleteConatct", {
              contactStatus: "ARCHIVED",
              contactId: e.contactID,
              name: e.name,
              userId: localStorage.getItem("userid"),
            })
            .then(() => {
              Swal.fire(
                "Deleted!",
                "Your Contact has been deleted.",
                "success"
              );
              this.getConatcts();
            });
        }
      });
    },
    updateContact() {
      this.axios
        .put("http://localhost:5000/xero/updateConatct", {
          name: this.contact.name,
          firstName: this.contact.firstName,
          lastName: this.contact.lastName,
          emailAddress: this.contact.emailAddress,
          mobile: this.contact.mobile,
          contactId: this.contact.contactId,
          userId: localStorage.getItem("userid"),
        })
        .then(() => {
          Swal.fire("Success", "Your Data Is Updated", "success");
          this.showDialogcreate = false;
          this.getConatcts();
          this.editcontact = false;
          this.createcontact = true;
        })
        .catch((err) => console.log(err))
        .finally(() => (this.loading = false));
    },
    getConatcts() {
      this.axios
        .post(
          "http://localhost:5000/xero/getConatcts",
          { userId: localStorage.getItem("userid") },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token",
            },
          }
        )
        .then((res) => {
          console.log('Response',res)
          this.contactlist = res.data.body.contacts;
          this.contactlist.sort();
          this.contactlist.reverse();
          this.latestcontactList = this.contactlist[0];
          bars.is_loading = false;
          this.lastsyncTime = moment(
            this.contactlist[0]["updatedDateUTC"]
          ).format("MMMM Do YYYY, h:mm:ss a");
          // console.log(this.lastsyncTime);
        })
        .catch(function(err){ 
          console.log(err);
          if(err=='Error: Request failed with status code 401'){
            console.log('asdf\n')
          // localStorage.clear(),
          // this.$router.push("/");
          console.log('yes')
          }
          
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style scoped>
.md-dialog {
  display: inherit !important;
  height: fit-content !important;
}
</style>