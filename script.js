function playAudio() {
    const audio = document.getElementById('background-music');
    if (audio.paused) {
        audio.play();
    }
}
// function rollDice() {
//     const studentName = prompt("Nhập tên sinh viên:");
//     if (studentName) {
//         let validInput = false;
//         let userNumber;
        
//         while (!validInput) {
//             const numberInput = prompt("Nhập một số trong khoảng từ 1 đến 40:");
//             userNumber = parseInt(numberInput, 10);
            
//             if (!isNaN(userNumber) && userNumber >= 1 && userNumber <= 40) {
//                 validInput = true;
//             } else {
//                 alert("Vui lòng nhập một số hợp lệ trong khoảng từ 1 đến 40.");
//             }
//         }

//         const dice = [userNumber];
//         while (dice.length < 3) {
//             const randomNum = Math.floor(Math.random() * 40) + 1;
//             if (!dice.includes(randomNum)) {
//                 dice.push(randomNum);
//             }
//         }

//         playAudio();
//         document.getElementById('dice1').textContent = dice[0];
//         document.getElementById('dice2').textContent = dice[1];
//         document.getElementById('dice3').textContent = dice[2];

//         const resultDiv = document.getElementById('result');
//         resultDiv.textContent = `Kết quả: ${dice.join(", ")}`;
//         resultDiv.style.display = 'block'; // Hiển thị phần kết quả

//         saveResult(studentName, dice);
//     }
// }
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