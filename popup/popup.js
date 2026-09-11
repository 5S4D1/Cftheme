// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.theme-btn');

    // get old selected theme data from Storage
    chrome.storage.sync.get(['selectedTheme'], (result) => {
        const currentTheme = result.selectedTheme || 'light';
        setActiveButton(currentTheme);
    });

    // button click event
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            
            // store the selected theme in storage
            chrome.storage.sync.set({ selectedTheme: selectedTheme });
            
            // change UI active button 
            setActiveButton(selectedTheme);

            // change the tab style
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, { 
                        action: 'changeTheme', 
                        theme: selectedTheme 
                    }, (response) => {
                        // if got any error
                        if (chrome.runtime.lastError) {
                            console.log("Note: Content script is not running on this tab (e.g., not a Codeforces page). This is normal.");
                        }
                    });
                }
            });
        });
    });

    // set active button
    function setActiveButton(theme) {
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-theme="${theme}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }
});