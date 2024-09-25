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

            // Display the score below the submit button
            const scoreDisplay = document.getElementById('result-box');
            scoreDisplay.style.display = 'block';
            scoreDisplay.innerHTML = `Your score: ${totalScore}`;

            // Show feedback section (if applicable)
            document.getElementById('feedback-section').style.display = 'block';
        } else {
            // Handle unanswered questions
            const scoreDisplay = document.getElementById('result-box');
            scoreDisplay.style.display = 'block';
            scoreDisplay.innerHTML = 'Please answer all questions!';
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

// Sample function to calculate the score based on selected answers
function calculateScore() {
    let score = 0;
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    selectedOptions.forEach(option => {
        score += parseInt(option.value); // Assuming each radio button has a value
    });
    return score;
}
