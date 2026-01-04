## 🌟 Variable Selection for Poppy Universe

Here’s a clear breakdown of which columns we’ll keep, reconsider, or drop for our data exploration.

### ✅ Keep (Core for exploration and star tables)
- `Source` → unique star ID  
- `RA_ICRS` → right ascension  
- `DE_ICRS` → declination  
- `Plx` → parallax (for distance)  
- `PM` → total proper motion  
- `pmRA` → proper motion in RA  
- `pmDE` → proper motion in Dec  
- `Dist` → distance (derived from parallax)  
- `Gmag` → Gaia G-band magnitude  
- `BPmag` → blue-band magnitude  
- `RPmag` → red-band magnitude  
- `Teff` → effective temperature  
- `logg` → surface gravity  
- `[Fe/H]` → metallicity  
- `Rad` → radius  
- `Lum-Flame` → luminosity  
- `Mass-Flame` → mass  
- `Age-Flame` → age  
- `SpType-ELS` → spectral type  

### ⚠️ Reconsider (Useful but optional / model-dependent / technical)
- `GRVSmag` → radial velocity magnitude  
- `RV` → radial velocity  
- `z-Flame` → redshift / derived parameter  
- `Evol` → evolutionary stage code  
- `A0`, `AG`, `ABP`, `ARP`, `E(BP-RP)` → extinction / reddening corrections  
- `RUWE` → Gaia astrometric fit quality  
- `Rad-Flame` → radius from FLAME pipeline  
- `EWHa`, `f_EWHa`, `e_EWHa` → emission line measurements  

### 🗑️ Drop / Ignore (Technical / redundant / non-essential)
- `Unnamed: 0` → old CSV index  
- `e_RA_ICRS`, `e_DE_ICRS`, `e_Plx`, `e_pmRA`, `e_pmDE` → measurement errors  
- `e_Gmag`, `e_BPmag`, `e_RPmag`, `e_GRVSmag` → magnitude errors  
- `PQSO`, `PGal`, `Pstar`, `PWD`, `Pbin` → classification probabilities  
- `Flags-HS` → internal Gaia flags
