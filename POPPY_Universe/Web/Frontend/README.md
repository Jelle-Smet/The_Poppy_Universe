# 🎨 Poppy Universe: Frontend & Visualization

Welcome to the **Frontend** of the Poppy Universe. This is where complex astronomical data and personalized AI recommendations are transformed into an intuitive, interactive, and visually stunning user experience.

🚀 **Live Application:** [poppyuniverse.vercel.app](https://poppyuniverse.vercel.app)

---

## 🖼️ Page Overview

The application is composed of several interactive modules, each designed to highlight a specific aspect of our universe:

### 🏠 Home / Landing Page
The gateway to the project. It introduces users to the Poppy Universe concept and prepares them for their journey through the stars.

### 🌌 The Discovery Feed (The "UI Brain")
This is the primary destination where the **Recommendation Engine** results are displayed.
* **Functionality**: Displays personalized "layers" of stars and celestial bodies.
* **Interaction**: Users can toggle between different layers (e.g., Brightness, Distance, or Lore-based) served by the backend orchestration.

### 🪐 Solar System Exploration
A specialized module built directly from the research in our `Data_Notebooks`.
* **Visualization**: Displays planets and their moons with accurate relative proportions for mass, diameter, and gravity.
* **Technology**: Uses the relational data-mappings created during the ETL phase to ensure every moon is correctly linked to its parent planet.

### ⭐️ Star Detail Pages
A deep-dive view for every object in our database.
* **Scientific Data**: Displays high-fidelity metrics like `Luminosity`, `Distance`, and `Teff`.
* **Ownership**: Integrates the `ownerDisplay` API response to show who currently "owns" the star within the Poppy ecosystem.

---

## 🛠️ Tech Stack

* **Framework**: [e.g., React.js / Next.js]
* **Styling**: [e.g., Tailwind CSS / Framer Motion for animations]
* **Deployment**: **Vercel** (utilized for CI/CD and edge-network performance).
* **Data Fetching**: Optimized hooks to communicate with the Backend Orchestrator.

---

## 📐 UI/UX Design Goals

1. **Data Storytelling**: Translating raw Gaia mission data into digestible charts, cards, and interactive 3D elements.
2. **Responsive Design**: Ensuring a seamless experience across mobile, tablet, and desktop devices.
3. **Engagement**: Using AI-driven recommendations to keep the feed fresh and relevant for every returning user.

---

## 🚦 Local Development

To run the frontend locally:

```bash
# Navigate to the frontend directory
cd POPPY_Universe/Web/Frontend

# Install dependencies
npm install

# Start the development server
npm run dev