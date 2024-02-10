function submitPoll() {
    const selectedOption = document.querySelector('input[name="poll"]:checked');
    const voteMessageContainer = document.getElementById('voteMessage'); // A container for vote messages.

    if (!selectedOption) {
        voteMessageContainer.innerHTML = "Моля изберете отговор.";
        return;
    }

    let lastVote = localStorage.getItem('lastVote');
    let votes = JSON.parse(localStorage.getItem('votes')) || {
        'Уиски': 0,
        'Вино': 0,
        'Ракия': 0,
        'Джин': 0,
        'Ром': 0,
        'Бира': 0
    };

    if (lastVote) {
        if (lastVote === selectedOption.value) {
            voteMessageContainer.innerHTML = "Вече сте гласували за тази опция.";
            displayResults(); // Ensure results are always displayed
            return;
        } else {
            votes[lastVote]--;
        }
    }

    votes[selectedOption.value]++;
    localStorage.setItem('lastVote', selectedOption.value);
    localStorage.setItem('votes', JSON.stringify(votes));

    displayResults(); // Update and display results
    voteMessageContainer.innerHTML = "Благодаря за гласуването! :)"; // Update message without hiding results
}

function displayResults() {
    let votes = JSON.parse(localStorage.getItem('votes')) || {
        'Уиски': 0,
        'Вино': 0,
        'Ракия': 0,
        'Джин': 0,
        'Ром': 0,
        'Бира': 0
    };
    let resultText = 'Резултати:<br><br>';
    for (const option in votes) {
        resultText += `${option}: ${votes[option]} votes<br>`;
    }
    
    document.getElementById('pollResult').innerHTML = resultText;
}

document.addEventListener('DOMContentLoaded', displayResults);
