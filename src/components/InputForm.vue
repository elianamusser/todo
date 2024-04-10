<!-- todo - add functionality with event bus? -->

<script>
// export default {
//   props: {
//     //the prop is whether this dialog is an add dialog
//     addDialog: {
//       type: Boolean,
//     }
//   },
//   data() {
//     return {
//       taskName: '',
//       description: '',
//       deadline: '',
//       priority: '',
//     };
//   },
//   methods: {
//     updateTable() {
//     //push newTask object to tasks array
//       var newTask = {
//         taskName: this.taskName,
//         description: this.description,
//         deadline: this.deadline,
//         priority: this.priority,
//         showUpdateButton: true,
//       };

//       //reset values
//       this.taskName = '';
//       this.description = '';
//       this.deadline = '';
//       this.priority = ''; 

//       //todo - export newTask object to Page component
//     },
//     editTask() {
//       //todo
//     },
//     hideDialog() {

//     }
//   }
// }
</script>

<template>
  <!-- <v-app>
      <v-card>
      <v-card-title v-if="addDialog = true">Add Task</v-card-title>
      <v-card-title v-if="addDialog = false">Edit Task</v-card-title>
      <v-form>
        <v-card-text>
          <v-text-field v-if="addDialog" label="Title" id="title" v-model="taskName"></v-text-field>
          <v-text-field label="Description" id="description" v-model="description"></v-text-field>
          <v-text-field
            label="Deadline"
            id="deadline"
            type="date"
            v-model="deadline"
          ></v-text-field>
          <v-radio-group>
            <v-radio label="Low" value="low" @click="priority = 'Low'"></v-radio>
            <v-radio label="Medium" value="medium" @click="priority = 'Medium'"></v-radio>
            <v-radio label="High" value="high" @click="priority = 'High'"></v-radio>
          </v-radio-group> 
        </v-card-text>
        <v-card-action>
          <v-btn v-if="addDialog" @click="updateTable">Add</v-btn>
          <v-btn v-if="!addDialog" @click="editTask">Edit</v-btn>
          <v-btn @click="hideDialog">Cancel</v-btn>
        </v-card-action>
      </v-form>
    </v-card>
  </v-app> -->
</template> 