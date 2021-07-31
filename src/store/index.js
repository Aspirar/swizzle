import { createStore } from 'vuex';

import song from '@/assets/audio/song.mp3';
import getBeats from '@/lib/audio';

export default createStore({
  state: {
    audio: {
      el: new Audio(),
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

    setAudioSrc(state, src) {
      state.audio.el.src = src || song;
    },

    initAudioListener(state, listener) {
      state.audio.el.addEventListener('loadeddata', listener);
    },
  },

  actions: {
    async initAudio({ commit, dispatch }) {
      const listener = () => {
        commit('unsetAudioLoading');
      };
      commit('initAudioListener', listener);
      await dispatch('changeAudioSrc');
    },

    async changeAudioSrc({ commit }, src = song) {
      commit('setAudioLoading');
      const beats = await getBeats(src);
      commit('setBeats', beats);
      commit('setAudioSrc', src);
    },
  },

  modules: {},
});
