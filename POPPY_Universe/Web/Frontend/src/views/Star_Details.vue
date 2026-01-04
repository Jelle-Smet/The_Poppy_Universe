<template>
  <div v-if="star" class="star-detail-container">
    <div class="star-header">
      
      <div class="header-left-group">
        <div class="star-orb-container">
          <p class="star-intro">Appearance of this Star:</p>
          <div
            class="star-orb"
            :style="{ backgroundColor: starColorRGB, boxShadow: starGlow }"
            title="Color and glow represent temperature, color index, and luminosity"
          ></div>
        </div>

        <div class="star-title">
          <p class="star-name-label">Star Name:</p>
          <h1>{{ star.Star_Name || 'Unknown Star' }}</h1>
          <p class="star-type"><strong>Spectral Type:</strong> {{ star.Star_SpType || 'Unknown Type' }}</p>
        </div>
      </div>

      <div class="star-buttons">
        <router-link 
          :to="{ path: '/comparison_lab', query: { type: 'Star', id: star.Star_ID } }" 
          class="map-btn"
        >
          Compare this Star 🔬
        </router-link>

        <button class="like-btn" @click="toggleLike">
          {{ isLiked ? '💔 Unlike this star' : '⭐ Like this star ⭐' }}
        </button>

        <div class="rating-box">
          <p class="rate-label">Rate this Star:</p>
          
          <div class="rate-stars">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ filled: n <= userRating }"
              @click="setRating(n)"
            >★</span>
          </div>
          <p v-if="ratingMessage" class="rating-success">
            {{ ratingMessage }}
          </p>
          <button class="send-rating-btn" @click="submitRating">Send Rating</button>
        </div>
      </div>
    </div>

    <div class="star-info-grid">
      <div class="info-card" v-for="(value, label) in starData" :key="label">
        <span class="label">{{ label }}:</span> 
        <span class="value">{{ formatValue(value) }}</span>
      </div>
    </div>

    <div class="owner-info">
      <h2>Owner Info</h2>
      <p><strong>Name:</strong> {{ ownerFullName || "No owner yet"}}</p>
      <p><strong>Username:</strong> {{ ownerUsername || "No owner yet"}}</p>
    </div>
  </div>

  <div v-else class="loading">Loading Star...</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'StarDetail',
  setup() {
    const star = ref(null);
    const router = useRouter();
    const isLiked = ref(false);
    const ratingMessage = ref('');
    const userRating = ref(0);
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchStar = async () => {
      try {
        const starId = parseInt(window.location.pathname.split('/')[2]);
        const response = await axiosWithAuth.get(`/stars/${starId}`);
        star.value = response.data.star;

        const likeStatus = await axiosWithAuth.get(`/likes/status?type=Star&id=${starId}`);
        isLiked.value = likeStatus.data.isLiked;

      } catch (err) {
        console.error('Failed to fetch star:', err);
      }
    };

    onMounted(fetchStar);

    const formatValue = (val) => {
      if (val === null || val === undefined) return 'Missing';
      if (typeof val === 'number') return val.toFixed(2);
      return val;
    };

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

        if (star.value.Star_BPMag && star.value.Star_RPMag) {
          const bv = star.value.Star_BPMag - star.value.Star_RPMag;
          r = Math.min(255, r + bv * 10);
          g = Math.min(255, g + bv * 5);
        }
      } else {
        switch (star.value.Star_SpType) {
          case 'O': return '#9bb0ff';
          case 'B': return '#aabfff';
          case 'A': return '#cad7ff';
          case 'F': return '#f8f7ff';
          case 'G': return '#fff4ea';
          case 'K': return '#ffd2a1';
          case 'M': return '#ffcc6f';
          default: return '#ffffff';
        }
      }

      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    });

    const starGlow = computed(() => {
      if (!star.value?.Star_Luminosity) return '0 0 15px rgba(255,255,255,0.3)';
      const intensity = Math.min(Math.sqrt(star.value.Star_Luminosity) * 5, 50);
      return `0 0 ${intensity}px ${starColorRGB.value}`;
    });

    const starData = computed(() => {
      if (!star.value) return {};
      return {
        'Spectral Type': star.value.Star_SpType,
        'Temperature (K)': star.value.Star_Teff,
        'B Magnitude': star.value.Star_BPMag,
        'R Magnitude': star.value.Star_RPMag,
        'G Magnitude': star.value.Star_GMag,
        'Luminosity (L☉)': star.value.Star_Luminosity,
        'Mass (M☉)': star.value.Star_Mass,
        'Radius (R☉)': star.value.Star_Radius,
        'Age (Myr)': star.value.Star_Age,
        'Radial Velocity': star.value.Star_RV_Category,
        'Evolution Stage': star.value.Star_Evol_Category,
        'Distance (ly)': star.value.Star_Distance,
        'RA (°)': star.value.Star_RA,
        'DE (°)': star.value.Star_DE,
        'Source': star.value.Star_Source,
        'Log G': star.value.Star_LogG,
        'Fe/H': star.value.Star_FeH,
      };
    });

    const ownerFullName = computed(() => {
      if (!star.value) return 'Missing';
      const fn = star.value.User_FN;
      const ln = star.value.User_LN;
      return fn && ln ? `${fn} ${ln}` : 'Missing';
    });

    const ownerUsername = computed(() => {
      return star.value?.User_Name || 'Missing';
    });

    const setRating = (n) => {
      userRating.value = n;
    };

    const submitRating = async () => {
      try {
        await axiosWithAuth.post('/interactions/rate', {
          objectType: 'Star',
          objectId: star.value.Star_ID,
          rating: userRating.value
        });

        ratingMessage.value = '⭐ Successfully rated this star!';
        setTimeout(() => {
          ratingMessage.value = '';
        }, 2500);

      } catch (err) {
        console.error('Error sending rating:', err);
      }
    };

    const toggleLike = async () => {
      if (!star.value) return;
      try {
        const likeResp = await axiosWithAuth.post('/likes/toggle', {
          objectType: 'Star',
          objectId: star.value.Star_ID
        });
        isLiked.value = likeResp.data.liked;

        if (isLiked.value) {
          await axiosWithAuth.post('/interactions/like', {
            objectType: 'Star',
            objectId: star.value.Star_ID
          });
        }

      } catch (err) {
        console.error('Error toggling like:', err);
      }
    };

    return {
      star,
      isLiked,
      userRating,
      setRating,
      submitRating,
      toggleLike,
      starColorRGB,
      starGlow,
      starData,
      ownerFullName,
      ownerUsername,
      formatValue,
      ratingMessage
    };
  },
};
</script>

<style scoped>
.star-detail-container {
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

.star-header {
  display: flex;
  align-items: flex-start;
  /* This pushes the "left-group" and the "buttons" to opposite sides */
  justify-content: space-between; 
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  background-color: rgba(0,0,30,0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
}

/* This new class keeps the Orb and Title together on the left */
.header-left-group {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.star-orb-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.star-intro, .star-name-label {
  font-size: 1.1rem;
  color: rgba(180, 160, 255, 0.8);
  font-weight: 600;
  text-shadow: 0 0 4px rgba(125, 95, 255, 0.4);
  margin-bottom: 0.5rem;
}

.star-orb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: box-shadow 0.3s ease;
}

.star-title {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.star-title h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  color: #fff;
}

.star-title .star-type {
  font-size: 1.2rem;
  margin-top: 0.2rem;
  color: #9aa4ff;
  text-shadow: 0 0 6px rgba(125, 95, 255, 0.3);
}

.star-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end; /* Pins buttons/rating box to the right edge */
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

.rating-success {
  margin-top: 8px;
  font-size: 0.85rem;
  color: rgba(125, 95, 255, 0.85);
  text-shadow: 0 0 6px rgba(125, 95, 255, 0.4);
}

.rate-label {
  color: rgba(125, 95, 255, 0.3);
  font-weight: 600;
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
  margin-bottom: 0.25rem;
}

.rate-stars {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.2rem;
}

.rate-stars .star {
  color: rgba(125, 95, 255, 0.3);
  text-shadow: 0 0 4px rgba(125, 95, 255, 0.5);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.rate-stars .star.filled {
  color: rgba(125, 95, 255, 1);
  text-shadow: 0 0 6px rgba(125, 95, 255, 0.8);
}

.rate-stars .star:hover {
  transform: scale(1.2);
}

.send-rating-btn {
  width: 100%;
  margin-top: 0.25rem;
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

.star-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-card {
  background-color: rgba(0,0,30,0.8);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-card .label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #9aa4ff;
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
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

.owner-info p strong {
  font-weight: 600;
  color: #9aa4ff; 
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
}
</style>