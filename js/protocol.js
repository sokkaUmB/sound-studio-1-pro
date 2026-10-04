/**
 * Sound Studio (1) Pro for Nothing Ear - Protocol Engine
 * Copyright (c) 2026 sokkaUmB
 * Licensed under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
 * All commercial rights reserved.
 */
(function() {
  const BAND_RANGES = [
    { min: 20, max: 99, default: 55 },
    { min: 100, max: 199, default: 110 },
    { min: 200, max: 399, default: 220 },
    { min: 400, max: 999, default: 440 },
    { min: 1000, max: 2999, default: 1320 },
    { min: 3000, max: 5999, default: 3300 },
    { min: 6000, max: 11999, default: 6600 },
    { min: 12000, max: 20000, default: 13200 }
  ];

  function generateNothingXQR(bands, name) {
    const safeName = (name || "Custom").trim().substring(0, 16);
    const nameBytes = new TextEncoder().encode(safeName);

    // Structure TLV:
    // Tag 0x00: EQ Block (0x60 = 96 bytes = 8 bands * 3 parameters * 4 bytes float LE)
    // Tag 0x01: Name Block
    const totalLen = 2 + 96 + 2 + nameBytes.length;
    const buffer = new Uint8Array(totalLen);
    const dv = new DataView(buffer.buffer);

    // Tag 0x00, Len 0x60 (96 bytes)
    buffer[0] = 0x00;
    buffer[1] = 0x60;

    let offset = 2;
    for (let i = 0; i < 8; i++) {
      const b = bands[i] || { freq: BAND_RANGES[i].default, gain: 0, q: 1.0 };
      const gain = Math.max(-6, Math.min(6, Number(b.gain) || 0));
      const rawFreq = Number(b.freq) || BAND_RANGES[i].default;
      const freq = Math.max(BAND_RANGES[i].min, Math.min(BAND_RANGES[i].max, Math.round(rawFreq)));
      const q = Math.max(0.1, Math.min(10.0, Number(b.q) || 1.0));

      // 32-bit Little-Endian IEEE 754 float
      dv.setFloat32(offset, gain, true);
      offset += 4;
      dv.setFloat32(offset, freq, true);
      offset += 4;
      dv.setFloat32(offset, q, true);
      offset += 4;
    }

    // Tag 0x01, Len, Name
    buffer[offset++] = 0x01;
    buffer[offset++] = nameBytes.length;
    buffer.set(nameBytes, offset);

    // Compress using standard RFC 1952 GZIP
    const gzipData = pako.gzip(buffer);

    let binary = '';
    const len = gzipData.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(gzipData[i]);
    }
    return btoa(binary);
  }

  window.BAND_RANGES = BAND_RANGES;
  window.generateNothingXQR = generateNothingXQR;
})();