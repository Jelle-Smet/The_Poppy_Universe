<template>
  <div class="my-stars-container">
    <div class="glass-header">
      <div class="sparkle-icon">✨</div>
      <h1>Stellar Vault</h1>
      <p class="intro">
        Greetings, cosmic explorer! Step into your personal vault of stars in Poppy Universe.
        Each glowing orb represents a star you own—its color shows its type, and its brightness reflects luminosity.
      </p>
      <div class="market-status">
        <span class="pulse"></span> Status: Vault Secured
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

          <button class="details-button" @click="goToStar(star.Star_ID)">
            Open Star Details ✨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const stars = ref([]);
    const router = useRouter();
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const starColor = (starOrType) => {
      if (typeof starOrType === 'object' && starOrType !== null) {
        const T = starOrType.Star_Teff;
        let r, g, b;

        if (T) {
          if (T >= 10000) { r = 155; g = 180; b = 255; }
          else if (T >= 7500) { r = 170; g = 190; b = 255; }
          else if (T >= 6000) { r = 200; g = 215; b = 255; }
          else if (T >= 5000) { r = 248; g = 247; b = 255; }
          else if (T >= 4000) { r = 255; g = 244; b = 234; }
          else if (T >= 3500) { r = 255; g = 210; b = 160; }
          else { r = 255; g = 204; b = 111; }

          return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        }
        starOrType = starOrType.Star_SpType;
      }

      switch (starOrType) {
        case 'O': return '#9bb0ff';
        case 'B': return '#aabfff';
        case 'A': return '#cad7ff';
        case 'F': return '#f8f7ff';
        case 'G': return '#fff4ea';
        case 'K': return '#ffd2a1';
        case 'M': return '#ffcc6f';
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

    const fetchStars = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/stars/mystars` , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch stars');

        const data = await res.json();
        stars.value = data.stars;
      } catch (err) {
        console.error(err);
      }
    };

    const goToStar = (id) => {
      router.push(`/star/${id}`);
    };

    const viewOnMap = (id) => {
      router.push(`/map/${id}`);
    };

    onMounted(() => {
      fetchStars();
    });

    return {
      stars,
      starColor,
      starLuminosityGlow,
      formatNumber,
      goToStar,
      viewOnMap,
    };
  },
};
</script>

<style scoped>
.my-stars-container {
  min-height: 100vh;
  padding: 120px 20px 60px;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  text-align: center;
}

/* --- Glass Header Container --- */
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
  font-size: 3.5rem;
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
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
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

/* --- Grid & Cards --- */
.stars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
  gap: 30px;
  justify-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

.star-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(10, 10, 30, 0.98);
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 25px rgba(125, 95, 255, 0.4),
              0 15px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(125, 95, 255, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.star-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 0 35px rgba(125, 95, 255, 0.7),
              0 20px 50px rgba(0, 0, 0, 0.6);
}

.star-orb {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 25px;
  flex-shrink: 0;
  transition: box-shadow 0.3s ease;
}

.star-info {
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
  box-shadow: 0 0 15px rgba(255, 89, 107, 0.6),
              0 0 35px rgba(255, 125, 95, 0.3);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.details-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 25px rgba(255, 89, 107, 0.9),
              0 0 50px rgba(255, 125, 95, 0.6);
}

/* Animations */
@keyframes pulse-green { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
@keyframes twinkle { from { opacity: 0.5; transform: scale(0.9); } to { opacity: 1; transform: scale(1.1); } }
</style>