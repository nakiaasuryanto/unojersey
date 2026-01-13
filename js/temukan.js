/**
 * UnoJersey Temukan Page - Quiz Logic
 * Handles multi-step quiz, recommendation algorithm, and Google Sheets submission
 */

// Google Sheets Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1oM7JOETvzmNPRBRx4wtgGgmuf8uYCP6Hpr0fbfICs6zhoJFRN8VZcMyc26SiNkGzhw/exec';

// Quiz state management
const quizState = {
    currentStep: 'intro',
    answers: {
        q1_sport: null,
        q2_teamSize: null,
        q3_style: null,
        q4_budget: null,
        q5_urgency: null
    },
    userData: {
        name: '',
        phone: ''
    },
    recommendation: null
};

// Recommendation mapping based on quiz answers
const recommendationMap = {
    // Basketball combinations
    'basketball-bold': {
        jersey: 'Jersey Basketball Bold Edition',
        type: 'Basketball Jersey',
        style: 'Bold'
    },
    'basketball-minimalis': {
        jersey: 'Jersey Basketball Pro Minimalis',
        type: 'Basketball Jersey',
        style: 'Minimalis'
    },
    'basketball-klasik': {
        jersey: 'Jersey Basketball Classic',
        type: 'Basketball Jersey',
        style: 'Klasik'
    },
    'basketball-retro': {
        jersey: 'Jersey Basketball Retro Style',
        type: 'Basketball Jersey',
        style: 'Retro'
    },
    'basketball-modern': {
        jersey: 'Jersey Basketball Modern Tech',
        type: 'Basketball Jersey',
        style: 'Modern'
    },

    // Futsal combinations
    'futsal-bold': {
        jersey: 'Jersey Futsal Bold Strike',
        type: 'Futsal Jersey',
        style: 'Bold'
    },
    'futsal-minimalis': {
        jersey: 'Jersey Futsal Minimalis Pro',
        type: 'Futsal Jersey',
        style: 'Minimalis'
    },
    'futsal-klasik': {
        jersey: 'Jersey Futsal Classic V2',
        type: 'Futsal Jersey',
        style: 'Klasik'
    },
    'futsal-retro': {
        jersey: 'Jersey Futsal Retro Legend',
        type: 'Futsal Jersey',
        style: 'Retro'
    },
    'futsal-modern': {
        jersey: 'Jersey Futsal Modern Aero',
        type: 'Futsal Jersey',
        style: 'Modern'
    },

    // Volleyball combinations
    'voli-bold': {
        jersey: 'Jersey Voli Bold Power',
        type: 'Volleyball Jersey',
        style: 'Bold'
    },
    'voli-minimalis': {
        jersey: 'Jersey Voli Minimalis Lite',
        type: 'Volleyball Jersey',
        style: 'Minimalis'
    },
    'voli-klasik': {
        jersey: 'Jersey Voli Classic Net',
        type: 'Volleyball Jersey',
        style: 'Klasik'
    },
    'voli-retro': {
        jersey: 'Jersey Voli Retro Smash',
        type: 'Volleyball Jersey',
        style: 'Retro'
    },
    'voli-modern': {
        jersey: 'Jersey Voli Modern Flex',
        type: 'Volleyball Jersey',
        style: 'Modern'
    },

    // Running combinations
    'running-bold': {
        jersey: 'Jersey Running Bold Sprint',
        type: 'Running Jersey',
        style: 'Bold'
    },
    'running-minimalis': {
        jersey: 'Jersey Running Minimalis Run',
        type: 'Running Jersey',
        style: 'Minimalis'
    },
    'running-klasik': {
        jersey: 'Jersey Running Classic Pace',
        type: 'Running Jersey',
        style: 'Klasik'
    },
    'running-retro': {
        jersey: 'Jersey Running Retro Track',
        type: 'Running Jersey',
        style: 'Retro'
    },
    'running-modern': {
        jersey: 'Jersey Running Modern Flow',
        type: 'Running Jersey',
        style: 'Modern'
    },

    // Default for "Lainnya"
    'lainnya-bold': {
        jersey: 'Jersey Custom Bold Edition',
        type: 'Custom Jersey',
        style: 'Bold'
    },
    'lainnya-minimalis': {
        jersey: 'Jersey Custom Minimalis',
        type: 'Custom Jersey',
        style: 'Minimalis'
    },
    'lainnya-klasik': {
        jersey: 'Jersey Custom Classic',
        type: 'Custom Jersey',
        style: 'Klasik'
    },
    'lainnya-retro': {
        jersey: 'Jersey Custom Retro',
        type: 'Custom Jersey',
        style: 'Retro'
    },
    'lainnya-modern': {
        jersey: 'Jersey Custom Modern',
        type: 'Custom Jersey',
        style: 'Modern'
    }
};

// DOM elements
const screens = {
    intro: document.getElementById('screen-intro'),
    q1: document.getElementById('screen-q1'),
    q2: document.getElementById('screen-q2'),
    q3: document.getElementById('screen-q3'),
    q4: document.getElementById('screen-q4'),
    q5: document.getElementById('screen-q5'),
    form: document.getElementById('screen-form'),
    loading: document.getElementById('screen-loading'),
    result: document.getElementById('screen-result')
};

// Navigation functions
function showScreen(screenId) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenId].classList.add('active');
    quizState.currentStep = screenId;
}

// Initialize event listeners
function initQuiz() {
    // Start quiz button
    document.getElementById('btn-start-quiz').addEventListener('click', () => {
        showScreen('q1');
    });

    // Question 1 - Sport
    setupQuestionOptions('screen-q1', (value) => {
        quizState.answers.q1_sport = value;
        showScreen('q2');
    });

    // Question 2 - Team Size
    setupQuestionOptions('screen-q2', (value) => {
        quizState.answers.q2_teamSize = value;
        showScreen('q3');
    });

    // Question 3 - Style Preference
    setupQuestionOptions('screen-q3', (value) => {
        quizState.answers.q3_style = value;
        showScreen('q4');
    });

    // Question 4 - Budget
    setupQuestionOptions('screen-q4', (value) => {
        quizState.answers.q4_budget = value;
        showScreen('q5');
    });

    // Question 5 - Urgency
    setupQuestionOptions('screen-q5', (value) => {
        quizState.answers.q5_urgency = value;
        showScreen('form');
    });

    // User form submission
    document.getElementById('user-form').addEventListener('submit', handleFormSubmit);

    // Design Now button
    document.getElementById('btn-design-now').addEventListener('click', (e) => {
        e.preventDefault();
        redirectToKreasikan();
    });
}

// Setup option click handlers for a question screen
function setupQuestionOptions(screenId, callback) {
    const screen = document.getElementById(screenId);
    const options = screen.querySelectorAll('.option-card');

    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            // Small delay for visual feedback
            setTimeout(() => callback(option.dataset.value), 200);
        });
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const termsCheckbox = document.getElementById('terms-agree');

    // Validate
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!termsCheckbox.checked) {
        alert('Mohon setujui Syarat & Ketentuan');
        return;
    }

    // Store user data
    quizState.userData.name = nameInput.value.trim();
    quizState.userData.phone = phoneInput.value.trim();

    // Calculate recommendation
    quizState.recommendation = calculateRecommendation();

    // Show loading screen
    showScreen('loading');

    // Submit to database - TEMPORARILY DISABLED
    // try {
    //     await submitQuizData();
    // } catch (error) {
    //     console.error('Failed to submit quiz data:', error);
    //     // Continue to result even if submission fails
    // }

    // Show result after 1.5 seconds
    setTimeout(() => {
        displayResult();
    }, 1500);
}

// Calculate recommendation based on quiz answers
function calculateRecommendation() {
    const { q1_sport, q3_style } = quizState.answers;
    const key = `${q1_sport}-${q3_style}`;

    // Get recommendation from map, or use default
    const rec = recommendationMap[key] || {
        jersey: 'Jersey Custom Premium',
        type: 'Custom Jersey',
        style: q3_style || 'Modern'
    };

    return rec;
}

// Submit quiz data to Google Sheets via Apps Script
async function submitQuizData() {
    console.log('📤 Submitting to Google Sheets...');

    // Prepare payload for Google Sheets (matches Apps Script expectations)
    const payload = {
        name: quizState.userData.name,
        phone: quizState.userData.phone,
        sport: quizState.answers.q1_sport,
        team_size: quizState.answers.q2_teamSize,
        style: quizState.answers.q3_style,
        budget: quizState.answers.q4_budget,
        timeline: quizState.answers.q5_urgency,
        recommendation: quizState.recommendation.jersey
    };

    console.log('📦 Payload:', payload);

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // CRITICAL: Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Note: With no-cors mode, we cannot read the response
        // But the submission still works!
        console.log('✅ Data submitted to Google Sheets successfully');
        return true;

    } catch (error) {
        console.error('❌ Google Sheets submission error:', error);
        // Don't throw - allow user to continue to result
        return false;
    }
}

// Display result on the result screen
function displayResult() {
    const rec = quizState.recommendation;

    // Update result elements
    document.getElementById('result-jersey-name').textContent = rec.jersey;
    document.getElementById('result-type').textContent = rec.type;
    document.getElementById('result-style').textContent = rec.style;
    document.getElementById('result-sport').textContent = getSportLabel(quizState.answers.q1_sport);
    document.getElementById('result-team-size').textContent = getTeamSizeLabel(quizState.answers.q2_teamSize);

    // Show result screen
    showScreen('result');
}

// Redirect to Kreasikan page with quiz data
function redirectToKreasikan() {
    const params = new URLSearchParams({
        jerseyType: quizState.recommendation.type,
        style: quizState.recommendation.style,
        name: quizState.userData.name,
        phone: quizState.userData.phone,
        sport: quizState.answers.q1_sport,
        teamSize: quizState.answers.q2_teamSize
    });

    window.location.href = `kreasikan/index.html?${params.toString()}`;
}

// Helper: Get sport label
function getSportLabel(sport) {
    const labels = {
        'basketball': 'Basket',
        'futsal': 'Futsal',
        'voli': 'Voli',
        'running': 'Running',
        'lainnya': 'Olahraga Lain'
    };
    return labels[sport] || sport;
}

// Helper: Get team size label
function getTeamSizeLabel(size) {
    const labels = {
        '1-5': '1-5 Orang',
        '6-10': '6-10 Orang',
        '11-15': '11-15 Orang',
        '16+': '16+ Orang'
    };
    return labels[size] || size;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    initQuiz();
}
