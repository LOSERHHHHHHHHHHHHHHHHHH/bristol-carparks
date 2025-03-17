document.addEventListener('DOMContentLoaded', () => {
  fetch('Car_parks.csv')
    .then(response => response.text())
    .then(csvData => {
      const rows = csvData.split('\n').map(row => row.split(','));
      const table = document.createElement('table');

      // Create table header from first row
      const headerRow = document.createElement('tr');
      rows[0].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText.trim();
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Create table rows
      for (let i = 1; i < rows.length; i++) {
        // Skip empty rows
        if (!rows[i] || rows[i].length === 0) continue;

        const dataRow = document.createElement('tr');
        rows[i].forEach(cell => {
          const td = document.createElement('td');
          td.textContent = cell.trim();
          dataRow.appendChild(td);
        });
        table.appendChild(dataRow);
      }

      document.getElementById('carpark-container').appendChild(table);
    })
    .catch(err => {
      console.error('Error loading CSV:', err);
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Error loading car park data.';
      document.getElementById('carpark-container').appendChild(errorMsg);
    });
});
