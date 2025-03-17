document.addEventListener("DOMContentLoaded", function() {
  // Fetch the CSV file from the same directory
  fetch('Car_parks.csv')
    .then(response => response.text())
    .then(data => {
      // Split the CSV data into rows
      const rows = data.split('\n');
      // Create the table element
      const table = document.createElement('table');

      // Check if there is at least one row (the header)
      if (rows.length > 0) {
        // Create the header row
        const headerRow = document.createElement('tr');
        const headers = rows[0].split(',');
        headers.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText.trim();
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
      }

      // Loop through the remaining rows and add them to the table
      for (let i = 1; i < rows.length; i++) {
        // Skip empty rows
        if (!rows[i].trim()) continue;
        const row = document.createElement('tr');
        const cells = rows[i].split(',');
        cells.forEach(cellText => {
          const td = document.createElement('td');
          td.textContent = cellText.trim();
          row.appendChild(td);
        });
        table.appendChild(row);
      }

      // Append the table to the container in the HTML
      document.getElementById('carpark-container').appendChild(table);
    })
    .catch(error => {
      console.error('Error fetching CSV data:', error);
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'There was an error loading the car park data.';
      document.getElementById('carpark-container').appendChild(errorMsg);
    });
});
