<template>
  <div class="profile-container">
    <div class="profile-card">

      <!-- Identity -->
      <div class="identity">
        <p class="username">@{{ user.username }}</p>
        <h2 class="real-name">{{ user.firstName }} {{ user.lastName }}</h2>
      </div>

      <!-- Info Grid -->
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Username</span>
          <span class="value">{{ user.username }}</span>
        </div>

        <div class="info-item">
          <span class="label">Full Name (FN + LN)</span>
          <span class="value">{{ user.firstName }} {{ user.lastName }}</span>
        </div>

        <div class="info-item">
          <span class="label">Email</span>
          <span class="value">{{ user.email }}</span>
        </div>

        <div class="info-item">
          <span class="label">Explorer Since</span>
          <span class="value accent">{{ user.memberSince }}</span>
        </div>
      </div>

      <button class="settings-button" @click="goToSettings">
        Open Account Settings
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const user = ref({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      memberSince: '',
    });

    const goToSettings = () => {
      router.push('/User_Settings');
    };

    onMounted(async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/account`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Auth failed');

        const data = await res.json();

        user.value = {
            username: data.username || 'Unknown',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            memberSince: data.memberSince,
        };

      } catch (err) {
        console.error(err);
      }
    });

    return {
      user,
      goToSettings,
    };
  },
};
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 90px 20px;
  font-family: 'Poppins', sans-serif;
}

.profile-card {
  width: 100%;
  max-width: 520px;
  padding: 42px;
  border-radius: 24px;

  background: rgba(10, 10, 30, 0.75);
  backdrop-filter: blur(16px);

  border: 2px solid rgba(93, 93, 255, 0.35);
  box-shadow:
    0 0 35px rgba(93, 93, 255, 0.35),
    0 25px 60px rgba(0, 0, 0, 0.6);

  color: #fff;
}

/* ---------- Identity ---------- */
.identity {
  text-align: center;
  margin-bottom: 40px;
}

.username {
  font-size: 0.9rem;
  color: #9aa4ff;
  letter-spacing: 1.2px;
  margin-bottom: 6px;
  opacity: 0.85;
}

.real-name {
  font-size: 2.1rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 12px rgba(125, 95, 255, 0.6);
}

/* ---------- Info Grid ---------- */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  margin-bottom: 45px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(125, 95, 255, 0.25);
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #b0b8ff;
  font-weight: 600;
}

.value {
  font-size: 1.1rem;
  color: #f1f3ff;
  word-break: break-word;     /* better for long emails */
  overflow-wrap: anywhere;
  white-space: pre-wrap;      /* preserves spaces and line breaks */
}

.value.accent {
  color: #ff8a7a;
  font-style: italic;
}

/* ---------- Button ---------- */
.settings-button {
  width: 100%;
  padding: 15px;
  border-radius: 16px;
  border: none;
  cursor: pointer;

  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.5px;

  color: #fff;
  background: linear-gradient(135deg, #ff596b, #ff7d5f);

  box-shadow:
    0 0 15px rgba(255, 89, 107, 0.6),
    0 0 35px rgba(255, 125, 95, 0.3);

  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.settings-button:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow:
    0 0 25px rgba(255, 89, 107, 0.9),
    0 0 50px rgba(255, 125, 95, 0.6);
}

</style>