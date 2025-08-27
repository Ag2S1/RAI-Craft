async function loadScores() {
    // Append a timestamp query parameter and disable cache to prevent browsers from
    // serving a cached version of the CSV file.
    const response = await fetch(`matches.csv?cacheBust=${Date.now()}`, {
        cache: 'no-store'
    });
    const text = await response.text();
    const lines = text.trim().split(/\r?\n/);
    lines.shift(); // remove header

    const ratings = new Map();
    const K = 32;

    for (const line of lines) {
        if (!line.trim()) continue;
        const [timestamp, p1, p2, winner] = line.split(',');
        const r1 = ratings.get(p1) || 1000;
        const r2 = ratings.get(p2) || 1000;
        const expected1 = 1 / (1 + Math.pow(10, (r2 - r1) / 400));
        const expected2 = 1 - expected1;
        const result1 = winner === p1 ? 1 : 0;
        const result2 = 1 - result1;
        ratings.set(p1, r1 + K * (result1 - expected1));
        ratings.set(p2, r2 + K * (result2 - expected2));
    }

    const standings = Array.from(ratings.entries()).sort((a, b) => b[1] - a[1]);
    const container = document.getElementById('scoreboard');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['Player', 'Rating'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    standings.forEach(([player, rating]) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = player;
        const ratingCell = document.createElement('td');
        ratingCell.textContent = Math.round(rating);
        row.appendChild(nameCell);
        row.appendChild(ratingCell);
        table.appendChild(row);
    });

    container.innerHTML = '';
    container.appendChild(table);
}

loadScores();
