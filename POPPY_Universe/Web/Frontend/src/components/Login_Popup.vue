<template>
  <div class="login-overlay-modal">
    <div class="login-card">
      <div class="icon-container">
        <div class="pulse-ring"></div>
        <div class="icon">🚀</div>
      </div>

      <h2>Cosmic Access Restricted</h2>
      <p>The Poppy Universe is vast, but you need to be logged in to access this sector.</p>
      
      <div class="actions">
        <router-link to="/sign-up-login" class="btn login-btn">Log In / Sign Up</router-link>
      </div>

      <div class="secondary-actions">
        <router-link to="/" class="back-home">← Back to Home Sector</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-overlay-modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(10, 0, 24, 0.85); /* Slightly darker space theme */
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.login-card {
  background: linear-gradient(145deg, #1a0330, #0a0018);
  padding: 3.5rem 2.5rem;
  border-radius: 24px;
  border: 1px solid rgba(77, 77, 255, 0.4);
  text-align: center;
  color: white;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(77, 77, 255, 0.2);
  max-width: 420px;
  width: 90%;
  position: relative;
  overflow: hidden;
}

/* Cosmic Pulsing Animation */
.icon-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 3.5rem;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(77, 77, 255, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  background: linear-gradient(to right, #fff, #b3b3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: #b3b3ff;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn {
  padding: 14px 28px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.login-btn {
  background: linear-gradient(45deg, #4d4dff, #8000ff);
  color: white;
  box-shadow: 0 4px 15px rgba(77, 77, 255, 0.4);
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(77, 77, 255, 0.6);
  filter: brightness(1.1);
}

.secondary-actions {
  margin-top: 1.5rem;
}

.back-home {
  color: #888;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s;
}

.back-home:hover {
  color: white;
}
</style>