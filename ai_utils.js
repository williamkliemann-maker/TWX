// AI utilities for generating responses and feedback

// Generate offline chat response based on user profile and message
function generateOfflineChatResponse(message) {
    const lowerMessage = message.toLowerCase();
    const profile = currentUser.profile;
    
    // University recommendations
    if (lowerMessage.includes('university') || lowerMessage.includes('college')) {
        if (profile === 'Diplomat') {
            return "Based on your Diplomat profile, I'd recommend looking at universities with strong International Relations programs like Georgetown, Harvard, Princeton, or Columbia. These schools have excellent political science departments and strong alumni networks in government and diplomacy.";
        } else if (profile === 'Entrepreneur') {
            return "For your Entrepreneur profile, consider universities with top business programs like Stanford, MIT, Wharton (UPenn), or Harvard Business School. These institutions have strong entrepreneurship ecosystems and venture capital connections.";
        } else if (profile === 'Researcher') {
            return "Given your Researcher profile, look into research-intensive universities like MIT, Stanford, Caltech, Harvard, or Princeton. These schools offer excellent STEM research opportunities and have strong graduate programs.";
        }
    }
    
    // Essay advice
    if (lowerMessage.includes('essay') || lowerMessage.includes('personal statement')) {
        if (profile === 'Diplomat') {
            return "For your essays, focus on your leadership experiences, international perspectives, and social impact initiatives. Highlight moments where you've facilitated dialogue, resolved conflicts, or brought diverse groups together. Show your passion for global issues and diplomacy.";
        } else if (profile === 'Entrepreneur') {
            return "In your essays, emphasize your innovative projects, leadership in business contexts, and problem-solving abilities. Discuss any startups, business competitions, or creative solutions you've developed. Show your entrepreneurial mindset and initiative.";
        } else if (profile === 'Researcher') {
            return "Focus your essays on your research experiences, scientific curiosity, and analytical achievements. Highlight specific projects, methodologies you've used, and discoveries you've made. Show your passion for scientific inquiry and your potential for future research contributions.";
        }
    }
    
    // Extracurricular advice
    if (lowerMessage.includes('extracurricular') || lowerMessage.includes('activities')) {
        if (profile === 'Diplomat') {
            return "For extracurriculars, focus on leadership roles, debate teams, Model UN, volunteer work with social impact, and cultural exchange programs. These activities align with your diplomatic strengths and show your commitment to global understanding.";
        } else if (profile === 'Entrepreneur') {
            return "Consider entrepreneurship clubs, business competitions, hackathons, startup incubators, and innovation challenges. Also look into leadership roles in student organizations and community service projects where you can implement solutions.";
        } else if (profile === 'Researcher') {
            return "Prioritize science olympiads, research programs, science fairs, academic competitions, and laboratory internships. Join STEM clubs and consider mentoring younger students in math or science subjects.";
        }
    }
    
    // Application timeline
    if (lowerMessage.includes('when') || lowerMessage.includes('timeline') || lowerMessage.includes('deadline')) {
        return "For international applications, start preparing at least 12-18 months in advance. Key milestones: Junior year - take standardized tests, build your activity portfolio; Senior year fall - write essays, get recommendations, submit applications (typically Nov-Jan deadlines); Spring - await decisions and make final choice.";
    }
    
    // Test preparation
    if (lowerMessage.includes('sat') || lowerMessage.includes('act') || lowerMessage.includes('test')) {
        return "For standardized tests, aim to take them by spring of junior year, with a retake option in fall of senior year if needed. Practice consistently, take official practice tests, and consider prep courses if you need structured support. Remember that test scores are just one part of your application.";
    }
    
    // Financial aid
    if (lowerMessage.includes('financial') || lowerMessage.includes('scholarship') || lowerMessage.includes('aid')) {
        return "Many top universities offer need-based financial aid for international students. Research each school's aid policies, as they vary significantly. Also look into external scholarships, government programs from your country, and merit-based awards. Start your financial aid research early!";
    }
    
    // General application advice
    if (lowerMessage.includes('application') || lowerMessage.includes('apply')) {
        return `Based on your ${profile} profile, focus on showcasing your unique strengths. Create a cohesive narrative across all application components. Quality over quantity - it's better to have fewer activities with deep involvement than many with surface-level participation. Show growth, impact, and passion in everything you do.`;
    }
    
    // Default response
    const defaultResponses = [
        `That's a great question! As a ${profile}, you have unique strengths to showcase. Could you be more specific about what aspect of university applications you'd like help with?`,
        `I'd be happy to help you with that! Based on your ${profile} profile, I can provide personalized advice. Can you tell me more about your specific situation?`,
        `Interesting question! For someone with your ${profile} background, there are several approaches we could take. What particular area would you like to focus on?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Generate extracurricular feedback based on user's activities
function generateExtracurricularFeedback() {
    const activities = currentUser.activities;
    const profile = currentUser.profile;
    
    if (!profile || activities.length === 0) {
        return;
    }
    
    let feedback = `<h4>📊 Analysis for ${profile} Profile</h4>`;
    
    // Activity count analysis
    const totalActivities = activities.length;
    const completedActivities = activities.filter(a => a.status === 'done').length;
    const inProgressActivities = activities.filter(a => a.status === 'progress').length;
    
    feedback += `<p><strong>Activity Summary:</strong> ${totalActivities} total activities (${completedActivities} completed, ${inProgressActivities} in progress)</p>`;
    
    // Profile-specific analysis
    if (profile === 'Diplomat') {
        const leadershipCount = activities.filter(a => a.type === 'leadership' || a.type === 'debate').length;
        const volunteerCount = activities.filter(a => a.type === 'volunteer').length;
        
        feedback += `<p><strong>Leadership & Communication:</strong> ${leadershipCount} activities - ${leadershipCount >= 2 ? 'Great!' : 'Consider adding more leadership roles'}</p>`;
        feedback += `<p><strong>Social Impact:</strong> ${volunteerCount} volunteer activities - ${volunteerCount >= 1 ? 'Good community engagement' : 'Add volunteer work to show social commitment'}</p>`;
        
        if (leadershipCount === 0) {
            feedback += `<p><strong>💡 Suggestion:</strong> Join Model UN, debate team, or student government to develop diplomatic skills.</p>`;
        }
    } else if (profile === 'Entrepreneur') {
        const businessCount = activities.filter(a => a.type === 'entrepreneurship' || a.type === 'technology').length;
        const leadershipCount = activities.filter(a => a.type === 'leadership').length;
        
        feedback += `<p><strong>Business & Innovation:</strong> ${businessCount} activities - ${businessCount >= 1 ? 'Excellent entrepreneurial focus!' : 'Consider starting a business project'}</p>`;
        feedback += `<p><strong>Leadership Experience:</strong> ${leadershipCount} activities - ${leadershipCount >= 1 ? 'Good leadership foundation' : 'Take on leadership roles to show initiative'}</p>`;
        
        if (businessCount === 0) {
            feedback += `<p><strong>💡 Suggestion:</strong> Start a small business, join entrepreneurship competitions, or participate in hackathons.</p>`;
        }
    } else if (profile === 'Researcher') {
        const researchCount = activities.filter(a => a.type === 'research' || a.type === 'competition').length;
        const stemCount = activities.filter(a => a.type === 'competition' || a.type === 'technology').length;
        
        feedback += `<p><strong>Research & Academic:</strong> ${researchCount} activities - ${researchCount >= 1 ? 'Strong academic foundation!' : 'Seek research opportunities'}</p>`;
        feedback += `<p><strong>STEM Engagement:</strong> ${stemCount} activities - ${stemCount >= 2 ? 'Excellent STEM involvement' : 'Join more science competitions'}</p>`;
        
        if (researchCount === 0) {
            feedback += `<p><strong>💡 Suggestion:</strong> Participate in science fairs, join research programs, or compete in academic olympiads.</p>`;
        }
    }
    
    // Diversity analysis
    const uniqueTypes = new Set(activities.map(a => a.type)).size;
    feedback += `<p><strong>Diversity Score:</strong> ${uniqueTypes} different activity types - ${uniqueTypes >= 4 ? 'Excellent variety!' : 'Consider diversifying your activities'}</p>`;
    
    // Awards analysis
    const withAwards = activities.filter(a => a.prize && a.prize.trim()).length;
    if (withAwards > 0) {
        feedback += `<p><strong>Recognition:</strong> ${withAwards} activities with awards/recognition - Great achievement record!</p>`;
    }
    
    document.getElementById('extracurricularFeedback').innerHTML = feedback;
}

// Generate essay analysis feedback
function generateEssayFeedback(essayData) {
    const { title, type, content, university } = essayData;
    const profile = currentUser.profile;
    const wordCount = content.trim().split(/\s+/).length;
    
    let feedback = `<h4>📝 Essay Analysis: "${title}"</h4>`;
    feedback += `<p><strong>Word Count:</strong> ${wordCount} words</p>`;
    feedback += `<p><strong>Type:</strong> ${type} for ${university}</p><br>`;
    
    // Length analysis
    if (wordCount < 200) {
        feedback += `<p><strong>⚠️ Length:</strong> Your essay seems quite short. Most college essays should be 250-650 words.</p>`;
    } else if (wordCount > 700) {
        feedback += `<p><strong>⚠️ Length:</strong> Your essay might be too long. Consider editing for conciseness.</p>`;
    } else {
        feedback += `<p><strong>✅ Length:</strong> Good word count for a college essay.</p>`;
    }
    
    // Content analysis based on profile
    const lowerContent = content.toLowerCase();
    
    if (profile === 'Diplomat') {
        const hasLeadership = lowerContent.includes('lead') || lowerContent.includes('organize') || lowerContent.includes('team');
        const hasGlobalPerspective = lowerContent.includes('international') || lowerContent.includes('culture') || lowerContent.includes('community');
        
        feedback += `<p><strong>Leadership Themes:</strong> ${hasLeadership ? '✅ Present' : '❌ Consider adding leadership examples'}</p>`;
        feedback += `<p><strong>Global Perspective:</strong> ${hasGlobalPerspective ? '✅ Present' : '❌ Add international or community focus'}</p>`;
    } else if (profile === 'Entrepreneur') {
        const hasInnovation = lowerContent.includes('creat') || lowerContent.includes('innovat') || lowerContent.includes('solution');
        const hasInitiative = lowerContent.includes('start') || lowerContent.includes('launch') || lowerContent.includes('develop');
        
        feedback += `<p><strong>Innovation Themes:</strong> ${hasInnovation ? '✅ Present' : '❌ Highlight your creative problem-solving'}</p>`;
        feedback += `<p><strong>Initiative:</strong> ${hasInitiative ? '✅ Present' : '❌ Show examples of taking initiative'}</p>`;
    } else if (profile === 'Researcher') {
        const hasAnalysis = lowerContent.includes('analyz') || lowerContent.includes('research') || lowerContent.includes('discover');
        const hasScience = lowerContent.includes('experiment') || lowerContent.includes('data') || lowerContent.includes('method');
        
        feedback += `<p><strong>Analytical Thinking:</strong> ${hasAnalysis ? '✅ Present' : '❌ Emphasize your research and analysis skills'}</p>`;
        feedback += `<p><strong>Scientific Approach:</strong> ${hasScience ? '✅ Present' : '❌ Include scientific methodology or discovery'}</p>`;
    }
    
    // General writing quality indicators
    const hasPersonalStory = lowerContent.includes('i ') || lowerContent.includes('my ') || lowerContent.includes('when i');
    const hasSpecificExamples = content.length > 300 && (content.match(/\b(for example|specifically|in particular)\b/gi) || []).length > 0;
    
    feedback += `<p><strong>Personal Voice:</strong> ${hasPersonalStory ? '✅ Good use of personal examples' : '❌ Add more personal anecdotes'}</p>`;
    feedback += `<p><strong>Specific Examples:</strong> ${hasSpecificExamples ? '✅ Contains concrete examples' : '❌ Add more specific details and examples'}</p>`;
    
    // Connection to activities
    const activityTypes = currentUser.activities.map(a => a.type.toLowerCase());
    const mentionsActivities = activityTypes.some(type => lowerContent.includes(type));
    
    feedback += `<p><strong>Activity Connection:</strong> ${mentionsActivities ? '✅ Connects to your extracurriculars' : '❌ Consider linking to your activities'}</p>`;
    
    feedback += `<br><p><strong>💡 Overall Suggestion:</strong> Focus on specific examples that showcase your ${profile.toLowerCase()} strengths. Show, don't tell, and make sure your personality shines through!</p>`;
    
    return feedback;
}