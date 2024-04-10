<script>
const errorMsgs = [];
export default {
  data() {
    return {
      updateDialog: false,  //whether to show the dialog to update a task
      addDialog: false,   //whether to show the dialog to add a task

      taskToEdit: null,   //the task currently being edited

      required: [value => (!!value) || 'This field is required'], //rule for required input

      taskName: '',    //the currently saved taskName (the most recently entered)
      description: '',  //the currently saved description
      deadline: '',   //the currently saved deadline
      priority: '',   //the currently saved priority
      tasks: [],  //list of task objects
    };
  },
  computed: {
    showDialog() {
      return this.addDialog || this.updateDialog;
    },
    // valid() {
    //   const allFieldsFilled = (this.taskName) && (this.description) && (this.deadline) && (this.priority)
    //   //todo check for uniqueness
    //   const unique = true;
    //   return allFieldsFilled && unique
    // },
  },
  methods: {
    //clear all form flags and data
    clearForm() {
      this.addDialog = false;
      this.updateDialog = false;
      this.taskName = '';
      this.description = '';
      this.deadline = '';
      this.priority = ''; 
    },
    validAdd() {  //valid inputs for add operation
      const allFieldsFilled = (this.taskName) && (this.description) && (this.deadline) && (this.priority)
      //todo - check for uniqueness
      const unique = true;
      return allFieldsFilled && unique
    },
    submit() {
      if(this.addDialog && this.validAdd()) {
        this.addTask();
        this.clearForm();
      }
      else if(this.addDialog) {   //an invalid add operation
        //todo - error toaster
      }
      else if(this.updateDialog) {
        this.editTask();
        this.clearForm();
      }
    },
    addTask() {
      var newTask = {
        taskName: this.taskName,
        description: this.description,
        deadline: this.deadline,
        priority: this.priority,
        showUpdateButton: true,
      };
      this.tasks.push(newTask);
    },
    editTask() {
      //todo - reduce code repetition?
      if(this.description) {
        this.taskToEdit.description = this.description
      }
      if(this.deadline) {
        this.taskToEdit.deadline = this.deadline
      }
      if(this.priority) {
        this.taskToEdit.priority = this.priority
      }
    },
    deleteTask(task) {
      const taskIndex = this.tasks.indexOf(task)
      this.tasks.splice(taskIndex, 1)
    },
  }
};
</script>

<template>
  <v-app>
    <v-toolbar title="Frameworks">
      <v-btn @click="addDialog = true">
        <v-icon>mdi-open-in-new</v-icon>
        <span>Add</span>
      </v-btn>
    </v-toolbar>

    <v-table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Deadline</th>
          <th>Priority</th>
          <th>Is Complete</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tasks">
          <td>{{ '' + item.taskName }}</td>
          <td>{{ '' + item.description }}</td>
          <td>{{ '' + item.deadline }}</td>
          <td>{{ '' + item.priority }}</td>  
          <!-- when checked, delete this object from tasks array -->
          <td><input type="checkbox" @click="item.showUpdateButton = !item.showUpdateButton"></input></td>
          <td>
            <v-btn v-if="item.showUpdateButton" @click="updateDialog = true, taskToEdit = item">Update</v-btn>
            <v-btn @click="deleteTask(item)">Delete</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title v-if="addDialog">Add Task</v-card-title>
        <v-card-title v-if="updateDialog">Edit Task</v-card-title>
        <v-form @submit.prevent="submit">
          <v-card-text>
            <!--task name must be unique-->
            <v-text-field 
              v-if="addDialog" 
              label="Title" 
              id="title" 
              v-model="taskName" 
              :rules="required"
            ></v-text-field>
            <v-text-field 
              label="Description" 
              id="description" 
              v-model="description"
              :rules="required"
            ></v-text-field>
            <v-text-field
              label="Deadline"
              id="deadline"
              type="date"
              v-model="deadline"
              :rules="required"
            ></v-text-field>
            <p>Priority: {{ priority }}</p>
            <v-radio-group v-model="priority" :rules="required">
              <v-radio label="Low" value="low"></v-radio>
              <v-radio label="Medium" value="medium"></v-radio>
              <v-radio label="High" value="high"></v-radio>
            </v-radio-group> 
          </v-card-text> 
            <v-btn type="submit" v-if="addDialog">Add</v-btn>
            <v-btn type="submit" v-if="updateDialog">Edit</v-btn>
            <v-btn @click="clearForm">Cancel</v-btn>
        </v-form>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<style>
#add {
  right: 10px;
}
#title {
  left: 10px;
}
v-toolbar {
  position: absolute;
  top: 10px;
}
</style>
