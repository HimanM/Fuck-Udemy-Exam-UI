# 🖕 Fuck Udemy Exam UI

[![Install with Tampermonkey](https://img.shields.io/badge/Install-Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/HimanM/Fuck-Udemy-Exam-UI/main/udemy-exam-fullheight.user.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Udemy](https://img.shields.io/badge/Udemy-A435F0?style=for-the-badge&logo=udemy&logoColor=white)](https://www.udemy.com)

---

## What the hell is this?

A Tampermonkey userscript that fixes Udemy's **absolutely fucking annoying** practice exam interface.

You know the one — where Udemy decides you only deserve to see your exam questions through a tiny little window that takes up like 25% of your screen, while the rest is wasted on useless shit like course promos and "Get your certification" ads you didn't ask for.

### The Problem

Udemy's practice exam UI has a `max-block-size` CSS property that squishes the question area into a laughably small viewport. This means:

- **Endless scrolling** just to read a single question and its answers
- **75% of your screen is wasted** on promotional garbage and redundant navigation
- **You can't even see all the answer choices** without scrolling down like you're reading the Terms of Service
- **No way to resize it** — Udemy gives you zero control over your own damn screen

This is especially infuriating when you're trying to actually learn and prepare for a certification exam. The UI actively works against you.

### The Fix

This script tells Udemy's shitty height limit to go fuck itself:

- **Removes `max-block-size`** — no more artificial height cap
- **Sets `height: 100vh`** — uses your full screen like a normal application should
- **Toggle button** — adds a button right next to Udemy's own controls so you can switch between full height and default view
- **SPA-proof** — survives Udemy's single-page navigation without breaking

---

## One-Click Install

> **Prerequisites:** You need [Tampermonkey](https://www.tampermonkey.net/) installed in your browser.

### Step 1: Install Tampermonkey

| Browser | Link |
|---------|------|
| ![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=flat-square&logo=googlechrome&logoColor=white) | [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| ![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=flat-square&logo=firefoxbrowser&logoColor=white) | [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) |
| ![Edge](https://img.shields.io/badge/Edge-0078D7?style=flat-square&logo=microsoftedge&logoColor=white) | [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| ![Safari](https://img.shields.io/badge/Safari-006CFF?style=flat-square&logo=safari&logoColor=white) | [Mac App Store](https://apps.apple.com/us/app/tampermonkey/id1482490089) |

### Step 2: Install the Script

**Click the button below** — Tampermonkey will automatically detect it and prompt you to install:

[![Click to Install](https://img.shields.io/badge/INSTALL_SCRIPT-Click_Here-success?style=for-the-badge&logo=tampermonkey)](https://raw.githubusercontent.com/HimanM/Fuck-Udemy-Exam-UI/main/udemy-exam-fullheight.user.js)

Or manually:
1. Click the **Tampermonkey** icon in your browser, then **Create a new script**
2. Delete everything in the editor
3. Copy and paste the contents of [`udemy-exam-fullheight.user.js`](https://github.com/HimanM/Fuck-Udemy-Exam-UI/blob/main/udemy-exam-fullheight.user.js)
4. Press **Ctrl+S** to save
5. Done. Go take your exam in peace.

---

## Usage

1. Open any Udemy practice exam or quiz
2. The script activates automatically — full height is ON by default
3. Look at the bottom-right footer bar, next to the Fullscreen and Expanded View buttons
4. Click the **toggle button** to switch between:
   - **Full height** — question area uses 100% of your viewport
   - **Default** — Udemy's original cramped-ass layout

---

## How It Works

```
┌─────────────────────────────────────────────────────┐
│  Udemy sets this on the question container:          │
│                                                     │
│    .curriculum-item-view--scaled-height-limiter {    │
│        max-block-size: calc(100vh - 29rem); <- SHIT  │
│    }                                                │
│                                                     │
│  This script overrides it to:                       │
│                                                     │
│    [class*="...scaled-height-limiter"] {             │
│        max-block-size: none !important;   <- FIXED   │
│        height: 100vh !important;          <- FIXED   │
│    }                                                │
└─────────────────────────────────────────────────────┘
```

The script uses `MutationObserver` to survive Udemy's SPA navigation — it auto re-injects itself when you move between questions or sections without needing a page refresh.

---

## Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome | Works |
| Firefox | Works |
| Edge | Works |
| Safari | Works (with Tampermonkey) |
| Brave | Works |

---

## License

[MIT](LICENSE) — Do whatever the fuck you want with it.

---

## Contributing

Found another piece of Udemy's UI that's pissing you off? Open an [issue](https://github.com/HimanM/Fuck-Udemy-Exam-UI/issues) or submit a PR. Let's fix this shit together.

---

<p align="center">
  <i>Made with mass frustration by <a href="https://github.com/HimanM">HimanM</a></i>
</p>
