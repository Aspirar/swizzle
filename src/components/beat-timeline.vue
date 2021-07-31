<template>
  <div class="beat-timeline">
    <div class="beat-container">
      <div v-if="$store.state.audio.loading">Loading</div>
      <div
        v-else
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

.beat {
  width: 10px;
  height: 10px;
  background-color: #5c8a64;
  position: absolute;
  border-radius: 50%;
  transform: translateX(-50%);
}
</style>
