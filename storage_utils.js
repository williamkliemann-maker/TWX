// Storage utilities for managing user data in memory
// Note: Using in-memory storage only, no localStorage

// Generate unique IDs for items
function generateId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Save activity to user data
function saveActivity(activityData) {
    const activity = {
        id: generateId(),
        name: activityData.name,
        type: activityData.type,
        status: activityData.status,
        date: activityData.date,
        prize: activityData.prize || '',
        description: activityData.description,
        createdAt: new Date().toISOString()
    };
    
    currentUser.activities.push(activity);
    return activity;
}

// Delete activity by ID
function deleteActivity(activityId) {
    const index = currentUser.activities.findIndex(activity => activity.id === activityId);
    if (index !== -1) {
        currentUser.activities.splice(index, 1);
        return true;
    }
    return false;
}

// Save essay to user data
function saveEssayData(essayData) {
    const essay = {
        id: editingEssayId || generateId(),
        title: essayData.title,
        university: essayData.university,
        type: essayData.type,
        content: essayData.content,
        lastModified: new Date().toISOString()
    };
    
    if (editingEssayId) {
        // Update existing essay
        const index = currentUser.essays.findIndex(e => e.id === editingEssayId);
        if (index !== -1) {
            currentUser.essays[index] = essay;
        }
    } else {
        // Add new essay
        currentUser.essays.push(essay);
    }
    
    return essay;
}

// Get activities by status
function getActivitiesByStatus(status) {
    return currentUser.activities.filter(activity => activity.status === status);
}

// Get essay by ID
function getEssayById(essayId) {
    return currentUser.essays.find(essay => essay.id === essayId);
}

// Clear all user data (reset)
function clearUserData() {
    currentUser = {
        profile: null,
        answers: [],
        activities: [],
        essays: [],
        chatHistory: []
    };
}