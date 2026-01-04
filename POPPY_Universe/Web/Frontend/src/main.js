// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

// Enable devtools
app.config.devtools = true;
app.config.performance = true;

app.use(router).mount('#app');

// Connect to standalone devtools
if (process.env.NODE_ENV === 'development') {
  const devtools = document.createElement('script');
  devtools.src = 'http://localhost:8098';
  document.head.appendChild(devtools);
}