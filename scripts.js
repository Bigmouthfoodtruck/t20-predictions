document.getElementById('file-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        generatePredictionForm(json);
    };
    
    reader.readAsArrayBuffer(file);
});

function generatePredictionForm(data) {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';  // Clear any existing content

    data.forEach((row, index) => {
        if (index === 0) return;  // Skip the header row
        
        const matchLabel = row[0];
        const teamA = row[1];
        const teamB = row[2];
        
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('prediction-question');
        
        const label = document.createElement('label');
        label.textContent = matchLabel;
        
        const select = document.createElement('select');
        select.name = `match${index}`;
        
        const optionA = document.createElement('option');
        optionA.value = teamA;
        optionA.textContent = teamA;
        
        const optionB = document.createElement('option');
        optionB.value = teamB;
        optionB.textContent = teamB;
        
        select.appendChild(optionA);
        select.appendChild(optionB);
        
        questionDiv.appendChild(label);
        questionDiv.appendChild(select);
        
        container.appendChild(questionDiv);
    });

    document.getElementById('prediction-form').style.display = 'block';
}

document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const results = Array.from(formData.entries()).map(([key, value]) => {
        return `<li>${key}: ${value}</li>`;
    }).join('');

    document.getElementById('results').innerHTML = `<p>You predicted the following winners:</p><ul>${results}</ul>`;
});
