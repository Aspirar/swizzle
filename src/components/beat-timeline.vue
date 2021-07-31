<template>
  <div class="beat-timeline">
    <div v-if="$store.state.audio.loading">Loading</div>
    <div v-else class="beat-container" @click="$store.state.audio.el.play()">
      <div class="cursor" :style="{ left: `${cursorPosition}%` }"></div>
      <div
        v-for="(value, index) in $store.state.audio.beats"
        :key="index"
        class="beat"
        :style="{
          left: getPosition(index),
          ...getWidthAndHeight(value),
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    cursorPosition: 0,
  }),

  computed: {
    beats() {
      return this.$store.state.audio.beats.filter(Boolean);
    },
  },

  methods: {
    getPosition(index) {
      return `${(index * 100) / this.$store.state.audio.beats.length}%`;
    },

    getWidthAndHeight(value) {
      const radius = `${3 * value}px`;
      return { width: radius, height: radius };
    },
  },

  mounted() {
    const { el } = this.$store.state.audio;
    const updateCursorPosition = () => {
      this.cursorPosition = (el.currentTime * 100) / el.duration;
      requestAnimationFrame(updateCursorPosition);
    };
    updateCursorPosition();
  },
};
</script>

<style scoped>
.beat-timeline {
  background-color: rgba(255, 255, 255, .3);
  color: rgba(255, 255, 255, .7);
  padding: 0 12px;
}

.beat-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
}

.cursor {
  position: absolute;
  background-color: #5c8a64;
  height: 100%;
  width: 3px;
}

.beat {
  width: 10px;
  height: 10px;
  background-color: #5c8a64;
  position: absolute;
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
