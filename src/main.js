import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import toastr from 'toastr';
import 'toastr/build/toastr.css'
import App from './App.vue';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

toastr.options = {
  "positionClass": "toast-bottom-right",
}

const app = createApp(App);
app
  .use(createPinia())
  .use(
    createVuetify({
      components,
      directives,
    })
  )
  .mount('#app');
