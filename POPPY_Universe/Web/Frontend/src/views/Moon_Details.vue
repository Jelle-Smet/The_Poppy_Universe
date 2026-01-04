<template>
  <div v-if="moon" class="moon-detail-container">
    <div class="moon-header">
      
      <div class="header-left-group">
        <div class="moon-visual-container">
          <p class="moon-intro">Appearance of this Moon:</p>
          <div class="moon-display">
            <div
              class="moon-orb"
              :style="moonStyle"
              :title="`Composition: ${moon.Moon_Composition}`"
            >
              <div v-if="hasFeature('Craters')" class="feature-craters"></div>
              <div v-if="hasFeature('Volcanoes')" class="feature-volcanoes"></div>
              <div v-if="hasFeature('Ice')" class="feature-ice-crust"></div>
              <div v-if="hasFeature('Lakes')" class="feature-lakes"></div>
              <div v-if="hasFeature('Geysers')" class="feature-geysers"></div>
              
              <div class="moon-shadow"></div>
            </div>
          </div>
        </div>

        <div class="moon-title">
          <p class="moon-name-label">Moon Name:</p>
          <h1>{{ moon.Moon_Name || 'Unknown Moon' }}</h1>
          <p class="moon-type">
            <strong>Parent Planet:</strong> {{ moon.Parent_Planet_Name || 'Unknown' }}
          </p>
          
          <button 
            v-if="moon.Parent_Planet_ID" 
            class="parent-link-btn" 
            @click="goToParentPlanet(moon.Parent_Planet_ID)"
          >
            Check out Parent Planet 🪐
          </button>

          <p class="moon-surface">
            <strong class="label">Surface:</strong> {{ moon.Moon_Surface_Features || 'Unknown' }}
          </p>
        </div>
      </div>

      <div class="moon-buttons">
        <router-link 
          :to="{ path: '/comparison_lab', query: { type: 'Moon', id: moon.Moon_ID } }" 
          class="map-btn"
        >
          Compare this Moon 🔬
        </router-link>

        <button class="like-btn" @click="toggleLike">
          {{ isLiked ? '💔 Unlike this moon' : '🌙 Like this moon 🌙' }}
        </button>

        <div class="rating-box">
          <p class="rate-label">Rate this Moon:</p>
          <div class="rate-stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star-icon"
              :class="{ filled: n <= userRating }"
              @click="setRating(n)"
            >★</span>
          </div>
          <p v-if="ratingMessage" class="rating-success">{{ ratingMessage }}</p>
          <button class="send-rating-btn" @click="submitRating">Send Rating</button>
        </div>
      </div>
    </div>

    <div class="moon-info-grid">
      <div class="info-card" v-for="(value, label) in moonData" :key="label">
        <span class="label">{{ label }}:</span> 
        <span class="value">{{ formatValue(value) }}</span>
      </div>
    </div>

    <div class="owner-info">
      <h2>Owner Info</h2>
      <p><strong class="label">Name:</strong> Poppy</p>
      <p><strong class="label">Username:</strong> @poppy_universe</p>
    </div>
  </div>

  <div v-else class="loading">Loading Moon...</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'MoonDetail',
  setup() {
    const moon = ref(null);
    const router = useRouter();
    const isLiked = ref(false);
    const ratingMessage = ref('');
    const userRating = ref(0);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchMoon = async () => {
      try {
        const moonId = parseInt(window.location.pathname.split('/')[2]);
        const response = await axiosWithAuth.get(`/moons/${moonId}`);
        moon.value = response.data.moon;

        const likeStatus = await axiosWithAuth.get(`/likes/status?type=Moon&id=${moonId}`);
        isLiked.value = likeStatus.data.isLiked;
      } catch (err) {
        console.error('Failed to fetch moon:', err);
      }
    };

    onMounted(fetchMoon);

    const hasFeature = (feature) => {
        if (!moon.value?.Moon_Surface_Features) return false;
        return moon.value.Moon_Surface_Features.includes(feature) || 
               moon.value.Moon_Composition?.includes(feature);
    };

    const moonStyle = computed(() => {
      if (!moon.value) return {};
      
      const colorMap = {
        'Grey': 'radial-gradient(circle at 30% 30%, #d1d1d1, #8c8c8c, #4a4a4a)',
        'Yellow-Orange': 'radial-gradient(circle at 30% 30%, #ffcc33, #e67300, #994d00)',
        'White-Blue': 'radial-gradient(circle at 30% 30%, #e0f7fa, #81d4fa, #0288d1)',
        'Orange': 'radial-gradient(circle at 30% 30%, #ff9800, #f57c00, #bf360c)',
        'Red-Brown': 'radial-gradient(circle at 30% 30%, #a1887f, #6d4c41, #3e2723)',
        'White': 'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0, #bdbdbd)',
        'Dark Grey': 'radial-gradient(circle at 30% 30%, #757575, #424242, #212121)',
        'Black': 'radial-gradient(circle at 30% 30%, #424242, #1a1a1a, #000000)',
        'Brown': 'radial-gradient(circle at 30% 30%, #8d6e63, #5d4037, #3e2723)',
        'Light Grey': 'radial-gradient(circle at 30% 30%, #eeeeee, #cccccc, #999999)'
      };

      const bg = colorMap[moon.value.Moon_Color] || 'radial-gradient(circle at 30% 30%, #ccc, #888, #444)';
      
      const isIce = moon.value.Moon_Composition?.includes('Ice') || (moon.value.Moon_Color && moon.value.Moon_Color.includes('White'));
      const isVolcanic = moon.value.Moon_Surface_Features?.includes('Volcanoes');
      
      let glow = 'rgba(255, 255, 255, 0.1)';
      if (isIce) glow = 'rgba(180, 210, 255, 0.4)';
      if (isVolcanic) glow = 'rgba(255, 80, 0, 0.3)';
      
      return { 
        background: bg, 
        boxShadow: `0 0 35px ${glow}, inset -15px -15px 40px rgba(0,0,0,0.6)` 
      };
    });

    const moonData = computed(() => {
      if (!moon.value) return {};
      return {
        'Parent Planet': moon.value.Parent_Planet_Name,
        'Composition': moon.value.Moon_Composition,
        'Surface Features': moon.value.Moon_Surface_Features,
        'Diameter (km)': moon.value.Moon_Diameter,
        'Mass (kg)': moon.value.Moon_Mass,
        'Orbital Period (days)': moon.value.Moon_Orbital_Period,
        'Semi-Major Axis (km)': moon.value.Moon_SemiMajorAxisKm,
        'Inclination (°)': moon.value.Moon_Inclination,
        'Surface Temp (K)': moon.value.Moon_Surface_Temperature,
        'Distance from Earth (km)': moon.value.Moon_Distance_From_Earth
      };
    });

    const formatValue = (val) => {
      if (val === null || val === undefined) return 'Missing';
      if (typeof val === 'number') {
        if (Math.abs(val) >= 1e6) return val.toExponential(2);
        return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
      }
      return val;
    };

    const goToParentPlanet = (id) => router.push(`/planet/${id}`);
    const setRating = (n) => userRating.value = n;

    const submitRating = async () => {
      try {
        await axiosWithAuth.post('/interactions/rate', { 
          objectType: 'Moon', 
          objectId: moon.value.Moon_ID, 
          rating: userRating.value 
        });
        ratingMessage.value = '🌙 Successfully rated this moon!';
        setTimeout(() => ratingMessage.value = '', 2500);
      } catch (err) { console.error(err); }
    };

    const toggleLike = async () => {
      try {
        const res = await axiosWithAuth.post('/likes/toggle', { 
          objectType: 'Moon', 
          objectId: moon.value.Moon_ID 
        });

        isLiked.value = res.data.liked;

         if (isLiked.value) {
          await axiosWithAuth.post('/interactions/like', {
            objectType: 'Moon',
            objectId: moon.value.Moon_ID
          });
        }
      } catch (err) { console.error(err); }
    };

    return { 
      moon, isLiked, userRating, setRating, submitRating, toggleLike, 
      moonStyle, moonData, formatValue, ratingMessage, 
      hasFeature, goToParentPlanet 
    };
  },
};
</script>

<style scoped>
.moon-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.loading {
  text-align: center;
  font-size: 2rem;
  margin-top: 5rem;
}

.moon-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  background-color: rgba(0,0,30,0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
}

.header-left-group {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.moon-visual-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.moon-intro, .moon-name-label {
  font-size: 1.1rem;
  color: rgba(180, 160, 255, 0.8);
  font-weight: 600;
  text-shadow: 0 0 4px rgba(125, 95, 255, 0.4);
  margin-bottom: 0.5rem;
}

.moon-display {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.moon-orb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  animation: rotate 360s linear infinite;
}

.moon-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 30%, transparent 40%, rgba(0,0,0,0.6) 90%);
  pointer-events: none;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Feature Overlays - Using the composition data to change appearances */
.feature-craters {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(0,0,0,0.2) 8%, transparent 12%),
    radial-gradient(circle at 70% 60%, rgba(0,0,0,0.15) 10%, transparent 15%),
    radial-gradient(circle at 40% 75%, rgba(0,0,0,0.2) 6%, transparent 10%);
  opacity: 0.7;
}

.feature-volcanoes {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 50% 50%, #ff3d00 1%, #ff9100 4%, transparent 12%),
    radial-gradient(circle at 20% 70%, #ff3d00 1%, transparent 8%),
    radial-gradient(circle at 80% 30%, #ff3d00 1%, transparent 8%);
  filter: blur(1.5px);
}

.feature-ice-crust {
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%),
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 11px);
  box-shadow: inset 0 0 25px rgba(255,255,255,0.2);
}

.feature-lakes {
  position: absolute;
  width: 100%;
  height: 100%;
  /* Dark methane-like spots for Titan-style moons */
  background-image: radial-gradient(ellipse at 60% 40%, rgba(0,0,30,0.5) 15%, transparent 25%);
  opacity: 0.6;
}

.feature-geysers {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 95%, rgba(255,255,255,0.5), transparent 30%);
  filter: blur(3px);
  animation: spray 4s ease-in-out infinite;
}

@keyframes spray {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

.moon-title {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.moon-title h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  color: #fff;
}

.moon-title .moon-type {
  font-size: 1.2rem;
  color: #9aa4ff;
  margin-bottom: 0.5rem;
}

.moon-surface {
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.label {
  font-weight: 600;
  color: #9aa4ff;
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
}

.parent-link-btn {
  margin: 0.8rem 0;
  padding: 0.4rem 0.8rem;
  width: fit-content;
  border-radius: 8px;
  border: 1px solid rgba(154, 164, 255, 0.4);
  background: rgba(125, 95, 255, 0.1);
  color: #9aa4ff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.parent-link-btn:hover {
  background: rgba(125, 95, 255, 0.2);
  transform: translateX(5px);
  border-color: #9aa4ff;
}

.moon-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
}

.map-btn, .like-btn, .rating-box {
  width: 250px;
  box-sizing: border-box;
}

.map-btn, .like-btn {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease;
  text-align: center;
}

.map-btn {
  background: linear-gradient(135deg, #ff596b, #ff7d5f);
  color: #fff;
}

.like-btn {
  background: linear-gradient(135deg, #ffda6b, #ffc75f);
  color: #222;
}

.map-btn:hover, .like-btn:hover {
  transform: scale(1.05);
}

.rating-box {
  background-color: rgba(0,0,50,0.8);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 12px rgba(125, 95, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.rate-label {
  color: rgba(125, 95, 255, 0.6);
  font-weight: 600;
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.4);
  font-size: 0.9rem;
}

.rate-stars {
  display: flex;
  gap: 0.25rem;
  font-size: 1.5rem;
}

.star-icon {
  color: rgba(125, 95, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
}

.star-icon.filled {
  color: #9aa4ff;
  text-shadow: 0 0 10px rgba(125, 95, 255, 0.8);
}

.star-icon:hover {
  transform: scale(1.2);
}

.send-rating-btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #9aa4ff, #7f7fff);
  color: #fff;
  transition: transform 0.2s ease;
}

.send-rating-btn:hover {
  transform: scale(1.05);
}

.rating-success {
  font-size: 0.8rem;
  color: #9aa4ff;
  margin-top: 5px;
}

.moon-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.info-card {
  background-color: rgba(0,0,30,0.8);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 85px;
}

.info-card .value {
  font-weight: 500;
  font-size: 1.1rem;
  color: #fff;
  text-align: right;
}

.owner-info {
  background-color: rgba(0,0,30,0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
}

.owner-info h2 {
  margin-top: 0;
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.owner-info p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}
</style>