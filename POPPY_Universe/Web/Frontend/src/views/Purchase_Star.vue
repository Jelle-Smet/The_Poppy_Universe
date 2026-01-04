<template>
  <div v-if="star" class="star-detail-container">
    <div class="star-header">
      <div class="header-left-group">
        <div class="star-orb-container">
          <p class="star-intro">Orbital Projection:</p>
          <div
            class="star-orb"
            :style="{ backgroundColor: starColorRGB, boxShadow: starGlow }"
          ></div>
        </div>

        <div class="star-title">
          <p class="star-name-label">STEL-REF: {{ star.Star_ID }}</p>
          <h1>{{ star.Star_Name || 'Awaiting a Name...' }}</h1>
          <p class="star-type"><strong>Classification:</strong> {{ star.Star_SpType || 'Unknown Type' }}</p>
          
          <div class="price-badge-static">
             <span class="currency">P$</span>{{ finalPrice }}
          </div>
        </div>
      </div>

      <div class="purchase-action-box">
        <div v-if="!star.Owner_ID" class="checkout-summary">
          <h2>Acquisition Summary</h2>
          <div class="invoice-row">
            <span>Registry Status:</span>
            <span class="status-available">Available</span>
          </div>
          <div class="invoice-row">
            <span>Tier:</span>
            <span>{{ star.Star_SpType?.[0] || 'Standard' }} Class</span>
          </div>
          <div class="divider"></div>
          <div class="total-row">
            <span>Total Fee:</span>
            <span class="total-value">P$ {{ finalPrice }}</span>
          </div>
          
          <button class="buy-btn" @click="showModal = true">
            Initiate Ownership Transfer ✨
          </button>
        </div>

        <div v-else class="sold-state">
          <h3>⚠️ Registry Occupied</h3>
          <p>This star belongs to another explorer.</p>
          <button class="back-btn" @click="$router.push('/all_objects')">Return to Catalog</button>
        </div>
      </div>
    </div>

    <div class="tech-specs-section">
      <h3 class="section-title">Stellar Telemetry</h3>
      <div class="star-info-grid">
        <div class="info-card-styled" v-for="(value, label) in starData" :key="label">
          <div class="card-glow-bar"></div>
          <span class="label">{{ label.toUpperCase() }}</span> 
          <span class="value">{{ formatValue(value) }}</span>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="payment-modal card-glass">
        <div class="modal-glow-line"></div>
        <div class="modal-header">
          <div class="header-title">
            <span class="header-icon">📜</span>
            <h2>Galactic Bill of Sale</h2>
          </div>
          <button class="close-x" @click="showModal = false">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="acquisition-alert">
            <span class="pulse-dot"></span> Authenticating transfer for <strong>STEL-{{ star.Star_ID }}</strong>
          </div>
          
          <div class="legal-box-enhanced">
            <p class="legal-header">STEL-REGISTRY PROTOCOL:</p>
            <ul class="legal-list">
              <li>Permanent registry rights; one-time fee.</li>
              <li>Linked to User UUID: <span>{{ star.Owner_ID || 'PENDING' }}</span></li>
              <li>Stellar fluctuations are naturally occurring.</li>
            </ul>
          </div>

          <div class="checkbox-wrapper">
            <label class="custom-cb-container">
              <input type="checkbox" v-model="agreed">
              <span class="cb-checkmark"></span>
              <span class="cb-text">I accept the terms of discovery</span>
            </label>
          </div>
        </div>

        <div class="modal-footer">
          <button class="cancel-modal-btn" @click="showModal = false">Aborted</button>
          <button 
            class="confirm-modal-btn" 
            :disabled="!agreed || loading" 
            @click="completePurchase"
          >
            <span v-if="!loading">Confirm — P$ {{ finalPrice }}</span>
            <div v-else class="loading-spinner"></div>
          </button>
        </div>
      </div>
    </div>

    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="success-modal card-glass">
        <div class="success-glow-orb"></div>
        <div class="success-content">
          <div class="success-icon-wrapper">
            <span class="main-icon">🌌</span>
            <div class="icon-ring"></div>
          </div>
          <h2>Welcome to the Universe</h2>
          <p class="congrats-text">
            Registry Update Complete. <br>
            <span class="acquired-name">{{ star.Star_Name || 'STEL-' + star.Star_ID }}</span> <br>
            is now under your stewardship.
          </p>
          
          <div class="success-stats-mini">
            <span>CERTIFIED ID: {{ star.Star_ID }}</span>
            <span>PRICE: P$ {{ finalPrice }}</span>
          </div>
          
          <button class="collection-btn" @click="$router.push('/My_Stars')">
            Go to My Stars ✨
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading-screen">
    <div class="loading-orb"></div>
    <p>📡 Synchronizing with Star Charts...</p>
  </div>
</template>

<script>
// (Keep your script exactly as it was, it's already perfect!)
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const star = ref(null);
    const loading = ref(false);
    const showModal = ref(false);
    const showSuccessModal = ref(false);
    const agreed = ref(false);
    const route = useRoute();
    const router = useRouter();
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    onMounted(async () => {
      try {
        const response = await axiosWithAuth.get(`/stars/${route.params.id}`);
        star.value = response.data.star || response.data;
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    });

    const finalPrice = computed(() => {
      if (!star.value) return '0.00';
      let base = 25.00;
      const massVal = star.value.Star_Mass ? star.value.Star_Mass * 15.5 : 10;
      const lumVal = star.value.Star_Luminosity ? Math.sqrt(star.value.Star_Luminosity) * 8.2 : 5;
      const typeMultipliers = { 'O': 5.0, 'B': 3.5, 'A': 2.0, 'F': 1.5, 'G': 1.2, 'K': 0.9, 'M': 0.7 };
      const multiplier = typeMultipliers[star.value.Star_SpType?.[0]] || 1.0;
      const jitter = (parseInt(star.value.Star_ID) % 100) / 10;
      const total = (base + massVal + lumVal + jitter) * multiplier;
      return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });

    const starColorRGB = computed(() => {
      if (!star.value) return '#ffffff';
      const T = star.value.Star_Teff;
      let r, g, b;
      if (T) {
        if (T >= 10000) { r = 155; g = 180; b = 255; }
        else if (T >= 7500) { r = 170; g = 190; b = 255; }
        else if (T >= 6000) { r = 200; g = 215; b = 255; }
        else if (T >= 5000) { r = 248; g = 247; b = 255; }
        else if (T >= 4000) { r = 255; g = 244; b = 234; }
        else if (T >= 3500) { r = 255; g = 210; b = 160; }
        else { r = 255; g = 204; b = 111; }
      } else {
        const colors = { 'O': [155,180,255], 'B': [170,190,255], 'A': [202,215,255], 'F': [248,247,255], 'G': [255,244,234], 'K': [255,210,160], 'M': [255,204,111] };
        [r, g, b] = colors[star.value.Star_SpType?.[0]] || [255, 255, 255];
      }
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    });

    const starGlow = computed(() => {
      const intensity = Math.min(Math.sqrt(star.value?.Star_Luminosity || 1) * 5, 50);
      return `0 0 ${intensity}px ${starColorRGB.value}`;
    });

    const completePurchase = async () => {
      loading.value = true;
      try {
        await axiosWithAuth.post(`/stars/purchase/${star.value.Star_ID}`, {});
        showModal.value = false;
        showSuccessModal.value = true;
      } catch (err) {
        alert(err.response?.data?.message || "Transfer failed.");
        showModal.value = false;
      } finally {
        loading.value = false;
      }
    };

    const formatValue = (val) => (val === null || val === undefined ? '---' : typeof val === 'number' ? val.toFixed(2) : val);

    const starData = computed(() => {
      if (!star.value) return {};
      return {
        'Surface Temp (K)': star.value.Star_Teff,
        'Luminosity (L☉)': star.value.Star_Luminosity,
        'Mass (M☉)': star.value.Star_Mass,
        'Distance (ly)': star.value.Star_Distance,
        'Log G': star.value.Star_LogG,
        'Fe/H': star.value.Star_FeH
      };
    });

    return { star, loading, showModal, showSuccessModal, agreed, completePurchase, starColorRGB, starGlow, starData, formatValue, finalPrice };
  }
}
</script>

<style scoped>
/* --- BASE & UTILS --- */
.star-detail-container { max-width: 1200px; margin: 0 auto; padding: 120px 2rem; color: #fff; font-family: 'Poppins', sans-serif; }
.card-glass { background: rgba(10, 10, 30, 0.9); backdrop-filter: blur(15px); border: 1px solid rgba(125, 95, 255, 0.3); }

/* --- HEADER --- */
.star-header {
  display: flex;
  justify-content: space-between;
  background-color: rgba(10, 10, 30, 0.95);
  padding: 3.5rem;
  border-radius: 30px;
  border: 1px solid rgba(125, 95, 255, 0.4);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
  margin-bottom: 4rem;
}
.header-left-group { display: flex; gap: 3rem; align-items: center; }
.star-orb { width: 130px; height: 130px; border-radius: 50%; }
.star-title h1 { font-size: 3rem; margin: 0; text-shadow: 0 0 15px #7d5fff; }
.star-name-label { color: #7d5fff; font-weight: 800; font-size: 0.8rem; letter-spacing: 2px; }
.star-type { font-size: 1.2rem; color: #f8a5c2; font-style: italic; }

.price-badge-static {
  margin-top: 20px;
  display: inline-block;
  background: linear-gradient(135deg, #f8a5c2, #7d5fff, #3ae3ff);
  background-size: 200% 200%;
  animation: nebula-flow 5s ease infinite;
  padding: 8px 16px; border-radius: 12px;
  font-weight: 800; font-size: 1.3rem; color: #fff;
  box-shadow: 0 5px 20px rgba(125, 95, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.purchase-action-box { width: 380px; }
.checkout-summary { background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); }
.invoice-row { display: flex; justify-content: space-between; margin: 12px 0; color: #e0d8ff; }
.status-available { color: #00ff88; font-weight: 700; text-shadow: 0 0 10px rgba(0,255,136,0.3); }
.divider { height: 1px; background: rgba(125, 95, 255, 0.3); margin: 20px 0; }
.total-row { display: flex; justify-content: space-between; font-weight: 800; font-size: 1.3rem; }
.total-value { color: #3ae3ff; text-shadow: 0 0 10px rgba(58, 227, 255, 0.5); }

.buy-btn {
  width: 100%; margin-top: 25px; padding: 16px; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #7d5fff, #3ae3ff);
  color: #fff; font-weight: 800; cursor: pointer; transition: 0.3s;
}
.buy-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(125, 95, 255, 0.4); }

/* --- MODALS SHARED --- */
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(12px);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}

/* --- PAYMENT MODAL SPECIFIC --- */
.payment-modal { width: 95%; max-width: 500px; border-radius: 32px; padding: 40px; position: relative; }
.modal-glow-line { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 70%; height: 2px; background: linear-gradient(90deg, transparent, #7d5fff, #f8a5c2, transparent); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.header-title { display: flex; align-items: center; gap: 12px; }
.header-icon { font-size: 1.8rem; }
.close-x { background: none; border: none; color: #7d5fff; font-size: 1.8rem; cursor: pointer; }

.acquisition-alert {
  background: rgba(125, 95, 255, 0.1); border-left: 4px solid #7d5fff;
  padding: 15px; border-radius: 12px; margin-bottom: 20px; font-size: 0.9rem; display: flex; align-items: center; gap: 10px;
}
.pulse-dot { width: 8px; height: 8px; background: #7d5fff; border-radius: 50%; animation: pulse-purple 1.5s infinite; }

.legal-box-enhanced { background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 15px; margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.05); }
.legal-header { color: #f8a5c2; font-weight: 800; font-size: 0.75rem; letter-spacing: 2px; margin-bottom: 12px; }
.legal-list { padding-left: 20px; color: #b4a0ff; font-size: 0.85rem; line-height: 1.6; margin: 0; }
.legal-list span { color: #fff; font-family: monospace; }

/* --- CUSTOM CHECKBOX --- */
.checkbox-wrapper { margin-bottom: 30px; }
.custom-cb-container { display: flex; align-items: center; gap: 15px; cursor: pointer; font-size: 0.9rem; }
.custom-cb-container input { display: none; }
.cb-checkmark { 
  width: 22px; height: 22px; border: 2px solid #7d5fff; border-radius: 6px; 
  position: relative; transition: 0.3s; background: rgba(0,0,0,0.4);
}
.custom-cb-container input:checked + .cb-checkmark { background: #7d5fff; box-shadow: 0 0 15px #7d5fff; }
.custom-cb-container input:checked + .cb-checkmark::after {
  content: '✓'; position: absolute; left: 4px; top: -2px; color: #fff; font-weight: bold;
}
.cb-text { color: #fff; transition: 0.3s; }
.custom-cb-container:hover .cb-checkmark { border-color: #f8a5c2; }

.modal-footer { display: flex; gap: 15px; }
.cancel-modal-btn { flex: 1; padding: 15px; border-radius: 14px; border: 1px solid #7d5fff; background: transparent; color: #7d5fff; font-weight: 700; cursor: pointer; }
.confirm-modal-btn { 
  flex: 2; padding: 15px; border-radius: 14px; border: none; font-weight: 800; cursor: pointer;
  background: linear-gradient(135deg, #7d5fff, #f8a5c2); color: #fff;
}
.confirm-modal-btn:disabled { opacity: 0.3; cursor: not-allowed; }

/* --- SUCCESS MODAL SPECIFIC --- */
.success-modal { width: 95%; max-width: 480px; border-radius: 40px; padding: 60px 40px; text-align: center; border-color: #3ae3ff; box-shadow: 0 0 60px rgba(58, 227, 255, 0.3); overflow: hidden; }
.success-glow-orb { position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(58, 227, 255, 0.2) 0%, transparent 70%); pointer-events: none; }
.success-icon-wrapper { position: relative; display: inline-block; margin-bottom: 25px; }
.main-icon { font-size: 4.5rem; filter: drop-shadow(0 0 15px #3ae3ff); position: relative; z-index: 2; }
.icon-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border: 2px dashed #3ae3ff; border-radius: 50%; animation: rotate-ring 10s linear infinite; }

.success-content h2 { font-size: 2.2rem; margin-bottom: 15px; color: #fff; text-shadow: 0 0 15px rgba(58, 227, 255, 0.5); }
.acquired-name { color: #f8a5c2; font-size: 1.4rem; font-weight: 800; display: inline-block; margin-top: 5px; }
.success-stats-mini { display: flex; justify-content: space-around; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px; margin: 25px 0; font-size: 0.75rem; color: #7d5fff; letter-spacing: 1px; font-weight: 800; }

.collection-btn {
  width: 100%; padding: 20px; border-radius: 20px; border: none; font-weight: 900; font-size: 1.1rem; cursor: pointer;
  background: linear-gradient(135deg, #7d5fff, #3ae3ff); color: #fff; transition: 0.3s; box-shadow: 0 10px 25px rgba(125, 95, 255, 0.4);
}
.collection-btn:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(58, 227, 255, 0.5); }

/* --- TECH SPECS GRID --- */
.section-title { color: #7d5fff; font-size: 0.9rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 1.5rem; border-left: 4px solid #f8a5c2; padding-left: 15px; }
.star-info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.info-card-styled { background: rgba(125, 95, 255, 0.05); border: 1px solid rgba(125, 95, 255, 0.2); padding: 20px; border-radius: 16px; position: relative; overflow: hidden; }
.card-glow-bar { position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(to bottom, #7d5fff, #f8a5c2); }
.info-card-styled .label { font-size: 0.7rem; font-weight: 800; color: #7d5fff; }
.info-card-styled .value { display: block; font-size: 1.5rem; font-weight: 700; color: #fff; margin-top: 5px; }

/* --- ANIMATIONS --- */
@keyframes nebula-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes pulse-purple { 0% { box-shadow: 0 0 0 0 rgba(125, 95, 255, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(125, 95, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(125, 95, 255, 0); } }
@keyframes rotate-ring { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }

/* --- LOADING --- */
.loading-screen { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #050510; color: #7d5fff; }
.loading-orb { width: 50px; height: 50px; border: 3px solid #7d5fff; border-top-color: transparent; border-radius: 50%; animation: rotate-ring 1s linear infinite; margin-bottom: 20px; }
</style>