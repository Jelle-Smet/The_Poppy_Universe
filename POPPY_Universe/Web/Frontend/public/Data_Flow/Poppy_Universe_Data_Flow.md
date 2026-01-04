Frontend        Backend           Database       ML Models       Engine
   │               │                 │              │             │
   │-------------->│                 │              │             │
   │Request to Backend               │              │             │
   │               │                 │              │             │
   │               │                 │              │             │
   │               │---------------->│              │             │
   │               │Query Objects    │              │             │
   │               │                 │              │             │
   │               │<----------------│              │             │
   │               │Return Objects   │              │             │
   │               │                 │              │             │
   │               │---------------->│              │             │
   │               │Querry Interactions             │             │
   │               │                 │              │             │
   │               │<----------------│              │             │
   │               │Return Interactions             │             │
   │               │                 │              │             │
   │               │                 │              │             │
   │               │------------------------------->│             │
   │               │Request ML Models + Sends Interactions        │
   │               │                 │              │             │
   │               │<-------------------------------│             │
   │               │Returns ML Data  │              │             │
   │               │                 │              │             │
   │               │--------------------------------------------->│
   │               │Send object data + ML outputs to Engine       │
   │               │                 │              │             │
   │               │<---------------------------------------------│
   │               │Return recommendations from Engine:           │
   │               │   1) Personalized recommendations            │
   │               │   2) Other layers                            │
   │<--------------│                 │              │             │
   │Display recommendations          │              │             │
   │               │                 │              │             │
   ├───────────────┼─────────────────┼──────────────┼─────────────┤
