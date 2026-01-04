<template>
  <div class="dashboard-container">
    <div class="glass-header">
      <h1>🌌 My Favorite Galactic Objects</h1>
      <p class="intro">Manage and compare your discovered celestial collection.</p>

      <div class="search-and-filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by name..."
          />
        </div>

        <div class="filter-group">
          <label 
            v-for="type in ['stars', 'planets', 'moons']" 
            :key="type"
            :class="['filter-chip', { active: selectedTypes.includes(type) }]"
          >
            <input type="checkbox" v-model="selectedTypes" :value="type" />
            <span class="chip-icon">{{ getIcon(type) }}</span>
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </label>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">Scanning the star charts...</div>

    <div v-else class="results-area">
      <div class="dashboard-grid">
        <div 
          v-for="item in filteredObjects" 
          :key="item.type + '-' + item.id" 
          :class="['galactic-card']"
        >
          <span class="type-badge">{{ item.type.slice(0, -1).toUpperCase() }}</span>

          <div class="card-content">
            <div class="orb-container">
              <div v-if="item.type === 'stars'" class="orb star" :style="starStyle(item)"></div>
              <div v-if="item.type === 'planets'" class="orb planet" :style="planetStyle(item)"></div>
              <div v-if="item.type === 'moons'" class="orb moon" :style="moonStyle(item)">
                <div class="moon-texture"></div>
              </div>
            </div>

            <div class="info">
              <p><span class="label">Name:</span> {{ item.name }}</p>
              
              <p v-if="item.type === 'stars'"><span class="label">Spectral:</span> {{ item.spectralType }}</p>
              <p v-if="item.type === 'planets'"><span class="label">Magnitude:</span> {{ item.magnitude?.toFixed(2) }}</p>
              <p v-if="item.type === 'moons'"><span class="label">Parent:</span> {{ item.parent }}</p>
              
              <button class="details-link" @click="goTo(item.type.slice(0, -1), item.id)">
                Details ✨
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredObjects.length === 0" class="empty-msg">
        No objects found for the selected filters. 🔭
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const PLANET_MAP = { 'Grey': '#A0A0A0', 'Blue-Green-Brown-White': '#6699CC', 'Red-Brown-Tan': '#C1440E', 'DEFAULT': '#CCCCCC' };
const MOON_MAP = { 'Grey': '#A0A0A0', 'White': '#FFFFFF', 'Yellowish': '#E3D6A2', 'DEFAULT': '#CCCCCC' };

export default {
  setup() {
    const router = useRouter();
    const loading = ref(true);
    const searchQuery = ref('');
    const selectedTypes = ref(['stars', 'planets', 'moons']);
    const likedData = ref({ stars: [], planets: [], moons: [] });

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const axiosWithAuth = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });

    const fetchLikes = async () => {
      try {
        const res = await axiosWithAuth.get('/likes/user-likes');
        likedData.value = res.data;
      } catch (err) { console.error(err); } 
      finally { loading.value = false; }
    };

    onMounted(fetchLikes);

    const filteredObjects = computed(() => {
      let combined = [];
      if (selectedTypes.value.includes('stars')) combined.push(...likedData.value.stars.map(s => ({ ...s, type: 'stars' })));
      if (selectedTypes.value.includes('planets')) combined.push(...likedData.value.planets.map(p => ({ ...p, type: 'planets' })));
      if (selectedTypes.value.includes('moons')) combined.push(...likedData.value.moons.map(m => ({ ...m, type: 'moons' })));
      
      return combined.filter(obj => 
        obj.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      ).sort((a, b) => a.name.localeCompare(b.name));
    });

    // Visual logic mapped to your specific styles
    const starStyle = (s) => {
      const colors = { 'O': '#9bb0ff', 'B': '#aabfff', 'A': '#cad7ff', 'F': '#f8f7ff', 'G': '#fff4ea', 'K': '#ffd2a1', 'M': '#ffcc6f' };
      const c = colors[s.spectralType?.[0]] || '#fff';
      const glow = Math.min(Math.sqrt(s.luminosity || 1) * 5, 40);
      return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 10px rgba(0,0,0,0.4)` };
    };

    const planetStyle = (p) => {
      const c = PLANET_MAP[p.color] || PLANET_MAP['DEFAULT'];
      const glow = Math.min(Math.sqrt(Math.abs(p.magnitude || 1)) * 5, 30);
      return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 15px rgba(0,0,0,0.4)` };
    };

    const moonStyle = (m) => {
      const c = MOON_MAP[m.color] || MOON_MAP['DEFAULT'];
      return { backgroundColor: c, boxShadow: `0 0 15px ${c}66, inset -5px -5px 15px rgba(0,0,0,0.4)` };
    };

    const getIcon = (t) => t === 'stars' ? '⭐' : t === 'planets' ? '🪐' : '🌙';
    const goTo = (type, id) => router.push(`/${type}/${id}`);

    return { loading, searchQuery, selectedTypes, filteredObjects, goTo, starStyle, planetStyle, moonStyle, getIcon };
  }
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  /* Dark background instead of the previous blue */
  background-color: transparent; 
}

/* HEADER STYLE - MATCHES STAR HEADER */
.glass-header {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 2rem;
  background-color: rgba(0, 0, 30, 0.8);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 0 0 15px rgba(125, 95, 255, 0.7);
}

.intro {
  color: rgba(180, 160, 255, 0.8);
  font-weight: 600;
  margin-top: 10px;
}

/* INTERACTION TOGGLE */
.interaction-toggle {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.interaction-toggle button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(125, 95, 255, 0.4);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.interaction-toggle button.active {
  background: #7d5fff;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.6);
}

.search-and-filters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 25px;
  align-items: center;
}

.search-box input {
  width: 100%;
  max-width: 400px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid rgba(154, 164, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  outline: none;
}

.filter-group {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.filter-chip {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid rgba(154, 164, 255, 0.3);
  background: rgba(20, 20, 50, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-chip input {
  display: none;
}

.filter-chip.active {
  background: #7f7fff;
  border-color: transparent;
  box-shadow: 0 0 15px rgba(127, 127, 255, 0.6);
}

/* GRID SYSTEM - PREVENTS STRETCHING */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* CARD STYLE - MATCHES ENCYCLOPEDIA CARDS */
.galactic-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 30, 0.8);
  border-radius: 12px;
  padding: 20px;
  /* Forces cards to stay compact */
  max-width: 320px; 
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.3);
  transition: transform 0.25s ease;
}

.galactic-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  align-items: center;
}

.type-badge {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 0.7rem;
  font-weight: 800;
  color: #9aa4ff;
  opacity: 0.6;
}

.rating-badge {
  position: absolute;
  top: 10px;
  left: 15px;
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: bold;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.orb-container {
  margin-right: 20px;
  flex-shrink: 0;
}

.orb {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.moon-texture {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.1) 5%, transparent 10%);
}

.info {
  text-align: left;
  flex: 1;
}

.label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #9aa4ff;
  text-shadow: 0 0 8px rgba(125, 95, 255, 0.6);
}

.details-link {
  margin-top: 12px;
  padding: 8px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #ff596b, #ff7d5f);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.loading-state, 
.empty-msg {
  margin-top: 50px;
  text-align: center;
  opacity: 0.6;
}
</style>