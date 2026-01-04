<template>
  <div class="encyclopedia-container">
    <div class="cosmic-panel intro-container">
      <header class="encyclopedia-main-header">
        <h1 class="hero-title loaded">
          🪐 Planet <span class="pink-glow">Encyclopedia</span>
        </h1>
        <p class="engine-tagline">POPPY UNIVERSE — PLANETARY REGISTRY V2.0</p>
      </header>
      
      <div class="intro-content">
        <p class="panel-intro">
          Explore the celestial bodies of our Solar System and beyond. 
          Each rendering highlights the planet's <strong>surface composition</strong> 
          through custom color mapping, while the glow intensity reflects its 
          <strong>apparent magnitude</strong>.
        </p>
      </div>
    </div>

    <div class="planets-grid">
      <div class="planet-card" v-for="planet in planets" :key="planet.Planet_ID">
        <div
          class="planet-orb"
          :style="{
            backgroundColor: planetColor(planet.Planet_Color),
            boxShadow: planetGlow(planet.Planet_Magnitude, planetColor(planet.Planet_Color))
          }"
        ></div>

        <div class="planet-info">
          <p><span class="label">Name:</span> {{ planet.Planet_Name || 'Unknown' }}</p>
          <p><span class="label">Type:</span> {{ planet.Planet_Type || 'Unknown' }}</p>
          <p><span class="label">Mass:</span> {{ formatNumber(planet.Planet_Mass, 'kg') }}</p>
          <p><span class="label">Diameter:</span> {{ formatNumber(planet.Planet_Diameter, 'km') }}</p>
          <p><span class="label">Distance from Sun:</span> {{ formatNumber(planet.Planet_Distance_From_Sun, 'AU') }}</p>
          <p><span class="label">Moons:</span> {{ planet.Planet_Number_of_Moons ?? 0 }}</p>

          <button class="details-button" @click.prevent="goToPlanet(planet.Planet_ID)">
            Open Planet Details ✨
          </button>
        </div>
      </div>
    </div>

    <div class="load-more-wrapper">
      <button class="load-more-btn" @click="loadMore" :disabled="loading || noMore">
        {{ noMore ? 'No more planets ✨' : loading ? 'Loading…' : 'Load more planets' }}
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
  'Grey': '#A0A0A0',                  // neutral grey
  'Brown-Grey': '#8B7D6B',            // earthy brownish-grey
  'Blue-Green-Brown-White': '#6699CC', // Earth-like mix
  'Red-Brown-Tan': '#C1440E',         // Mars-ish
  'Brown-Orange-Tan-White': '#D99466', // Jupiter-ish
  'Golden-Brown-Blue-Grey': '#CCB877', // Saturn-ish
  'Blue-Green': '#66CCCC',             // Uranus-ish
  'Blue': '#3366FF',                   // Neptune-ish
  'Light-Brown-Grey': '#D9C4A6',       // minor planets / moons
  'Grey-Brown': '#7F6A55',             // asteroid-ish
  'Grey-White': '#E0E0E0',             // icy objects
  'White (Ice)': '#FFFFFF',             // icy dwarf planets
  'Reddish-Brown': '#A63D2A',          // Pluto / Makemake style
  'DEFAULT': '#CCCCCC'                  // fallback
};

export default {
  setup() {
    const router = useRouter();
    const planets = ref([]);
    const limit = 10;
    const offset = ref(0);
    const loading = ref(false);
    const noMore = ref(false);
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchPlanets = async () => {
      if (loading.value || noMore.value) return;
      loading.value = true;

      try {
        const res = await axiosWithAuth.get('/planets/encyclopedia', {
          params: { limit, offset: offset.value },
        });

        if (!res.data.planets || res.data.planets.length === 0) {
          noMore.value = true;
        } else {
          planets.value.push(...res.data.planets);
          offset.value += res.data.planets.length;
        }
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchPlanets);

    const goToPlanet = (id) => {
      if (!id) return;
      router.push(`/planet/${id}`);
    };

    const planetColor = (color) => COLOR_MAP[color] || COLOR_MAP['DEFAULT'];

    const planetGlow = (mag, color) => {
      if (mag === null || mag === undefined) {
        return '0 0 10px rgba(255,255,255,0.3)';
      }
      
      const magnitude = Number(mag);
      
      if (Math.abs(magnitude) < 0.01) {
        return `0 0 10px ${color || '#fff'}`;
      }

      const intensity = Math.min(Math.sqrt(Math.abs(magnitude)) * 5, 50);
      return `0 0 ${intensity}px ${color || '#fff'}`;
    };
    
    // 💡 UPDATED: Handles scientific notation clearly and adds units.
    const formatNumber = (num, unit) => {
      if (num === null || num === undefined) {
        return 'Unknown';
      }

      const value = Number(num);
      
      // For very large/small numbers (like mass), use fixed scientific notation
      if (Math.abs(value) >= 1e6 || Math.abs(value) < 1e-4) {
        // e.g., "4.87 x 10^24 kg"
        const notation = value.toExponential(2);
        const [mantissa, exponent] = notation.split('e');
        
        // Use LaTeX for the exponent for clarity
        const formattedNumber = `${mantissa} \* 10^${Number(exponent)}`;
        
        return `${formattedNumber} ${unit}`;
      }
      
      // For general numbers (like diameter, distance)
      return `${value.toFixed(2)} ${unit}`;
    };

    return {
      planets,
      fetchPlanets,
      loading,
      noMore,
      goToPlanet,
      planetColor,
      planetGlow,
      // 💡 formatNumber now handles units
      formatNumber, 
      loadMore: fetchPlanets,
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

/* --- COSMIC PANEL BASE (Shared with Star/Engine pages) --- */
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

.planets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  justify-items: center;
  width: 100%;
  padding: 0 10px;
}

.planet-card {
  /* 💡 LAYOUT FIX: Ensure orb and info are side-by-side */
  display: flex; 
  flex-wrap: nowrap; /* Prevent wrapping to next line on small screens */
  align-items: center;
  background: rgba(10, 10, 30, 0.98);
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  max-width: 320px;
  box-shadow: 0 0 25px rgba(125, 95, 255, 0.4), 0 15px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.planet-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 35px rgba(125, 95, 255, 0.7), 0 20px 50px rgba(0, 0, 0, 0.6);
}

.planet-orb {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* 💡 LAYOUT FIX: Margin adjusted for standard left-side placement */
  margin-right: 20px; 
  margin-bottom: 0;
  flex-shrink: 0;
}

.planet-info {
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

/* 💡 LAYOUT FIX: Override previous media query to keep the orb left */
@media (max-width: 400px) {
  .planet-card {
    /* Set alignment back to the top-left corner on tiny screens */
    flex-direction: row; 
    align-items: flex-start;
  }

  .planet-orb {
    margin-right: 15px;
    margin-bottom: 0; /* Ensures orb stays beside the first line of text */
  }

  .planet-info {
    text-align: left; /* Ensures text is left-aligned even on mobile */
  }
}
</style>