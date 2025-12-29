// Testo della descrizione
const descriptionText = `Il progetto interpreta l'archivio tipografico come il riflesso di una transizione psicologica che conduce dall'astrazione del sogno alla precisione della realtà. Attraverso un percorso immersivo simile a un risveglio, le forme inizialmente instabili e oniriche subiscono una progressiva razionalizzazione, trasformandosi gradualmente in una narrativa visiva coerente. L'esperienza culmina nella rivelazione del carattere tipografico finale, che emerge come il risultato naturale e definitivo di questo processo di stabilizzazione del segno.`;

// Elementi DOM
const descriptionElement = document.getElementById('description-text');
const cursorElement = document.querySelector('.cursor');
const instructionElement = document.getElementById('instruction');

// Variabili di controllo
let index = 0;
let typingInterval;
let typingSpeed = 30; // millisecondi tra un carattere e l'altro
let isComplete = false;

// Funzione per iniziare l'animazione di scrittura
function startTyping() {
    // Reset dello stato
    descriptionElement.textContent = '';
    index = 0;
    isComplete = false;
    cursorElement.style.display = 'inline-block';
    cursorElement.style.animation = 'blink 1s infinite';
    instructionElement.style.opacity = '0';
    
    // Cancella eventuali intervalli precedenti
    clearInterval(typingInterval);
    
    // Avvia l'animazione
    typingInterval = setInterval(() => {
        if (index < descriptionText.length) {
            // Aggiungi il prossimo carattere
            descriptionElement.textContent += descriptionText.charAt(index);
            index++;
            
            // Se abbiamo finito
            if (index === descriptionText.length) {
                completeTyping();
            }
        }
    }, typingSpeed);
}

// Funzione chiamata quando l'animazione è completa
function completeTyping() {
    clearInterval(typingInterval);
    isComplete = true;
    cursorElement.style.animation = 'none';
    cursorElement.style.opacity = '0';
    instructionElement.style.opacity = '0.7';
}

// Funzione per saltare l'animazione
function skipAnimation() {
    if (isComplete) return;
    
    clearInterval(typingInterval);
    descriptionElement.textContent = descriptionText;
    completeTyping();
}

// Funzione per andare alla pagina successiva
function goToNextPage() {
    // Reindirizza alla pagina intro.html nella cartella intro
    window.location.href = "intro/intro.html";
}

// Gestione del click sulla pagina
document.body.addEventListener('click', function() {
    if (!isComplete) {
        // Se l'animazione non è completa, la salta
        skipAnimation();
    } else {
        // Se l'animazione è completa, va alla pagina successiva
        goToNextPage();
    }
});

// Opzione: anche con la barra spaziatrice
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault(); // Previene lo scroll della pagina
        if (!isComplete) {
            skipAnimation();
        } else {
            goToNextPage();
        }
    }
});

// Avvia l'animazione al caricamento della pagina
window.addEventListener('DOMContentLoaded', startTyping);