<template>
  <div class="news-container">
    <canvas id="news-starfield"></canvas>

    <h1>Latest News - Poppy Universe</h1>
    <p>
      Stay updated with all the cosmic news! From new features to stellar events, we’ve got a lot to share.
    </p>

    <div class="download-container">
      <a href="/Text_Files/News/Latest_News.pdf" download="Latest_News.pdf" class="download-link">
        Download Latest News
      </a>
    </div>

    <hr class="divider" />

    <div v-if="loading" class="loading-message">🌌 Loading news...</div>
    <div v-else>
      <div v-if="newsItems.length === 0" class="no-news-message">
        No news available at the moment.
      </div>

      <div class="cards-grid">
        <div 
          v-for="(item, index) in newsItems" 
          :key="index" 
          class="flip-card"
        >
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <h3>{{ item.title }}</h3>
            </div>
            <div class="flip-card-back">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="divider" />

    <router-link to="/all_objects" class="cta-message">Start Exploring</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'NewsPage',
  setup() {
    const newsItems = ref([]);
    const loading = ref(true);

    const isTitleLine = (line) => {
      const trimmed = line.trim();

      // Emoji at start
      const emojiTitle = /^[\p{Emoji}]/u.test(trimmed);

      // Mostly uppercase (ignoring symbols)
      const letters = trimmed.replace(/[^a-zA-Z]/g, '');
      const uppercaseRatio =
        letters.length > 0 &&
        letters === letters.toUpperCase() &&
        letters.length > 6;

      // Short dramatic sentence
      const dramaticShort =
        trimmed.endsWith('!') && trimmed.length < 80;

      return emojiTitle || uppercaseRatio || dramaticShort;
    };

    const cleanTitle = (line) => {
      return line
        .replace(/\*\*/g, '')
        .replace(/^[\p{Emoji}\s]+/u, '')
        .trim();
    };

    const fetchNews = async () => {
      try {
        const response = await fetch('/Text_Files/News/Latest_News.txt');
        if (!response.ok) throw new Error('Failed to load news');

        const text = await response.text();
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

        const items = [];
        let currentItem = null;

        for (const line of lines) {
          if (isTitleLine(line)) {
            if (currentItem) items.push(currentItem);
            currentItem = {
              title: cleanTitle(line),
              content: ''
            };
          } else if (currentItem) {
            currentItem.content += line + '\n';
          }
        }

        if (currentItem) items.push(currentItem);

        newsItems.value = items.map(i => ({
          title: i.title,
          content: i.content.trim()
        }));

      } catch (err) {
        console.error(err);
        newsItems.value = [];
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchNews);

    return { newsItems, loading };
  }
};
</script>


<style scoped>
.news-container {
  position: relative;
  padding: 40px 20px;
  font-family: 'Courier New', Courier, monospace;

  /* Semi-transparent gradient so we can see the main layout's starfield */
  background: rgba(10, 0, 24, 0.7); /* darkish with opacity */
  /* optional: keep some gradient look */
  background: linear-gradient(to bottom, rgba(10,0,24,0.7), rgba(26,3,48,0.7));

  color: #fff;
  text-align: center;
  overflow: hidden;

  /* container takes full height if content is small */
  min-height: 100vh;
  
  /* blur behind option if you want a frosted effect */
  /* backdrop-filter: blur(4px); */
}


#news-starfield {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;

  /* Fix: allow clicks to go through */
  pointer-events: none;

}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #d1c4ff;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 20px 0;
  color: #ccc;
}

hr.divider {
  margin: 30px 0;
  border-top: 1px solid #555;
}

.loading-message, .no-news-message {
  font-size: 1.2rem;
  margin: 20px 0;
  color: #aaa;
}

.download-container {
  margin-bottom: 25px;
}

.download-link {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #6b5bff;
  text-decoration: none;
  border-radius: 5px;
}

.download-link:hover {
  background-color: #8f7eff;
}

.cta-message {
  display: inline-block;
  font-size: 1.3rem;
  color: #a5c1ff;
  margin-top: 30px;
  padding: 8px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  background-color: #3b0b65;
  /* FIX: Ensure the CTA link is always clickable by giving it a high z-index 
     and position relative to establish a stacking context. */
  position: relative; 
  z-index: 10; 
}

.cta-message:hover {
  background-color: #5c1a99;
}

/* --- Flip Card Grid --- */
.cards-grid {
  display: grid;
  /* Fixed column width (300px) ensures all cards are the same width.
     auto-fill ensures they wrap nicely on smaller screens.
  */
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 50px; 
  /* EDITED: Increased vertical margin to ensure clear separation from the hr divider lines */
  margin-top: 60px; 
  margin-bottom: 60px;
  justify-content: center;
}

/* --- Flip Card Container --- */
.flip-card {
  background-color: transparent;
  /* Fixed dimensions for uniformity */
  width: 300px;
  height: 240px; /* Slightly taller to fit more text comfortably */
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 12px;
  cursor: pointer;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Common styles for Front and Back */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  backface-visibility: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5); /* Slightly stronger shadow */
  
  /* Flexbox for layout */
  display: flex;
  flex-direction: column;
}

/* --- Front Side --- */
.flip-card-front {
  background: linear-gradient(135deg, #6b5bff, #3b0b65);
  color: white;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.flip-card-front h3 {
  margin: 0;
  font-size: 1.4rem;
  /* Ensure long titles break and don't overflow */
  word-wrap: break-word; 
  overflow-wrap: break-word;
}

/* --- Back Side (The Content) --- */
.flip-card-back {
  background: linear-gradient(135deg, #3b0b65, #6b5bff);
  color: #fff;
  transform: rotateY(180deg);
  font-size: 0.95rem;
  
  /* IMPORTANT: Enable scrolling for long content */
  overflow-y: auto; 
  
  /* IMPORTANT: Padding ensures text doesn't touch edges */
  padding: 20px; 
  
  /* Align text for reading */
  align-items: flex-start; /* Start items at the top */
  justify-content: flex-start; /* Start content at the top */
  text-align: left;
}

.flip-card-back p {
  margin: 0;
  width: 100%;
  line-height: 1.5;
  /* Ensure text wraps correctly */
  white-space: pre-wrap; 
  word-wrap: break-word;
}

/* --- Custom Scrollbar for the Back Card (Webkit/Chrome/Safari) --- */
.flip-card-back::-webkit-scrollbar {
  width: 6px; /* Thin scrollbar */
}

.flip-card-back::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2); 
  border-radius: 10px;
  margin: 10px 0; /* Keeps scrollbar away from very top/bottom corners */
}

.flip-card-back::-webkit-scrollbar-thumb {
  background: #a5c1ff; 
  border-radius: 10px;
}

.flip-card-back::-webkit-scrollbar-thumb:hover {
  background: #fff; 
}
</style>