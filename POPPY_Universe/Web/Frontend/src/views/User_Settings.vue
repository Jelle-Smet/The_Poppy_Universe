<template>
  <div class="settings-container">
    <div class="glass-panel">
      <header class="settings-header">
        <h1>🛰️ Command Center</h1>
        <p class="intro">Update your explorer credentials and security clearance.</p>
      </header>

      <div v-if="loading" class="loading-state">Synchronizing with starbase...</div>

      <form v-else @submit.prevent="handleUpdate" class="settings-form">
        <div class="profile-section">
          <div class="explorer-orb">
            <span class="initials">{{ getInitials }}</span>
          </div>
          <p class="member-tag">Mission active since: {{ form.memberSince }}</p>
        </div>

        <div class="form-grid">
          <div class="input-group">
            <label>First Name</label>
            <input type="text" v-model="form.User_FN" placeholder="First name..." />
          </div>

          <div class="input-group">
            <label>Last Name</label>
            <input type="text" v-model="form.User_LN" placeholder="Last name..." />
          </div>

          <div class="input-group full-width">
            <label>Explorer Username</label>
            <input type="text" v-model="form.User_Name" placeholder="Username..." />
          </div>

          <div class="input-group full-width">
            <label>Galactic Email</label>
            <input type="email" v-model="form.User_Email" placeholder="Email..." />
          </div>

          <div class="input-group full-width separator">
            <label>New Security Key (Password)</label>
            <input 
              type="password" 
              v-model="form.User_Password" 
              placeholder="Enter new key..." 
            />
          </div>

          <div class="input-group full-width">
            <label>Confirm Security Key</label>
            <input 
              type="password" 
              v-model="confirmPassword" 
              placeholder="Repeat new key..." 
            />
            <small class="hint">Leave both blank to keep current key.</small>
          </div>
        </div>

        <div class="actions">
          <button type="submit" :disabled="saving" class="save-btn">
            {{ saving ? 'Transmitting...' : 'Update Credentials ✨' }}
          </button>
        </div>

        <p v-if="message" :class="['status-msg', messageType]">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const loading = ref(true);
    const saving = ref(false);
    const message = ref('');
    const messageType = ref('');
    const confirmPassword = ref(''); // New state for confirmation
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    
    const form = ref({
      User_FN: '',
      User_LN: '',
      User_Name: '',
      User_Email: '',
      User_Password: '',
      memberSince: ''
    });

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchCurrentData = async () => {
      try {
        const res = await axiosWithAuth.get('/account');
        form.value.User_FN = res.data.firstName;
        form.value.User_LN = res.data.lastName;
        form.value.User_Name = res.data.username;
        form.value.User_Email = res.data.email;
        form.value.memberSince = res.data.memberSince;
      } catch (err) {
        message.value = "Failed to sync explorer data.";
        messageType.value = "error";
      } finally {
        loading.value = false;
      }
    };

    const handleUpdate = async () => {
      message.value = '';
      
      // 1. Password Match Validation
      if (form.value.User_Password || confirmPassword.value) {
        if (form.value.User_Password !== confirmPassword.value) {
          message.value = "Security keys do not match! 🛰️";
          messageType.value = "error";
          return;
        }
        if (form.value.User_Password.length < 8) {
          message.value = "New key must be at least 8 characters.";
          messageType.value = "error";
          return;
        }
      }

      saving.value = true;
      try {
        const payload = { ...form.value };
        if (!payload.User_Password) delete payload.User_Password;

        const res = await axiosWithAuth.put('/update-profile', payload);
        message.value = res.data.message;
        messageType.value = "success";
        
        // Clear both password fields
        form.value.User_Password = '';
        confirmPassword.value = '';
      } catch (err) {
        message.value = err.response?.data?.message || "Transmission failed.";
        messageType.value = "error";
      } finally {
        saving.value = false;
      }
    };

    const getInitials = computed(() => {
      const f = form.value.User_FN || "";
      const l = form.value.User_LN || "";
      if (f && l) return (f.charAt(0) + l.charAt(0)).toUpperCase();
      if (f || l) return (f || l).substring(0, 2).toUpperCase();
      return "??";
    });

    onMounted(fetchCurrentData);

    return { form, confirmPassword, loading, saving, message, messageType, handleUpdate, getInitials };
  }
};
</script>

<style scoped>
/* All previous styles remain, adding the separator style */
.separator {
  margin-top: 15px;
  border-top: 1px solid rgba(125, 95, 255, 0.2);
  padding-top: 25px;
}

/* ... Paste your previous CSS here ... */

.settings-container {
  min-height: 100vh;
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  display: flex;
  justify-content: center;
}

.glass-panel {
  width: 100%;
  max-width: 700px;
  background-color: rgba(0, 0, 30, 0.8);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 0 30px rgba(125, 95, 255, 0.3);
  border: 1px solid rgba(125, 95, 255, 0.2);
}

.settings-header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 2.5rem;
  text-shadow: 0 0 15px rgba(125, 95, 255, 0.7);
  margin: 0;
}

.intro {
  color: rgba(180, 160, 255, 0.8);
  margin-top: 10px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.explorer-orb {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 0 25px rgba(108, 92, 231, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 10px;
}

.member-tag {
  font-size: 0.85rem;
  opacity: 0.6;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.full-width {
  grid-column: span 2;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #9aa4ff;
  margin-left: 5px;
}

input {
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid rgba(154, 164, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #7d5fff;
  box-shadow: 0 0 10px rgba(125, 95, 255, 0.3);
}

.hint {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-left: 5px;
}

.actions {
  margin-top: 40px;
  text-align: center;
}

.save-btn {
  padding: 14px 40px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(135deg, #ff596b, #ff7d5f);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 89, 107, 0.4);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status-msg {
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
}

.status-msg.success { color: #00ff88; background: rgba(0, 255, 136, 0.1); }
.status-msg.error { color: #ff596b; background: rgba(255, 89, 107, 0.1); }

.loading-state {
  text-align: center;
  padding: 50px;
  opacity: 0.6;
}
</style>