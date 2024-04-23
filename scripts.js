function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest'; // Ensure name is trimmed of whitespace or default to 'Guest'
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100 || 0;

    // Calculate initial yearly cost
    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    
    // Start the output with the user's name and a brief of the vacation plan
    let output = `<h2>${name}'s 30 Year Vacation Plan</h2>`;
    output += `<p>If you vacation ${days} days and spend $${costPerNight} per night on your hotel, and spend $${foodPerDay} per day on food, and $${entertainmentPerDay} per day on entertainment, you will spend:</p>`;
    
    // Begin the detailed breakdown list
    let report = `<ul>`;
    report += `<li>Year 1: Total Annual Cost: $${yearlyCost.toFixed(2)}, Monthly Cost: $${(yearlyCost / 12).toFixed(2)}</li>`;

    for (let year = 2; year <= 30; year++) {
        yearlyCost *= (1 + inflationRate); // Apply inflation rate annually
        if (year % 5 === 0 || year === 30) { // Display results every 5 years and in the 30th year
            report += `<li style='margin-bottom: 20px;'>Year ${year}: Total Annual Cost: $${yearlyCost.toFixed(2)}, Monthly Cost: $${(yearlyCost / 12).toFixed(2)}</li>`;
        }
    }

    report += `</ul>`;
    document.getElementById('result').innerHTML = output + report;
}
