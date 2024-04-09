<!-- <script setup>
import { ref } from 'vue';
</script> -->

<script>
export default {
  data() {
    return {
      dialog: false,
      taskName: '',
      description: '',
      deadline: '',
      priority: '',
      tasks: [],
      radios: null,
    };
  },
  methods: {
    //updateTable() {
    //push newTask object to tasks array
    /**var newTask = {
        taskName: this.taskName,
        description: this.description,
        deadline: this.deadline,
        priority: this.priority,
      };
      tasks.push(newTask);

      //reset values
      this.taskName = null;
      this.description = null;
      this.deadline = null;
      this.priority = null; **/
    //validate inputs with rules
    //add new row to table
    //loop thru task array, adding every element to the table
    //},
  },
};
</script>

<template>
  <v-app>
    <v-toolbar title="Frameworks">
      <v-btn @click="dialog = true">
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
          <td>{{ item.taskName }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.deadline }}</td>
          <td>{{ item.priority }}</td>
        </tr>
      </tbody>
    </v-table>

    <!--dialog-->
    <!--todo: move to own component-->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Add Task</v-card-title>
        <v-form>
          <v-card-text>
            <v-text-field label="Title" id="title"></v-text-field>
            <v-text-field label="Description" id="description"></v-text-field>
            <v-text-field
              label="Deadline"
              id="deadline"
              type="date"
            ></v-text-field>
            <v-radio-group>
              <v-radio label="Low" value="low"></v-radio>
              <v-radio label="Medium" value="medium"></v-radio>
              <v-radio label="High" value="high"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <!-- todo: add functionality -->
            <v-btn>Update</v-btn>
            <v-btn @click="dialog = false">Close</v-btn>
          </v-card-actions>
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
