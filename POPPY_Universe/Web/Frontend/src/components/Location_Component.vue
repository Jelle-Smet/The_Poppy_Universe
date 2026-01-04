<template>
  <div class="glass-gps">
    <div class="gps-header">
      <div class="header-icon">🌍</div>
      <h3 class="gps-title">GALACTIC GPS</h3>
      <p class="gps-subtitle">Click the map or enter coordinates to shift your perspective</p>
    </div>

    <div class="gps-layout">
      <div class="map-container">
        <div id="map" class="poppy-map"></div>
        <div class="map-crosshair"></div>
      </div>

      <div class="gps-controls">
        <div class="coord-input-group">
          <div class="input-wrapper">
            <label>LATITUDE</label>
            <input type="number" v-model.number="localLat" @input="updateMapFromInputs" step="0.01" />
            <span class="unit">°N/S</span>
          </div>

          <div class="input-wrapper">
            <label>LONGITUDE</label>
            <input type="number" v-model.number="localLong" @input="updateMapFromInputs" step="0.01" />
            <span class="unit">°E/W</span>
          </div>
        </div>

        <button class="action-btn snap-btn" @click="getCurrentLocation" :disabled="geoLoading">
          {{ geoLoading ? 'SCANNING...' : '✨ SNAP TO MY LOCATION' }}
        </button>

        <div class="gps-footer">
          <button class="confirm-btn" @click="confirmLocation">
            ALIGN COORDINATES 🚀
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'GalacticGPS',
  props: {
    latitude: { type: Number, default: 51.00468 },
    longitude: { type: Number, default: 4.30304 }
  },
  emits: ['update:location'],
  setup(props, { emit }) {
    const localLat = ref(props.latitude);
    const localLong = ref(props.longitude);
    const geoLoading = ref(false);
    let map = null;
    let marker = null;

    const initMap = () => {
      // Create map instance
      map = L.map('map', {
        center: [localLat.value, localLong.value],
        zoom: 3,
        zoomControl: false,
        attributionControl: false
      });

      // Dark Matter tiles from CartoDB - fits the space vibe perfectly!
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom Neon Marker
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div class='marker-pin'></div>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      marker = L.marker([localLat.value, localLong.value], { icon }).addTo(map);

      // Map Click Handler
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        localLat.value = parseFloat(lat.toFixed(5));
        localLong.value = parseFloat(lng.toFixed(5));
        updateMarker();
      });
    };

    const updateMarker = () => {
      if (marker && map) {
        marker.setLatLng([localLat.value, localLong.value]);
        map.panTo([localLat.value, localLong.value]);
      }
    };

    const updateMapFromInputs = () => {
      if (Math.abs(localLat.value) <= 90 && Math.abs(localLong.value) <= 180) {
        updateMarker();
      }
    };

    const getCurrentLocation = () => {
      geoLoading.value = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          localLat.value = parseFloat(position.coords.latitude.toFixed(5));
          localLong.value = parseFloat(position.coords.longitude.toFixed(5));
          updateMarker();
          map.setZoom(13);
          geoLoading.value = false;
        },
        () => {
          geoLoading.value = false;
          alert("Location access denied.");
        }
      );
    };

    const confirmLocation = () => {
      emit('update:location', { lat: localLat.value, long: localLong.value });
    };

    onMounted(() => {
      nextTick(() => {
        initMap();
      });
    });

    return { localLat, localLong, geoLoading, getCurrentLocation, confirmLocation, updateMapFromInputs };
  }
};
</script>

<style scoped>
.gps-layout {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.map-container {
  flex: 1;
  min-width: 300px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(125, 95, 255, 0.4);
}

.poppy-map {
  width: 100%;
  height: 100%;
  background: #0a0a1e;
}

.gps-controls {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* CUSTOM NEON MARKER */
:deep(.marker-pin) {
  width: 20px;
  height: 20px;
  border-radius: 50% 50% 50% 0;
  background: #7d5fff;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -10px;
  box-shadow: 0 0 15px #7d5fff;
}

:deep(.marker-pin)::after {
  content: '';
  width: 10px;
  height: 10px;
  margin: 5px 0 0 5px;
  background: #fff;
  position: absolute;
  border-radius: 50%;
}

/* Styles inherited from your previous component */
.glass-gps { background: rgba(10, 10, 30, 0.9); backdrop-filter: blur(20px); border: 1px solid rgba(125, 95, 255, 0.3); border-radius: 24px; padding: 30px; color: #fff; }
.gps-header { text-align: center; margin-bottom: 25px; }
.gps-title { letter-spacing: 3px; font-weight: 800; color: #7d5fff; }
.coord-input-group { display: flex; flex-direction: column; gap: 15px; }
.input-wrapper { display: flex; flex-direction: column; margin-bottom: 15px; }
.input-wrapper label { font-size: 0.7rem; color: #9aa4ff; font-weight: bold; margin-bottom: 5px; }
.input-wrapper input { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(125, 95, 255, 0.2); padding: 10px; border-radius: 10px; color: #fff; outline: none; }
.action-btn { width: 100%; padding: 12px; background: transparent; border: 1px solid #00ff88; color: #00ff88; border-radius: 12px; cursor: pointer; margin-bottom: 20px; }
.action-btn:hover { background: #00ff88; color: #000; }
.confirm-btn { width: 100%; background: linear-gradient(135deg, #7d5fff, #6c5ce7); border: none; padding: 15px; border-radius: 15px; color: #fff; font-weight: 800; cursor: pointer; }
.confirm-btn:hover { box-shadow: 0 0 20px rgba(125, 95, 255, 0.6); }
</style>