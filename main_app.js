// Main application initialization and state management

// Application state - this is where we store all user data in memory
let currentUser = {
    profile: null,
    answers: [],
    activities: [],
    essays: [],
    chatHistory: []
};

let isAIOnline = false;

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main application initialization
function initializeApp() {
    // Set initial state
    updateAPIStatus(false); // Start in offline mode
    
    // Show welcome screen
    showWelcome();
    
    // Initialize any global event listeners
    setupGlobalEventListeners();
    
    console.log('ApplicationCoach initialized successfully');
}

// Setup global event listeners
function setupGlobalEventListeners() {
    // Add any global event listeners here
    // For example, keyboard shortcuts, window resize handlers, etc.
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', handleWindowResize);
    
    // Handle visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Handle window resize
function handleWindowResize() {
    // Add any responsive behavior that needs to be handled via JavaScript
    // Most responsive behavior is handled via CSS media queries
}

// Handle visibility change (tab switching)
function handleVisibilityChange() {
    if (document.hidden) {
        // User switched away from the tab
        console.log('User switched away from ApplicationCoach');
    } else {
        // User came back to the tab
        console.log('User returned to ApplicationCoach');
    }
}

// Global error handler
window.addEventListener('error', function(event) {
    console.error('ApplicationCoach Error:', event.error);
    // In a production app, you might want to send this to an error tracking service
});

// Utility function to check if user has completed onboarding
function isUserOnboarded() {
    return currentUser.profile !== null;
}

// Utility function to get user progress summary
function getUserProgress() {
    return {
        hasProfile: !!currentUser.profile,
        activitiesCount: currentUser.activities.length,
        essaysCount: currentUser.essays.length,
        chatInteractions: currentUser.chatHistory.length,
        completionPercentage: calculateCompletionPercentage()
    };
}

// Calculate overall completion percentage
function calculateCompletionPercentage() {
    let score = 0;
    const maxScore = 4;
    
    // Profile completed
    if (currentUser.profile) score += 1;
    
    // Has activities
    if (currentUser.activities.length > 0) score += 1;
    
    // Has essays
    if (currentUser.essays.length > 0) score += 1;
    
    // Has used chat
    if (currentUser.chatHistory.length > 0) score += 1;
    
    return Math.round((score / maxScore) * 100);
}

// Export user data (for debugging or potential future features)
function exportUserData() {
    const exportData = {
        profile: currentUser.profile,
        activities: currentUser.activities,
        essays: currentUser.essays.map(essay => ({
            ...essay,
            contentPreview: essay.content.substring(0, 100) + '...'
        })),
        stats: getUserProgress(),
        exportDate: new Date().toISOString()
    };
    
    console.log('User Data Export:', exportData);
    return exportData;
}

// Reset application (for testing or user request)
function resetApplication() {
    if (confirm('Are you sure you want to reset all your data? This action cannot be undone.')) {
        clearUserData();
        showWelcome();
        console.log('Application reset successfully');
    }
}

// Debug function to populate sample data (for development)
function loadSampleData() {
    if (confirm('Load sample data? This will overwrite any existing data.')) {
        currentUser.profile = 'Entrepreneur';
        currentUser.answers = ['B', 'B', 'B', 'B', 'B'];
        
        // Sample activities
        currentUser.activities = [
            {
                id: 'sample-1',
                name: 'Student Startup Competition',
                type: 'entrepreneurship',
                status: 'done',
                date: '2024-05-15',
                prize: '2nd Place',
                description: 'Developed a mobile app for local business networking and won second place in the regional competition.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'sample-2',
                name: 'Programming Club President',
                type: 'leadership',
                status: 'progress',
                date: '2024-09-01',
                prize: '',
                description: 'Leading a team of 25 students, organizing coding workshops and hackathons.',
                createdAt: new Date().toISOString()
            }
        ];
        
        // Sample essay
        currentUser.essays = [
            {
                id: 'sample-essay-1',
                title: 'Why Computer Science',
                university: 'Stanford University',
                type: 'academic-interest',
                content: 'Ever since I built my first website at age 12, I have been fascinated by the power of technology to solve real-world problems...',
                lastModified: new Date().toISOString()
            }
        ];
        
        showDashboard();
        console.log('Sample data loaded successfully');
    }
}

// Make debug functions available globally for development
window.ApplicationCoach = {
    exportUserData,
    resetApplication,
    loadSampleData,
    getUserProgress,
    isUserOnboarded
};