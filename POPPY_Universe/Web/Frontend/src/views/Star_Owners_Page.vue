<template>
  <div class="dashboard-container">
    <div class="glass-header">
      <h1>🌌 Owner Registry</h1>
      <p class="intro">Technical Archive // Authorized Star Proprietors</p>

      <div class="search-and-filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by Owner or Star Name..."
          />
        </div>

        <div class="category-section">
          <div class="category-header-row">
            <div class="title-with-icon">
              <span class="pulse-dot"></span>
              <p class="category-title">SYSTEM_HEURISTICS // MULTI_FILTER</p>
            </div>
            <button 
              v-if="activeCategories.length > 0 || selectedOwners.length > 0" 
              class="clear-cats-btn" 
              @click="clearAllFilters"
            >
              TERMINATE_ALL_FILTERS [X]
            </button>
          </div>

          <div class="category-groups-container">
            <div class="cat-group-module" v-if="uniqueOwners.length > 0">
              <div class="group-accent owner-accent"></div>
              <div class="group-content">
                <span class="group-label">PROPRIETOR</span>
                <div class="cat-tags-row">
                  <button 
                    v-for="owner in uniqueOwners" 
                    :key="owner"
                    @click="toggleOwner(owner)"
                    :class="['cat-tag', 'owner-tag', { active: selectedOwners.includes(owner) }]"
                  >
                    <span class="tag-decorator"></span>
                    {{ owner }}
                  </button>
                </div>
              </div>
            </div>

            <div class="cat-group-module" v-if="availableSpectralTypes.length > 0">
              <div class="group-accent stars"></div>
              <div class="group-content">
                <span class="group-label">SPECTRAL</span>
                <div class="cat-tags-row">
                  <button 
                    v-for="cat in availableSpectralTypes" 
                    :key="cat"
                    @click="toggleCategory(cat)"
                    :class="['cat-tag', { active: activeCategories.includes(cat) }]"
                  >
                    <span class="tag-decorator"></span>
                    {{ cat }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">Accessing encrypted owner logs...</div>

    <div v-else class="results-area">
      <div class="dashboard-grid">
        <div 
          v-for="star in filteredStars" 
          :key="star.starId" 
          class="galactic-card"
        >
          <span class="type-badge">STAR_REF // {{ star.starId }}</span>

          <div class="card-content">
            <div class="orb-container">
              <div class="orb star" :style="starStyle(star)"></div>
            </div>

            <div class="info">
              <p class="owner-name">
                <span class="label">Proprietor:</span><br/>
                {{ star.ownerDisplay }}
              </p>
              
              <div class="divider"></div>

              <p><span class="label">Star:</span> {{ star.starName }}</p>
              <p><span class="label">Spectral:</span> {{ star.type }}</p>
              <p><span class="label">Dist:</span> {{ star.distance?.toFixed(2) }} ly</p>
              <p><span class="label">Lum:</span> {{ star.luminosity ? star.luminosity.toFixed(4) : 'N/A' }}</p>
              
              <button class="details-link" @click="goTo(star.starId)">
                Star Details ✨
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasMore" class="load-more-wrapper">
        <p class="count-info">Viewing {{ filteredStars.length }} of {{ totalFilteredCount }} objects</p>
        <button class="load-more-btn" @click="loadMore" :disabled="loading">
          {{ loading ? 'SYNCING...' : 'LOAD MORE DATA' }}
        </button>
      </div>

      <div v-if="filteredStars.length === 0" class="empty-msg">
        No records found matching current parameters. 🔭
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loading = ref(true);
const searchQuery = ref('');
const activeCategories = ref([]); 
const selectedOwners = ref([]); 
const ownedStars = ref([]);
const visibleLimit = ref(40);
const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetchOwnedStars = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${API_BASE_URL}/stars/owned_stars`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) {
      ownedStars.value = res.data.stars;
    }
  } catch (err) {
    console.error("Dashboard Load Error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOwnedStars);

// Unique Lists for Filters
const availableSpectralTypes = computed(() => {
  const types = new Set();
  ownedStars.value.forEach(s => s.type && types.add(s.type));
  return Array.from(types).sort();
});

const uniqueOwners = computed(() => {
  const owners = new Set();
  ownedStars.value.forEach(s => s.ownerDisplay && owners.add(s.ownerDisplay));
  return Array.from(owners).sort();
});

// Toggle Logic
const toggleCategory = (cat) => {
  const idx = activeCategories.value.indexOf(cat);
  if (idx > -1) activeCategories.value.splice(idx, 1);
  else activeCategories.value.push(cat);
};

const toggleOwner = (owner) => {
  const idx = selectedOwners.value.indexOf(owner);
  if (idx > -1) selectedOwners.value.splice(idx, 1);
  else selectedOwners.value.push(owner);
};

const clearAllFilters = () => {
  activeCategories.value = [];
  selectedOwners.value = [];
};

watch([searchQuery, activeCategories, selectedOwners], () => {
  visibleLimit.value = 40;
});

const totalFilteredCount = ref(0);

const filteredStars = computed(() => {
  const results = ownedStars.value.filter(star => {
    const query = searchQuery.value.toLowerCase();
    const owner = (star.ownerDisplay || '').toLowerCase();
    const name = (star.starName || '').toLowerCase();

    const matchesSearch = !searchQuery.value || owner.includes(query) || name.includes(query);
    const matchesSpectral = activeCategories.value.length === 0 || activeCategories.value.includes(star.type);
    const matchesOwnerSelect = selectedOwners.value.length === 0 || selectedOwners.value.includes(star.ownerDisplay);

    return matchesSearch && matchesSpectral && matchesOwnerSelect;
  }).sort((a, b) => (a.ownerDisplay || '').localeCompare(b.ownerDisplay || ''));

  totalFilteredCount.value = results.length;
  return results.slice(0, visibleLimit.value);
});

const hasMore = computed(() => visibleLimit.value < totalFilteredCount.value);
const loadMore = () => visibleLimit.value += 40;

const starStyle = (s) => {
  const colors = { 'O': '#9bb0ff', 'B': '#aabfff', 'A': '#cad7ff', 'F': '#f8f7ff', 'G': '#fff4ea', 'K': '#ffd2a1', 'M': '#ffcc6f' };
  const c = colors[s.type?.[0]] || '#fff';
  const glow = s.luminosity ? Math.min(Math.sqrt(s.luminosity) * 15, 40) : 20;
  return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 10px rgba(0,0,0,0.4)` };
};

const goTo = (id) => router.push(`/star/${id}`);
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.glass-header {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 2.5rem;
  background-color: rgba(0, 0, 30, 0.85);
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(125, 95, 255, 0.4);
  text-align: center;
  backdrop-filter: blur(10px);
}

h1 {
  font-size: 2.8rem;
  margin: 0;
  text-shadow: 0 0 20px rgba(125, 95, 255, 0.8);
  letter-spacing: 2px;
}

.intro {
  color: rgba(180, 160, 255, 0.9);
  font-weight: 600;
  margin-top: 12px;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.search-and-filters {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 30px;
  align-items: center;
}

.search-box { width: 100%; max-width: 500px; }

.search-box input {
  width: 100%;
  padding: 12px 25px;
  border-radius: 30px;
  border: 1px solid rgba(154, 164, 255, 0.3);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  outline: none;
  text-align: center;
  font-size: 1rem;
}

.category-section {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(125, 95, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(5px);
}

.category-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #00ffff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ffff;
  animation: pulse-glow 2s infinite;
  display: inline-block;
  margin-right: 12px;
}

.category-title {
  display: inline-block;
  font-family: monospace;
  font-size: 0.8rem;
  color: #9aa4ff;
  letter-spacing: 2px;
  margin: 0;
  font-weight: bold;
}

.clear-cats-btn {
  background: rgba(255, 77, 77, 0.08);
  border: 1px solid rgba(255, 77, 77, 0.4);
  color: #ff4d4d;
  font-family: monospace;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.7rem;
}

.cat-group-module {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 12px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.group-accent.stars { width: 5px; background: #ffcc6f; box-shadow: 0 0 15px #ffcc6f; }
.group-accent.owner-accent { width: 5px; background: #ff69b4; box-shadow: 0 0 15px #ff69b4; }

.group-content {
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 25px;
}

.group-label {
  font-family: monospace;
  font-size: 0.75rem;
  color: rgba(230, 230, 250, 0.6);
  font-weight: 900;
  min-width: 100px;
  text-align: right;
}

.cat-tags-row { display: flex; flex-wrap: wrap; gap: 10px; }

.cat-tag {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(154, 164, 255, 0.25);
  color: #cad7ff;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s;
}

.cat-tag.active {
  background: rgba(0, 255, 255, 0.1);
  border-color: #00ffff;
  color: #fff;
}

.owner-tag.active {
  background: rgba(255, 105, 180, 0.15);
  border-color: #ff69b4;
  box-shadow: inset 0 0 10px rgba(255, 105, 180, 0.3);
}

.tag-decorator {
  width: 5px;
  height: 5px;
  background: currentColor;
  transform: rotate(45deg);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 35px;
  max-width: 1300px;
  margin: 0 auto;
}

.galactic-card {
  position: relative;
  background-color: rgba(0, 0, 30, 0.85);
  border: 1px solid rgba(125, 95, 255, 0.2);
  border-radius: 16px;
  padding: 25px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.galactic-card:hover { transform: translateY(-8px); border-color: rgba(125, 95, 255, 0.5); }

.card-content { display: flex; align-items: flex-start; }

.type-badge {
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 0.65rem;
  font-family: monospace;
  color: #9aa4ff;
  opacity: 0.6;
}

.orb-container { margin-right: 25px; flex-shrink: 0; padding-top: 10px; }
.orb { width: 70px; height: 70px; border-radius: 50%; position: relative; }

.info { text-align: left; flex: 1; }
.owner-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
.divider { height: 1px; background: linear-gradient(to right, rgba(125, 95, 255, 0.5), transparent); margin: 15px 0; }
.label { font-weight: 600; font-size: 0.75rem; color: #9aa4ff; text-transform: uppercase; letter-spacing: 1px; }

.details-link {
  margin-top: 18px;
  padding: 10px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #7d5fff, #ff69b4);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
}

.load-more-wrapper { display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 4rem 0; }
.count-info { font-family: monospace; font-size: 0.85rem; color: #9aa4ff; opacity: 0.8; }
.load-more-btn { padding: 1rem 3rem; border-radius: 50px; border: 1px solid rgba(125, 95, 255, 0.4); background: rgba(20, 20, 60, 0.8); color: #fff; cursor: pointer; }

@keyframes pulse-glow {
  0% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
  100% { opacity: 0.5; transform: scale(1); }
}

.loading-state, .empty-msg { margin-top: 80px; text-align: center; font-size: 1.2rem; color: #9aa4ff; }
</style>