window.onload = function () {
    showRandomFlashcard();
};

function showRandomFlashcard() {
    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

    if (flashcards.length === 0) {
        document.getElementById('flashcard').innerHTML = "<p>You don't have any flash cards</p>";
        return;
    }

    const randomIndex = Math.floor(Math.random() * flashcards.length);
    const randomFlashcard = flashcards[randomIndex];

    document.getElementById('question').innerText = randomFlashcard.question;
    document.getElementById('answer').innerText = randomFlashcard.answer;
    document.getElementById('answer').style.display = 'none';
}

function flipCard() {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');

    if (answerElement.style.display === 'none') {
        answerElement.style.display = 'block';
    } else {
        answerElement.style.display = 'none';
    }
}

function saveFlashcard() {
    const question = document.getElementById('questionInput').value;
    const answer = document.getElementById('answerInput').value;

    if (question && answer) {
        const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        flashcards.push({ question, answer });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));

        document.getElementById('questionInput').value = '';
        document.getElementById('answerInput').value = '';
        showRandomFlashcard(); // Show a random flashcard after saving
    }
}

function saveData() {
    const data = localStorage.getItem('flashcards');
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'flashcards.json';
    a.click();
}

function loadData() {
    const input = document.getElementById('loadInput');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const jsonData = e.target.result;
            localStorage.setItem('flashcards', jsonData);
            showRandomFlashcard(); // Show a random flashcard after loading
        };
        reader.readAsText(file);
    }
}