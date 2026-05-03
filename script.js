document.addEventListener('DOMContentLoaded', () => {
    // Simple table sorting for the comparison table
    const table = document.querySelector('.comparison-table');
    if (table) {
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            // Ignore the "Veredito" column (usually last)
            if (index === headers.length - 1) return;
            
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
        });
    }

    function sortTable(table, column) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Determine current sort direction
        const isAscending = table.getAttribute('data-sort-dir') === 'asc';
        const direction = isAscending ? -1 : 1;
        table.setAttribute('data-sort-dir', isAscending ? 'desc' : 'asc');

        rows.sort((a, b) => {
            const aText = a.querySelectorAll('td')[column].textContent.trim();
            const bText = b.querySelectorAll('td')[column].textContent.trim();
            
            // Check if it's a price (e.g. $99/mês)
            const aPrice = parseFloat(aText.replace(/[^0-9.]/g, ''));
            const bPrice = parseFloat(bText.replace(/[^0-9.]/g, ''));
            
            if (!isNaN(aPrice) && !isNaN(bPrice)) {
                return (aPrice - bPrice) * direction;
            }
            
            return aText.localeCompare(bText) * direction;
        });

        // Re-append rows in sorted order
        rows.forEach(row => tbody.appendChild(row));
    }
});
