document.getElementById('submitPollButton').addEventListener('click', submitPoll);

function submitPoll() {
    const selectedOption = document.querySelector('input[name="poll"]:checked');
    const voteMessageContainer = document.getElementById('voteMessage');

    if (!selectedOption) {
        voteMessageContainer.innerHTML = "Моля изберете отговор.";
        return;
    }

    fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option: selectedOption.value }),
    })
    .then(response => response.json())
    .then(data => {
        voteMessageContainer.innerHTML = "Благодаря за гласуването! :)";
        displayResults(); // Call displayResults to update the vote counts on the page
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResults() {
    fetch('/votes')
    .then(response => response.json())
    .then(data => {
        const pollResultContainer = document.getElementById('pollResult');
        pollResultContainer.innerHTML = Object.keys(data).map(option => `${option}: ${data[option]} votes<br>`).join('');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
