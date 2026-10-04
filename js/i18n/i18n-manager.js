// js/i18n/i18n-manager.js - Modular OOP Internationalization Engine
(function() {
  class I18nManager {
    constructor() {
      this._locales = new Map();
      this._fallbackLang = "en";
      this._currentLang = "en";
      this._subscribers = [];
      this._initialized = false;
    }

    /**
     * Registers a modular locale dictionary
     * @param {string} code - ISO language code (e.g. 'it', 'en', 'fr')
     * @param {Object} dict - Dictionary object containing meta, ui, hardware, vault, toasts
     */
    registerLocale(code, dict) {
      if (!code || !dict) return;
      const cleanCode = code.toLowerCase().trim();
      this._locales.set(cleanCode, dict);
      
      // If already initialized and registering current language, re-apply
      if (this._initialized && cleanCode === this._currentLang) {
        this.applyDOM();
        this._notifySubscribers(this._currentLang);
      }
    }

    /**
     * Returns list of registered languages with metadata
     * @returns {Array<{code: string, name: string, flag: string, dir: string}>}
     */
    getAvailableLanguages() {
      const list = [];
      for (const [code, dict] of this._locales.entries()) {
        const meta = dict.meta || {};
        list.push({
          code: code,
          name: meta.name || code.toUpperCase(),
          flag: meta.flag || "🌐",
          dir: meta.dir || "ltr"
        });
      }
      return list;
    }

    /**
     * Detects system/browser language matching registered locales
     * @returns {string} Detected language code
     */
    detectSystemLanguage() {
      const navLangs = (typeof navigator !== "undefined" && navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [(typeof navigator !== "undefined" && navigator.language) ? navigator.language : "en"];

      for (const raw of navLangs) {
        if (!raw) continue;
        const normalized = raw.toLowerCase().trim();
        const primary = normalized.split("-")[0]; // "it-IT" -> "it", "zh-CN" -> "zh"

        if (this._locales.has(primary)) {
          return primary;
        }
      }

      // If user language is Italian or Italian variant
      if (navLangs.some(l => (l || "").toLowerCase().startsWith("it"))) {
        return "it";
      }

      return this._fallbackLang;
    }

    /**
     * Initializes language preference (saved localStorage or auto-detection)
     */
    init() {
      const saved = (typeof localStorage !== "undefined") ? localStorage.getItem("sound_studio_lang") : null;
      let target = this._fallbackLang;

      if (saved && this._locales.has(saved)) {
        target = saved;
      } else {
        target = this.detectSystemLanguage();
      }

      this._initialized = true;
      this.setLanguage(target, false);
    }

    /**
     * Changes active language, updates DOM, html attributes and persists
     * @param {string} langCode 
     * @param {boolean} persist 
     */
    setLanguage(langCode, persist = true) {
      if (!langCode) return;
      const clean = langCode.toLowerCase().trim();
      const target = this._locales.has(clean) ? clean : (this._locales.has(this._fallbackLang) ? this._fallbackLang : (this._locales.keys().next().value || "en"));

      this._currentLang = target;

      if (persist && typeof localStorage !== "undefined") {
        localStorage.setItem("sound_studio_lang", target);
      }

      const dict = this._locales.get(target) || {};
      const dir = (dict.meta && dict.meta.dir) ? dict.meta.dir : "ltr";

      // Set document attributes
      if (typeof document !== "undefined" && document.documentElement) {
        document.documentElement.lang = target;
        document.documentElement.dir = dir;
      }

      this.applyDOM();
      this._notifySubscribers(target);
    }

    /**
     * Returns current active language code
     */
    getLanguage() {
      return this._currentLang;
    }

    /**
     * Resolves localized string with dot-notation and fallback
     * @param {string} path - e.g. "ui.btn_save_preset"
     * @param {Object} [params] - Replacement variables {name: "Value"}
     * @returns {string}
     */
    t(path, params = {}) {
      if (!path) return "";

      const getNested = (obj, p) => {
        if (!obj) return null;
        const keys = p.split(".");
        let curr = obj;
        for (const k of keys) {
          if (curr && typeof curr === "object" && k in curr) {
            curr = curr[k];
          } else {
            return null;
          }
        }
        return (typeof curr === "string") ? curr : null;
      };

      // 1. Try current locale
      let result = getNested(this._locales.get(this._currentLang), path);

      // 2. Fallback to English
      if (result === null && this._currentLang !== "en" && this._locales.has("en")) {
        result = getNested(this._locales.get("en"), path);
      }

      // 3. Fallback to Italian
      if (result === null && this._currentLang !== "it" && this._locales.has("it")) {
        result = getNested(this._locales.get("it"), path);
      }

      // 4. Default return key if not found
      if (result === null) {
        return path;
      }

      // Replace parameters {key}
      if (params && typeof params === "object") {
        for (const [key, val] of Object.entries(params)) {
          result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(val));
        }
      }

      return result;
    }

    /**
     * Automatically scans and translates all tagged DOM elements
     */
    applyDOM() {
      if (typeof document === "undefined") return;

      // Text and HTML translations
      const elements = document.querySelectorAll("[data-i18n]");
      elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (!key) return;
        const translated = this.t(key);
        if (el.getAttribute("data-i18n-html") === "true") {
          el.innerHTML = translated;
        } else {
          el.textContent = translated;
        }
      });

      // Placeholder translations
      const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
      placeholders.forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (!key) return;
        el.placeholder = this.t(key);
      });

      // Title/Tooltip translations
      const titles = document.querySelectorAll("[data-i18n-title]");
      titles.forEach(el => {
        const key = el.getAttribute("data-i18n-title");
        if (!key) return;
        el.title = this.t(key);
      });

      // Label translations (for optgroup and elements with label attribute)
      const labelElements = document.querySelectorAll("[data-i18n-label]");
      labelElements.forEach(el => {
        const key = el.getAttribute("data-i18n-label");
        if (!key) return;
        el.label = this.t(key);
      });

      // Synchronize language select element if present in DOM
      const langSel = document.getElementById("selLanguage");
      if (langSel && langSel.value !== this._currentLang) {
        langSel.value = this._currentLang;
      }
    }

    /**
     * Subscribes a listener to language changes (Observer pattern)
     * @param {Function} callback - fn(langCode)
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
      if (typeof callback === "function") {
        this._subscribers.push(callback);
      }
      return () => {
        this._subscribers = this._subscribers.filter(fn => fn !== callback);
      };
    }

    _notifySubscribers(lang) {
      for (const fn of this._subscribers) {
        try {
          fn(lang, this._locales.get(lang));
        } catch (e) {
          console.error("[I18n] Error in subscriber:", e);
        }
      }
    }
  }

  window.I18n = new I18nManager();
})();
