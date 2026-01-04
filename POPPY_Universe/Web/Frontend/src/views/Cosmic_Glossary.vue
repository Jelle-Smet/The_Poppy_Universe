<template>
  <div class="glossary-page">
    <div class="cosmic-bg"></div>
    
    <div class="cosmic-panel intro-container">
      <header class="glossary-header">
        <h1 class="hero-title loaded">
          Cosmic <span class="pink-glow">Glossary</span> 📖
        </h1>
        <p class="engine-tagline">POPPY UNIVERSE — EXPLORER'S HANDBOOK V1.0</p>
      </header>
      <div class="intro-content">
        <p class="panel-intro">
          Space data can be confusing, we get it. This guide translates the heavy math into plain English so you can actually understand the stars you're exploring.
        </p>
      </div>
    </div>

    <div class="details-layout">
      <aside class="side-nav-rail">
        <div class="nav-rail-stack">
          <div class="cosmic-panel sticky-nav">
            <div class="nav-header">Knowledge <span class="pink-text">Nodes</span></div>
            <div class="nav-items-wrapper">
              <a href="#stars" class="nav-item"><span class="nav-dot l1"></span>Stellar Secrets</a>
              <a href="#planets" class="nav-item"><span class="nav-dot l2"></span>Planet Physics</a>
              <a href="#orbital" class="nav-item"><span class="nav-dot l4"></span>Space Math 101</a>
              <a href="#units" class="nav-item"><span class="nav-dot l3"></span>Unit Protocols</a>
            </div>
          </div>

          <div class="cosmic-panel sidebar-info">
            <h4 class="pink-text">Quick Ref ⚡</h4>
            <p class="sidebar-text"><strong>Speed of Light:</strong> 299,792 km/s. At this speed, you'd circle Earth 7 times in one second.</p>
          </div>
        </div>
      </aside>

      <main class="content-body">
        
        <section id="stars" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l1"></span>
            <h2>Stellar <span class="pink-text">Secrets</span></h2>
          </div>
          
          <div class="glossary-grid">
            <div class="glossary-item highlight-item">
              <h3 class="cyan-text">The "Color" Code (SpType)</h3>
              <p>Stars are classified by temperature (Teff). O is blue-hot, M is red-cool.</p>
              
              <div class="mnemonic">Standard Classification: <strong>O</strong>nly <strong>B</strong>ad <strong>A</strong>stronomers <strong>F</strong>orget <strong>G</strong>enerating <strong>K</strong>ey <strong>M</strong>etrics.</div>
            </div>
            <div class="glossary-item">
              <h3 class="cyan-text">Luminosity (L☉)</h3>
              <p>The star's intrinsic power. It represents the total energy emitted per second compared to our Sun.</p>
            </div>
            <div class="glossary-item">
              <h3 class="cyan-text">Metallicity (FeH)</h3>
              <p>Measures "Heavy Elements." High FeH means the star was born from a cloud rich in metals, making planet formation much more likely.</p>
            </div>
          </div>
        </section>

        <section id="planets" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l2"></span>
            <h2>Planet <span class="pink-text">Physics</span></h2>
          </div>
          <div class="glossary-grid">
            <div class="glossary-item">
              <h3 class="cyan-text">Classification</h3>
              <p><strong>Terrestrial:</strong> Rocky/Solid. <strong>Gas/Ice Giants:</strong> Massive envelopes of gas/volatiles. <strong>Dwarf:</strong> Sub-planetary mass.</p>
            </div>
            <div class="glossary-item">
              <h3 class="cyan-text">Apparent Magnitude</h3>
              <p>How bright it looks from Earth. Remember: Sirius (-1.46) is way brighter than the North Star (+1.97)!</p>
              
            </div>
            <div class="glossary-item">
              <h3 class="cyan-text">Habitable Zone</h3>
              <p>The "Goldilocks" region around a star where the temperature allows liquid water to exist on the surface.</p>
            </div>
          </div>
        </section>

        <section id="orbital" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l4"></span>
            <h2>Space <span class="pink-text">Math 101</span></h2>
          </div>
          <p class="section-desc">Keplerian elements used to define an object's precise path through the universe.</p>
          
          <div class="glossary-grid">
            <div class="glossary-item">
              <h3 class="cyan-text">Inclination</h3>
              <p>The geometric tilt of an orbit relative to the ecliptic reference plane.</p>
            </div>
            <div class="glossary-item">
              <h3 class="cyan-text">Semi-Major Axis</h3>
              <p>The average distance from the orbital center. It defines the "size" of the orbit.</p>
            </div>
            <div class="glossary-item">
              <h3 class="cyan-text">RA & DE</h3>
              <p><strong>Declination (DE)</strong> is celestial latitude. <strong>Right Ascension (RA)</strong> is celestial longitude, measured in hours.</p>
              
            </div>
          </div>
        </section>

        <section id="units" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l3"></span>
            <h2>Unit <span class="pink-text">Protocols</span></h2>
          </div>
          
          <h3 class="sub-header cyan-text">I. The Distance Ladder</h3>
          <div class="unit-table-wrapper">
            <table class="unit-table">
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Measurement</th>
                  <th>The "Poppy" Scale</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>LD</td><td>Lunar Distance</td><td>384,400 km. The average gap between Earth and Moon.</td></tr>
                <tr><td>AU</td><td>Astronomical Unit</td><td>150M km. Earth to Sun. Driving there would take 170+ years.</td></tr>
                <tr><td>LY</td><td>Light Year</td><td>9.46 Trillion km. The distance light travels in one year.</td></tr>
                <tr><td>pc</td><td>Parsec</td><td>3.26 Light Years. Used for deep galactic mapping.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 class="sub-header cyan-text" style="margin-top: 40px;">II. Mass & Radius</h3>
          <div class="unit-table-wrapper">
            <table class="unit-table">
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Measurement</th>
                  <th>The "Poppy" Scale</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>M☉</td><td>Solar Mass</td><td>1.98 × 10³⁰ kg. Mass of our Sun (~333,000 Earths).</td></tr>
                <tr><td>R☉</td><td>Solar Radius</td><td>695,700 km. You could fit 109 Earths across the Sun's face.</td></tr>
                <tr><td>M⊕</td><td>Earth Mass</td><td>5.97 × 10²⁴ kg. The baseline for terrestrial planets.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 class="sub-header cyan-text" style="margin-top: 40px;">III. Light & Heat</h3>
          <div class="glossary-grid">
            <div class="glossary-item highlight-item">
              <h3 class="pink-text">Apparent vs. Absolute</h3>
              <p><strong>Apparent Magnitude</strong> is how bright a star looks from your window. <strong>Absolute Magnitude</strong> is how bright it actually is if they were all lined up at the same distance.</p>
              
            </div>
            <div class="glossary-item">
              <h3 class="cyan-text">The Kelvin Scale (K)</h3>
              <p>0K is absolute zero (no atomic movement). Space averages 2.7K. Stars range from 3,000K to 50,000K+.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
.glossary-page {
    padding: 40px 20px;
    color: #e6e6fa;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
}

.cosmic-panel {
    background-color: rgba(10, 0, 50, 0.85); 
    padding: 30px; 
    border-radius: 15px;
    border: 1px solid #00ffff; 
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2); 
}

/* Spacing */
.intro-container { text-align: center; max-width: 1300px; margin: 0 auto 40px; }
.hero-title { font-size: 3rem; font-weight: 900; color: #c0fcfc; text-shadow: 0 0 15px #00ffff; }
.pink-glow { color: #ff69b4; text-shadow: 0 0 15px #ff007f; }
.engine-tagline { color: #00ffff; font-size: 0.9rem; font-weight: 800; letter-spacing: 3px; }
.panel-intro { font-style: italic; color: #a0f0ff; margin-top: 15px; }

.details-layout { display: flex; max-width: 1300px; margin: 0 auto; gap: 35px; align-items: flex-start; }
.content-body { flex-grow: 1; display: flex; flex-direction: column; gap: 30px; }

/* Sub Headers for Units */
.sub-header {
    font-size: 1.1rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-left: 3px solid #ff69b4;
    padding-left: 15px;
    margin-bottom: 20px;
}

/* Items */
.glossary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-top: 20px; }
.glossary-item { padding: 20px; background: rgba(255, 255, 255, 0.03); border-radius: 10px; border: 1px solid rgba(0, 255, 255, 0.1); }
.glossary-item:hover { border-color: #ff69b4; transition: 0.3s; }

.highlight-item { border-left: 4px solid #ff69b4; }
.mnemonic { margin-top: 12px; font-size: 0.8rem; color: #ffb6c1; font-style: normal; }

.cyan-text { color: #00ffff; font-weight: 700; }
.pink-text { color: #ff69b4; }

/* Table */
.unit-table-wrapper { overflow-x: auto; margin-top: 10px; border-radius: 8px; background: rgba(0,0,0,0.2); }
.unit-table { width: 100%; border-collapse: collapse; min-width: 600px; }
.unit-table th { text-align: left; padding: 12px; border-bottom: 2px solid #00ffff; color: #ff69b4; font-size: 0.8rem; }
.unit-table td { padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); font-size: 0.85rem; }

/* Nav */
.side-nav-rail { flex: 0 0 280px; position: sticky; top: 100px; }
.nav-rail-stack { display: flex; flex-direction: column; gap: 20px; }
.nav-header { color: #00ffff; font-size: 1.1rem; border-bottom: 2px solid #00ffff; padding-bottom: 8px; margin-bottom: 15px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; color: #e6e6fa; text-decoration: none; border-bottom: 1px solid rgba(0, 255, 255, 0.1); font-size: 0.9rem; }
.nav-item:hover { color: #ff69b4; padding-left: 8px; transition: 0.3s; }

/* Dots */
.layer-dot, .nav-dot { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 8px currentColor; }
.l1 { color: #00ff00; background: #00ff00; } .l2 { color: #00ffff; background: #00ffff; }
.l3 { color: #ff69b4; background: #ff69b4; } .l4 { color: #ffd32a; background: #ffd32a; }

@media (max-width: 1024px) {
    .details-layout { flex-direction: column; }
    .side-nav-rail { position: static; width: 100%; }
}
</style>