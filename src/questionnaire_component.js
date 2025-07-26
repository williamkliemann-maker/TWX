// Questionnaire component for personality assessment

let currentQuestion = 0;

// Start the questionnaire
function startQuestionnaire() {
    hideAllScreens();
    currentQuestion = 0;
    currentUser.answers = [];
    document.getElementById('questionnaire').style.display = 'block';
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const container = document.getElementById('questionContainer');
    const question = questions[currentQuestion];
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Display the current question
    container.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestion + 1} of ${questions.length}</h3>
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectOption('${option.value}', this)">
                        (${option.value}) ${option.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Hide navigation buttons until an option is selected
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('finishBtn').style.display = 'none';
}

// Handle option selection
function selectOption(value, element) {
    // Remove previous selections from all options
    const options = element.parentNode.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Mark the clicked option as selected
    element.classList.add('selected');
    
    // Store the answer
    currentUser.answers[currentQuestion] = value;
    
    // Show the appropriate navigation button
    if (currentQuestion < questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'inline-block';
    } else {
        document.getElementById('finishBtn').style.display = 'inline-block';
    }
}

// Move to next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    }
}

// Finish questionnaire and calculate profile
function finishQuestionnaire() {
    // Calculate profile based on the pattern of answers
    const counts = { A: 0, B: 0, C: 0 };
    currentUser.answers.forEach(answer => counts[answer]++);
    
    // Determine which profile has the most answers
    let profile = '';
    if (counts.A >= counts.B && counts.A >= counts.C) {
        profile = 'Diplomat';
    } else if (counts.B >= counts.A && counts.B >= counts.C) {
        profile = 'Entrepreneur';
    } else {
        profile = 'Researcher';
    }
    
    // Store the determined profile
    currentUser.profile = profile;
    
    // Update the dashboard with profile information
    const profileInfo = profileDescriptions[profile];
    document.getElementById('profileBadge').textContent = profileInfo.title;
    document.getElementById('profileDescription').textContent = profileInfo.description;
    
    // Navigate to dashboard
    showDashboard();
}