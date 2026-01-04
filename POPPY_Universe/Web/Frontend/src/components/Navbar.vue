<template>
  <header>
    <nav class="navbar navbar-light bg-dark fixed-top">
      <div class="container-fluid">
        <div class="logo-container">
          <img src="../assets/images/Poppy_Universe_Logo.png" alt="Logo" class="logo" />
        </div>

        <div class="navbar-nav">
          <!-- HOME -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'home' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('home')">
              Home
            </a>
            <ul v-if="selectedMenu === 'home'" class="dropdown-menu">
              <li><router-link to="/" class="dropdown-item" @click="selectedMenu = null">Home Page</router-link></li>
              <li><router-link to="/Latest_News" class="dropdown-item" @click="selectedMenu = null">Latest News</router-link></li>
              <li><router-link to="/System-Status" class="dropdown-item" @click="selectedMenu = null">System Status</router-link></li>
              <li><router-link to="/sign-up-login" class="dropdown-item" @click="selectedMenu = null">Sign Up / Login</router-link></li>
            </ul>
          </li>

          <!-- RECOMMENDATIONS -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'recommendations' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('recommendations')">
              Recommendations
            </a>
            <ul v-if="selectedMenu === 'recommendations'" class="dropdown-menu">
              <li><router-link to="/engine-details" class="dropdown-item" @click="selectedMenu = null">Engine Details</router-link></li>
              <li><router-link to="/Layer1_Recommendations" class="dropdown-item" @click="selectedMenu = null">Poppy's Right Now</router-link></li>
              <li><router-link to="/Layer2_Recommendations" class="dropdown-item" @click="selectedMenu = null">Poppy's Trend Booster</router-link></li>
              <li><router-link to="/Layer3_Recommendations" class="dropdown-item" @click="selectedMenu = null">Poppy's Familiar Picks</router-link></li>
              <li><router-link to="/Layer4_Recommendations" class="dropdown-item" @click="selectedMenu = null">Poppy's Hidden Matches</router-link></li>
              <li class="poppys-pick-highlight">
                <router-link to="/Layer5_Recommendations" class="dropdown-item" @click="selectedMenu = null">Poppy's Pick ⭐</router-link>
              </li>
            </ul>
          </li>

          <!-- ADOPT A STAR -->
          <li class="nav-item category">
            <router-link to="/star_catalog" class="nav-link">
              Adopt a Star
            </router-link>
          </li>

          <!-- ACCOUNT -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'account' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('account')">
              Account
            </a>
            <ul v-if="selectedMenu === 'account'" class="dropdown-menu">
              <li><router-link to="/Profile_Page" class="dropdown-item" @click="selectedMenu = null">Profile</router-link></li>
              <li><router-link to="/My_Stars" class="dropdown-item" @click="selectedMenu = null">My Stars</router-link></li>
              <li><router-link to="/Interacted_Objects" class="dropdown-item" @click="selectedMenu = null">My History</router-link></li>
              <li><router-link to="/Liked_Objects" class="dropdown-item" @click="selectedMenu = null">My Favorites</router-link></li>
              <li><router-link to="/User_Settings" class="dropdown-item" @click="selectedMenu = null">Settings</router-link></li>
            </ul>
          </li>

          <!-- EXPLORE OBJECTS -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'explore' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('explore')">
              Explore
            </a>
            <ul v-if="selectedMenu === 'explore'" class="dropdown-menu">
              <li><router-link to="/all_objects" class="dropdown-item" @click="selectedMenu = null">All Objects</router-link></li>
              <li><router-link to="/object_category" class="dropdown-item" @click="selectedMenu = null">Categories</router-link></li>
              <li><router-link to="/owned_stars" class="dropdown-item" @click="selectedMenu = null">Owned Stars</router-link></li>
              <li><router-link to="/deep_space_scanner" class="dropdown-item" @click="selectedMenu = null">Space Scanner</router-link></li>
            </ul>
          </li>

          <!-- TOOLS & ACTIVITIES -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'tools' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('tools')">
              Tools
            </a>
            <ul v-if="selectedMenu === 'tools'" class="dropdown-menu">
              <li><router-link to="/comparison_lab" class="dropdown-item" @click="selectedMenu = null">Comparison Lab</router-link></li>
              <li><router-link to="/stargazing-forecast" class="dropdown-item" @click="selectedMenu = null">Stargazing Forecast</router-link></li>
              <li><router-link to="/object-identification" class="dropdown-item" @click="selectedMenu = null">Identify Your Discovery</router-link></li>
            </ul>
          </li>

          <!-- ENCYCLOPEDIA -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'encyclopedia' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('encyclopedia')">
              Encyclopedia
            </a>
            <ul v-if="selectedMenu === 'encyclopedia'" class="dropdown-menu">
              <li><router-link to="/cosmic_glossary" class="dropdown-item" @click="selectedMenu = null">Cosmic Glossary</router-link></li>
              <li><router-link to="/Encyclopedia_stars" class="dropdown-item" @click="selectedMenu = null">Stars</router-link></li>
              <li><router-link to="/Encyclopedia_Planets" class="dropdown-item" @click="selectedMenu = null">Planets</router-link></li>
              <li><router-link to="/Encyclopedia_Moons" class="dropdown-item" @click="selectedMenu = null">Moons</router-link></li>
            </ul>
          </li>

          <!-- POPPY'S GUIDE -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'poppys-guide' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('poppys-guide')">
              Poppy's Guide
            </a>
            <ul v-if="selectedMenu === 'poppys-guide'" class="dropdown-menu">
              <li><router-link to="/tips_and_tricks" class="dropdown-item" @click="selectedMenu = null">Tips & Tricks</router-link></li>
              <li><router-link to="/stargazing-guide" class="dropdown-item" @click="selectedMenu = null">How to Stargaze</router-link></li>
              <li><router-link to="/equipment-guide" class="dropdown-item" @click="selectedMenu = null">Equipment Guide</router-link></li>
            </ul>
          </li>

          <!-- ABOUT US -->
          <li class="nav-item category" :class="{ 'bg-dark': selectedMenu === 'about-us' }">
            <a class="nav-link dropdown-toggle" href="#" @click.prevent="toggleSubMenu('about-us')">
              About Us
            </a>
            <ul v-if="selectedMenu === 'about-us'" class="dropdown-menu">
              <li><router-link to="/our_story" class="dropdown-item" @click="selectedMenu = null">Our Story</router-link></li>
              <li><router-link to="/Official_Partners" class="dropdown-item" @click="selectedMenu = null">Official Partners</router-link></li>
              <li><router-link to="/core_components" class="dropdown-item" @click="selectedMenu = null">Core Components</router-link></li>
              <li><router-link to="/privacy_policy" class="dropdown-item" @click="selectedMenu = null">Privacy Policy</router-link></li>
              <li><router-link to="/terms_and_conditions" class="dropdown-item" @click="selectedMenu = null">Terms & Conditions</router-link></li>
            </ul>
          </li>
          
          <!-- CONTACT HUB -->
          <li class="nav-item category">
            <router-link to="/contact_hub" class="nav-link">Contact Hub</router-link>
          </li>
        </div>
        <a class="extra space" href="#"></a>
      </div>
    </nav>
  </header>

  <div class="content"></div>
</template>

<script>
export default {
  data() {
    return {
      selectedMenu: null,
    };
  },
  methods: {
    toggleSubMenu(menu) {
      this.selectedMenu = this.selectedMenu === menu ? null : menu;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  z-index: 999;
  background-color: #0b0c1a;
  padding: 0px;
  border: 2px solid #7fdbff;
  border-radius: 5px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow: hidden;
  height: auto;
}

.navbar .logo-container {
  display: block;
  margin: 0;
  padding: 10px;
  overflow: hidden;
  border-top-right-radius: 48px;
  background-color: #0b0c1a;
}

.navbar .logo {
  width: 150px;
  height: auto;
  display: block;
}

.navbar-nav {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.navbar-nav .category {
  border: 2px solid #9b59b6;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: auto;
}

/* Featured category styling for Recommendations */
.featured-category {
  border: 2px solid #ff6ec7 !important;
  box-shadow: 0 0 10px rgba(255, 110, 199, 0.3);
}

.featured-category .nav-link {
  color: #ff6ec7 !important;
  font-weight: 600;
}

.nav-item .dropdown-menu {
  border: 1px solid #555;
  border-radius: 5px;
  overflow: hidden;
}

.nav-item .dropdown-menu .dropdown-item:hover {
  background-color: #1f1b3a;
  color: #f0f8ff !important;
  border-color: #7fdbff;
}

.nav-item.bg-dark .nav-link {
  background-color: #1f1b3a !important;
  color: #f0f8ff !important;
}

.nav-item .nav-link {
  color: #c0c0ff !important;
}

.nav-item .dropdown-menu .dropdown-item {
  color: #dcdcff !important;
}

.nav-item .nav-link:hover {
  background-color: #1f1b3a;
  color: #f0f8ff !important;
}

/* Poppy's Pick - Modern Supernova Styling */
.poppys-pick-highlight {
  /* Ultra-subtle Cyan-to-Transparent gradient */
  background: linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0%, transparent 100%) !important;
  /* Sharp Electric-Cyan edge */
  border-left: 2px solid #00ffff;
  margin: 2px 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
}

.poppys-pick-highlight .dropdown-item {
  /* Bright Diamond White for high visibility */
  color: #ffffff !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px;
  /* Subtle Cyan glow behind the text */
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  padding-left: 15px;
}

/* Hover State: The "Supernova" Activation */
.poppys-pick-highlight:hover {
  /* Intensify the Cyan wash */
  background: linear-gradient(90deg, rgba(0, 255, 255, 0.2) 0%, transparent 100%) !important;
  /* Glow the border pure white */
  border-left: 4px solid #ffffff;
  box-shadow: inset 12px 0 20px -10px rgba(0, 255, 255, 0.6);
}

.poppys-pick-highlight:hover .dropdown-item {
  color: #00ffff !important; /* Text flips to Cyan on hover */
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
  transform: translateX(4px); /* Smooth horizontal nudge */
}

/* Optional: Adding a tiny glowing dot before the text for extra 'Pop' */
.poppys-pick-highlight .dropdown-item::before {
  content: '•';
  color: #00ffff;
  margin-right: 8px;
  text-shadow: 0 0 8px #00ffff;
}

/* Adopt a Star highlighting */
.claim-star-tab .highlight-text {
  color: #ffd700 !important;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
}

.claim-star-tab:hover .highlight-text {
  color: #fff !important;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}
</style>