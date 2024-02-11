export function submitPoll(db) {
    const selectedOption = document.querySelector('input[name="poll"]:checked');
    const voteMessageContainer = document.getElementById('voteMessage');

    if (!selectedOption) {
        voteMessageContainer.innerHTML = "Моля изберете отговор.";
        return;
    }

    const voteOption = selectedOption.value;
    const votesRef = firebase.database().ref('votes/' + voteOption);

    // Increment the vote count for the selected option
    votesRef.transaction(currentVotes => {
        return (currentVotes || 0) + 1;
    });

    voteMessageContainer.innerHTML = "Благодаря за гласуването! :)";
}

export function displayResults() {
    const votesRef = firebase.database().ref('votes');
    votesRef.on('value', snapshot => {
        const votes = snapshot.val();
        let resultText = 'Резултати:<br><br>';
        const options = ['Уиски', 'Вино', 'Ракия', 'Джин', 'Ром', 'Бира']; // Add all the options you have
        options.forEach(option => {
            const voteCount = votes && votes[option] ? votes[option] : 0;
            resultText += `${option}: ${voteCount} votes<br>`;
        });
        document.getElementById('pollResult').innerHTML = resultText;
    });
}

document.addEventListener('DOMContentLoaded', displayResults);
