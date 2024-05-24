document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const match = document.getElementById('match').value;
    const prediction = document.getElementById('prediction').value;
    
    const resultText = `You predicted ${prediction} to win ${match}.`;
    
    document.getElementById('results').textContent = resultText;
});
