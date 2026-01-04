<template>
  <div class="auth-outer">
    <div class="auth-card">
      <div class="toggle-row">
        <button
          @click="toggleForm('register')"
          :class="{ active: currentForm === 'register' }"
          class="toggle-btn"
        >
          Join Poppy Universe
        </button>

        <button
          @click="toggleForm('login')"
          :class="{ active: currentForm === 'login' }"
          class="toggle-btn"
        >
          Already Exploring?
        </button>
      </div>

      <p v-if="successMessage" class="message success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="message error-message">{{ errorMessage }}</p>

      <div class="forms">
        <transition name="nebula" mode="out-in">
          <form
            v-if="currentForm === 'register'"
            class="space-form"
            @submit.prevent="submitRegister"
            key="register-form"
          >
            <h2>Become a Poppy Explorer</h2>

            <input type="text" v-model="registerForm.firstName" placeholder="First Name (Required)" required />
            <input type="text" v-model="registerForm.lastName" placeholder="Last Name (Required)" required />

            <input
              type="text"
              v-model="registerForm.username"
              placeholder="Username (Optional - Defaults to First Name + Last Name)"
            />

            <input type="email" v-model="registerForm.email" placeholder="Email (Required)" required />

            <input
              type="password"
              v-model="registerForm.password"
              placeholder="Password (Min 8 Chars)"
              required
              minlength="8"
            />

            <input
              type="password"
              v-model="registerForm.confirmPassword"
              placeholder="Confirm Password"
              required
            />

            <label class="terms">
              <input type="checkbox" v-model="registerForm.termsAccepted" />
              I accept the&nbsp;
              <router-link to="/terms_and_conditions">Terms & Conditions</router-link>
              &nbsp;&amp;&nbsp;
              <router-link to="/privacy_policy">Privacy Policy</router-link>
            </label>

            <button type="submit" class="cosmic-btn">Register</button>
          </form>
        </transition>

        <transition name="nebula" mode="out-in">
          <form
            v-if="currentForm === 'login'"
            class="space-form"
            @submit.prevent="submitLogin"
            key="login-form"
          >
            <h2>Welcome Back, Explorer</h2>

            <input type="email" v-model="loginForm.email" placeholder="Email" required />
            <input type="password" v-model="loginForm.password" placeholder="Password" required />

            <button type="submit" class="cosmic-btn">Log In</button>
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const currentForm = ref('login');
    const errorMessage = ref('');
    const successMessage = ref('');
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const registerForm = ref({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });

    const loginForm = ref({
      email: '',
      password: '',
    });

    const clearMessages = () => {
      errorMessage.value = '';
      successMessage.value = '';
    };

    const toggleForm = (formType) => {
      clearMessages();
      currentForm.value = formType;
    };

    // ---------------- REGISTER ----------------
    const submitRegister = async () => {
      clearMessages();

      if (registerForm.value.password.length < 8) {
        errorMessage.value = "Encryption Key must be at least 8 characters.";
        return;
      }

      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        errorMessage.value = "Encryption keys do not match.";
        return;
      }

      if (!registerForm.value.termsAccepted) {
        errorMessage.value = "You must accept the Terms & Privacy Policy to join.";
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            User_FN: registerForm.value.firstName,
            User_LN: registerForm.value.lastName,
            User_Username: registerForm.value.username,
            User_Email: registerForm.value.email,
            User_Password: registerForm.value.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          successMessage.value =
            data.message || 'Welcome, Explorer! Proceed to Login Protocol.';

          Object.keys(registerForm.value).forEach((key) => {
            registerForm.value[key] = key === 'termsAccepted' ? false : '';
          });

          toggleForm('login');
        } else {
          errorMessage.value = data.message || 'Registration failed. Check your coordinates.';
        }
      } catch (err) {
        console.error(err);
        errorMessage.value =
          'Something exploded in hyperspace during registration. Please check your connection.';
      }
    };

    // ---------------- LOGIN ----------------
    const submitLogin = async () => {
      clearMessages();

      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            User_Email: loginForm.value.email,
            User_Password: loginForm.value.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          successMessage.value = data.message || 'Login successful! Welcome aboard, Explorer.';

          // FIXED: Change 'authToken' to 'user_token' to match MainLayout
          localStorage.setItem('authToken', data.token); 
          
          localStorage.setItem('userDetails', JSON.stringify(data.user));
          localStorage.setItem('Owner_ID', data.user.ownerId);

          // ADD THIS LINE: This notifies MainLayout to hide the popup instantly!
          window.dispatchEvent(new Event('storage'));

          // OPTIONAL: Redirect the user to the homepage after 1 second
          setTimeout(() => {
            window.location.href = "/"; // This also forces a fresh state
          }, 1000);

        } else {
          errorMessage.value = data.message || 'Login failed. Invalid credentials.';
        }
      } catch (err) {
        console.error(err);
        errorMessage.value = 'Login failed. The cosmic winds say try again.';
      }
    };

    return {
      currentForm,
      registerForm,
      loginForm,
      toggleForm,
      submitRegister,
      submitLogin,
      errorMessage,
      successMessage,
    };
  },
};
</script>

<style scoped>
/* Outer cosmic container */
.auth-outer {
  position: relative;
  width: 100%;
  /* Set height to fit content, allowing main-layout to manage viewport */
  min-height: 85vh; 
  overflow: hidden;
  color: #e6f7ff; 
  padding-bottom: 50px; 
  /* REMOVED: background/starfield styles */
}

/* REMOVED: #starfield styles */

/* Center card (The Voyager Cockpit) */
.auth-card {
  margin: auto;
  margin-top: 10vh; 
  width: 90%;
  max-width: 480px; 
  padding: 40px;
  backdrop-filter: blur(15px); 
  /* This is the key: background is opaque enough to read, transparent enough to see the main-layout's starfield */
  background: rgba(10, 10, 30, 0.85); 
  border: 2px solid #5d5dff; 
  border-radius: 25px;
  box-shadow: 0 0 40px rgba(93, 93, 255, 0.8); 
  transition: transform 0.3s ease;
}

/* --- (All other styles like toggle-row, space-form, cosmic-btn, etc., remain the same) --- */

.toggle-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.toggle-btn {
  flex: 1;
  margin: 0 8px;
  padding: 14px 0;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #7c7cff;
  color: #c9cfff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
}

.toggle-btn.active,
.toggle-btn:hover {
  background: linear-gradient(90deg, #596bff, #7d5fff);
  color: white;
  border-color: white;
  box-shadow: 0 0 10px rgba(125, 95, 255, 0.8);
}

.space-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.space-form input {
  padding: 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #7c7cff;
  color: white;
  transition: all 0.3s;
}

.space-form input:focus {
  outline: none;
  border-color: #e6f7ff;
  box-shadow: 0 0 15px rgba(230, 247, 255, 0.8); 
  background: rgba(255, 255, 255, 0.15);
}

h2 {
  text-align: center;
  margin-bottom: 15px;
  color: #a8c4ff;
  text-shadow: 0 0 10px #7c7cff;
  font-size: 1.6rem;
}

.terms {
  font-size: 0.9rem;
  color: #b0c4de;
}

.terms a {
  color: #5d5dff;
  font-weight: bold;
  text-decoration: none;
}
.terms a:hover {
  text-decoration: underline;
}

.cosmic-btn {
  padding: 15px;
  border: none;
  border-radius: 15px;
  background: linear-gradient(135deg, #ff596b, #ff7d5f); 
  color: white;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 1px;
}

.cosmic-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(255, 89, 107, 0.8), 0 0 10px rgba(255, 125, 95, 0.5);
  background: linear-gradient(135deg, #ff7d5f, #ff596b);
}

.message {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 15px;
    font-weight: bold;
    text-align: center;
    text-shadow: none;
}

.error-message {
    background: rgba(255, 89, 107, 0.2);
    border: 1px solid #ff596b;
    color: #ff596b;
}

.success-message {
    background: rgba(89, 255, 107, 0.2);
    border: 1px solid #59ff6b;
    color: #59ff6b;
}

.nebula-enter-active,
.nebula-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.nebula-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}

.nebula-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>