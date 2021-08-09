<template>
  <div class="thumb-timeline">
    <div v-if="$store.state.img.loading || $store.state.audio.loading">Loading</div>
    <div
      v-else
      class="img-container"
    >
      <div
        v-for="(box, index) in boxes"
        :key="index"
        class="box"
        :style="{
          'background-image': `url('${$store.state.img.urls[box.img]}')`,
          width: `${box.width}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      urls: (state) => state.img.urls,
      beats: (state) => state.audio.beats,
    }),

    boxes() {
      let prev = 0;
      let count = 0;
      const boxes = [];
      for (let i = 0; i < this.beats.length; i += 1) {
        if (this.beats[i]) {
          boxes.push({ img: count, width: this.getWidth(i, prev) });
          count = (count + 1) % this.urls.length;
          prev = i;
        }
      }

      if (this.beats.length) {
        boxes.push({ img: count, width: this.getWidth(this.beats.length, prev) });
      }

      return boxes;
    },
  },

  methods: {
    getDist(index) {
      return index / this.beats.length;
    },

    getWidth(cur, prev) {
      return (this.getDist(cur) - this.getDist(prev)) * 100;
    },
  },
};
</script>

<style scoped>
.thumb-timeline {
  background-color: rgba(255, 255, 255, .3);
  height: 72px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

.img-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.box {
  background-size: auto 100%;
  background-repeat: repeat-x;
}
</style>
