document.addEventListener('DOMContentLoaded', function() {
    displayAllResults();
});
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
        setTimeout(() => {
            location.reload();
        }, 3000);
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
function displayAllResults() {
    fetch('results.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const allResultsDiv = document.getElementById('all-results');
            allResultsDiv.innerHTML = '<h2>Tất cả kết quả</h2>';

            // Create a table
            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';

            // Create table header
            const headerRow = document.createElement('tr');
            const headers = ['STT', 'Tên Sinh Viên', 'Dice'];

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                th.style.border = '1px solid black';
                th.style.padding = '8px';
                th.style.backgroundColor = '#f2f2f2';
                headerRow.appendChild(th);
            });

            table.appendChild(headerRow);

            // Create table rows for each result
            data.forEach((result, index) => {
                const row = document.createElement('tr');

                // Serial number (index + 1)
                const cellIndex = document.createElement('td');
                cellIndex.textContent = index + 1;
                cellIndex.style.border = '1px solid black';
                cellIndex.style.padding = '8px';
                row.appendChild(cellIndex);

                // Student name
                const cellName = document.createElement('td');
                cellName.textContent = result.name;
                cellName.style.border = '1px solid black';
                cellName.style.padding = '8px';
                row.appendChild(cellName);

                // Dice results
                const cellDice = document.createElement('td');
                cellDice.textContent = result.dice.join(", ");
                cellDice.style.border = '1px solid black';
                cellDice.style.padding = '8px';
                row.appendChild(cellDice);

                table.appendChild(row);
            });

            allResultsDiv.appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching all results:', error);
        });
}