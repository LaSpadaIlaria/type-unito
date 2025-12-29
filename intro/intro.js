// Testo della descrizione con ritorni a capo
const textLines = [
    "Hai fatto un sogno.",
    "Stai cercando di ricordarlo.",
    "",
    "Non trovi le parole.",
    "Trovi le lettere.",
    "",
    "A occhi aperti sfuggono.",
    "Chiudendoli, tornano."
];

// Elementi DOM
const descriptionElement = document.getElementById('description-text');
const cursorElement = document.getElementById('cursor');
const instructionElement = document.getElementById('instruction');
const bodyElement = document.body;
const containerElement = document.querySelector('.container');
const upperEyelid = document.querySelector('.eyelid.upper');
const lowerEyelid = document.querySelector('.eyelid.lower');

// Variabili di controllo
let lineIndex = 0;
let charIndex = 0;
let typingInterval;
const typingSpeed = 60;
let isComplete = false;
let isClosing = false;

// Funzione per iniziare l'animazione di scrittura
function startTyping() {
    // Reset dello stato
    descriptionElement.innerHTML = '<span class="quote">"</span>';
    lineIndex = 0;
    charIndex = 0;
    isComplete = false;
    isClosing = false;
    cursorElement.style.display = 'inline-block';
    cursorElement.style.animation = 'blink 1s infinite';
    cursorElement.style.opacity = '1';
    instructionElement.style.opacity = '0';
    containerElement.style.opacity = '1';
    
    // Reset palpebre
    if (upperEyelid) {
        upperEyelid.style.cssText = 'height: 0px !important; transform: translateY(-100%) !important;';
        upperEyelid.classList.remove('closing');
    }
    
    if (lowerEyelid) {
        lowerEyelid.style.cssText = 'height: 0px !important; transform: translateY(100%) !important;';
        lowerEyelid.classList.remove('closing');
    }
    
    // Cancella eventuali intervalli precedenti
    clearInterval(typingInterval);
    
    // Avvia l'animazione
    typingInterval = setInterval(typeNextCharacter, typingSpeed);
}

// Funzione per scrivere il prossimo carattere
function typeNextCharacter() {
    // Se abbiamo finito tutte le righe
    if (lineIndex >= textLines.length) {
        // Aggiungi la virgoletta di chiusura
        descriptionElement.innerHTML += '<span class="quote">"</span>';
        completeTyping();
        return;
    }
    
    const currentLine = textLines[lineIndex];
    
    // Se è una riga vuota, va a capo
    if (currentLine === "") {
        descriptionElement.innerHTML += '<br><br>';
        lineIndex++;
        charIndex = 0;
        return;
    }
    
    // Se non abbiamo ancora finito la riga corrente
    if (charIndex < currentLine.length) {
        // Aggiungi il prossimo carattere
        descriptionElement.innerHTML += currentLine.charAt(charIndex);
        charIndex++;
    } else {
        // Finita la riga corrente, va a capo
        if (lineIndex < textLines.length - 1) {
            descriptionElement.innerHTML += '<br>';
        }
        lineIndex++;
        charIndex = 0;
    }
}

// Funzione chiamata quando l'animazione è completa
function completeTyping() {
    clearInterval(typingInterval);
    isComplete = true;
    cursorElement.style.animation = 'none';
    cursorElement.style.opacity = '0';
    instructionElement.style.opacity = '0.7';
    console.log('Testo completo, pronto per la chiusura occhio');
}

// Funzione per saltare l'animazione
function skipAnimation() {
    if (isComplete) return;
    
    clearInterval(typingInterval);
    // Ricostruisci tutto il testo con i ritorni a capo corretti e le virgolette
    let fullText = '<span class="quote">"</span>';
    
    for (let i = 0; i < textLines.length; i++) {
        if (textLines[i] === "") {
            fullText += "<br><br>";
        } else {
            fullText += textLines[i];
            if (i < textLines.length - 1 && textLines[i + 1] !== "") {
                fullText += "<br>";
            }
        }
    }
    
    fullText += '<span class="quote">"</span>';
    descriptionElement.innerHTML = fullText;
    
    completeTyping();
}

// Funzione per iniziare l'effetto di chiusura degli occhi
function startEyeClosing() {
    if (isClosing || !isComplete) {
        console.log('Animazione già in corso o testo non completo');
        return;
    }
    
    isClosing = true;
    console.log('Inizio animazione chiusura occhio');
    
    instructionElement.style.opacity = '0';
    cursorElement.style.display = 'none';
    
    // Assicurati che le palpebre esistano
    if (!upperEyelid || !lowerEyelid) {
        console.error('Palpebre non trovate nel DOM');
        // Crea le palpebre se non esistono
        createEyelids();
        return;
    }
    
    // Forza reset delle proprietà prima dell'animazione
    upperEyelid.style.cssText = '';
    lowerEyelid.style.cssText = '';
    
    // Forza un reflow per garantire che l'animazione parta
    void upperEyelid.offsetWidth;
    void lowerEyelid.offsetWidth;
    
    // Aggiungi la classe per attivare l'animazione
    console.log('Aggiungo classe closing alle palpebre');
    upperEyelid.classList.add('closing');
    lowerEyelid.classList.add('closing');
    
    // Dopo 1 secondo, inizia a sfumare il contenuto
    setTimeout(() => {
        if (containerElement) {
            containerElement.style.opacity = '0';
            console.log('Contenuto inizia a sfumare');
        }
    }, 1000);
    
    // Aspetta che l'animazione finisca (2 secondi) prima di cambiare pagina
    setTimeout(() => {
        console.log('Animazione completata, passaggio a experience.html');
        goToNextPage();
    }, 2000);
}

// Funzione di fallback per creare le palpebre se mancano
function createEyelids() {
    console.log('Creazione palpebre...');
    
    const upper = document.createElement('div');
    upper.className = 'eyelid upper';
    upper.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%; height: 0; background-color: #000000; z-index: 1000; pointer-events: none; transform: translateY(-100%); border-radius: 0 0 50% 50%; transition: all 2s ease;';
    
    const lower = document.createElement('div');
    lower.className = 'eyelid lower';
    lower.style.cssText = 'position: fixed; left: 0; bottom: 0; width: 100%; height: 0; background-color: #000000; z-index: 1000; pointer-events: none; transform: translateY(100%); border-radius: 50% 50% 0 0; transition: all 2s ease;';
    
    document.body.appendChild(upper);
    document.body.appendChild(lower);
    
    // Richiama la funzione dopo aver creato gli elementi
    setTimeout(() => {
        startEyeClosing();
    }, 100);
}

// Funzione per andare alla pagina successiva (experience.html)
function goToNextPage() {
    console.log('Reindirizzamento a ../experience/experience.html');
    window.location.href = "../experience/experience.html";
}

// Gestione del click sulla pagina
document.body.addEventListener('click', function() {
    console.log('Click rilevato, isComplete:', isComplete, 'isClosing:', isClosing);
    
    if (!isComplete) {
        // Se l'animazione non è completa, la salta
        console.log('Salto animazione testo');
        skipAnimation();
    } else if (!isClosing) {
        // Se l'animazione è completa e non sta già chiudendo, inizia l'effetto
        console.log('Avvio chiusura occhio');
        startEyeClosing();
    }
});

// Opzione: anche con la barra spaziatrice
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        console.log('Spazio premuto');
        if (!isComplete) {
            skipAnimation();
        } else if (!isClosing) {
            startEyeClosing();
        }
    }
});

// Avvia l'animazione al caricamento della pagina
window.addEventListener('DOMContentLoaded', startTyping);