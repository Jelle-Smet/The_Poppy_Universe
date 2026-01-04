# 🧪 Data Notebooks: Research, ETL & Cleaning

Welcome to the **Data Notebooks** directory. This is the scientific "engine room" of the Poppy Universe. These notebooks document the transition from raw astronomical datasets to the high-performance, cleaned data used by our Recommendation Engine and Web interfaces.

---

## 🧭 Data Pipeline Overview

The project processes two distinct celestial data streams: **Stellar (Gaia) Data** and **Solar System Data**.

### 🌟 1. Stellar Data Pipeline (Gaia Mission)
We process a massive dataset of over **600,000 stars** to create a curated interstellar environment.

* **`Stars_Exploration.ipynb`**: 
    * **Phase**: Research & EDA (Exploratory Data Analysis).
    * **Tasks**: Visualizing brightness distributions, temperature spreads (Teff), and identifying outliers in the Gaia DR3 dataset.
* **`Star_Variables.md`**: 
    * **Phase**: Documentation.
    * **Tasks**: A formal breakdown of the decision-making process for keeping, dropping, or reconsidering 50+ astronomical variables.
* **`Stars_Name_Matcher.ipynb`**: 
    * **Phase**: ETL / Enrichment.
    * **Tasks**: Uses `astroquery` to connect with the **SIMBAD database**. It maps numeric Gaia IDs to human-readable names (e.g., *Sirius*, *Betelgeuse*), ensuring a better user experience on the frontend.
* **`Stars_Cleaning.ipynb`**: 
    * **Phase**: Final Cleaning & Export.
    * **Tasks**: Applies the final filters, handles missing values, and exports the production-ready `.csv` for the Backend.

### 🪐 2. Solar System Pipeline
Focused on our local neighborhood and the relational data between planets and moons.

* **`Solar_System_Exploration.ipynb`**: 
    * **Phase**: Relational Mapping & Simulation Prep.
    * **Tasks**: Connecting moons to their parent planets, calculating relative scales for mass and diameter, and preparing data for the "Mini Solar System" web feature.
* **`Planet_Variables.md`**: 
    * **Phase**: Documentation.
    * **Tasks**: Technical definitions for planetary mass, gravity, and orbital periods used in the platform.

---

## ⏱️ Notebook Runtime Summaries

To ensure scalability, every notebook includes a performance summary at the end. This allows us to track the efficiency of:
- **Data Preparation**: Loading and pre-processing.
- **Relational Mapping**: Connecting complex data points (Planets ↔ Moons).
- **External Queries**: Time spent enriching data via SIMBAD APIs.
- **Exportation**: Efficiency of final data writes.

---

## 🛠 Tech Stack & Tools
- **Python**: Core data processing.
- **Pandas & NumPy**: Data manipulation and unit conversion.
- **Matplotlib & Seaborn**: Scientific visualizations and HR-diagram plotting.
- **Astroquery**: Real-time integration with astronomical databases.

> [!TIP]
> **For Professors:** The `Stars_Name_Matcher.ipynb` is a great example of our **ETL process**, demonstrating how I handle external API failures and data fallback logic.