<script setup>
import toastr from 'toastr';
import 'toastr/build/toastr.css'
</script>

<script>
export default {
  data() {
    return {
      updateDialog: false,  //whether to show the dialog to update a task
      addDialog: false,   //whether to show the dialog to add a task

      taskToEdit: null,   //the task currently being edited

      required: [value => (!!value) || 'This field is required'], //rule for required input
      requiredTitle: [
        value => (!!value) || 'This field is required',
        value => this.uniqueTaskName(value) || 'The title must be unique',
      ],

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
  },
  methods: {   
    //returns whether the taskName of the given task is unique
    uniqueTaskName(task) {
      for(const task of this.tasks) {
        if(task.taskName === this.taskName) {
          return false;
        }
      }
      return true
    },
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
      return allFieldsFilled && this.uniqueTaskName(this.taskName)
    },
    submit() {
      if(this.addDialog && this.validAdd()) {
        this.addTask();
        this.clearForm();
        toastr.success("Task added successfully")
      }
      else if(this.updateDialog) {
        this.editTask();
        this.clearForm();
        toastr.success("Task updated successfully")
      }
      else {   //an invalid add operation
        throw new Error("Add operation failed")
      }
    },
    addTask() {
      //push a newTask object to the tasks array
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
      //if any fields were entered, update them in the table
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
      toastr.success("Task deleted successfully")
    },
  }
};
</script>

<template>
  <v-app>
    <v-toolbar color="primary">
      <v-toolbar-title id="title">
        <v-icon icon="fa-solid fa-bars" size="x-small"></v-icon>
        FRAMEWORKS
      </v-toolbar-title>
      <v-btn elevation="8" @click="addDialog = true">
        <v-icon icon="fa:fas fa-plus"></v-icon>
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
            <v-btn 
              v-if="item.showUpdateButton" 
              color="primary" 
              prepend-icon="fa-solid fa-pen-to-square"
              @click="updateDialog = true, taskToEdit = item"
            > Update </v-btn>
            <v-btn 
              color="red"
              prepend-icon="fa-solid fa-ban"
              @click="deleteTask(item)"
            > Delete </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="showDialog">
      <v-card>
        <v-toolbar color="primary">
          <v-card-title v-if="addDialog">
            <v-icon icon="fa:fas fa-plus"></v-icon>
            Add Task
          </v-card-title>
          <v-card-title v-if="updateDialog">
            <v-icon icon="fa-solid fa-pen-to-square" size="x-small"></v-icon>
            Edit Task
          </v-card-title>
        </v-toolbar>
        <v-card-text>
        <v-form validate-on="submit" @submit.prevent="submit">
            <!--task name must be unique-->
            <v-text-field 
              v-if="addDialog" 
              label="Title" 
              id="taskName" 
              v-model="taskName" 
              :rules="requiredTitle"
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
            <v-spacer></v-spacer>
            <p>Priority: {{ priority }}</p>
            <v-radio-group inline v-model="priority" :rules="required">
              <v-radio label="Low" value="low"></v-radio>
              <v-radio label="Medium" value="medium"></v-radio>
              <v-radio label="High" value="high"></v-radio>
            </v-radio-group> 
            <v-btn type="submit" color="primary" prepend-icon="fa-solid fa-plus" v-if="addDialog">
              Add
            </v-btn>
            <v-btn type="submit" color="primary" prepend-icon="fa-solid fa-pen-to-square" v-if="updateDialog">
              Edit
            </v-btn>
            <v-btn @click="clearForm" color="red" prepend-icon="fa-solid fa-ban">Cancel</v-btn>
          </v-form>
          </v-card-text> 
      </v-card>
    </v-dialog>

  </v-app>
</template>

<style>

#add {
  right: 10px;
}

v-toolbar {
  position: absolute;
  top: 10px;
}

#title {
  text-align: center;
}
</style>
