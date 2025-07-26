// Dashboard component for main navigation and user overview

// Initialize dashboard when user completes questionnaire
function initializeDashboard() {
    if (!currentUser.profile) {
        showWelcome();
        return;
    }
    
    updateDashboardProfile();
    showDashboard();
}

// Update dashboard with user profile information
function updateDashboardProfile() {
    if (currentUser.profile) {
        const profileInfo = profileDescriptions[currentUser.profile];
        document.getElementById('profileBadge').textContent = profileInfo.title;
        document.getElementById('profileDescription').textContent = profileInfo.description;
    }
}

// Get dashboard statistics for user overview
function getDashboardStats() {
    const stats = {
        totalActivities: currentUser.activities.length,
        completedActivities: currentUser.activities.filter(a => a.status === 'done').length,
        inProgressActivities: currentUser.activities.filter(a => a.status === 'progress').length,
        todoActivities: currentUser.activities.filter(a => a.status === 'todo').length,
        totalEssays: currentUser.essays.length,
        chatMessages: currentUser.chatHistory.length
    };
    
    return stats;
}

// Generate dashboard summary based on user data
function generateDashboardSummary() {
    const stats = getDashboardStats();
    
    if (stats.totalActivities === 0 && stats.totalEssays === 0) {
        return "Welcome! Start by adding your extracurricular activities and writing your first essay. The AI will provide personalized feedback based on your profile.";
    }
    
    let summary = `You have ${stats.totalActivities} activities tracked`;
    if (stats.completedActivities > 0) {
        summary += ` (${stats.completedActivities} completed)`;
    }
    
    if (stats.totalEssays > 0) {
        summary += ` and ${stats.totalEssays} essay${stats.totalEssays > 1 ? 's' : ''} saved`;
    }
    
    summary += ". Keep building your application portfolio!";
    
    return summary;
}