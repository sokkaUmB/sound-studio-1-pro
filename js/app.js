/**
 * Sound Studio (1) Pro for Nothing Ear
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

  // -------------------------------------------------------------
  // Profili di Compensazione Acustica Hardware Dispositivi Nothing / CMF
  // -------------------------------------------------------------
  const DEVICE_PROFILES = {
    nothing_headphone_1: {
      name: "Nothing HeadPhone (1)",
      badge: "NOTHING HEADPHONE (1)",
      description: "Calibrazione Nothing HeadPhone (1): Driver 40mm in camera acustica circumaurale over-ear. Mantiene l'impatto viscerale dei sub-bassi, sfiata le risonanze della camera chiusa a 200-350Hz (-1 dB) per una separazione chirurgica tra doppio pedale e chitarre ritmiche, preserva la naturale risposta HRTF sui medi, apre la chiarezza dei piatti e l'ariosità del soundstage a 6.6kHz (+1 dB) e 13.2kHz (+1 dB).",
      offsets: [
        { dGain: 0, dQ: 0.1 },   // CH1 (20-99 Hz)
        { dGain: -1, dQ: 0.2 },  // CH2 (100-199 Hz)
        { dGain: -1, dQ: 0.0 },  // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 1, dQ: -0.1 },  // CH7 (6000-11999 Hz)
        { dGain: 1, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    nothing_headphone_1_pro: {
      name: "Nothing HeadPhone (1) Pro",
      badge: "NOTHING HEADPHONE (1) PRO",
      description: "Profilo Nothing HeadPhone (1) Pro: Architettura circumaurale flagship multi-driver ad altissima fedeltà sonora e soundstage tridimensionale.",
      offsets: [
        { dGain: 1, dQ: 0.1 },   // CH1 (20-99 Hz)
        { dGain: 0, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: -1, dQ: 0.1 },  // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 2, dQ: -0.1 }   // CH8 (12000-20000 Hz)
      ]
    },
    cmf_headphone_pro: {
      name: "CMF Headphone Pro",
      badge: "CMF HEADPHONE PRO",
      description: "Profilo CMF Headphone Pro: Cuffia over-ear con driver da 40mm e supporto Hi-Res LDAC con controllo dinamico delle frequenze.",
      offsets: [
        { dGain: 1, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: -1, dQ: 0.2 },  // CH2 (100-199 Hz)
        { dGain: -2, dQ: 0.0 },  // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: -1, dQ: 0.1 },  // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    nothing_ear_open: {
      name: "Nothing Ear (open)",
      badge: "NOTHING EAR (OPEN)",
      description: "Profilo Nothing Ear (open): Auricolari wireless aperti con driver da 14.2mm in titanio e tecnologia direzionale Sound Seal System.",
      offsets: [
        { dGain: 3, dQ: -0.1 },  // CH1 (20-99 Hz)
        { dGain: 2, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    cmf_clip_pro: {
      name: "CMF Clip Pro",
      badge: "CMF CLIP PRO",
      description: "Profilo CMF Clip Pro: Auricolari open-ear clip-on a conduzione d'aria per il massimo comfort e consapevolezza ambientale.",
      offsets: [
        { dGain: 3, dQ: -0.1 },  // CH1 (20-99 Hz)
        { dGain: 2, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    nothing_ear_stick: {
      name: "Nothing Ear (stick)",
      badge: "NOTHING EAR (STICK)",
      description: "Calibrazione Half In-Ear aperta: Compensazione della perdita naturale di pressione sui sub-bassi per assenza di gommino sigillante (+2 dB a 55Hz, +2 dB a 110Hz).",
      offsets: [
        { dGain: 2, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: 2, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    nothing_ear_2024: {
      name: "Nothing Ear (2024)",
      badge: "NOTHING EAR (2024)",
      description: "Calibrazione In-Ear Driver Ceramico: Risposta ai transienti rapidissima. Leggero controllo a 6.6kHz (-1 dB) per domare il morso metallico delle distorsioni high-gain e aria estesa sui piatti a 13.2kHz (+1 dB).",
      offsets: [
        { dGain: 0, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: 0, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: -1, dQ: 0.2 },  // CH7 (6000-11999 Hz)
        { dGain: 1, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    nothing_ear_a: {
      name: "Nothing Ear (a)",
      badge: "NOTHING EAR (A)",
      description: "Calibrazione In-Ear Dual Chamber: Profilo energetico divertente con correzione del bump a 110Hz (-1 dB) per non offuscare il basso elettrico e punch vocale presente a 3.3kHz (+1 dB).",
      offsets: [
        { dGain: 0, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: -1, dQ: 0.2 },  // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    nothing_ear_2: {
      name: "Nothing Ear (2)",
      badge: "NOTHING EAR (2)",
      description: "Calibrazione In-Ear Driver Grafene: Riduzione chirurgica anti-fatigue sul picco a 6kHz (-1 dB su CH6 e CH7) per lunghe sessioni rock/metal senza fastidio e rinforzo sub-bass a 55Hz (+1 dB).",
      offsets: [
        { dGain: 1, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: 0, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: -1, dQ: 0.2 },  // CH6 (3000-5999 Hz)
        { dGain: -1, dQ: 0.2 },  // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    nothing_ear_1: {
      name: "Nothing Ear (1)",
      badge: "NOTHING EAR (1)",
      description: "Calibrazione In-Ear Teenage Engineering: Suono caldo e rotondo d'impostazione analogica, compensato con un tocco di mordente sulle chitarre a 3.3kHz (+1 dB) e definizione piatti a 6.6kHz (+1 dB).",
      offsets: [
        { dGain: 0, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: 0, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    cmf_buds_pro_2: {
      name: "CMF Buds Pro 2",
      badge: "CMF BUDS PRO 2",
      description: "Calibrazione Dual Driver CMF: Controllo del subwoofer Ultra Bass (-2 dB a 110Hz, -1 dB a 220Hz) per evitare mascheramento delle chitarre e boost di trasparenza sulle voci a 1.3kHz e 3.3kHz.",
      offsets: [
        { dGain: 0, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: -2, dQ: 0.2 },  // CH2 (100-199 Hz)
        { dGain: -1, dQ: 0.0 },  // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    cmf_buds_2_plus: {
      name: "CMF Buds 2 Plus",
      badge: "CMF BUDS 2 PLUS",
      description: "Profilo CMF Buds 2 Plus: Architettura acustica avanzata con supporto Hi-Res LDAC per bassi profondi e alte frequenze cristalline.",
      offsets: [
        { dGain: 1, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: 0, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 1, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    cmf_buds_2: {
      name: "CMF Buds 2 / 2a",
      badge: "CMF BUDS 2 / 2A",
      description: "Profilo CMF Buds 2 / 2a: Driver dinamico da 12.4mm con risposta in frequenza bilanciata e bassi energici.",
      offsets: [
        { dGain: 2, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: 1, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    cmf_buds_pro: {
      name: "CMF Buds Pro",
      badge: "CMF BUDS PRO",
      description: "Calibrazione CMF Buds Pro: Bilanciamento del basso corposo (-1 dB a 110Hz) con incremento di chiarezza sul rullante a 3.3kHz (+1 dB).",
      offsets: [
        { dGain: 0, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: -1, dQ: 0.1 },  // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    cmf_buds: {
      name: "CMF Buds",
      badge: "CMF BUDS",
      description: "Calibrazione standard CMF Buds: Snellimento della gamma medio-bassa (-1 dB) per risaltare la definizione ritmica.",
      offsets: [
        { dGain: 0, dQ: 0.0 },   // CH1 (20-99 Hz)
        { dGain: -1, dQ: 0.1 },  // CH2 (100-199 Hz)
        { dGain: 0, dQ: 0.0 },   // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    cmf_neckband_pro: {
      name: "CMF Neckband Pro",
      badge: "CMF NECKBAND PRO",
      description: "Profilo CMF Neckband Pro: Driver in titanio da 13.6mm con Ultra Bass 2.0 e 50dB di cancellazione attiva del rumore.",
      offsets: [
        { dGain: 3, dQ: -0.1 },  // CH1 (20-99 Hz)
        { dGain: 1, dQ: 0.0 },   // CH2 (100-199 Hz)
        { dGain: -1, dQ: 0.0 },  // CH3 (200-399 Hz)
        { dGain: 0, dQ: 0.0 },   // CH4 (400-999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH5 (1000-2999 Hz)
        { dGain: 0, dQ: 0.0 },   // CH6 (3000-5999 Hz)
        { dGain: 1, dQ: 0.0 },   // CH7 (6000-11999 Hz)
        { dGain: 0, dQ: 0.0 }    // CH8 (12000-20000 Hz)
      ]
    },
    studio_flat: {
      name: "Direct Studio Master",
      badge: "STUDIO REFERENCE",
      description: "Nessuna compensazione hardware applicata: curva fedele 1:1 al master discografico originale.",
      offsets: [
        { dGain: 0, dQ: 0.0 },
        { dGain: 0, dQ: 0.0 },
        { dGain: 0, dQ: 0.0 },
        { dGain: 0, dQ: 0.0 },
        { dGain: 0, dQ: 0.0 },
        { dGain: 0, dQ: 0.0 },
        { dGain: 0, dQ: 0.0 },
        { dGain: 0, dQ: 0.0 }
      ]
    }
  };

  function t(path, params) {
    return window.I18n ? window.I18n.t(path, params) : path;
  }

  let currentRawEQ = null;
  let currentBands = BAND_RANGES.map(r => ({ freq: r.default, gain: 0, q: 1.0 }));

  // DOM Elements
  let selDevice, deviceBadge, deviceNotes;
  let selGenre, selSubgenre, selArtist, selAlbum, selCustomPresets;
  let profileNameInput, notesBox, aiKeyInput, aiPromptInput, btnAI, aiBtnText, curveCanvas;
  let aiProviderSelect, aiCustomUrlInput;
  let draggingBandIdx = -1;

  // -------------------------------------------------------------
  // Theme Manager (Auto / System Default + Manual Toggle)
  // -------------------------------------------------------------
  let currentThemeMode = "auto"; // "auto" | "light" | "dark"

  function getSystemTheme() {
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark";
  }

  function getEffectiveTheme() {
    if (currentThemeMode === "light" || currentThemeMode === "dark") {
      return currentThemeMode;
    }
    return getSystemTheme();
  }

  function applyTheme(mode, save = true) {
    currentThemeMode = mode || "auto";
    if (save) {
      localStorage.setItem("nothing_theme", currentThemeMode);
    }

    const effective = getEffectiveTheme();
    document.documentElement.setAttribute("data-theme", effective);

    updateThemeUI();
    if (typeof drawCurve === "function" && curveCanvas && currentBands) {
      try {
        drawCurve();
      } catch (e) {
        console.warn("drawCurve skipped during theme change:", e);
      }
    }
  }

  function updateThemeUI() {
    const iconElem = document.getElementById("themeIcon");
    const labelElem = document.getElementById("themeLabel");
    const toggleBtn = document.getElementById("btnThemeToggle");

    let iconText = "🌓";
    let labelKey = "ui.theme_auto";
    let fallbackText = "Auto";

    if (currentThemeMode === "light") {
      iconText = "☀️";
      labelKey = "ui.theme_light";
      fallbackText = "Chiaro";
    } else if (currentThemeMode === "dark") {
      iconText = "🌙";
      labelKey = "ui.theme_dark";
      fallbackText = "Scuro";
    }

    if (iconElem) iconElem.innerText = iconText;
    if (labelElem) {
      labelElem.setAttribute("data-i18n", labelKey);
      labelElem.innerText = t(labelKey) || fallbackText;
    }
    if (toggleBtn) {
      toggleBtn.title = t("ui.toggle_theme") || "Cambia tema";
    }
  }

  window.cycleTheme = function() {
    const order = ["auto", "light", "dark"];
    const nextIdx = (order.indexOf(currentThemeMode) + 1) % order.length;
    applyTheme(order[nextIdx], true);
    const eff = getEffectiveTheme();
    showToast((t("ui.theme_" + order[nextIdx]) || order[nextIdx]) + (order[nextIdx] === "auto" ? ` (${eff.toUpperCase()})` : ""));
  };

  function initTheme() {
    const saved = localStorage.getItem("nothing_theme") || "auto";
    currentThemeMode = saved;

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
      const handler = () => {
        if (currentThemeMode === "auto") {
          applyTheme("auto", false);
        }
      };
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handler);
      } else if (typeof mediaQuery.addListener === "function") {
        mediaQuery.addListener(handler);
      }
    }

    applyTheme(currentThemeMode, false);
  }

  function initApp() {
    selDevice = document.getElementById("selDevice");
    deviceBadge = document.getElementById("deviceBadge");
    deviceNotes = document.getElementById("deviceNotes");

    selGenre = document.getElementById("selGenre");
    selSubgenre = document.getElementById("selSubgenre");
    selArtist = document.getElementById("selArtist");
    selAlbum = document.getElementById("selAlbum");
    selCustomPresets = document.getElementById("selCustomPresets");
    profileNameInput = document.getElementById("profileName");
    notesBox = document.getElementById("presetNotes");
    aiKeyInput = document.getElementById("aiKey");
    aiPromptInput = document.getElementById("aiPrompt");
    btnAI = document.getElementById("btnAI");
    aiBtnText = document.getElementById("aiBtnText");
    curveCanvas = document.getElementById("curveCanvas");
    aiProviderSelect = document.getElementById("aiProvider");
    aiCustomUrlInput = document.getElementById("aiCustomUrl");

    // Initialize I18n Engine & System Language Auto-detection
    if (window.I18n) {
      window.I18n.init();
      const selLang = document.getElementById("selLanguage");
      if (selLang) selLang.value = window.I18n.getLanguage();

      window.I18n.subscribe((lang) => {
        const curDev = selDevice ? selDevice.value : "nothing_headphone_1";
        updateDeviceInfoUI(curDev);
        if (typeof updateVaultStatusUI === "function" && document.getElementById("vaultStatusBadge")) updateVaultStatusUI();
        updateThemeUI();
        const selL = document.getElementById("selLanguage");
        if (selL) selL.value = lang;
        refreshCascadeLabels();
      });
    }

    // Initialize Theme Engine (System auto-detect + user preference)
    initTheme();

    // Preferred device initialization (Default to Nothing HeadPhone (1))
    const savedDevice = localStorage.getItem("nothing_preferred_device") || "nothing_headphone_1";
    if (selDevice) selDevice.value = savedDevice;
    updateDeviceInfoUI(savedDevice);

    populateGenres();
    buildSearchIndex();
    if (typeof loadSavedAIConfig === "function" && document.getElementById("aiProvider")) loadSavedAIConfig();
    if (typeof updateVaultStatusUI === "function" && document.getElementById("vaultStatusBadge")) updateVaultStatusUI();
    loadSavedUserPresetsDropdown();

    // Check Android / Web Share support
    const btnShare = document.getElementById("btnShareQR");
    if (btnShare && ((typeof navigator !== "undefined" && navigator.share) || (window.AndroidApp && typeof window.AndroidApp.shareImage === "function"))) {
      btnShare.style.display = "inline-flex";
    }

    const btnLaunchNothing = document.getElementById("btnLaunchNothingX");
    if (btnLaunchNothing && (window.AndroidApp || /android/i.test(navigator.userAgent))) {
      btnLaunchNothing.style.display = "inline-flex";
    }

    // Restore last state if available
    const savedState = localStorage.getItem("nothing_last_eq_state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.rawEQ) {
          currentRawEQ = parsed.rawEQ;
        }
        if (parsed.bands && parsed.bands.length === 8) {
          currentBands = parsed.bands.map((b, i) => {
            const r = BAND_RANGES[i];
            const f = Number(b.freq) || r.default;
            return {
              freq: Math.max(r.min, Math.min(r.max, f)),
              gain: Math.max(-6, Math.min(6, Math.round(Number(b.gain) || 0))),
              q: Math.max(0.1, Math.min(10.0, Math.round((Number(b.q) || 1.0) * 10) / 10))
            };
          });
          if (profileNameInput) profileNameInput.value = parsed.name || "Custom";
          if (notesBox) notesBox.innerText = parsed.notes || "Configurazione ripristinata dall'ultima sessione.";
        }
      } catch (e) {
        console.warn("Could not restore saved state", e);
      }
    }

    if (!currentRawEQ || !currentRawEQ.bands) {
      currentRawEQ = {
        name: "Flat Linear",
        notes: t("ui.preset_notes_default") || "Seleziona un genere o un album dal catalogo per visualizzare i dettagli tecnici di missaggio.",
        bands: BAND_RANGES.map(r => ({ freq: r.default, gain: 0, q: 1.0 }))
      };
      if (!savedState) {
        currentBands = computeCompensatedBands(currentRawEQ.bands, savedDevice);
      }
    }

    renderBandCards();
    updateQR();
    drawCurve();

    // Canvas events
    if (curveCanvas) {
      curveCanvas.addEventListener("pointerdown", onCanvasPointerDown);
      window.addEventListener("pointermove", onCanvasPointerMove);
      window.addEventListener("pointerup", onCanvasPointerUp);
      window.addEventListener("pointercancel", onCanvasPointerUp);
    }
    window.addEventListener("resize", drawCurve);

    // Outside click to close search dropdown
    document.addEventListener("click", function(e) {
      const wrapper = document.querySelector(".search-wrapper");
      const dropdown = document.getElementById("searchDropdown");
      if (dropdown && wrapper && !wrapper.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  function updateDeviceInfoUI(devKey) {
    const prof = DEVICE_PROFILES[devKey] || DEVICE_PROFILES.nothing_headphone_1;
    const badgeText = t("device_badges." + devKey) || prof.badge;
    const devName = t("devices." + devKey) || prof.name;
    const descText = t("device_descriptions." + devKey) || prof.description;

    if (deviceBadge) {
      deviceBadge.innerText = badgeText;
      deviceBadge.style.background = "var(--accent)";
      deviceBadge.style.borderColor = "var(--accent)";
      deviceBadge.style.color = "#fff";
    }
    if (deviceNotes) {
      deviceNotes.innerHTML = `<strong>${devName}:</strong> ${descText}`;
    }
  }

  function computeCompensatedBands(rawBands, deviceKey) {
    const prof = DEVICE_PROFILES[deviceKey] || DEVICE_PROFILES.nothing_headphone_1;
    return rawBands.map((b, i) => {
      const r = BAND_RANGES[i];
      const off = prof.offsets[i] || { dGain: 0, dQ: 0 };
      const f = Number(b.freq) || r.default;
      const g = Math.max(-6, Math.min(6, Math.round((Number(b.gain) || 0) + (off.dGain || 0))));
      const q = Math.max(0.1, Math.min(10.0, Math.round(((Number(b.q) || 1.0) + (off.dQ || 0)) * 10) / 10));
      return {
        freq: Math.max(r.min, Math.min(r.max, Math.round(f))),
        gain: g,
        q: q
      };
    });
  }

  window.onDeviceChange = function() {
    const devKey = selDevice ? selDevice.value : "nothing_headphone_1";
    localStorage.setItem("nothing_preferred_device", devKey);
    updateDeviceInfoUI(devKey);

    if (!currentRawEQ || !currentRawEQ.bands) {
      currentRawEQ = {
        name: "Flat Linear",
        notes: t("ui.preset_notes_default") || "Risposta neutrale di riferimento 1:1 con compensazione hardware.",
        bands: BAND_RANGES.map(r => ({ freq: r.default, gain: 0, q: 1.0 }))
      };
    }

    currentBands = computeCompensatedBands(currentRawEQ.bands, devKey);
    renderBandCards();
    updateQR();
    drawCurve();
    saveCurrentState();
    const devName = t("devices." + devKey) || DEVICE_PROFILES[devKey]?.name || devKey;
    showToast(devName);
  };

  window.onLanguageChange = function(newLang) {
    if (window.I18n) {
      window.I18n.setLanguage(newLang);
    }
  };

  // Teenage Engineering / Nothing Mobile Tab Switcher
  window.switchMobileTab = function(tabId) {
    const nav = document.getElementById("mobileTabNav");
    if (nav) {
      const buttons = nav.querySelectorAll(".tab-btn");
      buttons.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    const tabMap = {
      "tab-studio": "tabContentStudio",
      "tab-qr": "tabContentQR"
    };
    if (document.getElementById("tabContentAI")) {
      tabMap["tab-ai"] = "tabContentAI";
    }

    const targetContentId = tabMap[tabId] || "tabContentStudio";
    const sections = document.querySelectorAll(".tab-section");
    sections.forEach(sec => {
      if (sec.id === targetContentId) {
        sec.classList.add("active");
      } else {
        sec.classList.remove("active");
      }
    });

    // Refresh canvas and QR when switching tabs to ensure proper sizing
    if (tabId === "tab-studio" && typeof drawCurve === "function") {
      setTimeout(drawCurve, 50);
    } else if (tabId === "tab-qr" && typeof updateQR === "function") {
      setTimeout(updateQR, 50);
    }
  };

  // -------------------------------------------------------------
  // Motore di Ricerca Rapida e Indicizzazione (Omnisearch)
  // -------------------------------------------------------------
  let searchIndex = [];
  let currentSearchResults = [];
  let activeSearchIdx = -1;

  function normalizeStr(str) {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function buildSearchIndex() {
    const db = window.MUSIC_DATABASE || {};
    searchIndex = [];

    for (const [gKey, gVal] of Object.entries(db)) {
      for (const [subKey, subVal] of Object.entries(gVal.subgenres || {})) {
        // Subgenre entry
        searchIndex.push({
          type: "subgenre",
          title: subVal.label,
          genreKey: gKey,
          subgenreKey: subKey,
          breadcrumb: `${gVal.label}`,
          searchable: normalizeStr(`${subVal.label} ${gVal.label}`)
        });

        for (const [artKey, artVal] of Object.entries(subVal.artists || {})) {
          const albCount = Object.keys(artVal.albums || {}).length;
          // Artist entry
          searchIndex.push({
            type: "artist",
            title: artVal.label,
            genreKey: gKey,
            subgenreKey: subKey,
            artistKey: artKey,
            breadcrumb: `${subVal.label} • ${albCount} Album`,
            searchable: normalizeStr(`${artVal.label} ${subVal.label} ${gVal.label}`)
          });

          for (const [albKey, albVal] of Object.entries(artVal.albums || {})) {
            // Album entry
            searchIndex.push({
              type: "album",
              title: albVal.label,
              genreKey: gKey,
              subgenreKey: subKey,
              artistKey: artKey,
              albumKey: albKey,
              breadcrumb: `${artVal.label} • ${subVal.label}`,
              searchable: normalizeStr(`${albVal.label} ${artVal.label} ${subVal.label} ${gVal.label}`)
            });
          }
        }
      }
    }
  }

  window.onCatalogSearchInput = function(query) {
    const dropdown = document.getElementById("searchDropdown");
    const clearBtn = document.getElementById("searchClearBtn");
    const cleanQuery = query.trim();

    if (clearBtn) clearBtn.style.display = cleanQuery.length > 0 ? "block" : "none";

    if (cleanQuery.length === 0) {
      if (dropdown) dropdown.style.display = "none";
      currentSearchResults = [];
      activeSearchIdx = -1;
      return;
    }

    const normQuery = normalizeStr(cleanQuery);
    const tokens = normQuery.split(/\s+/).filter(t => t.length > 0);

    // Filter index with multi-token match
    currentSearchResults = searchIndex.filter(item => {
      return tokens.every(token => item.searchable.includes(token));
    }).sort((a, b) => {
      // Exact title match priority
      const aTitle = normalizeStr(a.title);
      const bTitle = normalizeStr(b.title);
      const aStarts = aTitle.startsWith(normQuery);
      const bStarts = bTitle.startsWith(normQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Type priority: Album > Artist > Subgenre
      const typePriority = { album: 1, artist: 2, subgenre: 3 };
      if (typePriority[a.type] !== typePriority[b.type]) {
        return typePriority[a.type] - typePriority[b.type];
      }
      return a.title.localeCompare(b.title);
    }).slice(0, 15);

    renderSearchDropdown(cleanQuery);
  };

  function renderSearchDropdown(query) {
    const dropdown = document.getElementById("searchDropdown");
    if (!dropdown) return;

    if (currentSearchResults.length === 0) {
      dropdown.innerHTML = `<div class="search-empty">${t("ui.search_empty")} "<strong>${escapeHtml(query)}</strong>"</div>`;
      dropdown.style.display = "block";
      activeSearchIdx = -1;
      return;
    }

    dropdown.innerHTML = "";
    activeSearchIdx = -1;

    currentSearchResults.forEach((item, idx) => {
      const el = document.createElement("div");
      el.className = "search-item";
      el.id = `search-item-${idx}`;
      
      let badgeClass = "badge-album";
      let badgeText = t("ui.badge_album") || "💿 ALBUM";
      if (item.type === "artist") {
        badgeClass = "badge-artist";
        badgeText = t("ui.badge_artist") || "🎸 BAND";
      } else if (item.type === "subgenre") {
        badgeClass = "badge-subgenre";
        badgeText = t("ui.badge_subgenre") || "🏷️ SOTTOGENERE";
      }

      const highlightedTitle = highlightMatches(item.title, query);

      el.innerHTML = `
        <div class="search-item-info">
          <div class="search-item-title">${highlightedTitle}</div>
          <div class="search-item-sub">${escapeHtml(item.breadcrumb)}</div>
        </div>
        <span class="search-item-badge ${badgeClass}">${badgeText}</span>
      `;

      el.addEventListener("click", () => {
        selectCatalogSearchResult(idx);
      });

      dropdown.appendChild(el);
    });

    dropdown.style.display = "block";
  }

  function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlightMatches(text, query) {
    if (!query) return escapeHtml(text);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return escapeHtml(text).replace(regex, "<mark>$1</mark>");
  }

  window.onCatalogSearchKeyDown = function(e) {
    const dropdown = document.getElementById("searchDropdown");
    if (!dropdown || dropdown.style.display === "none" || currentSearchResults.length === 0) {
      if (e.key === "Escape") clearCatalogSearch();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeSearchIdx = (activeSearchIdx + 1) % currentSearchResults.length;
      updateActiveSearchItem();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeSearchIdx = (activeSearchIdx - 1 + currentSearchResults.length) % currentSearchResults.length;
      updateActiveSearchItem();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSearchIdx >= 0 && activeSearchIdx < currentSearchResults.length) {
        selectCatalogSearchResult(activeSearchIdx);
      } else if (currentSearchResults.length > 0) {
        selectCatalogSearchResult(0);
      }
    } else if (e.key === "Escape") {
      dropdown.style.display = "none";
    }
  };

  function updateActiveSearchItem() {
    currentSearchResults.forEach((_, idx) => {
      const el = document.getElementById(`search-item-${idx}`);
      if (el) {
        if (idx === activeSearchIdx) {
          el.classList.add("active");
          el.scrollIntoView({ block: "nearest" });
        } else {
          el.classList.remove("active");
        }
      }
    });
  }

  window.selectCatalogSearchResult = function(idx) {
    const item = currentSearchResults[idx];
    if (!item) return;

    const input = document.getElementById("catalogSearchInput");
    const dropdown = document.getElementById("searchDropdown");
    if (input) input.value = item.title;
    if (dropdown) dropdown.style.display = "none";

    // Perform cascade synchronization
    if (item.type === "album") {
      selGenre.value = item.genreKey;
      window.onGenreChange();
      selSubgenre.value = item.subgenreKey;
      window.onSubgenreChange();
      selArtist.value = item.artistKey;
      window.onArtistChange();
      selAlbum.value = item.albumKey;
      window.onAlbumChange();
      showToast(t("toasts.loaded_album", { title: item.title }));
    } else if (item.type === "artist") {
      selGenre.value = item.genreKey;
      window.onGenreChange();
      selSubgenre.value = item.subgenreKey;
      window.onSubgenreChange();
      selArtist.value = item.artistKey;
      window.onArtistChange();
      showToast(t("toasts.loaded_artist", { title: item.title }));
    } else if (item.type === "subgenre") {
      selGenre.value = item.genreKey;
      window.onGenreChange();
      selSubgenre.value = item.subgenreKey;
      window.onSubgenreChange();
      showToast(t("toasts.loaded_subgenre", { title: item.title }));
    }
  };

  window.clearCatalogSearch = function() {
    const input = document.getElementById("catalogSearchInput");
    const dropdown = document.getElementById("searchDropdown");
    const clearBtn = document.getElementById("searchClearBtn");

    if (input) {
      input.value = "";
      input.focus();
    }
    if (dropdown) dropdown.style.display = "none";
    if (clearBtn) clearBtn.style.display = "none";
    currentSearchResults = [];
    activeSearchIdx = -1;
  };

  function refreshCascadeLabels() {
    if (selGenre && selGenre.options.length > 0 && selGenre.options[0].value === "") {
      selGenre.options[0].text = t("ui.select_genre");
    }
    if (selSubgenre && selSubgenre.options.length > 0 && selSubgenre.options[0].value === "") {
      selSubgenre.options[0].text = t("ui.select_subgenre");
    }
    if (selArtist && selArtist.options.length > 0 && selArtist.options[0].value === "") {
      selArtist.options[0].text = t("ui.select_artist");
    }
    if (selAlbum && selAlbum.options.length > 0 && selAlbum.options[0].value === "") {
      selAlbum.options[0].text = t("ui.select_album");
    }
    if (selCustomPresets && selCustomPresets.options.length > 0 && selCustomPresets.options[0].value === "") {
      selCustomPresets.options[0].text = t("ui.select_user_preset");
    }
  }

  // -------------------------------------------------------------
  // Catalogo Gerarchico (Cascade dropdowns)
  // -------------------------------------------------------------
  function populateGenres() {
    if (!selGenre) return;
    const db = window.MUSIC_DATABASE || {};
    selGenre.innerHTML = `<option value="">${t("ui.select_genre")}</option>`;
    for (const [key, val] of Object.entries(db)) {
      selGenre.innerHTML += `<option value="${key}">${val.label}</option>`;
    }
  }

  window.onGenreChange = function() {
    const db = window.MUSIC_DATABASE || {};
    const gKey = selGenre.value;
    selSubgenre.innerHTML = `<option value="">${t("ui.select_subgenre")}</option>`;
    selArtist.innerHTML = `<option value="">${t("ui.select_artist")}</option>`;
    selAlbum.innerHTML = `<option value="">${t("ui.select_album")}</option>`;

    if (!gKey || !db[gKey]) return;
    const genre = db[gKey];
    applyEQ(genre.eq);

    for (const [key, val] of Object.entries(genre.subgenres || {})) {
      selSubgenre.innerHTML += `<option value="${key}">${val.label}</option>`;
    }
  };

  window.onSubgenreChange = function() {
    const db = window.MUSIC_DATABASE || {};
    const gKey = selGenre.value;
    const subKey = selSubgenre.value;
    selArtist.innerHTML = `<option value="">${t("ui.select_artist")}</option>`;
    selAlbum.innerHTML = `<option value="">${t("ui.select_album")}</option>`;

    if (!gKey || !db[gKey]) return;
    if (!subKey || !db[gKey].subgenres?.[subKey]) {
      applyEQ(db[gKey].eq);
      return;
    }
    const sub = db[gKey].subgenres[subKey];
    applyEQ(sub.eq);

    for (const [key, val] of Object.entries(sub.artists || {})) {
      selArtist.innerHTML += `<option value="${key}">${val.label}</option>`;
    }
  };

  window.onArtistChange = function() {
    const db = window.MUSIC_DATABASE || {};
    const gKey = selGenre.value;
    const subKey = selSubgenre.value;
    const artKey = selArtist.value;
    selAlbum.innerHTML = `<option value="">${t("ui.select_album")}</option>`;

    if (!gKey || !db[gKey] || !subKey || !db[gKey].subgenres?.[subKey]) return;
    if (!artKey || !db[gKey].subgenres[subKey].artists?.[artKey]) {
      applyEQ(db[gKey].subgenres[subKey].eq);
      return;
    }
    const artist = db[gKey].subgenres[subKey].artists[artKey];
    applyEQ(artist.eq);

    for (const [key, val] of Object.entries(artist.albums || {})) {
      selAlbum.innerHTML += `<option value="${key}">${val.label}</option>`;
    }
  };

  window.onAlbumChange = function() {
    const db = window.MUSIC_DATABASE || {};
    const gKey = selGenre.value;
    const subKey = selSubgenre.value;
    const artKey = selArtist.value;
    const albKey = selAlbum.value;

    if (!gKey || !db[gKey] || !subKey || !db[gKey].subgenres?.[subKey] || !artKey || !db[gKey].subgenres[subKey].artists?.[artKey]) return;
    if (!albKey || !db[gKey].subgenres[subKey].artists[artKey].albums?.[albKey]) {
      applyEQ(db[gKey].subgenres[subKey].artists[artKey].eq);
      return;
    }
    const album = db[gKey].subgenres[subKey].artists[artKey].albums[albKey];
    applyEQ(album.eq);
  };

  function applyEQ(eqObj) {
    if (!eqObj) return;
    currentRawEQ = eqObj;
    const devKey = selDevice ? selDevice.value : (localStorage.getItem("nothing_preferred_device") || "nothing_headphone_1");

    if (profileNameInput) profileNameInput.value = (eqObj.name || "Custom").substring(0, 16);
    if (notesBox) notesBox.innerText = eqObj.notes || "Profilo applicato.";
    
    if (Array.isArray(eqObj.bands)) {
      currentBands = computeCompensatedBands(eqObj.bands, devKey);
    }
    
    saveCurrentState();
    renderBandCards();
    updateQR();
    drawCurve();
  }

  function saveCurrentState() {
    localStorage.setItem("nothing_last_eq_state", JSON.stringify({
      name: profileNameInput ? profileNameInput.value : "Custom",
      notes: notesBox ? notesBox.innerText : "",
      rawEQ: currentRawEQ,
      bands: currentBands
    }));
  }

  // -------------------------------------------------------------
  // Quick Presets
  // -------------------------------------------------------------
  const QUICK_PRESETS = {
    flat: {
      name: "Flat Linear",
      notes: "Risposta piatta e neutrale di riferimento a 0 dB su tutte le 8 bande.",
      bands: BAND_RANGES.map(r => ({ freq: r.default, gain: 0, q: 1.0 }))
    },
    vshape: {
      name: "Rock V-Shape",
      notes: "Profilo V-Shape energico: bassi definiti e acuti vivaci per rock e metal.",
      bands: [
        { freq: 55, gain: 3, q: 1.3 }, { freq: 110, gain: 2, q: 1.2 },
        { freq: 220, gain: 0, q: 1.0 }, { freq: 440, gain: -2, q: 1.3 },
        { freq: 1320, gain: 1, q: 1.3 }, { freq: 3300, gain: 2, q: 1.4 },
        { freq: 6600, gain: 3, q: 1.4 }, { freq: 13200, gain: 2, q: 1.0 }
      ]
    },
    bass: {
      name: "Bass Boost",
      notes: "Enfasi potente su sub-bassi e frequenze di punch (55Hz - 110Hz).",
      bands: [
        { freq: 55, gain: 4, q: 1.3 }, { freq: 110, gain: 3, q: 1.2 },
        { freq: 220, gain: 1, q: 1.0 }, { freq: 440, gain: 0, q: 1.0 },
        { freq: 1320, gain: 0, q: 1.0 }, { freq: 3300, gain: 0, q: 1.0 },
        { freq: 6600, gain: 0, q: 1.0 }, { freq: 13200, gain: 0, q: 1.0 }
      ]
    },
    vocal: {
      name: "Vocal Clarity",
      notes: "Focus sulla gamma media per risaltare voci e strumenti solisti.",
      bands: [
        { freq: 55, gain: -1, q: 1.0 }, { freq: 110, gain: 0, q: 1.0 },
        { freq: 220, gain: 1, q: 1.0 }, { freq: 440, gain: 2, q: 1.2 },
        { freq: 1320, gain: 3, q: 1.3 }, { freq: 3300, gain: 2, q: 1.4 },
        { freq: 6600, gain: 1, q: 1.2 }, { freq: 13200, gain: 0, q: 1.0 }
      ]
    },
    treble: {
      name: "Treble Air",
      notes: "Apertura dell'aria e della brillantezza sui dettagli ad alta frequenza.",
      bands: [
        { freq: 55, gain: 0, q: 1.0 }, { freq: 110, gain: 0, q: 1.0 },
        { freq: 220, gain: 0, q: 1.0 }, { freq: 440, gain: 0, q: 1.0 },
        { freq: 1320, gain: 1, q: 1.2 }, { freq: 3300, gain: 2, q: 1.3 },
        { freq: 6600, gain: 3, q: 1.4 }, { freq: 13200, gain: 4, q: 1.0 }
      ]
    },
    warm: {
      name: "Analog Warmth",
      notes: "Calore analogico: medi rotondi a 110-220Hz e alti vellutati.",
      bands: [
        { freq: 55, gain: 2, q: 1.2 }, { freq: 110, gain: 3, q: 1.1 },
        { freq: 220, gain: 2, q: 1.0 }, { freq: 440, gain: 1, q: 1.0 },
        { freq: 1320, gain: 1, q: 1.2 }, { freq: 3300, gain: 0, q: 1.3 },
        { freq: 6600, gain: 1, q: 1.3 }, { freq: 13200, gain: 2, q: 1.0 }
      ]
    }
  };

  window.applyQuickPreset = function(type) {
    if (QUICK_PRESETS[type]) {
      applyEQ(QUICK_PRESETS[type]);
      showToast(`Preset "${QUICK_PRESETS[type].name}" applicato!`);
    }
  };

  // -------------------------------------------------------------
  // Gestione Preset Utente (LocalStorage)
  // -------------------------------------------------------------
  function getSavedUserPresets() {
    try {
      return JSON.parse(localStorage.getItem("nothing_custom_presets") || "{}");
    } catch {
      return {};
    }
  }

  function loadSavedUserPresetsDropdown() {
    if (!selCustomPresets) return;
    const presets = getSavedUserPresets();
    selCustomPresets.innerHTML = `<option value="">${t("ui.select_user_preset")}</option>`;
    for (const name of Object.keys(presets)) {
      selCustomPresets.innerHTML += `<option value="${name}">${name}</option>`;
    }
  }

  function getRawBandsFromCurrent(bands, devKey) {
    const prof = DEVICE_PROFILES[devKey] || DEVICE_PROFILES.nothing_headphone_1;
    return bands.map((b, i) => {
      const r = BAND_RANGES[i];
      const off = prof.offsets[i] || { dGain: 0, dQ: 0 };
      const f = Number(b.freq) || r.default;
      const g = Math.max(-6, Math.min(6, Math.round((Number(b.gain) || 0) - (off.dGain || 0))));
      const q = Math.max(0.1, Math.min(10.0, Math.round(((Number(b.q) || 1.0) - (off.dQ || 0)) * 10) / 10));
      return {
        freq: Math.max(r.min, Math.min(r.max, Math.round(f))),
        gain: g,
        q: q
      };
    });
  }

  window.saveUserPreset = function() {
    const name = (profileNameInput ? profileNameInput.value : "Custom").trim().substring(0, 16);
    if (!name) {
      alert(t("toasts.enter_preset_name"));
      return;
    }
    const devKey = selDevice ? selDevice.value : (localStorage.getItem("nothing_preferred_device") || "nothing_headphone_1");
    const rawBands = getRawBandsFromCurrent(currentBands, devKey);
    const presets = getSavedUserPresets();
    presets[name] = {
      name: name,
      notes: notesBox ? notesBox.innerText : "Preset salvato dall'utente.",
      bands: rawBands
    };
    localStorage.setItem("nothing_custom_presets", JSON.stringify(presets));
    loadSavedUserPresetsDropdown();
    selCustomPresets.value = name;
    showToast(t("toasts.preset_saved"));
  };

  window.loadUserPreset = function() {
    const name = selCustomPresets.value;
    if (!name) return;
    const presets = getSavedUserPresets();
    if (presets[name]) {
      applyEQ(presets[name]);
      showToast(t("toasts.loaded_album", { title: name }));
    }
  };

  window.deleteUserPreset = function() {
    const name = selCustomPresets.value;
    if (!name) return;
    const presets = getSavedUserPresets();
    delete presets[name];
    localStorage.setItem("nothing_custom_presets", JSON.stringify(presets));
    loadSavedUserPresetsDropdown();
    showToast(t("toasts.preset_deleted"));
  };

  // -------------------------------------------------------------
  // AI Engine (Multi-Provider: Gemini, OpenAI, Groq, DeepSeek, Claude, OpenRouter, Local)
  // -------------------------------------------------------------
  const PROVIDER_METADATA = {
    gemini: {
      name: "Google Gemini",
      placeholder: "Gemini API Key (salvata automaticamente in locale)",
      needsKey: true
    },
    openai: {
      name: "OpenAI",
      placeholder: "OpenAI API Key (sk-..., salvata in locale)",
      needsKey: true
    },
    groq: {
      name: "Groq",
      placeholder: "Groq API Key (gsk_..., ultra-veloce)",
      needsKey: true
    },
    deepseek: {
      name: "DeepSeek",
      placeholder: "DeepSeek API Key (sk-..., salvata in locale)",
      needsKey: true
    },
    claude: {
      name: "Anthropic Claude",
      placeholder: "Anthropic API Key (sk-ant-..., salvata in locale)",
      needsKey: true
    },
    openrouter: {
      name: "OpenRouter",
      placeholder: "OpenRouter API Key (sk-or-..., salvata in locale)",
      needsKey: true
    },
    local: {
      name: "Ollama / Server Locale",
      placeholder: "Opzionale (se autenticato)",
      needsKey: false
    }
  };

  function loadSavedAIConfig() {
    if (!document.getElementById("aiProvider")) return;
    const provider = localStorage.getItem("nothing_ai_provider") || "gemini";
    if (aiProviderSelect) aiProviderSelect.value = provider;

    updateAIProviderUI(provider);
  }

  function updateAIProviderUI(provider) {
    const meta = PROVIDER_METADATA[provider] || PROVIDER_METADATA.gemini;
    if (aiKeyInput) {
      aiKeyInput.placeholder = meta.placeholder;
      
      // 1. If vault is unlocked, take key from memory RAM
      if (unlockedVaultKeys && unlockedVaultKeys[provider]) {
        aiKeyInput.value = unlockedVaultKeys[provider];
      } else {
        // 2. Otherwise fall back to local storage
        let savedKey = localStorage.getItem(`nothing_api_key_${provider}`) || "";
        if (!savedKey && provider === "gemini") {
          savedKey = localStorage.getItem("nothing_gemini_api_key") || "";
        }
        aiKeyInput.value = savedKey;
      }
      aiKeyInput.style.display = provider === "local" ? "none" : "block";
    }

    if (aiCustomUrlInput) {
      aiCustomUrlInput.style.display = provider === "local" ? "block" : "none";
      aiCustomUrlInput.value = localStorage.getItem("nothing_custom_ai_url") || "http://localhost:11434/v1/chat/completions";
    }

    updateVaultStatusUI();
  }

  window.onAIProviderChange = function() {
    const provider = aiProviderSelect ? aiProviderSelect.value : "gemini";
    localStorage.setItem("nothing_ai_provider", provider);
    updateAIProviderUI(provider);
  };

  window.saveApiKey = function() {
    const provider = aiProviderSelect ? aiProviderSelect.value : "gemini";
    if (aiKeyInput) {
      const val = aiKeyInput.value.trim();
      localStorage.setItem(`nothing_api_key_${provider}`, val);
      if (provider === "gemini") {
        localStorage.setItem("nothing_gemini_api_key", val);
      }
      if (unlockedVaultKeys) {
        unlockedVaultKeys[provider] = val;
      }
    }
  };

  window.saveCustomUrl = function() {
    if (aiCustomUrlInput) {
      localStorage.setItem("nothing_custom_ai_url", aiCustomUrlInput.value.trim());
    }
  };

  window.askAI = async function() {
    const prompt = aiPromptInput ? aiPromptInput.value.trim() : "";
    const provider = aiProviderSelect ? aiProviderSelect.value : "gemini";
    const key = aiKeyInput ? aiKeyInput.value.trim() : "";
    const customUrl = aiCustomUrlInput ? aiCustomUrlInput.value.trim() : "";
    const meta = PROVIDER_METADATA[provider] || PROVIDER_METADATA.gemini;

    if (!prompt) {
      alert("Inserisci una descrizione dell'album, artista o mix desiderato.");
      if (aiPromptInput) aiPromptInput.focus();
      return;
    }
    if (meta.needsKey && !key) {
      alert(`Inserisci la tua chiave API per ${meta.name} (oppure sblocca il Vault).`);
      if (aiKeyInput) aiKeyInput.focus();
      return;
    }

    if (btnAI) btnAI.disabled = true;
    if (aiBtnText) aiBtnText.innerText = "Elaborazione...";
    if (notesBox) notesBox.innerText = `L'Ingegnere del Suono AI (${meta.name}) sta calcolando l'equalizzazione...`;

    try {
      const devKey = selDevice ? selDevice.value : (localStorage.getItem("nothing_preferred_device") || "nothing_headphone_1");
      const devName = DEVICE_PROFILES[devKey]?.name || "Nothing HeadPhone (1)";
      const res = await window.generateAIProfile(prompt, key, devName, provider, customUrl);
      applyEQ(res);
      showToast(`Equalizzazione generata con successo (${meta.name})!`);
    } catch (err) {
      alert(`Errore AI: ${err.message}`);
      if (notesBox) notesBox.innerText = `Errore durante l'elaborazione AI (${meta.name}): ${err.message}`;
    } finally {
      if (btnAI) btnAI.disabled = false;
      if (aiBtnText) aiBtnText.innerText = "Genera con AI";
    }
  };

  // -------------------------------------------------------------
  // Encrypted Vault Controller (AES-GCM 256-bit + PBKDF2)
  // -------------------------------------------------------------
  let unlockedVaultKeys = null;

  function getActiveVaultObject() {
    const localSaved = localStorage.getItem("nothing_encrypted_vault");
    if (localSaved) {
      try { return JSON.parse(localSaved); } catch { /* ignore parse error */ }
    }
    if (window.ENCRYPTED_VAULT && typeof window.ENCRYPTED_VAULT === "object" && window.ENCRYPTED_VAULT.ciphertext) {
      return window.ENCRYPTED_VAULT;
    }
    return null;
  }

  function updateVaultStatusUI() {
    const badge = document.getElementById("vaultStatusBadge");
    if (!badge) return;
    const text = document.getElementById("vaultStatusText");
    const btnUnlock = document.getElementById("btnUnlockVault");
    const btnCreate = document.getElementById("btnCreateVault");
    const btnLock = document.getElementById("btnLockVault");
    const vaultObj = getActiveVaultObject();

    if (unlockedVaultKeys) {
      if (badge) {
        badge.innerText = t("ui.vault_badge_unlocked");
        badge.style.background = "rgba(0, 230, 118, 0.15)";
        badge.style.color = "var(--success)";
        badge.style.borderColor = "var(--success)";
      }
      if (text) text.innerText = t("ui.vault_status_unlocked");
      if (btnUnlock) btnUnlock.style.display = "none";
      if (btnLock) btnLock.style.display = "inline-flex";
      if (btnCreate) btnCreate.innerText = t("ui.btn_create_vault");
    } else if (vaultObj) {
      if (badge) {
        badge.innerText = t("ui.vault_badge_locked");
        badge.style.background = "#1c1c24";
        badge.style.color = "var(--accent)";
        badge.style.borderColor = "var(--accent)";
      }
      if (text) text.innerText = t("ui.vault_status_locked");
      if (btnUnlock) btnUnlock.style.display = "inline-flex";
      if (btnLock) btnLock.style.display = "none";
      if (btnCreate) btnCreate.innerText = t("ui.btn_create_vault");
    } else {
      if (badge) {
        badge.innerText = t("ui.vault_badge_none");
        badge.style.background = "#18181f";
        badge.style.color = "var(--text-muted)";
        badge.style.borderColor = "#2c2c38";
      }
      if (text) text.innerText = t("ui.vault_status_none");
      if (btnUnlock) btnUnlock.style.display = "none";
      if (btnLock) btnLock.style.display = "none";
      if (btnCreate) btnCreate.innerText = t("ui.btn_create_vault");
    }
  }

  window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("active");
  };

  window.openUnlockVaultModal = function() {
    const modal = document.getElementById("modalUnlockVault");
    const input = document.getElementById("unlockPassword");
    const err = document.getElementById("unlockError");
    if (err) err.style.display = "none";
    if (input) input.value = "";
    if (modal) modal.classList.add("active");
    if (input) setTimeout(() => input.focus(), 100);
  };

  window.confirmUnlockVault = async function() {
    const pwd = document.getElementById("unlockPassword")?.value || "";
    const err = document.getElementById("unlockError");
    const vaultObj = getActiveVaultObject();

    if (!vaultObj) {
      if (err) { err.innerText = t("vault.err_pwd_wrong"); err.style.display = "block"; }
      return;
    }

    try {
      unlockedVaultKeys = await window.CryptoVault.decryptVault(vaultObj, pwd);
      closeModal("modalUnlockVault");
      
      // Populate current provider key from decrypted vault
      const provider = aiProviderSelect ? aiProviderSelect.value : "gemini";
      if (unlockedVaultKeys[provider] && aiKeyInput) {
        aiKeyInput.value = unlockedVaultKeys[provider];
      }

      updateVaultStatusUI();
      showToast(t("toasts.vault_unlocked"));
    } catch (e) {
      if (err) {
        err.innerText = t("vault.err_pwd_wrong");
        err.style.display = "block";
      }
    }
  };

  window.lockVault = function() {
    unlockedVaultKeys = null;
    if (aiKeyInput) aiKeyInput.value = "";
    updateVaultStatusUI();
    showToast(t("toasts.vault_locked"));
  };

  window.openCreateVaultModal = function() {
    const modal = document.getElementById("modalCreateVault");
    const pwd = document.getElementById("createPassword");
    const pwdConfirm = document.getElementById("createPasswordConfirm");
    const err = document.getElementById("createVaultError");
    if (err) err.style.display = "none";
    if (pwd) pwd.value = "";
    if (pwdConfirm) pwdConfirm.value = "";
    if (modal) modal.classList.add("active");
    if (pwd) setTimeout(() => pwd.focus(), 100);
  };

  window.confirmCreateVault = async function() {
    const pwd = document.getElementById("createPassword")?.value || "";
    const pwdConfirm = document.getElementById("createPasswordConfirm")?.value || "";
    const err = document.getElementById("createVaultError");

    if (!pwd || pwd.length < 4) {
      if (err) { err.innerText = t("vault.err_pwd_short"); err.style.display = "block"; }
      return;
    }
    if (pwd !== pwdConfirm) {
      if (err) { err.innerText = t("vault.err_pwd_mismatch"); err.style.display = "block"; }
      return;
    }

    // Collect all known keys
    const currentProvider = aiProviderSelect ? aiProviderSelect.value : "gemini";
    const keysObj = unlockedVaultKeys ? { ...unlockedVaultKeys } : {};
    
    // Supplement from localStorage or current input
    const providersList = ["gemini", "openai", "groq", "deepseek", "claude", "openrouter"];
    providersList.forEach(p => {
      const k = localStorage.getItem(`nothing_api_key_${p}`) || (p === "gemini" ? localStorage.getItem("nothing_gemini_api_key") : "");
      if (k) keysObj[p] = k;
    });
    if (aiKeyInput && aiKeyInput.value.trim()) {
      keysObj[currentProvider] = aiKeyInput.value.trim();
    }

    if (Object.keys(keysObj).length === 0) {
      if (err) { err.innerText = t("vault.err_pwd_empty"); err.style.display = "block"; }
      return;
    }

    try {
      const encryptedVault = await window.CryptoVault.encryptVault(keysObj, pwd);
      
      // 1. Save to localStorage for normal sessions
      localStorage.setItem("nothing_encrypted_vault", JSON.stringify(encryptedVault));
      
      // 2. Set to window.ENCRYPTED_VAULT for immediate use
      window.ENCRYPTED_VAULT = encryptedVault;
      unlockedVaultKeys = keysObj;

      // 3. Trigger download of updated vault.js for Incognito mode
      const vaultJsContent = `// js/vault.js - Encrypted Keys Vault (AES-GCM-256)\n// This file stores NO PLAINTEXT KEYS. It contains only cryptographically authenticated ciphertext.\nwindow.ENCRYPTED_VAULT = ${JSON.stringify(encryptedVault, null, 2)};\n`;
      const blob = new Blob([vaultJsContent], { type: "application/javascript" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "vault.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      closeModal("modalCreateVault");
      updateVaultStatusUI();
      showToast(t("toasts.vault_created"));
    } catch (e) {
      if (err) {
        err.innerText = e.message || "Errore durante la cifratura.";
        err.style.display = "block";
      }
    }
  };

  // -------------------------------------------------------------
  // Rendering Card Bande
  // -------------------------------------------------------------
  function renderBandCards() {
    const container = document.getElementById("bandsContainer");
    if (!container) return;
    container.innerHTML = "";

    currentBands.forEach((b, i) => {
      const range = BAND_RANGES[i];
      const card = document.createElement("div");
      card.className = "band-card";
      
      const gainVal = Math.round(b.gain);
      const gainClass = gainVal > 0 ? "pos" : (gainVal < 0 ? "neg" : "zero");
      const gainText = gainVal > 0 ? `+${gainVal} dB` : (gainVal === 0 ? "0 dB" : `${gainVal} dB`);
      
      const progress = Math.max(0, Math.min(100, ((gainVal + 6) / 12) * 100));

      card.innerHTML = `
        <div class="band-tag">BANDA ${i + 1}</div>
        
        <div class="freq-input-wrap">
          <input type="number" class="freq-input" id="freq-input-${i}" 
                 value="${b.freq}" 
                 min="${range.min}" 
                 max="${range.max}" 
                 step="1" 
                 title="Range consentito: da ${range.min} Hz a ${range.max} Hz"
                 oninput="validateFreqInput(${i}, this)" 
                 onchange="changeFreq(${i}, this.value)">
        </div>
        
        <div class="gain-display ${gainClass}" id="glabel-${i}">${gainText}</div>
        
        <div class="slider-container">
          <input type="range" class="band-slider" id="slider-${i}" min="-6" max="6" step="1" value="${gainVal}" style="--progress: ${progress}%;" oninput="changeGain(${i}, this.value)">
        </div>

        <div class="q-tag-container">
          <button class="q-mini-btn" onclick="adjustQ(${i}, -0.1)" title="-0.1 Q (Min: 0.1)">-</button>
          <span class="q-label" id="qlabel-${i}" title="Fattore Q (da 0.1 a 10.0)">Q: ${b.q.toFixed(1)}</span>
          <button class="q-mini-btn" onclick="adjustQ(${i}, 0.1)" title="+0.1 Q (Max: 10.0)">+</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  window.onProfileNameChange = function() {
    saveCurrentState();
    updateQR();
  };

  window.validateFreqInput = function(idx, inputElem) {
    const range = BAND_RANGES[idx];
    let val = parseInt(inputElem.value);
    if (!isNaN(val)) {
      if (val > range.max) {
        val = range.max;
        inputElem.value = val;
      }
      currentBands[idx].freq = Math.max(range.min, Math.min(range.max, val));
      saveCurrentState();
      updateQR();
      drawCurve();
    }
  };

  window.changeFreq = function(idx, val) {
    const range = BAND_RANGES[idx];
    let f = parseInt(val);
    if (isNaN(f) || f < range.min) f = range.min;
    if (f > range.max) f = range.max;
    
    currentBands[idx].freq = f;
    const input = document.getElementById(`freq-input-${idx}`);
    if (input) input.value = f;

    saveCurrentState();
    updateQR();
    drawCurve();
  };

  window.changeGain = function(idx, val) {
    const g = parseInt(val);
    currentBands[idx].gain = Math.max(-6, Math.min(6, g));
    
    updateBandCardGainUI(idx);
    saveCurrentState();
    updateQR();
    drawCurve();
  };

  function updateBandCardGainUI(idx) {
    const g = Math.round(currentBands[idx].gain);
    const label = document.getElementById(`glabel-${idx}`);
    if (label) {
      label.innerText = g > 0 ? `+${g} dB` : (g === 0 ? "0 dB" : `${g} dB`);
      label.className = "gain-display " + (g > 0 ? "pos" : (g < 0 ? "neg" : "zero"));
    }

    const slider = document.getElementById(`slider-${idx}`);
    if (slider) {
      slider.value = g;
      const progress = Math.max(0, Math.min(100, ((g + 6) / 12) * 100));
      slider.style.setProperty("--progress", `${progress}%`);
    }
  }

  window.adjustQ = function(idx, delta) {
    let newQ = Math.round((currentBands[idx].q + delta) * 10) / 10;
    if (newQ < 0.1) newQ = 0.1;
    if (newQ > 10.0) newQ = 10.0;
    currentBands[idx].q = newQ;
    const label = document.getElementById(`qlabel-${idx}`);
    if (label) label.innerText = `Q: ${newQ.toFixed(1)}`;
    saveCurrentState();
    updateQR();
    drawCurve();
  };

  // -------------------------------------------------------------
  // Disegna il logo mixer stilizzato Nothing dell'app (icona ufficiale) al centro del QR con perfetta simmetria a 9 barre
  // -------------------------------------------------------------
  function drawMixerBadge(ctx, cx, cy, radius) {
    ctx.save();

    // 1. Anello isolante bianco polarizzato
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // 2. Base circolare scura obsidian
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0c0c10";
    ctx.fill();

    // 3. Cornice circolare tecnica di precisione
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#252534";
    ctx.stroke();

    // 4. Le 9 barre verticali con perfetta simmetria speculare (asse centrale su barra 5)
    const mixerBars = [
      { h: 120, fill: "#ffffff" },
      { h: 200, fill: "#d4d4dc" },
      { h: 260, fill: "#eb0029" }, // Picco Nothing Red sinistro
      { h: 160, fill: "#b0b0bc" },
      { h: 100, fill: "#ffffff" }, // Centro esatto di simmetria
      { h: 160, fill: "#b0b0bc" },
      { h: 260, fill: "#eb0029" }, // Picco Nothing Red destro specchiato
      { h: 200, fill: "#d4d4dc" },
      { h: 120, fill: "#ffffff" }
    ];

    const targetW = radius * 1.34;
    const barPitch = targetW / 8; // 8 intervalli per 9 barre
    const bw = Math.max(1.8, barPitch * 0.55);
    const startX = cx - (targetW / 2);

    mixerBars.forEach((bar, idx) => {
      const bh = (bar.h / 280) * (radius * 1.25);
      const bx = (idx === 4) ? (cx - (bw / 2)) : (startX + (idx * barPitch) - (bw / 2));
      const by = cy - (bh / 2);
      const br = bw / 2;

      ctx.fillStyle = bar.fill;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(bx, by, bw, bh, br);
      } else {
        ctx.rect(bx, by, bw, bh);
      }
      ctx.fill();
    });

    ctx.restore();
  }

  // -------------------------------------------------------------
  // Live QR Code Generation
  // -------------------------------------------------------------
  window.updateQR = function() {
    const container = document.getElementById("qrcode");
    if (!container || typeof window.generateNothingXQR !== "function") return;
    
    const pName = profileNameInput ? profileNameInput.value : "Custom";
    const b64 = window.generateNothingXQR(currentBands, pName);
    container.innerHTML = "";
    
    const qrSize = 220;
    new QRCode(container, {
      text: b64,
      width: qrSize,
      height: qrSize,
      colorDark: "#0d0d12",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

  // Post-process canvas to add Teenage Engineering / Nothing OS central mixer badge
  setTimeout(() => {
    const canvas = container.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const badgeR = Math.round(w * 0.11); // ~24px

    drawMixerBadge(ctx, cx, cy, badgeR);

    // Update img fallback if present
    const img = container.querySelector("img");
    if (img) {
      try {
        img.src = canvas.toDataURL("image/png");
      } catch (e) {}
    }
  }, 25);

    // Sync card footer labels
    const cardPreset = document.getElementById("qrCardPresetName");
    if (cardPreset) {
      cardPreset.textContent = pName || "Custom";
    }
    const cardDevice = document.getElementById("qrCardDevice");
    if (cardDevice && selDevice) {
      const devKey = selDevice.value;
      const devName = DEVICE_PROFILES[devKey]?.name || "Nothing HeadPhone (1)";
      cardDevice.textContent = devName;
    }
  };

  window.copyBase64Payload = function() {
    const pName = profileNameInput ? profileNameInput.value : "Custom";
    const b64 = window.generateNothingXQR(currentBands, pName);
    navigator.clipboard.writeText(b64).then(() => {
      showToast(t("toasts.payload_copied"));
    }).catch(() => {
      prompt("Copia la stringa Base64 Nothing X:", b64);
    });
  };

  function getQRDataUrl() {
    const container = document.getElementById("qrcode");
    if (!container) return null;

    const qrCanvas = container.querySelector("canvas");
    if (!qrCanvas || qrCanvas.width === 0) {
      const img = container.querySelector("img");
      if (img && img.src && img.src.startsWith("data:image/")) {
        return img.src;
      }
      return null;
    }

    // Build the high-definition Nothing OS Audio Card (Teenage Engineering Style)
    try {
      const cardW = 480;
      const cardH = 580;
      const cardCanvas = document.createElement("canvas");
      cardCanvas.width = cardW;
      cardCanvas.height = cardH;
      const ctx = cardCanvas.getContext("2d");
      if (!ctx) return qrCanvas.toDataURL("image/png");

      // 1. Dark chassis background
      ctx.fillStyle = "#0c0c10";
      ctx.fillRect(0, 0, cardW, cardH);

      const grad = ctx.createLinearGradient(0, 0, cardW, cardH);
      grad.addColorStop(0, "rgba(25, 25, 34, 0.7)");
      grad.addColorStop(1, "rgba(10, 10, 14, 0.98)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cardW, cardH);

      // Chassis outer border
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#252532";
      ctx.strokeRect(10, 10, cardW - 20, cardH - 20);

      // Technical inner line
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.strokeRect(16, 16, cardW - 32, cardH - 32);

      // 2. Header: Nothing Red Dot + Title
      const hDotX = 36;
      const hDotY = 46;
      ctx.beginPath();
      ctx.arc(hDotX, hDotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#eb0029";
      ctx.shadowColor = "#eb0029";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "1.5px";
      ctx.fillText("SOUND STUDIO (1) PRO", 52, 46);

      ctx.fillStyle = "#eb0029";
      ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("NOTHING X • PEQ", cardW - 36, 46);

      // Divider below header
      ctx.strokeStyle = "#202028";
      ctx.beginPath();
      ctx.moveTo(24, 68);
      ctx.lineTo(cardW - 24, 68);
      ctx.stroke();

      // 3. White Polarized QR Code Frame with Teenage Engineering corner crosshairs
      const frameX = 80;
      const frameY = 95;
      const frameSize = 320;
      const pad = 16;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(frameX, frameY, frameSize, frameSize);

      ctx.drawImage(qrCanvas, frameX + pad, frameY + pad, frameSize - (pad * 2), frameSize - (pad * 2));

      // Draw high-res mixer badge in center of QR frame
      drawMixerBadge(ctx, frameX + (frameSize / 2), frameY + (frameSize / 2), Math.round((frameSize - (pad * 2)) * 0.11));

      // Technical crosshairs
      ctx.strokeStyle = "#eb0029";
      ctx.lineWidth = 1.5;
      const chLen = 8;
      // TL
      ctx.beginPath(); ctx.moveTo(frameX - 6, frameY - 6); ctx.lineTo(frameX - 6 + chLen, frameY - 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(frameX - 6, frameY - 6); ctx.lineTo(frameX - 6, frameY - 6 + chLen); ctx.stroke();
      // TR
      ctx.beginPath(); ctx.moveTo(frameX + frameSize + 6, frameY - 6); ctx.lineTo(frameX + frameSize + 6 - chLen, frameY - 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(frameX + frameSize + 6, frameY - 6); ctx.lineTo(frameX + frameSize + 6, frameY - 6 + chLen); ctx.stroke();
      // BL
      ctx.beginPath(); ctx.moveTo(frameX - 6, frameY + frameSize + 6); ctx.lineTo(frameX - 6 + chLen, frameY + frameSize + 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(frameX - 6, frameY + frameSize + 6); ctx.lineTo(frameX - 6, frameY + frameSize + 6 - chLen); ctx.stroke();
      // BR
      ctx.beginPath(); ctx.moveTo(frameX + frameSize + 6, frameY + frameSize + 6); ctx.lineTo(frameX + frameSize + 6 - chLen, frameY + frameSize + 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(frameX + frameSize + 6, frameY + frameSize + 6); ctx.lineTo(frameX + frameSize + 6, frameY + frameSize + 6 - chLen); ctx.stroke();

      // 4. Card Footer: Preset Name & Device
      const pName = profileNameInput ? profileNameInput.value.trim() : "Custom";
      const devKey = selDevice ? selDevice.value : "nothing_headphone_1";
      const devName = DEVICE_PROFILES[devKey]?.name || "Nothing HeadPhone (1)";

      ctx.strokeStyle = "#202028";
      ctx.beginPath();
      ctx.moveTo(24, 450);
      ctx.lineTo(cardW - 24, 450);
      ctx.stroke();

      ctx.fillStyle = "#71717a";
      ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("PRESET:", 36, 476);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(pName || "Custom", 96, 476);

      ctx.fillStyle = "#71717a";
      ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("CALIBRATION:", 36, 506);

      ctx.fillStyle = "#eb0029";
      ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(devName, 130, 506);

      ctx.fillStyle = "#52525b";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("PARAMETRIC EQ & DISCOGRAPHY ENGINE • 8-BAND BIQUAD", cardW / 2, 545);

      return cardCanvas.toDataURL("image/png");
    } catch (e) {
      console.warn("Card composition fallback:", e);
      return qrCanvas.toDataURL("image/png");
    }
  }

  window.downloadQRCode = async function() {
    const dataUrl = getQRDataUrl();

    if (!dataUrl) {
      showToast(t("toasts.need_generate_eq"));
      return;
    }

    const pName = profileNameInput ? profileNameInput.value.trim() : "Custom";
    const safeName = (pName || "Custom").replace(/[^\w\s-]/gi, "").replace(/\s+/g, "_");
    const fileName = `SoundStudio1Pro_PEQ_${safeName}.png`;

    // 1. Android Native Bridge (Android Studio / APK)
    if (window.AndroidApp && typeof window.AndroidApp.saveImageToGallery === "function") {
      try {
        window.AndroidApp.saveImageToGallery(dataUrl, fileName);
        return; // Toast is handled natively by MainActivity
      } catch (err) {
        console.error("Native AndroidApp save error:", err);
      }
    }

    // 2. Mobile Browser & PWA: Blob Object URL (bypasses Chromium data URL sandbox restrictions)
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        if (link.parentNode) {
          document.body.removeChild(link);
        }
        URL.revokeObjectURL(blobUrl);
      }, 1500);

      showToast(t("toasts.qr_saved"));
    } catch (err) {
      console.warn("Blob download failed, attempting standard link click:", err);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.target = "_blank";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) document.body.removeChild(link);
      }, 1500);
      showToast(t("toasts.qr_saved"));
    }
  };

  window.shareQRCode = async function() {
    const dataUrl = getQRDataUrl();

    if (!dataUrl) {
      showToast(t("toasts.need_generate_eq"));
      return;
    }

    const pName = profileNameInput ? profileNameInput.value.trim() : "Custom";
    const safeName = (pName || "Custom").replace(/[^\w\s-]/gi, "").replace(/\s+/g, "_");
    const fileName = `SoundStudio1Pro_PEQ_${safeName}.png`;
    const shareTitle = `Sound Studio (1) Pro: ${pName}`;

    // 1. Android Native Bridge
    if (window.AndroidApp && typeof window.AndroidApp.shareImage === "function") {
      try {
        window.AndroidApp.shareImage(dataUrl, shareTitle);
        return;
      } catch (err) {
        console.error("Native AndroidApp share error:", err);
      }
    }

    // 2. Web Share API Level 2 (supports file sharing)
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: shareTitle,
          text: `Nothing X PEQ: ${pName}`
        });
        showToast(t("toasts.share_done"));
      } else if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: `Nothing X PEQ: ${pName}`
        });
        showToast(t("toasts.share_done"));
      } else {
        window.downloadQRCode();
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("Share fallback to download:", err);
        window.downloadQRCode();
      }
    }
  };

  window.openNothingX = function() {
    // 1. Bridge nativo Android APK
    if (window.AndroidApp && typeof window.AndroidApp.openNothingXApp === "function") {
      try {
        const launched = window.AndroidApp.openNothingXApp();
        if (launched) {
          showToast(t("toasts.nothing_x_opening") || "Apertura Nothing X...");
          return;
        }
      } catch (err) {
        console.error("Native openNothingXApp error:", err);
      }
    }

    // 2. Mobile Browser intent fallback su Android
    if (/android/i.test(navigator.userAgent)) {
      showToast(t("toasts.nothing_x_opening") || "Apertura Nothing X...");
      const intentUrl = "intent://#Intent;package=com.nothing.smartcenter;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end";
      window.location.href = intentUrl;
      setTimeout(() => {
        window.open("https://play.google.com/store/apps/details?id=com.nothing.smartcenter", "_blank");
      }, 1800);
    } else {
      window.open("https://play.google.com/store/apps/details?id=com.nothing.smartcenter", "_blank");
    }
  };

  // -------------------------------------------------------------
  // Canvas Curve Visualizer & Interactive Drag
  // -------------------------------------------------------------
  function drawCurve() {
    if (!curveCanvas) return;
    const canvas = curveCanvas;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const midY = h / 2;

    ctx.clearRect(0, 0, w, h);

    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    // Dotted horizontal guide lines
    ctx.strokeStyle = isLight ? "#dcdce4" : "#25252c";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(10, 14); ctx.lineTo(w - 10, 14);
    ctx.moveTo(10, midY); ctx.lineTo(w - 10, midY);
    ctx.moveTo(10, h - 14); ctx.lineTo(w - 10, h - 14);
    ctx.stroke();
    ctx.setLineDash([]);

    // Curve calculation
    ctx.strokeStyle = "#eb0029";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const minLog = Math.log10(20);
    const maxLog = Math.log10(20000);

    for (let px = 0; px < w; px++) {
      const f = Math.pow(10, minLog + (px / w) * (maxLog - minLog));
      let totalGain = 0;

      currentBands.forEach(b => {
        const bandwidth = 1.0 / b.q;
        const diff = Math.log2(f / b.freq);
        totalGain += b.gain * Math.exp(-0.5 * Math.pow(diff / (bandwidth * 0.7), 2));
      });

      const py = midY - (totalGain / 6) * (midY - 14);
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Band node points with high-contrast ring
    currentBands.forEach((b, idx) => {
      const logF = Math.log10(Math.max(20, Math.min(20000, b.freq)));
      const px = ((logF - minLog) / (maxLog - minLog)) * w;
      const py = midY - (b.gain / 6) * (midY - 14);

      const isDragging = (idx === draggingBandIdx);
      const nodeRadius = isDragging ? 6 : 4.5;

      ctx.fillStyle = isDragging ? "#eb0029" : (isLight ? "#0c0c10" : "#ffffff");
      ctx.beginPath();
      ctx.arc(px, py, nodeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer contrasting contour
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isDragging ? "#ffffff" : (isLight ? "#ffffff" : "#0c0c10");
      ctx.stroke();
    });
  }

  function getCanvasCoords(e) {
    const rect = curveCanvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
      w: rect.width,
      h: rect.height
    };
  }

  function onCanvasPointerDown(e) {
    const coords = getCanvasCoords(e);
    const minLog = Math.log10(20);
    const maxLog = Math.log10(20000);
    const midY = coords.h / 2;

    let closestIdx = -1;
    let minDistance = 28;

    currentBands.forEach((b, idx) => {
      const logF = Math.log10(Math.max(20, Math.min(20000, b.freq)));
      const px = ((logF - minLog) / (maxLog - minLog)) * coords.w;
      const py = midY - (b.gain / 6) * (midY - 14);
      const dist = Math.hypot(coords.x - px, coords.y - py);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== -1) {
      draggingBandIdx = closestIdx;
      curveCanvas.setPointerCapture(e.pointerId);
      handlePointerDrag(coords);
    }
  }

  function onCanvasPointerMove(e) {
    if (draggingBandIdx === -1) return;
    const coords = getCanvasCoords(e);
    handlePointerDrag(coords);
  }

  function onCanvasPointerUp(e) {
    if (draggingBandIdx !== -1) {
      draggingBandIdx = -1;
      saveCurrentState();
      renderBandCards();
      updateQR();
      drawCurve();
    }
  }

  function handlePointerDrag(coords) {
    if (draggingBandIdx === -1) return;

    const range = BAND_RANGES[draggingBandIdx];
    const minLog = Math.log10(20);
    const maxLog = Math.log10(20000);
    const midY = coords.h / 2;

    const clampedX = Math.max(0, Math.min(coords.w, coords.x));
    const logF = minLog + (clampedX / coords.w) * (maxLog - minLog);
    let freq = Math.round(Math.pow(10, logF));
    freq = Math.max(range.min, Math.min(range.max, freq));

    const clampedY = Math.max(14, Math.min(coords.h - 14, coords.y));
    let gain = Math.round(((midY - clampedY) / (midY - 14)) * 6);
    gain = Math.max(-6, Math.min(6, gain));

    currentBands[draggingBandIdx].freq = freq;
    currentBands[draggingBandIdx].gain = gain;

    const freqInput = document.getElementById(`freq-input-${draggingBandIdx}`);
    if (freqInput) freqInput.value = freq;
    updateBandCardGainUI(draggingBandIdx);

    updateQR();
    drawCurve();
  }

  // -------------------------------------------------------------
  // Toast Utility
  // -------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMsg");
    if (!toast || !toastMsg) return;
    toastMsg.innerText = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Initial trigger
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();