// Activities component for managing extracurricular activities

// Show/hide activity form
function showAddActivityForm() {
    document.getElementById('addActivityForm').style.display = 'block';
    // Scroll to form
    document.getElementById('addActivityForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelActivity() {
    document.getElementById('addActivityForm').style.display = 'none';
    clearActivityForm();
}

// Clear activity form fields
function clearActivityForm() {
    document.getElementById('activityName').value = '';
    document.getElementById('activityType').value = '';
    document.getElementById('activityStatus').value = 'todo';
    document.getElementById('activityDate').value = '';
    document.getElementById('activityPrize').value = '';
    document.getElementById('activityDescription').value = '';
    updateDateField();
}

// Update date field label based on status
function updateDateField() {
    const status = document.getElementById('activityStatus').value;
    const dateLabel = document.getElementById('dateLabel');
    
    switch(status) {
        case 'todo':
            dateLabel.textContent = 'Target Date/Deadline:';
            break;
        case 'progress':
            dateLabel.textContent = 'Start Date:';
            break;
        case 'done':
            dateLabel.textContent = 'Completion Date:';
            break;
    }
}

// Save new activity
function saveActivity() {
    const activityData = {
        name: document.getElementById('activityName').value.trim(),
        type: document.getElementById('activityType').value,
        status: document.getElementById('activityStatus').value,
        date: document.getElementById('activityDate').value,
        prize: document.getElementById('activityPrize').value.trim(),
        description: document.getElementById('activityDescription').value.trim()
    };
    
    // Validation
    if (!activityData.name || !activityData.type) {
        alert('Please fill in the activity name and type.');
        return;
    }
    
    // Save to storage
    saveActivity(activityData);
    
    // Clear form and hide it
    clearActivityForm();
    cancelActivity();
    
    // Refresh display
    displayActivities();
    generateExtracurricularFeedback();
}

// Display activities in their respective columns
function displayActivities() {
    const todoColumn = document.getElementById('todoColumn');
    const progressColumn = document.getElementById('progressColumn');
    const doneColumn = document.getElementById('doneColumn');
    
    // Get activities by status
    const todoActivities = getActivitiesByStatus('todo');
    const progressActivities = getActivitiesByStatus('progress');
    const doneActivities = getActivitiesByStatus('done');
    
    // Display todo activities
    if (todoActivities.length === 0) {
        todoColumn.innerHTML = `
            <p style="color: #666; font-style: italic; text-align: center; padding: 20px;">
                No planned activities yet.<br>
                Add activities you intend to pursue.
            </p>
        `;
    } else {
        todoColumn.innerHTML = todoActivities.map(activity => createActivityHTML(activity)).join('');
    }
    
    // Display in progress activities
    if (progressActivities.length === 0) {
        progressColumn.innerHTML = `
            <p style="color: #666; font-style: italic; text-align: center; padding: 20px;">
                No activities in progress.<br>
                Add activities you're currently participating in.
            </p>
        `;
    } else {
        progressColumn.innerHTML = progressActivities.map(activity => createActivityHTML(activity)).join('');
    }
    
    // Display completed activities
    if (doneActivities.length === 0) {
        doneColumn.innerHTML = `
            <p style="color: #666; font-style: italic; text-align: center; padding: 20px;">
                No completed activities.<br>
                Add activities you've already finished.
            </p>
        `;
    } else {
        doneColumn.innerHTML = doneActivities.map(activity => createActivityHTML(activity)).join('');
    }
}

// Create HTML for individual activity
function createActivityHTML(activity) {
    const statusIcon = {
        'todo': '📋',
        'progress': '⏳',
        'done': '✅'
    };
    
    const dateLabel = {
        'todo': 'Deadline',
        'progress': 'Started',
        'done': 'Completed'
    };
    
    return `
        <div class="activity-item">
            <button class="delete-btn" onclick="removeActivity('${activity.id}')" title="Delete activity">×</button>
            <div class="activity-title">${activity.name}</div>
            <div class="activity-type">${activity.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
            ${activity.date ? `<div class="activity-date">${dateLabel[activity.status]}: ${formatDate(activity.date)}</div>` : ''}
            ${activity.prize ? `<div class="activity-prize">🏆 ${activity.prize}</div>` : ''}
            ${activity.description ? `<div class="activity-description">${activity.description}</div>` : ''}
        </div>
    `;
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Remove activity with confirmation
function removeActivity(activityId) {
    if (confirm('Are you sure you want to delete this activity?')) {
        if (deleteActivity(activityId)) {
            displayActivities();
            generateExtracurricularFeedback();
        }
    }
}