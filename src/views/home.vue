<template>
  <frame-timeline />
  <thumb-timeline />
  <beat-timeline />
</template>

<script>
import BeatTimeline from '@/components/beat-timeline.vue';
import ThumbTimeline from '@/components/thumb-timeline.vue';
import FrameTimeline from '@/components/frame-timeline.vue';

export default {
  components: {
    BeatTimeline,
    ThumbTimeline,
    FrameTimeline,
  },

  async created() {
    await Promise.all([
      this.$store.dispatch('initAudio'),
      this.$store.dispatch('loadImgs'),
    ]);
  },
};
</script>
