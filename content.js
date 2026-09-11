// content.js

// apply theme before page load
chrome.storage.sync.get(['selectedTheme'], (result) => {
    const theme = result.selectedTheme || 'light';
    
    // add geted theme
    document.body.className = `theme-${theme}`; 
});

// theme change when user want
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeTheme') {
        applyTheme(request.theme);
    }
});

// apply theme
function applyTheme(themeName) {
    // removed all theme class
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-focus', 'theme-shield');
    
    // add new theme class
    document.body.classList.add(`theme-${themeName}`);
}