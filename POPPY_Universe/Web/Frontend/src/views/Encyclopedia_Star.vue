<template>
  <div class="encyclopedia-container">
    <div class="cosmic-panel intro-container">
      <header class="encyclopedia-main-header">
        <h1 class="hero-title loaded">
          ⭐ Star <span class="pink-glow">Encyclopedia</span>
        </h1>
        <p class="engine-tagline">POPPY UNIVERSE — CELESTIAL ARCHIVE V2.0</p>
      </header>
      
      <div class="intro-content">
        <p class="panel-intro">
          Explore the known stars in Poppy Universe. Each glowing orb represents a star’s physical properties: 
          the color indicates its <strong>spectral type</strong>, while the outer glow reflects its 
          <strong>absolute luminosity</strong>.
        </p>
      </div>
    </div>

    <div class="stars-grid">
      <div class="star-card" v-for="star in stars" :key="star.Star_ID">
        <div
          class="star-orb"
          :style="{
            backgroundColor: starColor(star.Star_SpType),
            boxShadow: starLuminosityGlow(star.Star_Luminosity, starColor(star.Star_SpType))
          }"
        ></div>

        <div class="star-info">
          <p><span class="label">Name:</span> {{ star.Star_Name || 'Unknown' }}</p>
          <p><span class="label">Type:</span> {{ star.Star_SpType || 'Unknown' }}</p>
          <p><span class="label">Luminosity:</span> {{ formatNumber(star.Star_Luminosity) }}</p>
          <p><span class="label">Mass:</span> {{ formatNumber(star.Star_Mass) }}</p>
          <p><span class="label">Age:</span> {{ formatNumber(star.Star_Age) }}</p>
          <p><span class="label">Radial Velocity:</span> {{ star.Star_RV_Category || 'Unknown' }}</p>

          <!-- Updated button -->
          <button class="details-button" @click.prevent="goToStar(star.Star_ID)">
            Open Star Details ✨
          </button>
        </div>
      </div>
    </div>

    <div class="load-more-wrapper">
      <button class="load-more-btn" @click="loadMore" :disabled="loading || noMore">
        {{ noMore ? 'No more stars ✨' : loading ? 'Loading…' : 'Load more stars' }}
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
          const shuffledStars = res.data.stars.sort(() => Math.random() - 0.5);
          stars.value.push(...shuffledStars);
          offset.value += res.data.stars.length;
        }
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchStars);

    const goToStar = (id) => {
      if (!id) return;
      router.push(`/star/${id}`);
    };

    // Fixed: Now handles both full star objects AND just spectral type strings
    const starColor = (starOrType) => {
      // If it's a full star object with temperature data
      if (typeof starOrType === 'object' && starOrType !== null) {
        const T = starOrType.Star_Teff;
        let r, g, b;

        if (T) {
          // Temperature-based color
          if (T >= 10000) { r = 155; g = 180; b = 255; }
          else if (T >= 7500) { r = 170; g = 190; b = 255; }
          else if (T >= 6000) { r = 200; g = 215; b = 255; }
          else if (T >= 5000) { r = 248; g = 247; b = 255; }
          else if (T >= 4000) { r = 255; g = 244; b = 234; }
          else if (T >= 3500) { r = 255; g = 210; b = 160; }
          else { r = 255; g = 204; b = 111; }

          return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        }

        // If object but no Teff, try spectral type
        starOrType = starOrType.Star_SpType;
      }

      // Fallback to spectral type colors (for strings or objects without Teff)
      switch (starOrType) {
        case 'O': return '#9bb0ff';  // Blue
        case 'B': return '#aabfff';  // Blue-white
        case 'A': return '#cad7ff';  // White
        case 'F': return '#f8f7ff';  // Yellow-white
        case 'G': return '#fff4ea';  // Yellow (like our Sun)
        case 'K': return '#ffd2a1';  // Orange
        case 'M': return '#ffcc6f';  // Red-orange
        default: return '#ffffff';
      }
    };

    const starLuminosityGlow = (lum, color) => {
      if (!lum) return '0 0 10px rgba(255,255,255,0.3)';
      const intensity = Math.min(Math.sqrt(lum) * 5, 50);
      return `0 0 ${intensity}px ${color}`;
    };

    const formatNumber = (num) => {
      if (num === null || num === undefined) return 'Unknown';
      return Number(num).toFixed(2);
    };

    return {
      stars,
      fetchStars,
      loading,
      noMore,
      goToStar,
      starColor,
      starLuminosityGlow,
      formatNumber,
      loadMore: fetchStars,
    };
  },
};
</script>

<style scoped>
.encyclopedia-container {
  min-height: 100vh;
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  text-align: center;
}

/* --- COSMIC PANEL BASE (Matches Engine Page) --- */
.cosmic-panel {
    background-color: rgba(10, 0, 50, 0.85); 
    padding: 35px;
    border-radius: 20px;
    border: 1px solid #00ffff; 
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); 
}

/* --- INTRO CONTAINER STYLING --- */
.intro-container { 
  text-align: center; 
  max-width: 1200px; /* Aligns with your grid width */
  margin: 0 auto 60px auto; 
}

.hero-title { 
  font-size: 3.5rem; 
  font-weight: 900; 
  color: #c0fcfc; 
  text-shadow: 0 0 15px #00ffff; 
  margin: 0; 
}

.pink-glow { 
  color: #ff69b4; 
  text-shadow: 0 0 15px #ff007f; 
}

.engine-tagline { 
  color: #00ffff; 
  font-size: 0.9rem; 
  font-weight: 800; 
  text-transform: uppercase; 
  letter-spacing: 3px; 
  margin-top: 15px; 
}

.panel-intro { 
  max-width: 850px; 
  margin: 20px auto 0; 
  color: #a0f0ff; 
  line-height: 1.8; 
  font-size: 1.1rem; 
  font-style: italic; 
}

h1 {
  font-size: 3rem;
  margin-bottom: 15px;
  text-shadow: 0 0 15px rgba(125, 95, 255, 0.7);
}

.intro {
  font-size: 1.2rem;
  margin-bottom: 45px;
  opacity: 0.9;
  max-width: 750px;
  margin: 0 auto;
  line-height: 1.6;
}

.stars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px; /* more space between cards */
  justify-items: center;
  width: 100%;
  padding: 0 10px; /* avoid touching edges */
}

.star-card {
  display: flex;
  flex-wrap: nowrap; /* Forces orb and info to stay side-by-side */
  align-items: center; /* Vertically centers the orb on the left side */
  background: rgba(10, 10, 30, 0.98);
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 0 25px rgba(125, 95, 255, 0.4), 0 15px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.star-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 35px rgba(125, 95, 255, 0.7), 0 20px 50px rgba(0, 0, 0, 0.6);
}

.star-orb {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  margin-bottom: 0;
  flex-shrink: 0;
}

.star-info {
  min-width: 0; /* allow content to shrink inside flex */
  flex: 1 1 auto;
  text-align: left;
}

.label {
  font-weight: 600;
  color: #9aa4ff;
  margin-right: 4px;
}

.details-button {
  margin-top: 12px;
  padding: 10px 18px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, #ff596b, #ff7d5f);
  color: #fff;
  box-shadow: 0 0 15px rgba(255, 89, 107, 0.6), 0 0 35px rgba(255, 125, 95, 0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.details-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 25px rgba(255, 89, 107, 0.9), 0 0 50px rgba(255, 125, 95, 0.6);
}

.load-more-wrapper {
  display: flex;
  justify-content: center;
  margin: 3rem 0;
}

.load-more-btn {
  padding: 0.7rem 2rem;
  border-radius: 14px;
  border: none;
  font-weight: 600;
  background: linear-gradient(135deg, #9aa4ff, #7f7fff);
  color: #fff;
  cursor: pointer;
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Small screens: stack orb above info */
@media (max-width: 400px) {
  .star-card {
    flex-direction: row; 
    align-items: center; /* Keeps it centered vertically next to text */
  }

  .star-orb {
    margin-right: 15px;
    margin-bottom: 0; /* Prevents it from jumping above text */
  }

  .star-info {
    text-align: left;
  }
}
</style>
