import { createStore } from 'vuex';

import song from '@/assets/audio/song.mp3';
import img1 from '@/assets/img/one.jpg';
import img2 from '@/assets/img/two.jpg';
import img3 from '@/assets/img/three.jpg';
import img4 from '@/assets/img/four.jpg';
import img5 from '@/assets/img/five.jpg';

import getBeats from '@/lib/audio';
import getImgBufs from '@/lib/image';

export default createStore({
  state: {
    audio: {
      el: new Audio(),
      loading: true,
      beats: [],
    },

    img: {
      loading: true,
      bufs: [],
      urls: [],
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

    unsetImgLoading(state) {
      state.img.loading = false;
    },

    setImgBufs(state, bufs) {
      state.img.bufs = bufs;
    },

    setImgUrls(state, urls) {
      state.img.urls = urls;
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

    async loadImgs({ commit }) {
      const urls = [img1, img2, img3, img4, img5];
      const bufs = await getImgBufs(urls);
      commit('setImgBufs', bufs);
      commit('setImgUrls', urls);
      commit('unsetImgLoading');
    },
  },

  modules: {},
});
