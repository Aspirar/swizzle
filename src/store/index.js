import { createStore } from 'vuex';

import song from '@/assets/audio/song.mp3';

import getBeats from '@/lib/audio';

export default createStore({
  state: {
    audio: {
      loading: true,
      beats: [],
    },
  },

  mutations: {
    setBeats(state, beats) {
      state.audio.beats = beats;
    },

    setAudioLoading(state) {
      state.audio.loading = true;
    },

    unsetAudioLoading(state) {
      state.audio.loading = false;
    },
  },

  actions: {
    async initAudio({ commit }) {
      commit('setAudioLoading');
      const beats = await getBeats(song);
      commit('setBeats', beats);
      commit('unsetAudioLoading');
    },
  },

  modules: {},
});
