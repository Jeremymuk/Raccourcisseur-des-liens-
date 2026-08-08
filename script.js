async function generateShortlink() {
    const longUrl = document.getElementById('longUrl').value.trim();

    // Vérifie si le champ est vide
    if (longUrl === "") {
        document.getElementById('shortUrl').innerText = "Veuillez insérer un lien";
        return;
    }

    const apiUrl = 'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(longUrl);
    
    console.log(apiUrl);

    try {
        const response = await fetch(apiUrl);
        
        // Vérifie si la réponse du serveur est correcte (statut HTTP 200)
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const shortUrl = await response.text();

        if (shortUrl) {
            document.getElementById('shortUrl').innerText = shortUrl;
        } else {
            throw new Error('Impossible de générer le lien');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('shortUrl').innerText = 'Impossible de générer le lien';
    }
}


function copyShortUrl() { 
    const shortUrlElement = document.getElementById('shortUrl');

    if (shortUrlElement.innerText === "") {
        alert("Aucun lien à copier");
        return;
    }

    const range = document.createRange();
    range.selectNode(shortUrlElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    alert('Lien copié dans le presse-papiers : ' + shortUrlElement.innerText);
}