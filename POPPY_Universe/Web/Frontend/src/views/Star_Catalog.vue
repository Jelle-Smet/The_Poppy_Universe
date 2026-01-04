<template>
  <div class="encyclopedia-container">
    <div class="glass-header">
      <div class="sparkle-icon">✨</div>
      <h1>Claim Your Corner of the Cosmos</h1>
      <p class="intro">
        Every star has a story, and now, it can have an owner. Become a permanent part of the Poppy Universe. 
        From flickering dwarfs to roaring blue giants, find the star that speaks to your soul.
      </p>
      <div class="market-status">
        <span class="pulse"></span> Market Status: Open for Adoption
      </div>
    </div>

    <div class="stars-grid">
      <div class="star-card" v-for="star in stars" :key="star.Star_ID">
        
        <div class="price-badge">
          <span class="currency">P$</span>{{ calculatePrice(star) }}
        </div>

        <div
          class="star-orb"
          :style="{
            backgroundColor: starColor(star.Star_SpType),
            boxShadow: starLuminosityGlow(star.Star_Luminosity, starColor(star.Star_SpType))
          }"
        ></div>

        <div class="star-info">
          <p class="star-id-label">STEL-REF: {{ star.Star_ID }}</p>
          <p class="star-name">{{ star.Star_Name || 'Awaiting a Name...' }}</p>
          
          <div class="specs-grid">
            <div class="spec-item">
              <span class="label">CLASS</span>
              <span class="value">{{ star.Star_SpType || '???' }}</span>
            </div>
            <div class="spec-item">
              <span class="label">GLOW</span>
              <span class="value">{{ formatNumber(star.Star_Luminosity) }}</span>
            </div>
            <div class="spec-item">
              <span class="label">WEIGHT</span>
              <span class="value">{{ formatNumber(star.Star_Mass) }}</span>
            </div>
          </div>

          <div class="button-group">
            <button class="details-button" @click.prevent="goToStar(star.Star_ID)">
              Details ✨
            </button>
            <button class="claim-button" @click.prevent="goToPurchase(star.Star_ID)">
              Claim 🚀
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more-wrapper">
      <button class="load-more-btn" @click="loadMore" :disabled="loading || noMore">
        {{ noMore ? 'All constellations mapped ✨' : loading ? 'Tuning Telescopes...' : 'Scan for More Opportunities' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const stars = ref([]);
    const limit = 25;
    const offset = ref(0);
    const loading = ref(false);
    const noMore = ref(false);
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    const fetchStars = async () => {
      if (loading.value || noMore.value) return;
      loading.value = true;
      try {
        const res = await axiosWithAuth.get('/stars/encyclopedia', {
          params: { limit, offset: offset.value, random: true },
        });

        if (!res.data.stars || res.data.stars.length === 0) {
          noMore.value = true;
        } else {
          // FILTER: Only keep stars where Owner_ID is null (not owned)
          const availableStars = res.data.stars.filter(star => !star.Owner_ID);
          
          const shuffledStars = availableStars.sort(() => Math.random() - 0.5);
          stars.value.push(...shuffledStars);
          
          // Increment offset by original response length to keep pagination consistent
          offset.value += res.data.stars.length;
          
          // If the filter left us with nothing in this batch, try fetching more automatically
          if (availableStars.length === 0 && !noMore.value) {
            fetchStars();
          }
        }
      } catch (err) {
        console.error("Error fetching stars:", err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchStars);

    const calculatePrice = (star) => {
      let base = 25.00; 
      const massVal = star.Star_Mass ? star.Star_Mass * 15.5 : 10;
      const lumVal = star.Star_Luminosity ? Math.sqrt(star.Star_Luminosity) * 8.2 : 5;
      
      const typeMultipliers = {
        'O': 5.0, 'B': 3.5, 'A': 2.0, 'F': 1.5, 'G': 1.2, 'K': 0.9, 'M': 0.7 
      };
      const multiplier = typeMultipliers[star.Star_SpType?.[0]] || 1.0;
      const jitter = (parseInt(star.Star_ID) % 100) / 10;

      const total = (base + massVal + lumVal + jitter) * multiplier;
      return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const goToStar = (id) => router.push(`/star/${id}`);
    const goToPurchase = (id) => router.push(`/purchase_star/${id}`);

    const starColor = (starOrType) => {
      if (typeof starOrType === 'object' && starOrType !== null) {
        const T = starOrType.Star_Teff;
        if (T) {
          if (T >= 10000) return 'rgb(155, 180, 255)';
          if (T >= 7500) return 'rgb(170, 190, 255)';
          if (T >= 6000) return 'rgb(200, 215, 255)';
          if (T >= 5000) return 'rgb(248, 247, 255)';
          if (T >= 4000) return 'rgb(255, 244, 234)';
          if (T >= 3500) return 'rgb(255, 210, 160)';
          return 'rgb(255, 204, 111)';
        }
        starOrType = starOrType.Star_SpType;
      }
      const colors = { 'O': '#9bb0ff', 'B': '#aabfff', 'A': '#cad7ff', 'F': '#f8f7ff', 'G': '#fff4ea', 'K': '#ffd2a1', 'M': '#ffcc6f' };
      return colors[starOrType?.[0]] || '#ffffff';
    };

    const starLuminosityGlow = (lum, color) => {
      const intensity = Math.min(Math.sqrt(lum || 1) * 5, 40);
      return `0 0 ${intensity}px ${color}`;
    };

    const formatNumber = (num) => (num ? Number(num).toFixed(2) : '---');

    return {
      stars, loading, noMore, goToStar, goToPurchase,
      starColor, starLuminosityGlow, formatNumber,
      calculatePrice, loadMore: fetchStars,
    };
  },
};
</script>

<style scoped>
/* Styles remain exactly the same as your previous version */
.encyclopedia-container {
  min-height: 100vh;
  padding: 100px 20px 60px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  text-align: center;
}
.glass-header {
  max-width: 900px;
  margin: 0 auto 70px;
  padding: 3rem 2rem;
  background-color: rgba(0, 0, 30, 0.9);
  border-radius: 30px;
  border: 1px solid rgba(125, 95, 255, 0.3);
  box-shadow: 0 0 25px rgba(125, 95, 255, 0.3);
  position: relative;
}
.sparkle-icon { font-size: 2rem; margin-bottom: 10px; animation: twinkle 2s infinite alternate; }
h1 {
  font-size: 3rem;
  margin: 0;
  text-shadow: 0 0 15px rgba(125, 95, 255, 0.7);
  background: linear-gradient(to bottom, #ffffff, #b4a0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.intro {
  font-size: 1.15rem;
  margin-top: 20px;
  color: #d1c8ff;
  line-height: 1.8;
}
.market-status {
  margin-top: 25px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #7d5fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.pulse {
  width: 8px; height: 8px; background: #00ff88; border-radius: 50%;
  box-shadow: 0 0 10px #00ff88; animation: pulse-green 1.5s infinite;
}
.stars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); 
  gap: 50px 30px;
  justify-items: center;
  max-width: 1400px;
  margin: 0 auto;
}
.star-card {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(10, 10, 30, 1);
  border-radius: 25px;
  padding: 30px 20px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.2);
  border: 1px solid rgba(125, 95, 255, 0.15);
  transition: all 0.3s ease;
}
.star-card:hover {
  transform: translateY(-10px);
  z-index: 10;
  border-color: #7d5fff;
  box-shadow: 0 20px 40px rgba(125, 95, 255, 0.3);
}
.price-badge {
  position: absolute;
  top: -18px;
  right: -8px;
  background: linear-gradient(135deg, #f8a5c2, #7d5fff, #3ae3ff);
  background-size: 200% 200%;
  animation: nebula-flow 5s ease infinite; 
  color: #e0d8ff;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.1rem;
  box-shadow: 0 5px 20px rgba(125, 95, 255, 0.5), 0 0 10px rgba(248, 165, 194, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: rotate(4deg);
  z-index: 5;
  letter-spacing: 0.5px;
}
.currency {
  font-size: 0.75rem;
  margin-right: 2px;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
@keyframes nebula-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.star-id-label { font-size: 0.65rem; color: #7d5fff; font-weight: 800; margin-bottom: 5px; }
.star-name { font-weight: 700; font-size: 1.3rem; margin-bottom: 12px; font-style: italic; }
.star-orb { width: 70px; height: 70px; border-radius: 50%; margin-right: 20px; flex-shrink: 0; }
.star-info { text-align: left; flex: 1; min-width: 0; }
.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 15px;
  text-align: center;
}
.spec-item { display: flex; flex-direction: column; }
.spec-item .label { font-size: 0.6rem; color: #9aa4ff; }
.spec-item .value { font-weight: 700; font-size: 0.85rem; }
.button-group { display: flex; gap: 8px; margin-top: 15px; }
.details-button, .claim-button {
  padding: 10px 0; border-radius: 12px; border: none;
  font-weight: 700; cursor: pointer; flex: 1; text-align: center; transition: 0.3s;
}
.details-button { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.1); }
.claim-button { background: linear-gradient(135deg, #7d5fff, #9aa4ff); color: white; }
.details-button:hover { background: rgba(255, 255, 255, 0.2); }
.claim-button:hover { filter: brightness(1.2); box-shadow: 0 0 20px #7d5fff; }
.load-more-btn {
  margin: 60px 0; padding: 12px 40px; border-radius: 50px;
  border: 1px solid #7d5fff; background: transparent; color: #fff;
  font-weight: 700; cursor: pointer; transition: 0.3s;
}
.load-more-btn:hover:not(:disabled) { background: #7d5fff; box-shadow: 0 0 30px rgba(125, 95, 255, 0.5); }
@keyframes pulse-green { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
@keyframes twinkle { from { opacity: 0.5; transform: scale(0.9); } to { opacity: 1; transform: scale(1.1); } }
@media (max-width: 450px) {
  .star-card { flex-direction: column; text-align: center; }
  .star-orb { margin-right: 0; margin-bottom: 15px; }
  .star-info { text-align: center; }
  .button-group { flex-direction: column; }
}
</style>