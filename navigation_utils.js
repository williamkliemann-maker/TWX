// Navigation utilities for managing screen transitions

// Hide all screens except the specified one
function hideAllScreens() {
    const screens = ['welcomeScreen', 'questionnaire', 'dashboard', 'extracurricularsPage', 'essaysPage', 'chatbotPage'];
    screens.forEach(screen => {
        const element = document.getElementById(screen);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Show welcome screen
function showWelcome() {
    hideAllScreens();
    document.getElementById('welcomeScreen').style.display = 'block';
}

// Show dashboard
function showDashboard() {
    hideAllScreens();
    document.getElementById('dashboard').style.display = 'block';
    updateProfileDisplays();
}

// Show specific page
function showPage(pageId) {
    hideAllScreens();
    document.getElementById(pageId + 'Page').style.display = 'block';
    updateProfileDisplays();
    
    // Initialize page-specific functionality
    if (pageId === 'essays') {
        displaySavedEssays();
    } else if (pageId === 'chatbot') {
        initializeChatPage();
    } else if (pageId === 'extracurriculars') {
        displayActivities();
        generateExtracurricularFeedback();
    }
}

// Update profile displays across all pages
function updateProfileDisplays() {
    if (currentUser.profile) {
        const profileElements = ['currentProfile1', 'currentProfile2', 'currentProfile2b', 'currentProfile3'];
        profileElements.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = currentUser.profile;
            }
        });
    }
}

// Update API status indicator
function updateAPIStatus(online) {
    isAIOnline = online;
    const statusEl = document.getElementById('apiStatus');
    if (online) {
        statusEl.className = 'api-status online';
        statusEl.innerHTML = '🟢 AI Online';
    } else {
        statusEl.className = 'api-status offline';
        statusEl.innerHTML = '🔴 AI Offline - Local Mode';
    }
}