// Chat component for AI assistant functionality

// Initialize chat page
function initializeChatPage() {
    generateProfileSummary();
    loadChatSuggestions();
    displayChatHistory();
}

// Generate profile summary for chat page
function generateProfileSummary() {
    const summaryContent = document.getElementById('chatSummaryContent');
    
    if (!currentUser.profile) {
        summaryContent.innerHTML = '<p>Complete your profile questionnaire to see a personalized summary here!</p>';
        return;
    }

    const activitiesCount = currentUser.activities.length;
    const essaysCount = currentUser.essays.length;
    const completedActivities = currentUser.activities.filter(a => a.status === 'done').length;
    
    // Generate strengths and improvements based on profile and data
    let strengths = [];
    let improvements = [];
    
    // Profile-specific analysis
    if (currentUser.profile === 'Diplomat') {
        strengths.push('Strong communication and leadership potential');
        if (currentUser.activities.some(a => a.type === 'leadership' || a.type === 'debate')) {
            strengths.push('Relevant leadership and debate experience');
        }
        if (currentUser.activities.filter(a => a.type === 'volunteer').length === 0) {
            improvements.push('Consider adding volunteer work or social impact projects');
        }
        if (currentUser.activities.filter(a => a.type === 'debate').length === 0) {
            improvements.push('Join debate teams or Model UN to strengthen communication skills');
        }
    } else if (currentUser.profile === 'Entrepreneur') {
        strengths.push('Innovation-focused mindset and practical approach');
        if (currentUser.activities.some(a => a.type === 'entrepreneurship' || a.type === 'technology')) {
            strengths.push('Hands-on entrepreneurship and technology experience');
        }
        if (currentUser.activities.filter(a => a.type === 'entrepreneurship').length === 0) {
            improvements.push('Start a small business project or join entrepreneurship competitions');
        }
        if (currentUser.activities.filter(a => a.type === 'leadership').length === 0) {
            improvements.push('Take on leadership roles to demonstrate initiative');
        }
    } else if (currentUser.profile === 'Researcher') {
        strengths.push('Analytical thinking and scientific methodology focus');
        if (currentUser.activities.some(a => a.type === 'research' || a.type === 'competition')) {
            strengths.push('Strong academic and research background');
        }
        if (currentUser.activities.filter(a => a.type === 'research').length === 0) {
            improvements.push('Participate in science fairs or research programs');
        }
        if (currentUser.activities.filter(a => a.type === 'competition').length === 0) {
            improvements.push('Join academic olympiads or STEM competitions');
        }
    }

    // General analysis
    if (activitiesCount === 0) {
        improvements.push('Start building your extracurricular portfolio');
    } else if (activitiesCount < 3) {
        improvements.push('Add more diverse extracurricular activities');
    } else {
        strengths.push(`Well-rounded profile with ${activitiesCount} activities`);
    }

    if (essaysCount === 0) {
        improvements.push('Begin working on your application essays');
    } else {
        strengths.push(`${essaysCount} essay${essaysCount > 1 ? 's' : ''} in progress`);
    }

    const summaryHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h4 style="color: #64ffda; margin-bottom: 10px;">💪 Your Strengths</h4>
                ${strengths.length > 0 ? strengths.map(s => `<p style="margin: 5px 0;">• ${s}</p>`).join('') : '<p>• Complete more activities to identify strengths</p>'}
            </div>
            <div>
                <h4 style="color: #ff6b6b; margin-bottom: 10px;">🎯 Areas to Improve</h4>
                ${improvements.length > 0 ? improvements.map(i => `<p style="margin: 5px 0;">• ${i}</p>`).join('') : '<p>• Great job! Keep building your profile</p>'}
            </div>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p><strong>Profile:</strong> ${currentUser.profile} | <strong>Activities:</strong> ${activitiesCount} | <strong>Essays:</strong> ${essaysCount}</p>
        </div>
    `;

    summaryContent.innerHTML = summaryHTML;
}

// Load chat suggestions based on profile
function loadChatSuggestions() {
    const suggestionsContainer = document.getElementById('suggestionsGrid');
    const suggestions = currentUser.profile ? chatSuggestions[currentUser.profile] : [
        "How do I choose the right universities?",
        "What makes a strong application?",
        "How important are extracurricular activities?",
        "When should I start preparing my applications?"
    ];

    suggestionsContainer.innerHTML = suggestions.map(suggestion => 
        `<button class="suggestion-btn" onclick="askSuggestedQuestion('${suggestion}')">${suggestion}</button>`
    ).join('');
}

// Handle suggested question click
function askSuggestedQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

// Handle enter key in chat input
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send chat message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Clear input
    input.value = '';

    // Add user message to chat
    addMessageToChat('user', message);

    // Add user message to history
    currentUser.chatHistory.push({
        type: 'user',
        content: message,
        timestamp: new Date().toISOString()
    });

    // Generate response (always offline mode in this version)
    const response = generateOfflineChatResponse(message);
    addMessageToChat('ai', response);

    // Add AI response to history
    currentUser.chatHistory.push({
        type: 'ai',
        content: response,
        timestamp: new Date().toISOString()
    });
}

// Add message to chat display
function addMessageToChat(type, content) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageId = 'msg-' + Date.now();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.id = messageId;
    
    if (type === 'user') {
        messageDiv.innerHTML = content;
    } else {
        messageDiv.innerHTML = `<strong>AI Assistant:</strong> ${content}`;
    }
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Display chat history when page loads
function displayChatHistory() {
    const messagesContainer = document.getElementById('chatMessages');
    
    // Clear existing messages except the initial AI greeting
    const initialMessage = messagesContainer.querySelector('.message.ai');
    messagesContainer.innerHTML = '';
    
    // Add back the initial greeting
    if (initialMessage) {
        messagesContainer.appendChild(initialMessage);
    } else {
        // Create initial greeting if it doesn't exist
        const greetingDiv = document.createElement('div');
        greetingDiv.className = 'message ai';
        greetingDiv.innerHTML = '<strong>AI Assistant:</strong> Hello! I\'m your personalized university application assistant. I have access to your profile, activities, and essays to provide the most relevant guidance. How can I help you today?';
        messagesContainer.appendChild(greetingDiv);
    }
    
    // Add chat history
    currentUser.chatHistory.forEach(msg => {
        addMessageToChat(msg.type, msg.content);
    });
}