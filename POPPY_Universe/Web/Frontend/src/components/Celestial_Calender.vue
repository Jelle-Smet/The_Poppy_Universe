<template>
  <div class="chrono-wrapper">
    <div class="glass-chrono">
      <div class="chrono-header">
        <button class="nav-btn" @click="previousMonth">◀</button>
        <div class="date-display">
          <h3 class="month-name">{{ monthNames[currentMonth] }}</h3>
          <span class="year-name">{{ currentYear }}</span>
        </div>
        <button class="nav-btn" @click="nextMonth">▶</button>
      </div>

      <div class="chrono-body">
        <div class="weekdays-grid">
          <span v-for="day in weekDays" :key="day" class="weekday-label">{{ day }}</span>
        </div>
        <div class="days-grid">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            :class="getDayClasses(day)"
            @click="handleDayClick(day)"
          >
            <span v-if="day" class="day-number">{{ day.getUTCDate() }}</span>
            <div v-if="day && isSelectedLocal(day)" class="selection-glow"></div>
            <div v-if="day && isToday(day)" class="today-marker">NOW</div>
          </div>
        </div>
      </div>

      <div class="time-picker-section">
        <div class="time-input-group">
          <div class="time-column">
            <button class="time-step" @click="adjustTime('hours', 1)">▲</button>
            <span class="time-val">{{ formatNum(localHours) }}</span>
            <button class="time-step" @click="adjustTime('hours', -1)">▼</button>
            <span class="time-label">HRS</span>
          </div>
          <span class="time-separator">:</span>
          <div class="time-column">
            <button class="time-step" @click="adjustTime('minutes', 5)">▲</button>
            <span class="time-val">{{ formatNum(localMinutes) }}</span>
            <button class="time-step" @click="adjustTime('minutes', -5)">▼</button>
            <span class="time-label">MIN</span>
          </div>
        </div>
      </div>

      <div class="chrono-footer">
        <button class="snap-now-btn" @click="setToday">✨ SNAP TO NOW</button>
        <div class="selected-time-box">
           <span class="label">SELECTED TIME:</span>
           <span class="val">{{ formatLocalDisplay }}</span>
        </div>
        <button class="confirm-btn" @click="confirmSelection">
          ALIGN TIME COORDINATES 🚀
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'PoppyUniverseCalendar',
  props: {
    selectedStartDate: { type: Date, default: () => new Date() }
  },
  setup(props, { emit }) {
    // Local state - don't emit until confirmed
    const localDate = ref(new Date(props.selectedStartDate));
    const viewDate = ref(new Date(props.selectedStartDate));
    
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const currentMonth = computed(() => viewDate.value.getUTCMonth());
    const currentYear = computed(() => viewDate.value.getUTCFullYear());
    
    // Local time (not emitted until confirmed)
    const localHours = computed(() => localDate.value.getHours());
    const localMinutes = computed(() => localDate.value.getMinutes());

    const calendarDays = computed(() => {
      const days = [];
      const firstDay = new Date(Date.UTC(currentYear.value, currentMonth.value, 1));
      const lastDay = new Date(Date.UTC(currentYear.value, currentMonth.value + 1, 0));
      for (let i = 0; i < firstDay.getUTCDay(); i++) days.push(null);
      for (let i = 1; i <= lastDay.getUTCDate(); i++) {
        days.push(new Date(Date.UTC(currentYear.value, currentMonth.value, i)));
      }
      return days;
    });

    const isSelectedLocal = (date) => {
      if (!date || !localDate.value) return false;
      return date.getUTCDate() === localDate.value.getUTCDate() &&
             date.getUTCMonth() === localDate.value.getUTCMonth() &&
             date.getUTCFullYear() === localDate.value.getUTCFullYear();
    };

    const isToday = (date) => {
      if (!date) return false;
      const today = new Date();
      return date.getUTCDate() === today.getUTCDate() &&
             date.getUTCMonth() === today.getUTCMonth() &&
             date.getUTCFullYear() === today.getUTCFullYear();
    };

    const handleDayClick = (date) => {
      if (!date) return;
      const newDate = new Date(date);
      newDate.setHours(localHours.value);
      newDate.setMinutes(localMinutes.value);
      localDate.value = newDate;
    };

    const adjustTime = (unit, amount) => {
      const newDate = new Date(localDate.value);
      if (unit === 'hours') newDate.setHours(newDate.getHours() + amount);
      if (unit === 'minutes') newDate.setMinutes(newDate.getMinutes() + amount);
      localDate.value = newDate;
    };

    const formatNum = (num) => num.toString().padStart(2, '0');
    
    const formatLocalDisplay = computed(() => {
      return localDate.value.toLocaleString('en-GB', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
      }).toUpperCase();
    });

    const previousMonth = () => viewDate.value = new Date(Date.UTC(currentYear.value, currentMonth.value - 1, 1));
    const nextMonth = () => viewDate.value = new Date(Date.UTC(currentYear.value, currentMonth.value + 1, 1));
    
    const setToday = () => {
      const now = new Date();
      viewDate.value = now;
      localDate.value = now;
    };

    const confirmSelection = () => {
      emit('update:selectedStartDate', localDate.value);
    };

    return {
      currentMonth, currentYear, weekDays, monthNames, calendarDays,
      handleDayClick, adjustTime, previousMonth, nextMonth,
      isSelectedLocal, isToday, setToday, localHours, localMinutes,
      formatNum, formatLocalDisplay, confirmSelection,
      getDayClasses: (day) => ({
        'chrono-day': true, 'empty': !day, 'selected': isSelectedLocal(day), 'today': isToday(day)
      })
    };
  }
};
</script>

<style scoped>
.chrono-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.glass-chrono {
  background: rgba(10, 10, 30, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(125, 95, 255, 0.3);
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 0 30px rgba(125, 95, 255, 0.1);
  color: #fff;
}

.chrono-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.date-display { text-align: center; }
.month-name { margin: 0; font-size: 1.4rem; letter-spacing: 2px; color: #fff; text-shadow: 0 0 10px rgba(125, 95, 255, 0.8); }
.year-name { font-size: 0.9rem; opacity: 0.6; }

.nav-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(125, 95, 255, 0.4);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.nav-btn:hover { background: #7d5fff; box-shadow: 0 0 15px #7d5fff; }

.weekdays-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 15px;
  text-align: center;
}

.weekday-label { font-size: 0.7rem; color: #9aa4ff; font-weight: 800; }

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.chrono-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  position: relative;
  transition: 0.2s;
}

.chrono-day:hover:not(.empty) { background: rgba(125, 95, 255, 0.2); }

.chrono-day.selected {
  background: rgba(125, 95, 255, 0.4);
  border-color: #7d5fff;
  box-shadow: inset 0 0 15px rgba(125, 95, 255, 0.5);
}

.selection-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 20px #7d5fff;
  border-radius: 10px;
  pointer-events: none;
}

.today-marker {
  position: absolute;
  top: -5px;
  background: #ff596b;
  font-size: 0.5rem;
  padding: 2px 5px;
  border-radius: 4px;
  font-weight: bold;
}

.chrono-footer {
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.snap-now-btn {
  background: transparent;
  border: 1px solid #00ff88;
  color: #00ff88;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.snap-now-btn:hover { background: #00ff88; color: #000; box-shadow: 0 0 20px #00ff88; }

.selected-time-box { text-align: center; font-size: 0.9rem; }
.selected-time-box .label { color: #9aa4ff; margin-right: 5px; }
.selected-time-box .val { color: #fff; font-weight: bold; }

.confirm-btn {
  width: 100%;
  background: linear-gradient(135deg, #7d5fff, #6c5ce7);
  border: none;
  padding: 15px;
  border-radius: 15px;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
}

.confirm-btn:hover {
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.6);
  transform: translateY(-2px);
}

.time-picker-section {
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(125, 95, 255, 0.2);
}

.time-input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.time-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-val {
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 0 10px rgba(125, 95, 255, 0.5);
  font-family: 'Courier New', monospace;
}

.time-step {
  background: none;
  border: none;
  color: #7d5fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
  transition: 0.2s;
}

.time-step:hover { color: #fff; transform: scale(1.2); }

.time-separator {
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(125, 95, 255, 0.5);
  margin-top: -20px;
}

.time-label {
  font-size: 0.6rem;
  color: #9aa4ff;
  font-weight: bold;
  margin-top: 2px;
}
</style>