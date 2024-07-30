function playAudio() {
    const audio = document.getElementById('background-music');
    if (audio.paused) {
        audio.play();
    }
}
function rollDice() {
    const studentName = prompt("Nhập tên sinh viên:");
    if (studentName) {
        const dice = [];
        while (dice.length < 3) {
            const randomNum = Math.floor(Math.random() * 40) + 1;
            if (!dice.includes(randomNum)) {
                dice.push(randomNum);
            }
        }

        playAudio();
        document.getElementById('dice1').textContent = dice[0];
        document.getElementById('dice2').textContent = dice[1];
        document.getElementById('dice3').textContent = dice[2];

        const resultDiv = document.getElementById('result');
        resultDiv.textContent = `Kết quả: ${dice.join(", ")}`;
        resultDiv.style.display = 'block'; // Hiển thị phần kết quả

        saveResult(studentName, dice);
    }
}

function saveResult(name, dice) {
    fetch('save_result.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, dice: dice })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Kết quả đã được lưu.");
        } else {
            alert("Có lỗi xảy ra khi lưu kết quả.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}