<template>
  <beat-timeline />
  <thumb-timeline />
</template>

<script>
import BeatTimeline from '@/components/beat-timeline.vue';
import ThumbTimeline from '@/components/thumb-timeline.vue';

export default {
  components: {
    BeatTimeline,
    ThumbTimeline,
  },

  async created() {
    await Promise.all([
      this.$store.dispatch('initAudio'),
      this.$store.dispatch('loadImgs'),
    ]);
  },
};
</script>
