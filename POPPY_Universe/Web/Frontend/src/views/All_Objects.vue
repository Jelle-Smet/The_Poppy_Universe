<template>
  <div class="dashboard-container">
    <div class="glass-header">
      <h1>🌌 Galactic Dashboard</h1>
      <p class="intro">Technical registry of the Poppy Universe object pool.</p>

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
            v-for="type in ['Stars', 'Planets', 'Moons']" 
            :key="type"
            :class="['filter-chip', { active: selectedTypes.includes(type) }]"
          >
            <input type="checkbox" v-model="selectedTypes" :value="type" />
            <span class="chip-icon">{{ getIcon(type) }}</span>
            {{ type }}
          </label>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">Scanning the star charts...</div>

    <div v-else class="results-area">
      <div class="dashboard-grid">
        <div 
          v-for="item in filteredObjects" 
          :key="item.type + '-' + item.Id" 
          class="galactic-card"
        >
          <span class="type-badge">{{ item.type.slice(0, -1).toUpperCase() }} // REF_{{ item.Id }}</span>

          <div class="card-content">
            <div class="orb-container">
              <div v-if="item.type === 'Stars'" class="orb star" :style="starStyle(item)"></div>
              <div v-if="item.type === 'Planets'" class="orb planet" :style="planetStyle(item)"></div>
              <div v-if="item.type === 'Moons'" class="orb moon" :style="moonStyle(item)">
                <div class="moon-texture"></div>
              </div>
            </div>

            <div class="info">
              <p><span class="label">Name:</span> {{ item.Name }}</p>
              
              <template v-if="item.type === 'Stars'">
                <p><span class="label">Spectral:</span> {{ item.SpectralType }}</p>
                <p><span class="label">Temp:</span> {{ item.Teff ? item.Teff + 'K' : 'N/A' }}</p>
                <p><span class="label">Gmag:</span> {{ item.Gmag?.toFixed(2) }}</p>
              </template>

              <template v-if="item.type === 'Planets'">
                <p><span class="label">Class:</span> {{ item.Type }}</p>
                <p><span class="label">Diameter:</span> {{ item.Diameter?.toLocaleString() }} km</p>
                <p><span class="label">Moons:</span> {{ item.NumberOfMoons }}</p>
              </template>

              <template v-if="item.type === 'Moons'">
                <p><span class="label">Parent:</span> {{ item.Parent }}</p>
                <p><span class="label">Surface:</span> {{ item.Composition }}</p>
                <p><span class="label">Hue:</span> {{ item.Color }}</p>
              </template>
              
              <button class="details-link" @click="goTo(item.type.toLowerCase().slice(0, -1), item.Id)">
                Details ✨
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="load-more-wrapper">
            <p class="count-info">Viewing {{ filteredObjects.length }} of {{ totalFilteredCount }} objects</p>
            <button class="load-more-btn" @click="loadMore" :disabled="loading || noMore">
                {{ noMore ? 'No more stars ✨' : loading ? 'Loading…' : 'Load more stars' }}
            </button>
        </div>

      <div v-if="filteredObjects.length === 0" class="empty-msg">
        No objects found for the selected filters. 🔭
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const PLANET_MAP = { 'Grey': '#A0A0A0', 'Blue-Green-Brown-White': '#6699CC', 'Red-Brown-Tan': '#C1440E', 'DEFAULT': '#CCCCCC' };
const MOON_MAP = { 'Grey': '#A0A0A0', 'White': '#FFFFFF', 'Yellowish': '#E3D6A2', 'DEFAULT': '#CCCCCC' };

const router = useRouter();
const loading = ref(true);
const searchQuery = ref('');
const selectedTypes = ref(['Stars', 'Planets', 'Moons']);
const poolData = ref({ Stars: [], Planets: [], Moons: [] });
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Pagination State
const visibleLimit = ref(40);

const fetchPool = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${API_BASE_URL}/object_scanner/pool`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      poolData.value = res.data.data;
    }
  } catch (err) {
    console.error("Dashboard Load Error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPool);

// Reset view limit when filters or search change
watch([searchQuery, selectedTypes], () => {
  visibleLimit.value = 40;
});

const totalFilteredCount = ref(0);

const filteredObjects = computed(() => {
  let combined = [];
  if (selectedTypes.value.includes('Stars')) combined.push(...poolData.value.Stars.map(s => ({ ...s, type: 'Stars' })));
  if (selectedTypes.value.includes('Planets')) combined.push(...poolData.value.Planets.map(p => ({ ...p, type: 'Planets' })));
  if (selectedTypes.value.includes('Moons')) combined.push(...poolData.value.Moons.map(m => ({ ...m, type: 'Moons' })));
  
  const results = combined.filter(obj => 
    obj.Name && obj.Name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).sort((a, b) => a.Name.localeCompare(b.Name));

  totalFilteredCount.value = results.length;
  return results.slice(0, visibleLimit.value);
});

const hasMore = computed(() => {
  return visibleLimit.value < totalFilteredCount.value;
});

const loadMore = () => {
  visibleLimit.value += 40;
};

const starStyle = (s) => {
  const colors = { 'O': '#9bb0ff', 'B': '#aabfff', 'A': '#cad7ff', 'F': '#f8f7ff', 'G': '#fff4ea', 'K': '#ffd2a1', 'M': '#ffcc6f' };
  const c = colors[s.SpectralType?.[0]] || '#fff';
  const glow = Math.min(Math.sqrt(s.Luminosity || 1) * 5, 40);
  return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 10px rgba(0,0,0,0.4)` };
};

const planetStyle = (p) => {
  const c = PLANET_MAP[p.Color] || PLANET_MAP['DEFAULT'];
  const glow = Math.min(Math.sqrt(Math.abs(p.Magnitude || 1)) * 5, 30);
  return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 15px rgba(0,0,0,0.4)` };
};

const moonStyle = (m) => {
  const c = MOON_MAP[m.Color] || MOON_MAP['DEFAULT'];
  return { backgroundColor: c, boxShadow: `0 0 15px ${c}66, inset -5px -5px 15px rgba(0,0,0,0.4)` };
};

const getIcon = (t) => t === 'Stars' ? '⭐' : t === 'Planets' ? '🪐' : '🌙';
const goTo = (type, id) => router.push(`/${type}/${id}`);
</script>

<style scoped>
.loading-state {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center;     /* Centers vertically */
  min-height: 200px;       /* Gives it space to be "middle" in */
  width: 100%;
}
.dashboard-container {
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background-color: transparent; 
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

.filter-chip input { display: none; }

.filter-chip.active {
  background: #7f7fff;
  border-color: transparent;
  box-shadow: 0 0 15px rgba(127, 127, 255, 0.6);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.galactic-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 30, 0.8);
  border-radius: 12px;
  padding: 20px;
  max-width: 320px; 
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.3);
  transition: transform 0.25s ease;
}

.galactic-card:hover { transform: translateY(-5px); }

.card-content { display: flex; align-items: center; }

.type-badge {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 0.7rem;
  font-weight: 800;
  color: #9aa4ff;
  opacity: 0.6;
}

.orb-container { margin-right: 20px; flex-shrink: 0; }

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

.info { text-align: left; flex: 1; }

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

.load-more-wrapper {
  display: flex;
  flex-direction: column; /* Stacks children vertically */
  align-items: center;    /* Centers children horizontally */
  gap: 1rem;              /* Adds space between the text and the button */
  margin: 3rem 0;
}

.count-info {
  font-family: monospace;
  font-size: 0.8rem;
  color: #9aa4ff;
  opacity: 0.7;
  /* No changes needed here, flex-direction handles the positioning */
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
</style>