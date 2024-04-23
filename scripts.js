function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest'; // Clean input, defaulting to 'Guest' if empty
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100 || 0;

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let totalProjectedCost = yearlyCost; // Accumulate total cost over 30 years

    // Start the output with the user's name and a brief of the vacation plan
    let output = `<h2>${name}'s 30 Year Vacation Plan</h2>`;
    output += `<p>If you vacation ${days} days and spend $${formatNumber(costPerNight.toFixed(2))} per night on your hotel, spend $${formatNumber(foodPerDay.toFixed(2))} per day on food, and $${formatNumber(entertainmentPerDay.toFixed(2))} per day on entertainment, you will spend:</p>`;
    
    // Begin the detailed breakdown list
    let report = `<ul>`;
    report += `<li>Year 1: Total Annual Cost: $${formatNumber(yearlyCost.toFixed(2))}, Monthly Cost: $${formatNumber((yearlyCost / 12).toFixed(2))}</li>`;

    for (let year = 2; year <= 30; year++) {
        yearlyCost *= (1 + inflationRate); // Apply inflation rate annually
        totalProjectedCost += yearlyCost; // Add each year's cost to the total projection
        if (year % 5 === 0 || year === 30) { // Display results every 5 years and in the 30th year
            report += `<li style='margin-bottom: 20px;'>Year ${year}: Total Annual Cost: $${formatNumber(yearlyCost.toFixed(2))}, Monthly Cost: $${formatNumber((yearlyCost / 12).toFixed(2))}</li>`;
        }
    }

    report += `</ul>`;
    // Append a summary of the total cost over 30 years
    report += `<p style="font-size: 24px; font-weight: bold;">In the next 30 years, you will spend: $${formatNumber(totalProjectedCost.toFixed(2))}</p>`;
    document.getElementById('result').innerHTML = output + report;
}

// Helper function to format numbers with commas for thousands
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
