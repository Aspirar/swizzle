<template>
  <div class="frame-timeline">
    <div v-if="$store.state.audio.loading">Loading</div>
    <div v-else class="frame-wrap">
      <div
        v-for="index in Math.floor($store.state.audio.el.duration * 30)"
        :key="index"
        class="frame"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      console.log(this.$store.state.audio.el.duration);
    }, 1000);
  },
};
</script>

<style scoped>
.frame-timeline {
  background-color: rgba(255, 255, 255, .3);
  padding: 0 12px;
  height: 36px;
  display: flex;
  align-items: center;
}

.frame-wrap {
  display: flex;
  width: 100%;
  height: 100%;
}

.frame {
  flex: 1;
  height: 100%;
}
.frame:nth-child(even) {
  background-color: rgba(255, 255, 255, .2);
}
</style>
