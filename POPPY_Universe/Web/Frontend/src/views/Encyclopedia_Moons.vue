<template>
  <div class="encyclopedia-container">
    <div class="cosmic-panel intro-container">
      <header class="encyclopedia-main-header">
        <h1 class="hero-title loaded">
          🌙 Moon <span class="pink-glow">Encyclopedia</span>
        </h1>
        <p class="engine-tagline">POPPY UNIVERSE — SATELLITE DIRECTORY V2.0</p>
      </header>
      
      <div class="intro-content">
        <p class="panel-intro">
          Cataloging the natural satellites orbiting the worlds of our Solar System. 
          Each orb is rendered to reflect <strong>surface albedo</strong> and color, 
          providing a visual scale of the diverse environments found across the planetary orbits.
        </p>
      </div>
    </div>

    <div class="moons-grid">
      <div class="moon-card" v-for="moon in moons" :key="moon.Moon_ID">
        <div
          class="moon-orb"
          :style="{
            backgroundColor: moonColor(moon.Moon_Color),
            boxShadow: moonGlow(moon.Moon_Color)
          }"
        ></div>

        <div class="moon-info">
          <p><span class="label">Name:</span> {{ moon.Moon_Name || 'Unknown' }}</p>
          <p><span class="label">Parent Planet:</span> {{ moon.Parent_Planet_Name || 'Unknown' }}</p>
          <p><span class="label">Mass:</span> {{ formatNumber(moon.Moon_Mass, 'kg') }}</p>
          <p><span class="label">Diameter:</span> {{ formatNumber(moon.Moon_Diameter, 'km') }}</p>

          <button class="details-button" @click.prevent="goToMoon(moon.Moon_ID)">
            Open Moon Details ✨
          </button>
        </div>
      </div>
    </div>

    <div class="load-more-wrapper">
      <button class="load-more-btn" @click="loadMore" :disabled="loading || noMore">
        {{ noMore ? 'No more moons ✨' : loading ? 'Loading…' : 'Load more moons' }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Map descriptive color strings from your API to valid CSS Hex codes
const COLOR_MAP = {
  'Grey': '#A0A0A0',
  'White': '#FFFFFF',
  'Yellowish': '#E3D6A2',
  'Dusty-Red': '#A36D5F',
  'Icy-Blue': '#D1E5FF',
  'Brown-Grey': '#8B7D6B',
  'Light-Brown-Grey': '#D9C4A6',
  'Grey-Brown': '#7F6A55',
  'Grey-White': '#E0E0E0',
  'White (Ice)': '#FFFFFF',
  'DEFAULT': '#CCCCCC'
};

export default {
  name: 'MoonEncyclopedia',
  setup() {
    const router = useRouter();
    const moons = ref([]);
    const limit = 20;
    const offset = ref(0);
    const loading = ref(false);
    const noMore = ref(false);
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchMoons = async () => {
      if (loading.value || noMore.value) return;
      loading.value = true;

      try {
        const res = await axiosWithAuth.get('/moons/encyclopedia', {
          params: { limit, offset: offset.value },
        });

        if (!res.data.moons || res.data.moons.length === 0) {
          noMore.value = true;
        } else {
          moons.value.push(...res.data.moons);
          offset.value += res.data.moons.length;
          // If we got fewer than the limit, we know there are no more
          if (res.data.moons.length < limit) noMore.value = true;
        }
      } catch (err) {
        console.error('Error fetching moons:', err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchMoons);

    const goToMoon = (id) => {
      if (!id) return;
      router.push(`/moon/${id}`);
    };

    const moonColor = (color) => COLOR_MAP[color] || COLOR_MAP['DEFAULT'];

    const moonGlow = (color) => {
      const hex = moonColor(color);
      return `0 0 15px ${hex}66, inset -5px -5px 15px rgba(0,0,0,0.4)`;
    };

    const formatNumber = (num, unit) => {
      if (num === null || num === undefined) return 'Unknown';
      const value = Number(num);

      if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0)) {
        const notation = value.toExponential(2);
        const [mantissa, exponent] = notation.split('e');
        return `${mantissa} * 10^${Number(exponent)} ${unit}`;
      }
      return `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${unit}`;
    };

    return {
      moons,
      loading,
      noMore,
      goToMoon,
      moonColor,
      moonGlow,
      formatNumber,
      loadMore: fetchMoons,
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

/* --- COSMIC PANEL BASE (Shared Archive Styling) --- */
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
  max-width: 1200px; 
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

.moons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  justify-items: center;
  width: 100%;
  padding: 0 10px;
}

.moon-card {
  display: flex; 
  flex-wrap: nowrap; 
  align-items: center; /* Vertical middle alignment */
  background: rgba(10, 10, 30, 0.98);
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 0 25px rgba(125, 95, 255, 0.4), 0 15px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.moon-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 35px rgba(125, 95, 255, 0.7), 0 20px 50px rgba(0, 0, 0, 0.6);
}

.moon-orb {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px; 
  margin-bottom: 0;
  flex-shrink: 0;
  transition: box-shadow 0.3s ease;
}

.moon-info {
  min-width: 0;
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

@media (max-width: 400px) {
  .moon-card {
    flex-direction: row; 
    align-items: center;
  }

  .moon-orb {
    margin-right: 15px;
  }

  .moon-info {
    text-align: left;
  }
}
</style>