// content.js

let currentTheme = 'light';

chrome.storage.sync.get(['selectedTheme'], (result) => {
    currentTheme = result.selectedTheme || 'light';
    applyTheme(currentTheme);
    startObserver();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeTheme') {
        currentTheme = request.theme;
        applyTheme(currentTheme);
    }
});

function applyTheme(themeName) {
    if (!document.body) return;

    document.body.classList.remove('theme-light', 'theme-dark', 'theme-focus', 'theme-shield');

    document.body.classList.add(`theme-${themeName}`);
}

function startObserver() {
    const observer = new MutationObserver(() => {

        if (document.body && !document.body.classList.contains(`theme-${currentTheme}`)) {
            applyTheme(currentTheme);
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
}