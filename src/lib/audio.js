async function fetchAudio(url) {
  const response = await fetch(url);
  return response.arrayBuffer();
}

function decodeAudio(arrayBuf) {
  const ctx = new AudioContext();
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(arrayBuf, resolve, reject);
  });
}

async function decodeUrl(url) {
  const arrayBuf = await fetchAudio(url);
  return decodeAudio(arrayBuf);
}

function getChannels(buf) {
  return {
    a: buf.getChannelData(0),
    b: buf.getChannelData(1),
  };
}

function calcEnergyFromChannels(a, b, len) {
  const energy = [];
  for (let i = 0, index = 0; i < len; i += 1) {
    let e = 0;
    for (let j = 0; j < 1024; j += 1, index += 1) {
      e += a[index] * a[index] + b[index] * b[index];
    }
    energy.push(e);
  }
  return energy;
}

function calcEnergy(buf, windowWidth) {
  const { a, b } = getChannels(buf);
  const len = Math.floor(buf.length / windowWidth);
  return calcEnergyFromChannels(a, b, len);
}

function initHistory(energy, historyWidth) {
  let history = 0;
  for (let i = 0; i < historyWidth && i < energy.length; i += 1) {
    history += energy[i];
  }
  return history;
}

function updateHistory(history, index, skip, energy) {
  if (index - skip >= 0 && index + skip < energy.length) {
    return history - energy[index - skip] + energy[index + skip];
  }
  return history;
}

function getAvgHistory(history, historyWidth) {
  return history / historyWidth;
}

function getStartEndForVariance(energy, index, skip, historyWidth) {
  const start = index - skip >= 0 ? index - skip : 0;
  const end = start + historyWidth <= energy.length
    ? start + historyWidth
    : energy.length;
  return { start, end };
}

function calcVariance(energy, avgHistory, start, end) {
  let variance = 0;
  for (let j = start; j < end; j += 1) {
    const diff = energy[j] - avgHistory;
    variance += diff * diff;
  }
  return Math.sqrt(variance / 43);
}

function getVariance(energy, index, skip, historyWidth, avgHistory) {
  const { start, end } = getStartEndForVariance(energy, index, skip, historyWidth);
  return calcVariance(energy, avgHistory, start, end);
}

function getC(energy, avgHistory, historyWidth, skip, index) {
  const variance = getVariance(energy, index, skip, historyWidth, avgHistory);
  return (-0.0025714 * variance) + 1.5142857;
}

function getBeat(energy, history, historyWidth, skip, index) {
  const avgHistory = getAvgHistory(history, historyWidth);
  const c = getC(energy, avgHistory, historyWidth, skip, index);
  return energy[index] > c * avgHistory
    ? energy[index] / avgHistory
    : 0;
}

function getRawBeats(energy, initialHistory, historyWidth) {
  let history = initialHistory;
  const skip = Math.ceil(historyWidth / 2);
  const beats = [];
  for (let i = 0; i < energy.length; i += 1) {
    history = updateHistory(history, i, skip, energy);
    beats[i] = getBeat(energy, history, historyWidth, skip, i);
  }
  return beats;
}

function smoothBeats(beats, beatDistance) {
  let lastTrue = -99999;
  for (let i = 0; i < beats.length; i += 1) {
    if (beats[i]) {
      if (i - beatDistance < lastTrue) {
        beats[i] = 0;
      }
      lastTrue = i;
    }
  }
}

function getBeats(buf, windowWidth, historyWidth, beatDistance) {
  const energy = calcEnergy(buf, windowWidth);
  const history = initHistory(energy, historyWidth);
  const beats = getRawBeats(energy, history, historyWidth);
  smoothBeats(beats, beatDistance);
  return beats;
}

async function getBeatsFromUrl(url) {
  const buf = await decodeUrl(url);
  return getBeats(buf, 1024, 43, 10);
}

export default getBeatsFromUrl;
