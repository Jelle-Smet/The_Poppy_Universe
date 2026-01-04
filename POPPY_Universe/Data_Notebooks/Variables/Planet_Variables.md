## 🌌 Variable Selection for Poppy Universe – Planets & Moons

Here’s a clear breakdown of which columns we’ll **keep, reconsider, or drop** for our solar system data exploration.

---

### ✅ Keep (Core for exploration and visualization)
- `Name` → unique identifier for planet or moon  
- `Parent` → for moons, indicates which planet they orbit  
- `Color` → visual approximation for plots or 3D simulation  
- `Mass (10^24kg)` → fundamental physical property  
- `Diameter (km)` → size of body, useful for scale and comparison  
- `Surface Gravity(m/s^2)` → relevant for physics-based simulation  
- `Escape Velocity (km/s)` → orbital mechanics / storytelling  
- `Rotation Period (hours)` → rotation speed  
- `Length of Day (hours)` → day length for surface simulation  
- `Distance from Sun (10^6 km)` → approximate distance for visualization  
- `SemiMajorAxisAU` → semi-major axis for orbital calculations  
- `Orbital Period (days)` → needed for orbit simulation  
- `Inclination / LongitudeAscendingNodeDeg / ArgumentPeriapsisDeg / MeanAnomalyDeg` → key orbital elements  

---

### ⚠️ Reconsider (Useful for enrichment or extended exploration)
- `Density (kg/m^3)` → useful for composition analysis  
- `Surface Temperature (C)` → adds realism in simulations or website tooltips  
- `Atmospheric Composition` → for visual or interactive planetary cards  
- `Atmospheric Pressure (bars)` → contextual information for planets with atmospheres  
- `Number of Moons` → useful for planets overview or stats  
- `Ring System?` → visually or interactively interesting  
- `Global Magnetic Field?` → for storytelling or educational display  
- `Surface Features` → enrich visualizations and descriptions  
- `Composition` → general category (rock, ice, gas) for comparison  

---

### 🗑️ Drop / Optional (Complex, redundant, or non-essential for first exploration)
- Exact `Escape Velocity` vs `Surface Gravity` calculations if already using one for basic visualization  
- `LongitudeAscendingNodeDeg / ArgumentPeriapsisDeg / MeanAnomalyDeg` — needed for precise physics but not for simple charts  
- Detailed minor moons not included yet (could add later for full simulation)  
- Any derived or model-dependent columns not in raw CSV  

---

> **Summary:** Start with **Name, Parent, Color, Mass, Diameter, Gravity, Distance, Rotation, and Orbital Period**.  
> Add extra context from temperatures, atmospheres, moons, rings, and surface features for enrichment and interactive visualizations.  
> Keep orbital elements for later simulations that require precise positions.
