document.addEventListener('DOMContentLoaded', function () {
    // Attach event listener for the submit button
    document.querySelector('.submit-btn').addEventListener('click', function (event) {
        // Prevent default form submission behavior
        event.preventDefault();
        submitAnswers(); // Call submitAnswers function
    });

    // Function to handle answer submission
    function submitAnswers() {
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');
        const q4 = document.querySelector('input[name="q4"]:checked');
        const q5 = document.querySelector('input[name="q5"]:checked');

        if (q1 && q2 && q3 && q4 && q5) {
            const totalScore = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) + parseInt(q4.value) + parseInt(q5.value);

            // Display the score and blur background
            document.getElementById('result-box').style.display = 'block';
            document.getElementById('result-box').innerHTML = `Your score: .${totalScore}`;

            // Blur the background
            document.querySelector('.container').classList.add('blurred');

            // Show feedback section
            document.getElementById('feedback-section').style.display = 'block';
        } else {
            // Handle unanswered questions
            document.getElementById('result-box').style.display = 'block';
            document.getElementById('result-box').innerHTML = 'Please answer all questions!';
        }
    }

    // Handle scrolling for visibility
    const questions = document.querySelectorAll('.question');
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    function handleScroll() {
        questions.forEach(question => {
            if (isElementInViewport(question)) {
                question.classList.add('visible'); // Add the visible class when in viewport
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Trigger scroll event on load to show initial questions
window.addEventListener('load', handleScroll);

document.querySelector('.submit-btn').addEventListener('click', function (event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Calculate score (you'll need to define this function based on your logic)
    const totalScore = calculateScore();

    // Show the score overlay
    const scoreOverlay = document.getElementById('score-overlay');
    scoreOverlay.style.display = 'flex';

    // Apply blur effect to the body
    document.body.classList.add('blurred');

    // Initialize score display
    const scoreDisplay = document.getElementById('score');
    let currentScore = 0;

    // Animate score display
    const duration = 5000; // 5 seconds
    const stepTime = 20; // Time for each step in milliseconds
    const totalSteps = duration / stepTime;
    const increment = totalScore / totalSteps;

    const updateScore = setInterval(() => {
        currentScore += increment;
        if (currentScore >= totalScore) {
            currentScore = totalScore; // Ensure it doesn't exceed the total score
            clearInterval(updateScore);
            setTimeout(() => {
                // Optionally hide the overlay after a delay
                scoreOverlay.style.display = 'none';
                document.body.classList.remove('blurred'); // Remove blur effect
            }, 2000); // Adjust the delay as needed
        }
        scoreDisplay.innerText = Math.floor(currentScore);
    }, stepTime);
});

// Sample function to calculate the score based on selected answers
function calculateScore() {
    let score = 0;
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    selectedOptions.forEach(option => {
        score += parseInt(option.value); // Assuming each radio button has a value
    });
    return score;
}


