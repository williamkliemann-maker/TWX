// Essays component for writing and managing application essays

let editingEssayId = null;

// Save essay to storage
function saveEssay() {
    const essayData = {
        title: document.getElementById('essayTitle').value.trim(),
        university: document.getElementById('essayUniversity').value.trim(),
        type: document.getElementById('essayType').value,
        content: document.getElementById('essayContent').value.trim()
    };
    
    // Validation
    if (!essayData.title || !essayData.content) {
        alert('Please provide at least a title and content for your essay.');
        return;
    }
    
    // Save to storage
    const savedEssay = saveEssayData(essayData);
    
    // Reset editing state
    editingEssayId = null;
    
    // Update display
    displaySavedEssays();
    
    // Show success message
    alert(`Essay "${savedEssay.title}" saved successfully!`);
}

// Analyze essay with AI
function analyzeEssay() {
    const essayData = {
        title: document.getElementById('essayTitle').value.trim(),
        university: document.getElementById('essayUniversity').value.trim(),
        type: document.getElementById('essayType').value,
        content: document.getElementById('essayContent').value.trim()
    };
    
    if (!essayData.content || essayData.content.length < 50) {
        alert('Please write more content before analyzing your essay.');
        return;
    }
    
    // Show loading state
    const feedbackContainer = document.getElementById('essayFeedbackContent');
    feedbackContainer.innerHTML = '<div class="loading"></div>Analyzing your essay...';
    
    // Simulate analysis delay and generate feedback
    setTimeout(() => {
        const feedback = generateEssayFeedback(essayData);
        feedbackContainer.innerHTML = feedback;
    }, 1500);
}

// Clear essay form
function clearEssayForm() {
    if (confirm('Are you sure you want to clear the essay? Any unsaved changes will be lost.')) {
        document.getElementById('essayTitle').value = '';
        document.getElementById('essayUniversity').value = '';
        document.getElementById('essayType').value = '';
        document.getElementById('essayContent').value = '';
        editingEssayId = null;
        
        // Reset feedback
        document.getElementById('essayFeedbackContent').innerHTML = `
            <p>Write your essay and click "Analyze with AI" to receive personalized feedback based on your <strong><span id="currentProfile2b">${currentUser.profile || ''}</span></strong> profile and extracurricular activities!</p>
            <br>
            <p><strong>The AI will analyze:</strong></p>
            <p>• Clarity and coherence of your writing</p>
            <p>• Alignment with your academic profile</p>
            <p>• Connection to your extracurricular activities</p>
            <p>• Structure and flow</p>
            <p>• Specific improvement suggestions</p>
            <p>• How to better highlight your unique qualities</p>
        `;
    }
}

// Display saved essays
function displaySavedEssays() {
    const essaysList = document.getElementById('savedEssaysList');
    
    if (currentUser.essays.length === 0) {
        essaysList.innerHTML = `
            <p style="color: #666; font-style: italic; text-align: center; padding: 20px;">
                No essays saved yet.<br>
                Write and save your first essay to see it here.
            </p>
        `;
        return;
    }
    
    const essaysHTML = currentUser.essays.map(essay => `
        <div class="essay-item">
            <div class="essay-title">${essay.title}</div>
            ${essay.university ? `<div class="essay-university">${essay.university}</div>` : ''}
            ${essay.type ? `<div class="essay-type">${getEssayTypeLabel(essay.type)}</div>` : ''}
            <div class="essay-preview">${essay.content.substring(0, 150)}${essay.content.length > 150 ? '...' : ''}</div>
            <div class="essay-actions">
                <button class="edit-essay-btn" onclick="editEssay('${essay.id}')">Edit</button>
                <button class="edit-essay-btn" onclick="deleteEssay('${essay.id}')" style="background: rgba(244, 67, 54, 0.2); color: #f44336; border-color: rgba(244, 67, 54, 0.3);">Delete</button>
            </div>
            <div style="font-size: 12px; color: #78909c; margin-top: 10px;">
                Last modified: ${formatDateTime(essay.lastModified)}
            </div>
        </div>
    `).join('');
    
    essaysList.innerHTML = essaysHTML;
}

// Get human-readable essay type label
function getEssayTypeLabel(type) {
    const labels = {
        'personal-statement': 'Personal Statement',
        'why-university': 'Why This University',
        'extracurricular': 'Extracurricular Essay',
        'academic-interest': 'Academic Interest',
        'diversity': 'Diversity Statement',
        'challenge': 'Overcoming Challenges',
        'leadership': 'Leadership Experience',
        'other': 'Other'
    };
    return labels[type] || type;
}

// Edit existing essay
function editEssay(essayId) {
    const essay = getEssayById(essayId);
    if (!essay) return;
    
    // Populate form with essay data
    document.getElementById('essayTitle').value = essay.title;
    document.getElementById('essayUniversity').value = essay.university || '';
    document.getElementById('essayType').value = essay.type || '';
    document.getElementById('essayContent').value = essay.content;
    
    // Set editing state
    editingEssayId = essayId;
    
    // Scroll to editor
    document.querySelector('.essay-editor').scrollIntoView({ behavior: 'smooth' });
}

// Delete essay with confirmation
function deleteEssay(essayId) {
    const essay = getEssayById(essayId);
    if (!essay) return;
    
    if (confirm(`Are you sure you want to delete the essay "${essay.title}"?`)) {
        const index = currentUser.essays.findIndex(e => e.id === essayId);
        if (index !== -1) {
            currentUser.essays.splice(index, 1);
            displaySavedEssays();
        }
    }
}

// Format date and time for display
function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
    