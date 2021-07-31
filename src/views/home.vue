<template>
  <beat-timeline />
</template>

<script>
import BeatTimeline from '@/components/beat-timeline.vue';

export default {
  components: {
    BeatTimeline,
  },

  created() {
    this.$store.dispatch('initAudio');
  },
};
</script>
