<template>
  <div class="dashboard-container">
    <div class="glass-header">
      <div class="header-main-content">
        <h1 class="main-glow-title">Poppy's Neural Network</h1>
        <div class="layer-badge secondary">LAYER 4 — NEURAL NETWORK</div>
      </div>

      <div class="intro-box trend-style">
        <p class="intro-main">
          Layer 4 is the <strong>advanced neural recommendation layer</strong>. It refines predictions by
          learning complex, non-linear relationships between users and celestial categories.
        </p>

        <div class="intro-details">
          <p>
            This layer uses a <strong>multi-layer neural network</strong> trained on user interactions.
            Users and categories are encoded as input vectors, allowing the model to capture subtle
            behavioral patterns that simpler models cannot detect.
          </p>

          <p>
            Through <strong>backpropagation</strong>, the network continuously
            adjusts its weights to minimize prediction error and generate accurate scores for both
            known and unseen user-category interactions.
          </p>

          <p class="visibility-note">
            <strong>Visibility percentages</strong> are inherited from previous layers and remain
            <em>informational only</em>. Neural predictions may optionally be weighted by visibility
            for final presentation.
          </p>
        </div>
      </div>

      <div class="control-center">
        <p class="control-instruction">Adjust your position in space & time:</p>
        <div class="travel-controls">
          <div class="control-group">
            <button class="time-travel-btn" @click="openCalendar">
              🕒 {{ formatDateTime(observationTime) }}
              <span class="edit-pill">Edit</span>
            </button>
          </div>
          <div class="control-group">
            <button class="location-travel-btn" @click="openGPS">
              📍 {{ currentLat.toFixed(2) }}°N, {{ currentLong.toFixed(2) }}°E
              <span class="edit-pill">Edit</span>
            </button>
          </div>
        </div>

        <div class="filter-group">
          <label 
            v-for="type in ['stars', 'planets', 'moons']" 
            :key="type"
            :class="['filter-chip', { active: selectedTypes.includes(type) }]">
            <input type="checkbox" v-model="selectedTypes" :value="type" />
            <span class="chip-icon">{{ getIcon(type) }}</span>
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </label>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showCalendar || showLocation" class="modal-overlay" @click="closeModal">
        <transition name="pop">
          <div v-if="showCalendar || showLocation" class="modal-window" @click.stop>
            <button class="modal-close-btn" @click="closeModal">✕</button>
            <Calender_Component
              v-if="showCalendar"
              :selectedStartDate="observationTime"
              @update:selectedStartDate="updateObservationTime"
            />
            <Location_Component
              v-if="showLocation"
              :latitude="currentLat"
              :longitude="currentLong"
              @update:location="handleLocationUpdate"
            />
          </div>
        </transition>
      </div>
    </transition>

    <div v-if="loading" class="centered-state">
      <div class="status-content">
        <div class="pulse-loader trend-purple"></div>
        <p class="loading-state">Retrieving recommendations, this may take a few seconds.</p>
      </div>
    </div>

    <div v-else class="results-area">
      <div class="dashboard-grid">
        <div 
          v-for="(item, index) in visibleRecommendations" 
          :key="item.type + index" 
          class="galactic-card boosted-card"
        >
          <div class="metrics-container">
            <div class="match-badge-glow">
              {{ Math.round(item.Match_Percentage) }}% <span>MATCH</span>
            </div>
            <div v-if="item.Boost_Amount_Pct > 0" class="boost-badge-glow">
              +{{ Math.round(item.Boost_Amount_Pct) }}% <span>BOOST</span>
            </div>
          </div>

          <div class="card-content">
            <div class="orb-container">
              <div v-if="item.type === 'stars'" class="orb star" :style="starStyle(item)"></div>
              
              <div v-if="item.type === 'planets'" class="orb planet" :style="getPlanetStyle(item)">
                <template v-if="item.Planet_ID === 4">
                  <div class="earth-window">
                    <div class="earth-track">
                      <div class="map-instance">
                        <div class="land n-america"></div><div class="land s-america"></div>
                        <div class="land europe"></div><div class="land africa"></div>
                        <div class="land asia"></div><div class="land australia"></div>
                      </div>
                      <div class="map-instance">
                        <div class="land n-america"></div><div class="land s-america"></div>
                        <div class="land europe"></div><div class="land africa"></div>
                        <div class="land asia"></div><div class="land australia"></div>
                      </div>
                    </div>
                    <div class="pole north-pole"></div><div class="pole south-pole"></div>
                    <div class="earth-clouds"></div>
                  </div>
                </template>
                <template v-else>
                  <div class="planet-surface" :class="getPlanetTexture(item)"></div>
                </template>
                <div class="planet-shimmer"></div>
              </div>

              <div v-if="item.type === 'moons'" class="orb moon" :style="moonStyle(item)">
                <div class="moon-texture"></div>
              </div>
            </div>

            <div class="info">
              <h3 class="object-title">{{ item.Star_Name || item.Planet_Name || item.Moon_Name }}</h3>
              
              <div class="data-row">
                <span class="label">Visibility chance: </span> 
                <span :style="{ color: getWeatherColor(item.Weather_Visibility_Chance), fontWeight: 'bold' }">
                   {{ item.Weather_Visibility_Chance }}%
                </span>
              </div>

              <div class="location-box">
                 <div class="loc-item">
                    <span class="loc-label">ALTITUDE</span>
                    <span class="loc-val">{{ item.Altitude?.toFixed(2) }}°</span>
                 </div>
                 <div class="loc-item">
                    <span class="loc-label">AZIMUTH</span>
                    <span class="loc-val">{{ item.Azimuth?.toFixed(2) }}°</span>
                 </div>
              </div>

              <p class="weather-explanation">
                <span class="label">Sky Status:</span> {{ item.Weather_Explanation }}
              </p>
              
              <button class="details-link trend-accent" @click="goTo(item)">
                Details ✨
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasMore" class="pagination-area">
        <button class="load-more-btn trend-purple-btn" @click="loadMore">
        Load More Hidden gems 🔭
        </button>
      </div>

      <div v-if="filteredRecommendations.length === 0" class="centered-state">
        <div class="status-content">
          <p class="empty-msg">No trending cosmic objects found here. 🔭</p>
          <button @click="openGPS" class="retry-btn">Change Location?</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Calender_Component from '../components/Celestial_Calender.vue';
import Location_Component from '../components/Location_Component.vue';

export default {
  components: {
    Calender_Component,
    Location_Component
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(true);

    const observationTime = ref(route.query.time ? new Date(route.query.time) : new Date());
    const currentLat = ref(parseFloat(route.query.lat) || 51.00468);
    const currentLong = ref(parseFloat(route.query.long) || 4.30304);

    const selectedTypes = ref(['stars', 'planets', 'moons']);
    const rawData = ref({ stars: [], planets: [], moons: [] });
    const visibleCount = ref(10);
    const showCalendar = ref(false);
    const showLocation = ref(false);
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchRecommendations = async () => {
        try {
            loading.value = true;
            const payload = {
            latitude: currentLat.value,
            longitude: currentLong.value,
            observationTime: observationTime.value.toISOString()
            };

            const res = await axiosWithAuth.post('/engine/run-l1-l4', payload); // ✅ Fixed endpoint
            
            if (res.data.success && res.data.results) {
            const data = res.data.results;
            
            const processItems = (items, type) => (items || []).map(item => {
                // 🐛 DEBUG: Log each item to see what's coming through
                console.log(`Processing ${type}:`, item);
                
                return { 
                ...item, 
                type: type,
                Match_Percentage: item.Match_Percentage || 0, 
                // ✅ Ensure Boost_Amount_Pct is a number
                Boost_Amount_Pct: parseFloat(item.Boost_Amount_Pct) || 0
                };
            });

            rawData.value = {
                stars: processItems(data.Stars, 'stars'),
                planets: processItems(data.Planets, 'planets'),
                moons: processItems(data.Moons, 'moons')
            };
            
            // 🐛 DEBUG: Log the final processed data
            console.log('Final planets data:', rawData.value.planets);
            
            visibleCount.value = 10;
            }
        } catch (err) {
            console.error("❌ Fetch failed:", err);
        } finally {
            loading.value = false;
        }
        };

    const openCalendar = () => { showCalendar.value = true; };
    const openGPS = () => { showLocation.value = true; };
    const closeModal = () => { showCalendar.value = false; showLocation.value = false; };

    const updateObservationTime = (newDate) => {
      observationTime.value = newDate;
      closeModal();
      syncAndFetch();
    };

    const handleLocationUpdate = (coords) => {
      currentLat.value = coords.lat;
      currentLong.value = coords.long;
      closeModal();
      syncAndFetch();
    };

    const syncAndFetch = () => {
        router.push({ 
            path: '/Layer4_Recommendations',  
            query: { 
            ...route.query, 
            time: observationTime.value.toISOString(),
            lat: currentLat.value,
            long: currentLong.value
            } 
        });
    };

    watch(() => route.query, () => fetchRecommendations(), { deep: true });
    onMounted(fetchRecommendations);

    const formatDateTime = (date) => date.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase();

    const filteredRecommendations = computed(() => {
      let combined = [];
      if (selectedTypes.value.includes('stars')) combined.push(...rawData.value.stars);
      if (selectedTypes.value.includes('planets')) combined.push(...rawData.value.planets);
      if (selectedTypes.value.includes('moons')) combined.push(...rawData.value.moons);
      return combined.sort((a, b) => b.Match_Percentage - a.Match_Percentage);
    });

    const visibleRecommendations = computed(() => filteredRecommendations.value.slice(0, visibleCount.value));
    const hasMore = computed(() => visibleCount.value < filteredRecommendations.value.length);
    const loadMore = () => { visibleCount.value += 10; };

    const getWeatherColor = (pct) => pct >= 80 ? '#00ff88' : pct >= 50 ? '#ffcc00' : '#ff596b';
    
    const starStyle = (s) => {
      const colors = { 'O': '#9bb0ff', 'B': '#aabfff', 'A': '#cad7ff', 'F': '#f8f7ff', 'G': '#fff4ea', 'K': '#ffd2a1', 'M': '#ffcc6f' };
      const c = colors[s.Star_SpType?.[0]] || '#fff';
      return { backgroundColor: c, boxShadow: `0 0 20px ${c}, inset -5px -5px 10px rgba(0,0,0,0.4)` };
    };

    const getPlanetStyle = (item) => {
      const name = (item.Planet_Name || "").toLowerCase();
      const planetColors = {
        'mercury': { bg: '#959595', glow: '#6b6b6b' },
        'venus':   { bg: '#e3bb76', glow: '#b88d44' },
        'earth':   { bg: '#2271b3', glow: '#054a91' },
        'mars':    { bg: '#e27b58', glow: '#a34121' },
        'jupiter': { bg: '#d39c7e', glow: '#9e6d55' },
        'saturn':  { bg: '#c5ab6e', glow: '#9b864d' },
        'uranus':  { bg: '#b3d8d8', glow: '#7ba7a7' },
        'neptune': { bg: '#4b70dd', glow: '#2b4491' },
        'pluto':   { bg: '#d4bda7', glow: '#8b7a6a' }
      };
      const style = planetColors[name] || { bg: '#6699CC', glow: '#336699' };
      return {
        background: `radial-gradient(circle at 30% 30%, ${style.bg}, ${style.glow})`,
        boxShadow: `0 0 20px ${style.bg}66, inset -10px -10px 20px rgba(0,0,0,0.6)`,
        border: '1px solid rgba(255,255,255,0.1)'
      };
    };

    const getPlanetTexture = (item) => {
      const name = (item.Planet_Name || "").toLowerCase();
      if (['jupiter', 'saturn'].includes(name)) return 'striped';
      if (['mars', 'mercury', 'pluto'].includes(name)) return 'dusty';
      if (['neptune', 'uranus'].includes(name)) return 'deep';
      return '';
    };

    const moonStyle = () => ({ 
      background: 'radial-gradient(circle at 30% 30%, #d1d1d1, #4a4a4a)', 
      boxShadow: `0 0 10px rgba(255,255,255,0.2), inset -5px -5px 15px rgba(0,0,0,0.4)` 
    });

    const getIcon = (t) => t === 'stars' ? '⭐' : t === 'planets' ? '🪐' : '🌙';
    
    const goTo = (item) => {
      const id = item.Star_ID || item.Planet_ID || item.Moon_ID;
      router.push(`/${item.type.slice(0, -1)}/${id}`);
    };

    return { 
      loading, selectedTypes, filteredRecommendations, visibleRecommendations,
      hasMore, loadMore, goTo, starStyle, getPlanetStyle, getPlanetTexture, moonStyle, 
      getIcon, getWeatherColor, observationTime, currentLat, currentLong,
      syncAndFetch, closeModal, openCalendar, openGPS, handleLocationUpdate, updateObservationTime,
      formatDateTime, showCalendar, showLocation
    };
  }
};
</script>

<style scoped>

/* NEW POPPY TITLE STYLES */
.main-glow-title {
  font-size: 3.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -2px;
  /* Glowing gradient effect */
  background: linear-gradient(to right, #fff, #7d5fff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(125, 95, 255, 0.6));
  margin: 0;
  line-height: 1;
}

.layer-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(125, 95, 255, 0.15);
  border: 1px solid rgba(125, 95, 255, 0.5);
  color: #b4a0ff;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 3px;
  border-radius: 50px;
  margin-top: 15px;
  margin-bottom: 25px;
  text-shadow: 0 0 10px rgba(125, 95, 255, 0.5);
}
.control-instruction {
  font-size: 0.75rem;
  font-weight: 700;
  color: #9aa4ff;      /* A soft cosmic blue */
  text-transform: uppercase;
  letter-spacing: 2px; /* Makes it look high-tech */
  margin-bottom: 12px;
  opacity: 0.8;
}

.dashboard-container {
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.glass-header {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 2rem;
  background-color: rgba(0, 0, 30, 0.8);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
  text-align: center;
}

.intro-box {
  max-width: 850px;
  margin: 20px auto;
  padding: 15px;
  border-left: 3px solid #7d5fff;
  background: rgba(125, 95, 255, 0.05);
  border-radius: 0 12px 12px 0;
}

.intro-main {
  font-size: 1.3rem;
  color: #b4a0ff;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.intro-details {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.intro-details strong {
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.control-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.travel-controls {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.time-travel-btn {
  background: rgba(125, 95, 255, 0.15);
  border: 1px solid rgba(125, 95, 255, 0.5);
  color: #fff;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  letter-spacing: 1px;
}

.time-travel-btn:hover {
  background: #7d5fff;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.6);
}

.location-travel-btn {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.4);
  color: #00ff88;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  letter-spacing: 1px;
}

.location-travel-btn:hover {
  background: #00ff88;
  color: #000;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.filter-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.filter-chip {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid rgba(154, 164, 255, 0.3);
  background: rgba(20, 20, 50, 0.6);
  cursor: pointer;
  transition: 0.3s;
}

.filter-chip.active {
  background: #7f7fff;
  box-shadow: 0 0 15px rgba(127, 127, 255, 0.6);
}

.filter-chip input { display: none; }

/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 15, 0.9);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-window {
  background: transparent;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 59, 107, 0.2);
  border: 1px solid #ff3b6b;
  color: #ff3b6b;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: 0.3s;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close-btn:hover {
  background: #ff3b6b;
  color: white;
  transform: rotate(90deg);
}

.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.3s ease; 
}
.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}

.pop-enter-active, .pop-leave-active {
  transition: all 0.3s ease-out;
}
.pop-enter-from, .pop-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

/* LOADING & EMPTY STATES */
.centered-state {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
}

.status-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.pulse-loader {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #7d5fff;
  box-shadow: 0 0 0 0 rgba(125, 95, 255, 0.7);
  animation: pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1);
}

@keyframes pulse {
  to { box-shadow: 0 0 0 30px rgba(125, 95, 255, 0); }
}

.loading-state, 
.empty-msg {
  margin: 0;
  opacity: 0.6;
  font-size: 1.1rem;
}

.retry-btn {
  background: transparent;
  border: 1px solid #7d5fff;
  color: #7d5fff;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.retry-btn:hover {
  background: #7d5fff;
  color: white;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.4);
}

/* CARD GRID */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.galactic-card {
  position: relative;
  background-color: rgba(0, 0, 30, 0.85);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 0 25px rgba(125, 95, 255, 0.2);
  border: 1px solid rgba(125, 95, 255, 0.1);
  transition: 0.3s ease;
}

.galactic-card:hover { 
  transform: translateY(-8px); 
  border-color: rgba(125, 95, 255, 0.4); 
}

/* Container to help position both badges at the top */
.metrics-container {
  position: absolute;
  top: -12px; /* Pulls them up to overlap the card edge */
  right: 15px;
  display: flex;
  gap: 8px; /* Space between the two badges */
  z-index: 10;
}

/* YOUR EXISTING MATCH STYLE (Updated for flex compatibility) */
.match-badge-glow {
  background: linear-gradient(135deg, #7d5fff, #b33771);
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 1.1rem;
  color: #fff;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.8);
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.match-badge-glow span { 
  font-size: 0.6rem; 
  opacity: 0.8; 
  text-transform: uppercase;
}

/* NEW BOOST STYLE: Now fits the "Glow" aesthetic */
.boost-badge-glow {
  background: linear-gradient(135deg, #00d2ff, #3a7bd5); /* Electric Blue Trend vibe */
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 1.1rem;
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 210, 255, 0.6);
  display: flex;
  align-items: baseline;
  gap: 4px;
  animation: boost-pulse 2s infinite ease-in-out;
}

.boost-badge-glow span {
  font-size: 0.6rem;
  opacity: 0.8;
  text-transform: uppercase;
}


.card-content { 
  display: flex; 
  align-items: flex-start; 
  gap: 20px; 
}

.orb { 
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  flex-shrink: 0;
  
  /* ADD THESE TWO LINES */
  position: relative; 
  overflow: hidden;   
  
  /* This ensures the texture stays inside the circle */
  display: flex;
  align-items: center;
  justify-content: center;
}

.object-title { 
  margin: 0 0 10px 0; 
  font-size: 1.3rem; 
  color: #fff; 
}

.label { 
  color: #9aa4ff; 
  font-size: 0.85rem; 
  font-weight: 600; 
}

.location-box {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 10px;
  margin: 15px 0;
  justify-content: space-around;
  border: 1px solid rgba(154, 164, 255, 0.1);
}

.loc-item { text-align: center; }
.loc-label { 
  display: block; 
  font-size: 0.65rem; 
  color: #9aa4ff; 
  letter-spacing: 1px; 
}
.loc-val { 
  font-size: 0.9rem; 
  font-weight: bold; 
  font-family: 'Courier New', monospace; 
}

.weather-explanation { 
  font-size: 0.8rem; 
  opacity: 0.8; 
  line-height: 1.4; 
}

.details-link {
  margin-top: 15px;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: 0.3s;
}

.details-link:hover {
  box-shadow: 0 0 15px rgba(108, 92, 231, 0.5);
}

/* PAGINATION */
.pagination-area {
  display: flex;
  justify-content: center;
  margin: 50px 0;
}

.load-more-btn {
  background: rgba(125, 95, 255, 0.1);
  border: 2px solid #7d5fff;
  color: #fff;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.load-more-btn:hover { 
  background: #7d5fff; 
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.5); 
}

/* The base container for textures */
.planet-surface {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3; /* Increased slightly for better visibility */
  pointer-events: none;
  border-radius: 50%;
}

/* Jupiter/Saturn - Atmospheric bands */
.striped {
  background: repeating-linear-gradient(
    transparent,
    rgba(0, 0, 0, 0.3) 8px,
    transparent 16px
  );
}

/* Mars/Mercury/Ceres - Rocky, cratered noise */
.dusty {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  filter: contrast(120%) brightness(80%);
}

/* Neptune/Uranus - Deep atmospheric gradient */
.deep {
  background: radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.5) 100%);
}

/* High-end glass finish for all planets */
.planet-shimmer {
  position: absolute;
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background: linear-gradient(
    135deg, 
    rgba(255, 255, 255, 0.4) 0%, 
    transparent 50%, 
    rgba(0, 0, 0, 0.1) 100%
  );
  border-radius: 50%;
  box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.2);
}
</style>