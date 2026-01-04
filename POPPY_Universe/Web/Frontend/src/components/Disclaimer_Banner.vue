<template>
  <Transition name="cosmic-slide">
    <div v-if="isVisible" class="disclaimer-banner">
      <div class="scan-line"></div>

      <div class="disclaimer-content">
        <div class="text-side">
          <div class="status-indicator">
            <span class="dot"></span>
            <span class="label">EDUCATIONAL SIMULATION ACTIVE</span>
          </div>
          
          <div class="message-body">
            <h3>🛸 System Information: Fictional Environment</h3>
            <p>
              <strong>Poppy Universe</strong> is a <span>purely fictional school project</span>. 
              Any "purchases" or star registrations made within this platform use simulated currency and carry 
              <strong>no real-world value or legal ownership</strong>. No real money is ever requested or accepted.
            </p>
            <p class="data-notice">
              <strong>Data Transparency:</strong> We do not use tracking cookies for marketing. We only store 
              your account data (email/username) to allow you to interact with the project. 
              Review our <router-link to="/privacy_policy" class="legal-link">Privacy Protocol</router-link>.
            </p>
          </div>
        </div>

        <div class="action-side">
          <button @click="acceptDisclaimer" class="accept-btn">
            Accept & Enter
          </button>
          <button @click="declineAndExit" class="decline-btn">
            Decline & Exit
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'DisclaimerBanner',
  setup() {
    const isVisible = ref(false);

    onMounted(() => {
      const hasAccepted = localStorage.getItem('disclaimer_accepted');
      if (!hasAccepted) {
        // Delayed appearance for better impact
        setTimeout(() => {
          isVisible.value = true;
        }, 800);
      }
    });

    const acceptDisclaimer = () => {
      localStorage.setItem('disclaimer_accepted', 'true');
      isVisible.value = false;
    };

    const declineAndExit = () => {
      // Redirects user away if they don't agree to the project terms
      window.location.href = "https://www.google.com";
    };

    return { isVisible, acceptDisclaimer, declineAndExit };
  }
};
</script>

<style scoped>
.disclaimer-banner {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 950px;
  background: rgba(10, 0, 30, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(77, 77, 255, 0.4);
  border-radius: 20px;
  padding: 25px;
  z-index: 10000;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

.scan-line {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 2px;
  background: linear-gradient(90deg, transparent, #4d4dff, transparent);
  animation: scan 4s linear infinite;
}

@keyframes scan {
  0% { top: -2%; }
  100% { top: 100%; }
}

.disclaimer-content {
  display: flex;
  align-items: center;
  gap: 30px;
}

.status-indicator {
  display: flex; align-items: center; gap: 8px; margin-bottom: 8px;
}

.dot {
  width: 8px; height: 8px; background: #00ffcc; border-radius: 50%;
  box-shadow: 0 0 10px #00ffcc; animation: blink 1.5s infinite;
}

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.label { font-size: 0.7rem; font-weight: bold; letter-spacing: 2px; color: #00ffcc; }

.message-body h3 { margin: 0 0 10px 0; color: #fff; font-size: 1.15rem; }

.message-body p { color: #b3b3ff; font-size: 0.9rem; margin: 5px 0; line-height: 1.5; }

.message-body span { color: #fff; font-weight: bold; }

.data-notice { font-size: 0.8rem !important; opacity: 0.7; margin-top: 10px !important; }

.legal-link { color: #00ffcc; text-decoration: none; border-bottom: 1px dashed #00ffcc; }

.action-side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accept-btn {
  background: linear-gradient(45deg, #4d4dff, #8000ff);
  color: white; border: none; padding: 12px 24px; border-radius: 10px;
  font-weight: bold; cursor: pointer; white-space: nowrap; transition: 0.3s;
}

.decline-btn {
  background: transparent; color: #ff4d4d; border: 1px solid #ff4d4d;
  padding: 10px 24px; border-radius: 10px; font-weight: bold;
  cursor: pointer; transition: 0.3s;
}

.accept-btn:hover { transform: translateY(-2px); filter: brightness(1.2); }
.decline-btn:hover { background: rgba(255, 77, 77, 0.1); }

/* Animations */
.cosmic-slide-enter-active { transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.cosmic-slide-enter-from { transform: translate(-50%, 150%); opacity: 0; }
.cosmic-slide-leave-to { transform: translate(-50%, 150%); opacity: 0; }

@media (max-width: 850px) {
  .disclaimer-content { flex-direction: column; text-align: center; }
  .action-side { width: 100%; }
}
</style>