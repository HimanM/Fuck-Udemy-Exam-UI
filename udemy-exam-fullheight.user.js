// ==UserScript==
// @name         Fuck Udemy Exam UI
// @namespace    https://github.com/HimanM/Fuck-Udemy-Exam-UI
// @version      1.0.0
// @description  Fixes Udemy's god-awful practice exam UI. Removes the bullshit max-height limit so you can actually see your damn questions without scrolling through a keyhole.
// @author       https://github.com/HimanM
// @license      MIT
// @homepageURL  https://github.com/HimanM/Fuck-Udemy-Exam-UI
// @supportURL   https://github.com/HimanM/Fuck-Udemy-Exam-UI/issues
// @updateURL    https://raw.githubusercontent.com/HimanM/Fuck-Udemy-Exam-UI/main/udemy-exam-fullheight.user.js
// @downloadURL  https://raw.githubusercontent.com/HimanM/Fuck-Udemy-Exam-UI/main/udemy-exam-fullheight.user.js
// @icon         https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg
// @match        https://www.udemy.com/course/*/learn/quiz/*
// @match        https://www.udemy.com/course/*/learn/practice/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const STYLE_ID = 'udemy-fullheight-style';
    const BTN_ID = 'udemy-fullheight-toggle';

    // The CSS class prefix we're targeting (Udemy hashes the suffix, so we use a partial selector)
    const TARGET_CLASS_PREFIX = 'curriculum-item-view--scaled-height-limiter';

    const FOOTER_CLASS_PREFIX = 'curriculum-item-footer--footer';

    let enabled = true;

    // ── Measure footer and inject override stylesheet ────────────────
    function getFooterHeight() {
        const footer = document.querySelector(`[class*="${FOOTER_CLASS_PREFIX}"]`);
        return footer ? footer.offsetHeight : 0;
    }

    function injectStyle() {
        const footerHeight = getFooterHeight();
        const existing = document.getElementById(STYLE_ID);

        const css = `
            [class*="${TARGET_CLASS_PREFIX}"] {
                max-block-size: none !important;
                height: calc(100vh - ${footerHeight}px) !important;
            }
        `;

        if (existing) {
            existing.textContent = css;
        } else {
            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    function removeStyle() {
        const el = document.getElementById(STYLE_ID);
        if (el) el.remove();
    }

    // Re-calculate on window resize
    window.addEventListener('resize', () => {
        if (enabled && document.getElementById(STYLE_ID)) {
            injectStyle();
        }
    });

    function toggle() {
        enabled = !enabled;
        if (enabled) {
            injectStyle();
        } else {
            removeStyle();
        }
        updateButton();
    }

    // ── Toggle button ───────────────────────────────────────────────
    function createButton() {
        const btn = document.createElement('button');
        btn.id = BTN_ID;
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle full height view');
        btn.tabIndex = 0;

        // Match Udemy's ghost button styling
        btn.className = 'ud-btn ud-btn-large ud-btn-ghost ud-btn-text-md';

        Object.assign(btn.style, {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: '0 8px',
            marginRight: '4px',
            border: 'none',
            background: 'transparent',
            color: 'inherit',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
        });

        btn.addEventListener('click', toggle);
        return btn;
    }

    function updateButton() {
        const btn = document.getElementById(BTN_ID);
        if (!btn) return;

        // Simple icon + label
        btn.innerHTML = enabled
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;

        btn.title = enabled ? 'Full height ON – click to disable' : 'Full height OFF – click to enable';
    }

    // ── Inject button into the footer bar ───────────────────────────
    function injectButton() {
        if (document.getElementById(BTN_ID)) return;

        // Find the "Expanded view" / theatre-mode toggle button
        const expandedViewBtn = document.querySelector(
            '[data-purpose="theatre-mode-toggle-button"]'
        );

        if (!expandedViewBtn) return false;

        // Walk up to the wrapping popper div so we insert after the whole popper container
        const wrapper = expandedViewBtn.closest('[class*="popper-module--popper"]') || expandedViewBtn.parentElement;

        const btn = createButton();
        // Insert right after the expanded view button's wrapper
        wrapper.parentNode.insertBefore(btn, wrapper.nextSibling);
        updateButton();

        // Footer is now in the DOM, so (re)inject style with correct footer height
        if (enabled) {
            injectStyle();
        }
        return true;
    }

    // ── Observer to wait for the footer to appear ───────────────────
    function waitForFooter() {
        if (injectButton()) return;

        const observer = new MutationObserver(() => {
            if (injectButton()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ── Persistent re-injection (Udemy is an SPA, DOM gets rebuilt) ─
    function watchForDOMChanges() {
        const observer = new MutationObserver(() => {
            // Re-inject if button disappeared (SPA navigation)
            if (!document.getElementById(BTN_ID)) {
                injectButton();
            }
            // Re-inject style if it disappeared and should be active
            if (enabled && !document.getElementById(STYLE_ID)) {
                injectStyle();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ── Boot ────────────────────────────────────────────────────────
    // Don't call injectStyle() here - footer isn't in the DOM yet.
    // Style gets injected once injectButton() confirms the footer exists.
    waitForFooter();
    watchForDOMChanges();
})();
