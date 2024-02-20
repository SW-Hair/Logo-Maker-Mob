function generateImage() {
    const imagePrompt = document.getElementById('imagePrompt').value;

    // Show a loading message 
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = "Please Wait... Generating Image";

    fetch('https://api.deepai.org/api/text2img', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '78be5cfd-b8ba-486a-9a9b-6f473ecb489e' // Insert your DeepAI API key here
        },
        body: JSON.stringify({
            text: imagePrompt,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        imageContainer.innerHTML = ''; // Clear loading message
        const imageUrl = data.output_url; 
        displayImage(imageUrl);
    })
    .catch(error => {
        console.error('Error:', error);
        imageContainer.innerHTML = 'An error occurred. Please try again.'; 
    });
}

function displayImage(imageUrl) {
    const imageContainer = document.getElementById('imageContainer');
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageContainer.appendChild(imageElement);
}
