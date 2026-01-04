<template>
  <div v-if="planet" class="planet-detail-container">
    <div class="planet-header">
      
      <div class="header-left-group">
        <div class="planet-visual-container">
          <p class="planet-intro">Appearance of this Planet:</p>
          <div class="planet-display">
            <div
              class="planet-orb"
              :class="planetClass"
              :style="planetStyle"
            >
              <div class="planet-surface-overlay" :class="getPlanetTexture(planet)"></div>
              
              <template v-if="planet.Planet_ID === 4">
                <div class="earth-window">
                  <div class="pole north-pole"></div>
                  <div class="pole south-pole"></div>

                  <div class="earth-track">
                    <div class="map-instance">
                      <div class="land n-america"></div>
                      <div class="land s-america"></div>
                      <div class="land europe"></div> 
                      <div class="land africa"></div>
                      <div class="land asia"></div>
                      <div class="land australia"></div>
                    </div>
                    <div class="map-instance">
                      <div class="land n-america"></div>
                      <div class="land s-america"></div>
                      <div class="land europe"></div> 
                      <div class="land africa"></div>
                      <div class="land asia"></div>
                      <div class="land australia"></div>
                    </div>
                  </div>
                  
                  <div class="earth-clouds"></div>
                  <div class="earth-shimmer"></div>
                </div>
              </template>
              
              <div v-if="planet.Planet_ID === 6" class="jupiter-features">
                <div class="great-red-spot"></div>
              </div>

              <div v-if="planet.Planet_ID === 9" class="neptune-spot"></div>

              <div class="planet-internal-shadow"></div>
            </div>

            <template v-if="planet.Planet_ID === 5">
              <div class="mars-cap mars-north"></div>
              <div class="mars-cap mars-south"></div>
            </template>

            <template v-if="planet.Planet_ID === 7">
              <div class="saturn-ring-system back">
                <div class="ring-dust outer"></div>
                <div class="ring-dust middle"></div>
                <div class="ring-dust inner"></div>
              </div>

              <div class="saturn-ring-system front">
                <div class="ring-dust outer"></div>
                <div class="ring-dust middle"></div>
                <div class="ring-dust inner"></div>
              </div>
            </template>

            <template v-if="planet.Planet_ID === 8">
              <div class="uranus-ring-system back">
                <div class="uranus-ring"></div>
              </div>

              <div class="uranus-ring-system front">
                <div class="uranus-ring"></div>
              </div>
            </template>
          </div>
        </div>

        <div class="planet-title">
          <p class="planet-name-label">Planet Name:</p>
          <h1>{{ planet.Planet_Name || 'Unknown Planet' }}</h1>
          <p class="planet-type"><strong>Type:</strong> {{ planet.Planet_Type || 'Unknown Type' }}</p>
          <p class="planet-color"><strong>Color:</strong> {{ planet.Planet_Color || 'Unknown' }}</p>
        </div>
      </div>

      <div class="planet-buttons">
        <router-link 
          :to="{ path: '/comparison_lab', query: { type: 'Planet', id: planet.Planet_ID } }" 
          class="map-btn"
        >
          Compare this Planet 🔬
        </router-link>

        <button class="like-btn" @click="toggleLike">
          {{ isLiked ? '💔 Unlike this planet' : '🌍 Like this planet 🌍' }}
        </button>

        <div class="rating-box">
          <p class="rate-label">Rate this Planet:</p>
          
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

    <div class="planet-info-grid">
      <div class="info-card" v-for="(value, label) in planetData" :key="label">
        <span class="label">{{ label }}:</span> 
        <span class="value">{{ formatValue(value, label) }}</span>
      </div>
    </div>

    <div class="owner-info">
      <h2>Owner Info</h2>
      <p><strong>Name:</strong> Poppy</p>
      <p><strong>Username:</strong> @poppy_universe</p>
    </div>
  </div>

  <div v-else class="loading">Loading Planet...</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'PlanetDetail',
  setup() {
    const planet = ref(null);
    const router = useRouter();
    const isLiked = ref(false);
    const ratingMessage = ref('');
    const userRating = ref(0);
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchPlanet = async () => {
      try {
        const planetId = parseInt(window.location.pathname.split('/')[2]);
        const response = await axiosWithAuth.get(`/planets/${planetId}`);
        planet.value = response.data.planet;

        const likeStatus = await axiosWithAuth.get(`/likes/status?type=Planet&id=${planetId}`);
        isLiked.value = likeStatus.data.isLiked;

      } catch (err) {
        console.error('Failed to fetch planet:', err);
      }
    };

    onMounted(fetchPlanet);

    const formatValue = (val, label) => {
      if (val === null || val === undefined) return 'Missing';
      if (label === 'Has Rings' || label === 'Has Magnetic Field') {
        return val ? 'Yes' : 'No';
      }
      if (typeof val === 'number') {
        if (Math.abs(val) >= 1e6 || (Math.abs(val) < 0.01 && val !== 0)) {
          return val.toExponential(2);
        }
        if (Math.abs(val) >= 1000) {
          return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        return val.toFixed(2);
      }
      return val;
    };

    const planetClass = computed(() => {
      if (!planet.value) return '';
      const id = planet.value.Planet_ID;
      return `planet-${id}`;
    });

    const planetStyle = computed(() => {
      if (!planet.value) return {};
      
      const colorMap = {
        2: 'radial-gradient(circle at 30% 30%, #a0a0a0, #888, #606060), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.1) 0%, transparent 20%)',
        3: 'radial-gradient(circle at 30% 30%, #d4b896, #a08060, #7a5f47)',
        4: 'radial-gradient(circle at 30% 30%, #4a90e2, #2e5f8f, #1a3a5f)',
        5: 'radial-gradient(circle at 30% 30%, #e27b58, #c1632f, #8b4513)',
        6: 'radial-gradient(circle at 30% 30%, #d4a76a, #c19456, #a67c52)',
        7: 'radial-gradient(circle at 30% 30%, #f4e7d7, #d4c5a0, #b8a080)',
        8: 'radial-gradient(circle at 30% 30%, #4fd0e7, #3ba3c1, #2a7f99)',
        9: 'radial-gradient(circle at 30% 30%, #4169e1, #2e4a9e, #1e3a7a)',
        10: 'radial-gradient(circle at 30% 30%, #d4c5b0, #a0927e, #7a6f5f), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
        11: 'radial-gradient(circle at 30% 30%, #8b7d6b, #6e5f4e, #5a4d3e)',
        12: 'radial-gradient(circle at 30% 30%, #d4d4d4, #a0a0a0, #7a7a7a)',
        13: 'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0, #c0c0c0)',
        14: 'radial-gradient(circle at 30% 30%, #a0635f, #7a4a47, #5f3836)'
      };
      if (planet.value.Planet_ID === 4) {
            return {
                background: colorMap[4],
                animation: 'rotate 180s linear infinite' 
            };
        }

      return {
        background: colorMap[planet.value.Planet_ID] || '#ffffff'
      };
    });

    const getPlanetTexture = (p) => {
      if (!p) return '';
      const id = p.Planet_ID;
      if ([6, 7].includes(id)) return 'striped-texture'; 
      if ([2, 3, 5, 10, 11, 12, 14].includes(id)) return 'rocky-texture'; 
      if ([8, 9].includes(id)) return 'gas-haze'; 
      return '';
    };

    const planetData = computed(() => {
      if (!planet.value) return {};
      return {
        'Type': planet.value.Planet_Type,
        'Magnitude': planet.value.Planet_Magnitude,
        'Color': planet.value.Planet_Color,
        'Distance from Sun (AU)': planet.value.Planet_Distance_From_Sun,
        'Distance from Earth (AU)': planet.value.Planet_Distance_From_Earth,
        'Diameter (km)': planet.value.Planet_Diameter,
        'Mass (Earth masses)': planet.value.Planet_Mass,
        'Orbital Period (days)': planet.value.Planet_Orbital_Period,
        'Orbital Inclination (°)': planet.value.Planet_Orbital_Inclination,
        'Semi-Major Axis (AU)': planet.value.Planet_SemiMajorAxisAU,
        'Longitude Ascending Node (°)': planet.value.Planet_Longitude_Ascending_Node,
        'Argument Periapsis (°)': planet.value.Planet_Argument_Periapsis,
        'Mean Anomaly (°)': planet.value.Planet_Mean_Anomaly,
        'Mean Temperature (K)': planet.value.Planet_Mean_Temperature,
        'Number of Moons': planet.value.Planet_Number_of_Moons,
        'Has Rings': planet.value.Planet_Has_Rings,
        'Has Magnetic Field': planet.value.Planet_Has_Magnetic_Field,
      };
    });

    const setRating = (n) => {
      userRating.value = n;
    };

    const submitRating = async () => {
      try {
        await axiosWithAuth.post('/interactions/rate', {
          objectType: 'Planet',
          objectId: planet.value.Planet_ID,
          rating: userRating.value
        });

        ratingMessage.value = '🪐 Successfully rated this planet!';
        setTimeout(() => {
          ratingMessage.value = '';
        }, 2500);

      } catch (err) {
        console.error('Error sending rating:', err);
      }
    };

    const toggleLike = async () => {
      if (!planet.value) return;
      try {
        const likeResp = await axiosWithAuth.post('/likes/toggle', {
          objectType: 'Planet',
          objectId: planet.value.Planet_ID
        });
        isLiked.value = likeResp.data.liked;

        if (isLiked.value) {
          await axiosWithAuth.post('/interactions/like', {
            objectType: 'Planet',
            objectId: planet.value.Planet_ID
          });
        }

      } catch (err) {
        console.error('Error toggling like:', err);
      }
    };

    return {
      planet,
      isLiked,
      userRating,
      setRating,
      submitRating,
      toggleLike,
      planetClass,
      planetStyle,
      getPlanetTexture,
      planetData,
      formatValue,
      ratingMessage
    };
  },
};
</script>

<style scoped>
.planet-detail-container {
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

.planet-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between; 
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
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

.planet-visual-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.planet-intro, .planet-name-label {
  font-size: 1.1rem;
  color: rgba(180, 160, 255, 0.8);
  font-weight: 600;
  text-shadow: 0 0 4px rgba(125, 95, 255, 0.4);
  margin-bottom: 0.5rem;
}

.planet-display {
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.planet-orb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  flex-shrink: 0;
  z-index: 5;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 30px rgba(0,0,0,0.5), 
    inset -15px -15px 40px rgba(0,0,0,0.4),
    0 0 10px rgba(154, 164, 255, 0.2);
  animation: rotate 120s linear infinite;
}

.planet-3 {
  box-shadow: 0 0 25px rgba(227, 187, 118, 0.4), inset -15px -15px 40px rgba(0,0,0,0.4) !important;
}

.planet-9 {
  box-shadow: 0 0 25px rgba(65, 105, 225, 0.4), inset -15px -15px 40px rgba(0,0,0,0.4) !important;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* --- THE EARTH CONTAINER --- */
.planet-orb.planet-4 {
  width: 140px;
  height: 140px;
  background-color: #054a91 !important;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 
    0 0 30px rgba(74, 144, 226, 0.4), 
    inset -15px -15px 40px rgba(0,0,0,0.7) !important;
  z-index: 1;
}

/* --- THE ROTATION TRACK --- */
.earth-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 250%; /* Widened to allow continents to "disappear" for longer */
  height: 100%;
  display: flex;
  animation: earth-spin 50s linear infinite;
  z-index: 2;
}

.map-instance {
  position: relative;
  width: 40%; /* Adjusted to match the 250% track width */
  height: 100%;
  flex-shrink: 0;
}

/* --- THE JAGGED CONTINENTS --- */
.land {
  position: absolute;
  background: linear-gradient(135deg, #2d5a2d, #3d6a3d);
  filter: drop-shadow(0 0 1px rgba(0,0,0,0.4));
  z-index: 3;
}

/* NORTH AMERICA - Massive northern landmass, smaller southern Gulf */
.n-america {
  width: 45px;  /* Increased width for a bigger Canada/USA */
  height: 50px; /* Increased height */
  top: 12%; 
  left: 5%;
  background: linear-gradient(135deg, #3d6a3d, #2d5a2d);
  /* Polygons: 0-40% height is now the massive "North", 40-70% is the Gulf area */
  clip-path: polygon(
    0% 30%, 20% 5%, 50% 0%, 90% 5%, 100% 15%, 
    100% 50%, /* Solid East Coast (NYC is safe!) */
    85% 65%,  /* Florida Peninsula */
    75% 55%,  /* East side of Gulf */
    55% 55%,  /* Top of Gulf (now much lower down the continent) */
    45% 65%,  /* West side of Gulf */
    50% 100%, /* Panama bridge tail */
    35% 85%, 
    15% 70%, 
    5% 50%
  );
}

/* SOUTH AMERICA - Aligned to the new bridge position */
.s-america {
  width: 28px; 
  height: 52px; 
  top: 42%; 
  left: 10%; 
  background: linear-gradient(135deg, #2d5a2d, #1e3d1e);
  clip-path: polygon(
    25% 0%,   
    90% 15%, 
    100% 40%, 
    75% 60%, 
    45% 100%, 
    20% 85%, 
    5% 30%
  );
}

/* --- THE FIXED POLES --- */
.pole {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  width: 100%; /* Spans the whole width */
  z-index: 5;
  filter: blur(1px);
}

.north-pole {
  top: -2px;
  height: 12px;
  clip-path: ellipse(50% 100% at 50% 0%); /* Curves with the top of the orb */
}

.south-pole {
  bottom: -2px;
  height: 15px;
  clip-path: ellipse(50% 100% at 50% 100%); /* Curves with the bottom of the orb */
}

/* --- REVISED EURASIA & AFRICA --- */

/* Europe: Made bigger and moved lower */
.europe {
  width: 32px; 
  height: 25px; 
  top: 22%; 
  left: 46%; 
  background-color: #3d6a3d;
  /* Jagged shape that reaches down toward Africa */
  clip-path: polygon(10% 90%, 0% 40%, 30% 0%, 80% 10%, 100% 40%, 80% 90%, 50% 100%);
  z-index: 4;
}

/* Africa: Moved up to almost touch Europe */
.africa {
  width: 42px; 
  height: 55px; 
  top: 38%; /* Adjusted to sit just below Europe */
  left: 48%; 
  background: linear-gradient(to bottom, #4a7a4a 20%, #c4b896 80%);
  clip-path: polygon(5% 10%, 95% 5%, 100% 30%, 70% 100%, 35% 95%, 0% 40%);
  z-index: 3;
}

/* Asia: Connecting to the side of the larger Europe */
.asia {
  width: 71px; 
  height: 50px; 
  top: 10%; 
  left: 55%; 
  background: linear-gradient(to bottom, #2d5a2d, #4a7a4a);
  clip-path: polygon(0% 50%, 20% 10%, 70% 0%, 100% 20%, 95% 70%, 75% 90%, 30% 95%);
  z-index: 2;
}

/* AUSTRALIA - Adjusted for a wider Pacific gap */
.australia {
  width: 24px; 
  height: 20px; 
  top: 65%; 
  left: 80%; /* Moved left to create a larger gap with South America */
  background: #c4936f; /* Slightly desert-orange/tan */
  /* More detailed polygon for the 'land down under' */
  clip-path: polygon(
    15% 15%, 40% 10%, 55% 25%, 85% 15%, 100% 40%, 
    90% 85%, 60% 100%, 30% 95%, 15% 70%, 0% 40%
  );
  filter: drop-shadow(0 0 1px rgba(0,0,0,0.3));
}

/* --- THE FIXED POLES --- */
.pole {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  width: 100%; /* Spans the whole width */
  z-index: 5;
  filter: blur(1px);
}

.north-pole {
  top: -2px;
  height: 12px;
  clip-path: ellipse(50% 100% at 50% 0%); /* Curves with the top of the orb */
}

.south-pole {
  bottom: -2px;
  height: 15px;
  clip-path: ellipse(50% 100% at 50% 100%); /* Curves with the bottom of the orb */
}

/* Swirling Clouds with realistic drift */
.earth-clouds {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  background-image: 
    radial-gradient(ellipse 30px 10px at 20% 30%, rgba(255,255,255,0.4), transparent),
    radial-gradient(ellipse 40px 15px at 70% 60%, rgba(255,255,255,0.3), transparent),
    radial-gradient(ellipse 25px 8px at 50% 10%, rgba(255,255,255,0.2), transparent);
  filter: blur(5px);
  animation: atmosphere-swirl 30s linear infinite;
  z-index: 6;
  pointer-events: none;
}

/* The Sphere Mask (Hides continents on the "back" of the planet) */
.earth-shimmer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  /* This creates a shadow at the edges so continents "disappear" into the darkness */
  background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25) 0%, transparent 60%, rgba(0,0,0,0.5) 100%);
  box-shadow: inset -15px -15px 30px rgba(0,0,0,0.7);
  z-index: 10;
  pointer-events: none;
}

/* --- ANIMATIONS --- */

@keyframes earth-spin {
  from { transform: translateX(0); }
  to { transform: translateX(-40%); } /* Cycles through one 100% map instance */
}

@keyframes atmosphere-swirl {
  from { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.05); }
  to { transform: rotate(360deg) scale(1); }
}

/* Jupiter bands and Great Red Spot */
.jupiter-bands {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.band {
  position: absolute;
  width: 120%;
  height: 15px;
  left: -10%;
  opacity: 0.4;
}

.band-1 {
  top: 15%;
  background: linear-gradient(90deg, #e8d4b0, #d4b890, #e8d4b0);
  transform: rotate(-2deg);
}

.band-2 {
  top: 35%;
  background: linear-gradient(90deg, #c19870, #a87c50, #c19870);
  transform: rotate(1deg);
}

.band-3 {
  top: 55%;
  background: linear-gradient(90deg, #d4a87a, #b88c5a, #d4a87a);
  transform: rotate(-1deg);
}

.band-4 {
  top: 75%;
  background: linear-gradient(90deg, #a87050, #8c5840, #a87050);
  transform: rotate(2deg);
}

.great-red-spot {
  position: absolute;
  width: 35px;
  height: 28px;
  background: radial-gradient(ellipse, #d45a4a, #b84838);
  border-radius: 50%;
  top: 45%;
  left: 40%;
  opacity: 0.8;
  box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3);
}

.mars-cap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 50%;
  opacity: 0.8;
  filter: blur(2px);
  z-index: 5; /* Sit on top of the rotating orb */
}
.mars-north { width: 30px; height: 10px; top: 15px; }
.mars-south { width: 35px; height: 12px; bottom: 15px; }

/* Neptune storm */
.neptune-spot {
  position: absolute;
  width: 25px;
  height: 20px;
  background: radial-gradient(ellipse, #2a4a8a, #1a3a6a);
  border-radius: 50%;
  top: 40%;
  left: 35%;
  opacity: 0.7;
}

/* Uranus bands */
.uranus-bands {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, 
      transparent 20%, 
      rgba(255,255,255,0.1) 22%, 
      transparent 24%,
      transparent 45%,
      rgba(255,255,255,0.1) 47%,
      transparent 49%,
      transparent 70%,
      rgba(255,255,255,0.1) 72%,
      transparent 74%
    );
}

/* --- SATURN RINGS --- */
.saturn-ring-system {
  position: absolute;
  width: 300px; 
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(75deg);
  pointer-events: none;
}

.saturn-ring-system.back {
  z-index: 1; /* Behind planet */
  clip-path: inset(0 0 50% 0); /* Show only top half */
}

.saturn-ring-system.front {
  z-index: 10; /* In front of planet */
  clip-path: inset(50% 0 0 0); /* Show only bottom half */
}

.ring-dust {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border-style: solid;
}

.outer { width: 260px; height: 260px; border-width: 8px; border-color: rgba(200, 180, 150, 0.2); }
.middle { width: 230px; height: 230px; border-width: 15px; border-color: rgba(220, 200, 170, 0.4); }
.inner { width: 180px; height: 180px; border-width: 5px; border-color: rgba(160, 140, 110, 0.3); }

/* --- URANUS RINGS (Vertical Tilt) --- */
.uranus-ring-system {
  position: absolute;
  width: 220px;
  height: 220px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateY(80deg) rotateX(10deg);
  pointer-events: none;
}

.uranus-ring-system.back {
  z-index: 1;
  clip-path: inset(0 50% 0 0); /* Show only left half (back) */
}

.uranus-ring-system.front {
  z-index: 10;
  clip-path: inset(0 0 0 50%); /* Show only right half (front) */
}

.uranus-ring {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(150, 200, 255, 0.3);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(150, 200, 255, 0.1);
}


.planet-title {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.planet-title h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  color: #fff;
}

.planet-title .planet-type,
.planet-title .planet-color {
  font-size: 1.2rem;
  margin-top: 0.2rem;
  color: #9aa4ff;
  text-shadow: 0 0 6px rgba(125, 95, 255, 0.3);
}

.planet-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
}

/* --- SURFACE TEXTURES --- */
.planet-surface-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.3;
  pointer-events: none;
}

.striped-texture {
  background: repeating-linear-gradient(
    transparent,
    rgba(0,0,0,0.3) 10px,
    transparent 20px
  );
}

.rocky-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.gas-haze {
  background: radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.4) 100%);
}

.planet-internal-shadow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.5) 100%);
  border-radius: 50%;
  pointer-events: none;
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

.planet-info-grid {
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