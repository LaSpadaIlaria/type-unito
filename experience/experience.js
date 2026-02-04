// ============ DATI DEL PERCORSO ============
const ORIGINAL_POINTS = [
    {x: 7853, y: 16849}, {x: 10975, y: 21322}, {x: 8947, y: 20178},
    {x: 11477, y: 18139}, {x: 14239, y: 15658}, {x: 10053, y: 13004},
    {x: 11477, y: 12162}, {x: 16828, y: 13392}, {x: 16577, y: 10112},
    {x: 13297, y: 5602}, {x: 16577, y: 3789}, {x: 16828, y: 4933},
    {x: 18166, y: 4291}, {x: 19547, y: 6341}, {x: 22309, y: 5602},
    {x: 24165, y: 7285}, {x: 27035, y: 8105}, {x: 25028, y: 11911},
    {x: 19798, y: 11409}, {x: 23294, y: 9610}, {x: 28861, y: 6783},
    {x: 31530, y: 5184}, {x: 30516, y: 1861}, {x: 34055, y: 2854},
    {x: 36321, y: 6532}, {x: 37616, y: 9861}, {x: 36688, y: 13011},
    {x: 30516, y: 8607}, {x: 35372, y: 11544}, {x: 31638, y: 18139},
    {x: 30265, y: 21613}, {x: 35121, y: 25044}, {x: 35833, y: 29619},
    {x: 33654, y: 35433}, {x: 11226, y: 35433}, {x: 11226, y: 45694}
];

const NODO_IMAGE_SETTINGS = {
    1: { offsetX: -10000, offsetY: -3000, scale: 0 },
    2: { offsetX: -10000, offsetY: 2000, scale: 7 },
    3: { offsetX: -5000, offsetY: -10000, scale: 8 },
    4: { offsetX: -9000, offsetY: -5500, scale: 8 },
    5: { offsetX: -3000, offsetY: 2000, scale: 8 },
    6: { offsetX: 1000, offsetY: -5000, scale: 9 },
    7: { offsetX: 0, offsetY: -3500, scale: 6 },
    8: { offsetX: -3000, offsetY: -5000, scale: 8 },
    9: { offsetX: 2000, offsetY: -2000, scale: 7 },
    10: { offsetX: -3000, offsetY: -5000, scale: 8 },
    11: { offsetX: -2500, offsetY: -7000, scale: 8 },
    12: { offsetX: -2500, offsetY: -7500, scale: 8 },
    13: { offsetX: -2000, offsetY: -6000, scale: 8 },
    14: { offsetX: -7000, offsetY: -2000, scale: 8 },
    15: { offsetX: -2500, offsetY: 1400, scale: 10 },
    16: { offsetX: -2000, offsetY: 2000, scale: 7 },
    17: { offsetX: 1500, offsetY: -1000, scale: 7 },
    18: { offsetX: -7000, offsetY: -2000, scale: 11 },
    19: { offsetX: -2000, offsetY: -5550, scale: 10 },
    20: { offsetX: -5200, offsetY: -3000, scale: 13 },
    21: { offsetX: -2400, offsetY: -7000, scale: 8 },
    22: { offsetX: -2600, offsetY: -7000, scale: 7 },
    23: { offsetX: -3000, offsetY: -7000, scale: 7 },
    24: { offsetX: -2000, offsetY: -6000, scale: 9 },
    25: { offsetX: -5000, offsetY: -2000, scale: 11 },
};

// Testi delle lettere (nodi 2-25 corrispondono a testi 1-24)
const LETTER_TEXTS = [
    "Nebulosa... <br> non la raggiungi, la percepisci... <br> solo quando riesci a seguirla. Non sai bene dove sei... <br> lo spazio è confuso. Le grazie si avvolgono... turbini... filamenti d'inchiostro che nascondono...<br> La lettera c'è... <br> forse...<br> dietro... Ti muovi... cerchi di afferrarla... <br> ma lei si ritrae... si nasconde nelle sue stesse curve... Lo spazio respira... ondeggia... E tu cerchi... una strada... tra quei filamenti che si intrecciano... <br> pensieri appena formati...",
    
    "Qualcosa si avvolge… una curva che danza…<br> ritmo… <br>rapidità…<br> Le grazie conducono alla lettera, la creano, <br>la fanno nascere: Scende la prima asta. Veloce, spessa, non guarda dove va… poi…rallenta. La barra diventa un punto di sospensione che devia il movimento verso destra, un'altra asta …<br> SLASH!<br> Un taglio. E poi… rinascita.",
    
    "Inizi a muoverti...<br> inizi a definirti... <br>forse sai dove ti trovi? Le curve salgono<br> scendono...<br> salgono di nuovo...<br> Tre archi che si inseguono... fluidi... senza interruzione. <br>Scorre il gesto, continuo, come acqua che trova la sua strada. Non ci sono angoli, solo movimento. <br> Il pennino danza sulla superficie, lascia tracce morbide, quasi trasparenti. Dove finisce una curva ne inizia un'altra.",
    
    "Una curva ampia si solleva e poi si spezza.<br>Un taglio attraversa la forma.<br>Il tratto superiore si avvolge in una voluta incerta,<br>quello inferiore si allunga in una coda sottile che si perde nello spazio.<br>La forma, divisa, tenta di restare unita:<br>due parti che erano una,<br>ora sospese.<br>Il finale si ripiega come un uncino,<br>in cerca di un appiglio assente.",
    
    "Qualcosa si addensa.<br>Le forme si scuriscono, il sogno prende corpo.<br>Aste salgono come torri e si fratturano in angoli acuti.<br>Un'architettura instabile, come un castello ricordato a metà,<br>con guglie che attraversano la nebbia.<br>Il nero si stratifica in zone d'ombra,<br>le grazie diventano artigli:<br>la lettera si aggrappa allo spazio per non dissolversi.",
    
    "Pelosa, spinosa.<br> Una curva si apre ampia e generosa,<br> ma il bordo è irregolare, frastagliato.<br> Ricorda una creatura, forse una pianta,<br> eppure è una lettera.<br> Si avvolge come una coda:<br> morbida all'interno, aggressiva all'esterno.<br> La forma respira,<br> forse si muove.",
    
    "Un unico tratto nasce in un ricciolo<br> che si avvolge su sé stesso, poi scende e risale.<br>La curva si gonfia, crea sospensione, quindi ricade senza interruzione.<br>Si apre in una seconda pancia, più ampia e accogliente.<br>Il gesto è continuo, como un nastro che si piega e si ripiega,<br>nel tentativo di contenere,<br>forse di proteggere.",
    
    "Si spezza…<br>Due curve opposte, una sopra e una sotto, unite da un segno che scende e attraversa.<br>I bordi non sono netti: la curva superiore si gonfia, accenna una punta rapida.<br>Il tratto vibra, perde definizione, i contorni sfumano.<br>La curva inferiore conserva una peluria vitale, si riavvolge in un ricciolo denso, pulsante.<br>Una forma che si tende in direzioni opposte,<br>strappata tra alto e basso,<br>tra ciò che era e ciò che diventa.",

    "Due occhi si aprono nella forma.<br> Due fori circolari, simmetrici, scuri.<br> La struttura è massiccia, geometrica, costruita su verticali spesse e curve chiuse.<br> Al centro una forma a mandorla divide e tiene insieme.<br> I terminali laterali si aprono verso l'esterno, come corna o antenne.<br> Il nero è compatto, denso.<br> La fluidità si è fermata:<br> la lettera prende corpo e ti guarda.",

    "Massiccia, quadrata.<br> Una verticale ferma trattiene pressione.<br> Sopra e sotto si gonfiano come aria compressa.<br> Al centro qualcosa vibra:<br> un ricciolo morfologicoo, denso, che spinge verso destra.<br> La struttura resta immobile,<br> ma da lì nasce un'onda.<br> Silenzio e suono insieme.",

    "Il sogno ricade e si fa ornamento.<br> Una verticale scende e si avvolge in una spirale ampia, irregolare.<br> Altri riccioli germogliano dall'asta principale.<br> I contorni vibrano, si moltiplicano.<br> La forma cresce, si espande senza controllo.<br> È una lettera viva, organica, in continua trasformazione.",

    "La forma è tirata in due direzioni.<br> La curva superiore trattiene,<br> quella inferiore trascina altrove.<br> Le grazie non decorano:<br> afferrano, tendono, sciolgono.<br> Il tratto si assottiglia nei nodi,<br> come una lettera che fatica a restare intera.",

    "La verticale è morbida, instabile.<br> Ondula prima di scendere.<br> A destra si apre una spirale.<br> Cerchi che si stringono verso un centro nero.<br> È un occhio, un vortice.<br> Ti attira, ti trascina dentro.<br> Tutto converge, tutto sprofonda.",

    "Dopo la caduta, un cerchio.<br> Ampio, chiuso, contenitivo.<br> Dentro, una curva a cuore crea tensione.<br> La forma tenta di proteggersi.<br> Ma una coda emerge e scivola fuori.<br> È una via di fuga.<br> Sospesa tra restare e liberarsi.",

    "Una verticale ferma scende decisa.<br> Da lì nasce una spalla verso destra.<br> Non si chiude: si solleva e si arrotola<br> in una spirale stretta.<br> La struttura è stabile,<br> ma il finale conserva il sogno.<br> Un piede piantato,<br> la testa ancora altrove.",

    "La pancia si apre ampia sul lato sinistro.<br> Accoglie lo spazio, respira.<br> A destra la curva si chiude quasi del tutto.<br> La spalla sale dritta, con una chiusura accennata.<br> Il gesto è continuo, controllato.<br> La forma si definisce, ma resta morbida.",

    "Due archi paralleli si rispecchiano.<br> Creano controforme gemelle.<br> Al centro nasce un tronco.<br> Le terminazioni si riavvolgono verso l'interno.<br> Ritmo binario, doppio battito.<br> Curve sincronizzate che respirano insieme.",

    "Due braccia diagonali scendono verso un apice affilato.<br> In alto, un ricciolo guarda indietro,<br> una goccia cade dall'altro lato.<br> I tratti si assottigliano verso l'incontro.<br> È una forma che conserva memoria,<br> ancora rivolta al passato.",

    "Liquida, ondulata.<br> La forma scorre e vibra.<br> A sinistra è organica,<br> a destra un'asta più stabile la contiene.<br> La controforma è ampia, aperta.<br> Il contrasto crea tensione.<br> La lettera osserva.",

    "Un'asta sinistra stabile sostiene la forma.<br> A destra un arco ampio si schiaccia.<br> I tratti oscillano creando tensione interna.<br> La controforma vibra.<br> Forse la lettera si muove davvero.",

    "Controforma ampia, quasi circolare.<br> Un'apertura interrompe la continuità.<br> Uno sperone entra nello spazio interno.<br> I bordi vibrano.<br> Piccole punte emergono dal contorno.<br> La struttura è geometrica,<br> ma qualcosa si protende oltre.",

    "Due aste inclinate scendono parallele.<br> Si uniscono in una curva regolare.<br> La controforma è una fenditura stretta.<br> Tutto appare stabile.<br> Eppure il bordo vibra appena.<br> Un tremito minimo nella forma.",

    "Struttura binoculare, equilibrata.<br> La barra attraversa lo spazio.<br> Le curve sono regolari, leggibili.<br> Ma il bordo superiore si increspa.<br> La superficie sembra assottigliarsi.<br> La forma osserva, sotto la pelle si muove.",

    "È l'unica che scende davvero.<br> L'asta attraversa la linea di base.<br> Cerca un terreno solido.<br> In basso una grazia pesante si ancora.<br> La forma è precisa, tecnica.<br> Ma racconta una radice che resiste.<br> Ti stai svegliando?",

];

// ============ COSTANTI ============
const NODE_COUNT = 26;
const IMAGE_COUNT = 25; // Immagini per i nodi 2-25
const MOVEMENT_SPEED = 0.15;
const STAR_COUNT = 100;
const NODO_IMAGE_TARGET_ALPHA = 200;
const NODO_IMAGE_FADE_SPEED = 5;
const DESCRIPTION_FADE_SPEED = 8;
const IMAGE_TRANSITION_SPEED = 0.05;

// Costanti per le descrizioni in schermo
const SCREEN_BASE_TEXT_SIZE = 14;
const SCREEN_CHAR_SPACING = 10;
const SCREEN_WORD_SPACING = 12;
const SCREEN_LINE_HEIGHT = 28;
const SCREEN_PARAGRAPH_SPACING = 10;

// Costanti per il centramento e spaziatura
const SCREEN_TEXT_MARGIN_X = 30;
const SCREEN_TEXT_MARGIN_Y = 30;

// ============ NUOVE COSTANTI PER IL MOVIMENTO ONDULATORIO ============
const WAVE_INTENSITIES = Array.from({length: 24}, (_, i) => 0.72 - (i * 0.03));
const WAVE_AMPLITUDE = 6;
const WAVE_FREQUENCY = 1.02;
const WAVE_SPEED = 2.5;
const WAVE_PROPAGATION_SPEED = 1.8;

// ============ POSIZIONI PERSONALIZZATE DELLE DESCRIZIONI (in pixel schermo) ============
let CUSTOM_DESCRIPTION_POSITIONS = {};

// ============ POSIZIONAMENTO DESCRIZIONI DI DEFAULT (in pixel schermo) ============
let DEFAULT_DESCRIPTION_POSITIONS = {};

// ============ STATO GLOBALE ============
let scrollProgress = 0;
let pathPoints = [], smoothPath = [], pathLength = 0;
let nodes = [], currentNodeIndex = 0;
let movementState = 'STOPPED';
let targetNodeIndex = 0;
let isProcessing = false;

let nodoImages = {};
let nodoImageDimensions = {};
let showNodoImages = {};
let nodoImageAlphas = {};
let nodoImageStates = {};
let nodoImageFadeProgress = {};

let starParticles = [];

// Stato per le descrizioni
let activeDescription = null;
let descriptionAlpha = 0;

// Variabili per le animazioni delle descrizioni
let textLinesGroup1 = [];
let textLinesGroup2 = [];
let textLinesGroup3 = [];
let textLinesGroup4 = [];

let nodeCounter;
let wakeTypeFont;
let descriptionOverlay;

// ============ VARIABILI PER ANIMAZIONE USCITA ============
let exitAnimationActive = false;
let exitTriggered = false; // Per evitare di attivare l'uscita più volte
let exitOverlay;
let sceneOverlay;
let exitMessage;
let upperBand;
let lowerBand;
let whiteOpening;

// ============ FUNZIONI PER OTTENERE NUMERO IMMAGINE ============
function getImageNumber(nodeNumber) {
    if (nodeNumber >= 2 && nodeNumber <= 25) {
        return nodeNumber - 1; // Nodo 2 = Immagine 1, Nodo 3 = Immagine 2, etc.
    }
    return 0; // Per i nodi senza immagini
}

// ============ FUNZIONI PER INIZIALIZZARE LE POSIZIONI DINAMICHE ============
function initDynamicPositions() {
    CUSTOM_DESCRIPTION_POSITIONS = {
        2: { x: 400, y: 300 },
        3: { x: window.innerWidth - 500, y: 550 },
        4: { x: 400, y: window.innerHeight - 350 },
        5: { x: window.innerWidth - 400, y: window.innerHeight - 300 },
        6: { x: window.innerWidth - 1100, y: 450 },
        7: { x: window.innerWidth - 1000, y: window.innerHeight - 280 },
        8: { x: 820, y: window.innerHeight - 200},
        9: { x: window.innerWidth - 400, y: window.innerHeight - 350 },
        10: { x: window.innerWidth / 2, y: window.innerHeight - 200 },
        11: { x: 350, y: 280 },
        12: { x: window.innerWidth - 550, y: 520 },
        13: { x: window.innerWidth - 1000, y: 200 },
        14: { x: window.innerWidth - 520, y: window.innerHeight - 450 },
        15: { x: 1120, y: window.innerHeight - 300 },
        16: { x: window.innerWidth - 1100, y: 500 },
        17: { x: 360, y: window.innerHeight - 300 },
        18: { x: window.innerWidth - 500, y: window.innerHeight / 2 },
        19: { x: window.innerWidth -1000, y: window.innerHeight - 260 },
        20: { x: 1000, y: 400 },
        21: { x: window.innerWidth - 500, y: 500 },
        22: { x: window.innerWidth / 2, y: window.innerHeight - 280 },
        23: { x: 800, y: window.innerHeight - 280 },
        24: { x: window.innerWidth -750, y: window.innerHeight - 280 },
        25: { x: window.innerWidth - 500, y: window.innerHeight - 400 }
    };

    DEFAULT_DESCRIPTION_POSITIONS = {
        'group1': {
            baseX: window.innerWidth / 2,
            baseY: window.innerHeight / 2,
            paragraphSpacing: 24,
            lineSpacing: SCREEN_LINE_HEIGHT
        },
        
        'group2': {
            baseX: window.innerWidth / 2,
            baseY: window.innerHeight / 3,
            lineHeight: SCREEN_LINE_HEIGHT,
            marginX: 80
        },
        
        'group3': {
            baseX: window.innerWidth / 2,
            baseY: window.innerHeight / 1.5,
            lineHeight: SCREEN_LINE_HEIGHT,
            marginX: 80
        },
        
        'group4': {
            baseX: window.innerWidth / 2,
            baseY: window.innerHeight / 2,
            lineHeight: SCREEN_LINE_HEIGHT,
            marginX: 80
        }
    };
}

// ============ INIZIALIZZAZIONE STATI ELEMENTI ============
function initElementStates() {
    // Inizializza gli stati delle immagini
    for (let i = 1; i <= 26; i++) {
        showNodoImages[i] = false;
        nodoImageAlphas[i] = 0;
        nodoImageStates[i] = 'bis';
        nodoImageFadeProgress[i] = 0;
    }
    
    // Aggiungi pulsazione al contatore nodi dopo la comparsa iniziale
    setTimeout(() => {
        const counter = document.querySelector('.node-counter');
        if (counter) {
            counter.classList.add('attention');
        }
    }, 4000);
}

// ============ INIZIALIZZAZIONE ANIMAZIONE USCITA ============
function initExitAnimation() {
    exitOverlay = document.querySelector('.exit-overlay');
    sceneOverlay = document.querySelector('.scene-overlay');
    exitMessage = document.querySelector('.exit-message');
    upperBand = document.querySelector('.exit-band.upper');
    lowerBand = document.querySelector('.exit-band.lower');
    whiteOpening = document.querySelector('.white-opening');
    
    if (!exitOverlay) {
        // Crea gli elementi se non esistono
        exitOverlay = document.createElement('div');
        exitOverlay.className = 'exit-overlay';
        
        whiteOpening = document.createElement('div');
        whiteOpening.className = 'white-opening';
        
        upperBand = document.createElement('div');
        upperBand.className = 'exit-band upper';
        
        lowerBand = document.createElement('div');
        lowerBand.className = 'exit-band lower';
        
        exitOverlay.appendChild(whiteOpening);
        exitOverlay.appendChild(upperBand);
        exitOverlay.appendChild(lowerBand);
        document.body.appendChild(exitOverlay);
        
        sceneOverlay = document.createElement('div');
        sceneOverlay.className = 'scene-overlay';
        document.body.appendChild(sceneOverlay);
        
        exitMessage = document.createElement('div');
        exitMessage.className = 'exit-message';
        exitMessage.textContent = 'Ti stai svegliando...';
        document.body.appendChild(exitMessage);
    }
    
    // Reset delle animazioni
    resetExitAnimation();
}

function resetExitAnimation() {
    if (exitOverlay) {
        exitOverlay.classList.remove('active');
        exitOverlay.style.opacity = '0';
    }
    
    if (sceneOverlay) {
        sceneOverlay.classList.remove('active');
    }
    
    if (exitMessage) {
        exitMessage.classList.remove('show');
    }
    
    if (upperBand) {
        upperBand.style.animation = 'none';
        upperBand.style.transform = 'translateY(0)';
    }
    
    if (lowerBand) {
        lowerBand.style.animation = 'none';
        lowerBand.style.transform = 'translateY(0)';
    }
    
    if (whiteOpening) {
        whiteOpening.style.animation = 'none';
        whiteOpening.style.height = '0%';
    }
    
    exitAnimationActive = false;
    exitTriggered = false;
    
    // Forza un reflow per resettare le animazioni
    setTimeout(() => {
        if (upperBand) upperBand.style.animation = '';
        if (lowerBand) lowerBand.style.animation = '';
        if (whiteOpening) whiteOpening.style.animation = '';
    }, 50);
}

// ============ FUNZIONE ANIMAZIONE USCITA ============
function startExitAnimation() {
    if (exitAnimationActive || exitTriggered) return;
    
    exitAnimationActive = true;
    exitTriggered = true;
    console.log('Inizio animazione di uscita verso final.html');
    
    // Disabilita interazioni durante l'animazione
    const p5Canvas = document.getElementById('p5-canvas');
    if (p5Canvas) {
        p5Canvas.style.pointerEvents = 'none';
    }
    
    // Nascondi il contatore nodi
    const nodeCounter = document.querySelector('.node-counter');
    if (nodeCounter) {
        nodeCounter.style.opacity = '0';
    }
    
    // Attiva gli overlay
    if (sceneOverlay) {
        sceneOverlay.classList.add('active');
    }
    
    if (exitOverlay) {
        exitOverlay.classList.add('active');
        exitOverlay.style.opacity = '1';
    }
    
    // Fase 1: Mostra il messaggio (dopo 500ms)
    setTimeout(() => {
        if (exitMessage) {
            exitMessage.classList.add('show');
        }
    }, 500);
    
    // Fase 2: Avvia l'animazione (dopo 1500ms)
    setTimeout(() => {
        if (whiteOpening && upperBand && lowerBand) {
            // Rimuovi e riaggiungi le animazioni per forzarle
            whiteOpening.style.animation = 'none';
            upperBand.style.animation = 'none';
            lowerBand.style.animation = 'none';
            
            setTimeout(() => {
                whiteOpening.style.animation = 'whiteOpening 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                upperBand.style.animation = 'slideOutUp 2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                lowerBand.style.animation = 'slideOutDown 2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }, 10);
        }
    }, 1500);
    
    // Fase 3: Reindirizza alla pagina finale (dopo 3500ms)
    setTimeout(() => {
        console.log('Reindirizzamento a ../final/final.html');
        window.location.href = '../final/final.html';
    }, 3500);
}

// ============ MODIFICA PER RILEVARE AUTOMATICAMENTE L'ULTIMO NODO ============
function updateMovement() {
    if (movementState === 'MOVING_TO_NODE') {
        const targetT = nodes[targetNodeIndex].t;
        const distanceToTarget = Math.abs(targetT - scrollProgress);
        const nodoIndex = targetNodeIndex + 1;
        
        // Solo i nodi 2-25 hanno immagini
        if (nodoIndex >= 2 && nodoIndex <= 25 && showNodoImages[nodoIndex]) {
            if (distanceToTarget < 0.008) {
                nodoImageAlphas[nodoIndex] = Math.min(nodoImageAlphas[nodoIndex] + NODO_IMAGE_FADE_SPEED, NODO_IMAGE_TARGET_ALPHA);
            }
        }
        
        scrollProgress += (targetT - scrollProgress) * MOVEMENT_SPEED;
        
        if (distanceToTarget < 0.0005) {
            scrollProgress = targetT;
            currentNodeIndex = targetNodeIndex;
            movementState = 'STOPPED';
            isProcessing = false;
            
            const nodoIndex = currentNodeIndex + 1;
            // Attiva l'immagine solo per nodi 2-25
            if (nodoIndex >= 2 && nodoIndex <= 25) {
                nodoImageAlphas[nodoIndex] = NODO_IMAGE_TARGET_ALPHA;
                if (nodoIndex <= 10) {
                    nodoImageStates[nodoIndex] = 'bis';
                    nodoImageFadeProgress[nodoIndex] = 0;
                }
            } else {
                // Disattiva le immagini per nodi 1 e 26
                for (let i = 1; i <= 26; i++) {
                    showNodoImages[i] = false;
                    nodoImageAlphas[i] = 0;
                }
            }
            
            // SE SIAMO ARRIVATI ALL'ULTIMO NODO (26), AVVIA AUTOMATICAMENTE L'ANIMAZIONE DI USCITA
            if (currentNodeIndex === 25 && !exitTriggered) { // 25 perché l'indice parte da 0
                console.log('Raggiunto l\'ultimo nodo, avvio animazione di uscita automatica');
                startExitAnimation();
            }
            
            updateUI();
        }
    }
}

// ============ FUNZIONI UTILITY ============
function scalePoints(points, multiplier) {
    return points.map(p => ({ x: p.x * multiplier, y: p.y * multiplier }));
}

function createSmoothPath(points, segmentsPerCurve = 20) {
    const smooth = [];
    for (let i = 0; i < points.length - 1; i++) {
        let p0, p1, p2, p3;
        if (i === 0) {
            p0 = points[0];
            p1 = points[0];
            p2 = points[1];
            p3 = points[2] || points[1];
        } else if (i === points.length - 2) {
            p0 = points[i-1];
            p1 = points[i];
            p2 = points[i+1];
            p3 = points[i+1];
        } else {
            p0 = points[i-1];
            p1 = points[i];
            p2 = points[i+1];
            p3 = points[i+2];
        }
        
        for (let j = 0; j <= segmentsPerCurve; j++) {
            const t = j / segmentsPerCurve;
            const t2 = t * t;
            const t3 = t2 * t;
            const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * t2 + (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3);
            const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 + (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3);
            smooth.push({x, y});
        }
    }
    return smooth;
}

function calculatePathLength(points) {
    let length = 0;
    for (let i = 0; i < points.length - 1; i++) {
        const dx = points[i+1].x - points[i].x;
        const dy = points[i+1].y - points[i].y;
        length += Math.sqrt(dx*dx + dy*dy);
    }
    return length;
}

function getPointOnPath(t, points, totalLength) {
    t = Math.max(0, Math.min(1, t));
    if (t === 0) return points[0];
    if (t === 1) return points[points.length - 1];
    const targetLength = t * totalLength;
    let accumulated = 0;
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i+1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const segmentLength = Math.sqrt(dx*dx + dy*dy);
        if (accumulated + segmentLength >= targetLength) {
            const segmentT = (targetLength - accumulated) / segmentLength;
            return { x: p1.x + dx * segmentT, y: p1.y + dy * segmentT };
        }
        accumulated += segmentLength;
    }
    return points[points.length - 1];
}

function calculateNodes() {                                                                                                             
    nodes = [];
    const numNodes = 26;
    for (let i = 0; i < numNodes; i++) {
        const t = i / (numNodes - 1);
        const point = getPointOnPath(t, smoothPath, pathLength);
        nodes.push({
            x: point.x,
            y: point.y,
            t: t,
            color: [[220, 220, 220], [240, 240, 240], [255, 255, 255], [200, 200, 200]][i % 4]
        });
    }
}

function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function smoothstep(edge0, edge1, x) {
    x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return x * x * (3.0 - 2.0 * x);
}

// ============ NUOVE FUNZIONI PER POSIZIONI FISSE ============
function getFixedDescriptionPosition(nodeNumber) {
    if (CUSTOM_DESCRIPTION_POSITIONS[nodeNumber]) {
        return CUSTOM_DESCRIPTION_POSITIONS[nodeNumber];
    }
    return null;
}

// ============ NUOVE FUNZIONI PER IL MOVIMENTO ONDULATORIO ============
function getWaveIntensity(descriptionIndex) {
    if (descriptionIndex < 0 || descriptionIndex >= WAVE_INTENSITIES.length) {
        return 0;
    }
    return Math.max(0, WAVE_INTENSITIES[descriptionIndex]);
}

function calculateWaveOffset(p, wordIndex, totalWords, time, descriptionIndex) {
    const waveIntensity = getWaveIntensity(descriptionIndex);
    
    if (waveIntensity <= 0) {
        return { x: 0, y: 0 };
    }
    
    const normalizedPosition = totalWords > 1 ? wordIndex / (totalWords - 1) : 0.5;
    const wavePhase = time * WAVE_SPEED + normalizedPosition * Math.PI * 2;
    
    const waveOffsetY = Math.sin(wavePhase) * WAVE_AMPLITUDE * waveIntensity;
    const waveOffsetX = Math.cos(wavePhase * 0.7) * WAVE_AMPLITUDE * waveIntensity * 0.3;
    const secondaryWaveOffsetY = Math.sin(wavePhase * 2.3 + 1.5) * WAVE_AMPLITUDE * waveIntensity * 0.5;
    
    return {
        x: waveOffsetX,
        y: waveOffsetY + secondaryWaveOffsetY
    };
}

// ============ FUNZIONI PER LE DESCRIZIONI ============
function splitTextWithManualBreaks(text, maxCharsPerLine = 60) {
    const segments = text.split(/<br\s*\/?>/i);
    const allLines = [];
    
    segments.forEach(segment => {
        if (!segment.trim()) return;
        
        const words = segment.split(' ');
        let currentLine = '';
        
        words.forEach((word, index) => {
            const wordWithSpace = currentLine ? ' ' + word : word;
            
            if (currentLine.length + wordWithSpace.length <= maxCharsPerLine) {
                currentLine += wordWithSpace;
            } else {
                if (currentLine) allLines.push(currentLine);
                
                if (word.length > maxCharsPerLine) {
                    for (let i = 0; i < word.length; i += maxCharsPerLine) {
                        const chunk = word.slice(i, i + maxCharsPerLine);
                        allLines.push(chunk);
                    }
                    currentLine = '';
                } else {
                    currentLine = word;
                }
            }
            
            if (index === words.length - 1 && currentLine) {
                allLines.push(currentLine);
            }
        });
    });
    
    return allLines;
}

// Gruppo 1: Nodi 2-9 (descrizioni 1-8)
function createTextLinesGroup1(node, text, nodeNumber) {
    textLinesGroup1 = [];
    
    const lines = splitTextWithManualBreaks(text, 50);
    const customPos = getFixedDescriptionPosition(nodeNumber);
    const groupSettings = DEFAULT_DESCRIPTION_POSITIONS.group1;
    
    let baseX, baseY;
    if (customPos) {
        baseX = customPos.x;
        baseY = customPos.y;
    } else {
        baseX = groupSettings.baseX;
        baseY = groupSettings.baseY;
    }
    
    const lineHeight = SCREEN_LINE_HEIGHT;
    const startY = baseY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        if (!line.trim()) return;
        
        const words = line.split(' ');
        const wordsInLine = [];
        
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * SCREEN_CHAR_SPACING + SCREEN_WORD_SPACING;
        });
        totalLineWidth -= SCREEN_WORD_SPACING;
        
        let currentX = baseX - totalLineWidth / 2;
        
        const lineAmplitude = 3 + Math.random() * 6;
        const lineFrequency = 0.01 + Math.random() * 0.02;
        const linePhase = Math.random() * 1000;
        const lineAngle = (Math.random() - 0.5) * 0.4;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * SCREEN_CHAR_SPACING;
            const wordCenterX = currentX + wordWidth / 2;
            
            const lowerWord = word.toLowerCase();
            const isSpecial = lowerWord.includes('slash') || 
                              lowerWord.includes('curva') || 
                              lowerWord.includes('ritmo') || 
                              lowerWord.includes('rapidità') ||
                              lowerWord.includes('vortici') ||
                              lowerWord.includes('nebulosa');
            
            const wordParams = {
                text: word,
                baseX: wordCenterX,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth,
                
                delay: 100 + wordIndex * 150 + lineIndex * 300,
                startX: (Math.random() - 0.5) * 60,
                startY: (Math.random() - 0.5) * 40,
                startRotation: (Math.random() - 0.5) * 0.15,
                moveSpeed: 0.9 + Math.random() * 0.4,
                snapIntensity: 0.8 + Math.random() * 0.4,
                postEntryWobble: 0.2 + Math.random() * 0.3,
                entryDuration: 400 + Math.random() * 300,
                
                waveAmplitudeX: isSpecial ? 8 + Math.random() * 12 : 2 + Math.random() * 1.5,
                waveFrequencyX: isSpecial ? 0.03 + Math.random() * 0.03 : 0.015 + Math.random() * 0.01,
                waveOffsetX: Math.random() * 1000,
                
                waveAmplitudeY: isSpecial ? 6 + Math.random() * 8 : 1.5 + Math.random() * 2,
                waveFrequencyY: isSpecial ? 0.025 + Math.random() * 0.025 : 0.01 + Math.random() * 0.01,
                waveOffsetY: Math.random() * 1000,
                
                rotationAmplitude: isSpecial ? 0.02 + Math.random() * 0.01 : 0.005 + Math.random() * 0.005,
                rotationFrequency: isSpecial ? 0.04 + Math.random() * 0.02 : 0.02 + Math.random() * 0.01,
                rotationOffset: Math.random() * 1000,
                
                pulseAmplitude: isSpecial ? 3 + Math.random() * 3 : 0.8 + Math.random() * 0.5,
                pulseFrequency: isSpecial ? 0.05 + Math.random() * 0.02 : 0.03 + Math.random() * 0.02,
                pulseOffset: Math.random() * 1000,
                
                wobbleAmount: isSpecial ? 0.5 + Math.random() * 0.5 : 0,
                wobbleFrequency: isSpecial ? 2.5 + Math.random() * 1.0 : 0,
                wobbleOffset: Math.random() * 1000,
                
                isSpecial: isSpecial,
                isLineStart: wordIndex === 0,
                isLineEnd: wordIndex === words.length - 1,
                wordIndex: wordIndex,
                totalWords: words.length,
                charRotations: [],
                charSpacings: [],
                charScales: []
            };
            
            for (let i = 0; i < word.length; i++) {
                wordParams.charRotations.push((Math.random() - 0.5) * (isSpecial ? 0.04 : 0.01));
                wordParams.charSpacings.push(SCREEN_CHAR_SPACING + (Math.random() - 0.5) * (isSpecial ? 6 : 2));
                wordParams.charScales.push(0.9 + Math.random() * (isSpecial ? 0.02 : 0.01));
            }
            
            wordsInLine.push(wordParams);
            currentX += wordWidth + SCREEN_WORD_SPACING;
        });
        
        textLinesGroup1.push({
            words: wordsInLine,
            lineParams: {
                amplitude: lineAmplitude,
                frequency: lineFrequency,
                phase: linePhase,
                angle: lineAngle
            }
        });
    });
}

function drawDescriptionGroup1(p) {
    if (descriptionAlpha <= 0 || !activeDescription) return;
    
    const time = p.millis() * 0.001;
    if (wakeTypeFont) p.textFont(wakeTypeFont);
    
    const activeTime = time - (activeDescription.startTime || 0);
    const waveIntensity = Math.min(1, activeTime / 2);
    const descriptionIndex = activeDescription.nodeNumber - 2;
    
    textLinesGroup1.forEach((line, lineIndex) => {
        const lineParams = line.lineParams;
        
        line.words.forEach((word, wordIndex) => {
            p.push();
            
            const wordTime = activeTime - (word.delay / 1000);
            if (wordTime < 0) { p.pop(); return; }
            
            const entryProgress = Math.min(wordTime / (word.entryDuration / 1000), 1);
            const easedProgress = entryProgress < 0.5 ? 
                2 * entryProgress * entryProgress : 
                1 - Math.pow(-2 * entryProgress + 2, 2) / 2;
            
            let currentX = word.baseX;
            let currentY = word.baseY;
            let currentRotation = 0;
            let currentScale = 1.0;
            
            if (entryProgress < 1) {
                const startX = word.baseX + word.startX;
                const startY = word.baseY + word.startY;
                currentX = startX + (word.baseX - startX) * easedProgress;
                currentY = startY + (word.baseY - startY) * easedProgress;
                currentRotation = word.startRotation * (1 - easedProgress);
                
                if (word.isSpecial && entryProgress > 0.7) {
                    const overshoot = (entryProgress - 0.7) / 0.3;
                    currentX += Math.sin(overshoot * Math.PI) * 2.5 * word.snapIntensity;
                    currentY += Math.cos(overshoot * Math.PI) * 1.5 * word.snapIntensity;
                }
            } else {
                const waveOffset = calculateWaveOffset(p, word.wordIndex, word.totalWords, time, descriptionIndex);
                
                const waveX = Math.sin(time * word.waveFrequencyX + word.waveOffsetX) * word.waveAmplitudeX * waveIntensity + waveOffset.x;
                const waveY = Math.cos(time * word.waveFrequencyY + word.waveOffsetY) * word.waveAmplitudeY * waveIntensity + waveOffset.y;
                const wave2X = Math.sin(time * word.waveFrequencyX * 1.7 + word.waveOffsetX) * word.waveAmplitudeX * 0.5 * waveIntensity;
                const wave2Y = Math.cos(time * word.waveFrequencyY * 1.3 + word.waveOffsetY) * word.waveAmplitudeY * 0.5 * waveIntensity;
                
                currentX += waveX + wave2X;
                currentY += waveY + wave2Y;
                currentRotation = Math.sin(time * word.rotationFrequency + word.rotationOffset) * word.rotationAmplitude * waveIntensity;
                
                const pulse = Math.sin(time * word.pulseFrequency + word.pulseOffset) * word.pulseAmplitude * waveIntensity;
                currentScale = 1.0 + pulse / 100;
                
                let wobble = 0;
                if (word.isSpecial && word.wobbleAmount > 0) {
                    wobble = Math.sin(time * word.wobbleFrequency + word.wobbleOffset) * word.wobbleAmount * 2;
                }
                
                if (word.isLineStart) {
                    currentX += Math.sin(time * 1.2) * 1.5;
                    currentY += Math.cos(time * 1.2) * 0.8;
                }
                if (word.isLineEnd) {
                    currentX += Math.cos(time * 1.0) * 1.5;
                    currentY += Math.sin(time * 1.0) * 0.8;
                }
                
                currentX += wobble;
                currentY += wobble * 0.5;
            }
            
            p.translate(currentX, currentY);
            p.rotate(currentRotation);
            
            let glowAlpha = 0;
            let sizeVariation = 0;
            if (word.isSpecial && entryProgress >= 1) {
                p.rotate(Math.sin(time * 1.5) * 0.015 + Math.cos(time * 1.1 + wordIndex) * 0.008);
                const extraWobble = Math.sin(time * word.wobbleFrequency + wordIndex) * word.wobbleAmount * 2;
                p.translate(extraWobble, extraWobble * 0.3);
                sizeVariation = (Math.sin(time * 1.5) * 2 + Math.cos(time * 1.4) * 0.8);
                glowAlpha = 25 + Math.sin(time * 2.0) * 15;
            }
            
            const totalWidth = word.charSpacings.reduce((a, b) => a + b, 0);
            const startX = -totalWidth / 2;
            
            p.translate(startX, 0);
            
            let currentCharX = 0;
            for (let i = 0; i < word.text.length; i++) {
                p.push();
                p.translate(currentCharX, 0);
                const charRotation = word.charRotations[i] + Math.sin(time * 0.05 + i) * 0.005;
                p.rotate(charRotation);
                const charScale = word.charScales[i] * currentScale + (word.isSpecial ? Math.sin(time * 0.1 + i) * 0.005 : 0);
                p.scale(charScale);
                const baseTextSize = SCREEN_BASE_TEXT_SIZE;
                let charSize = baseTextSize + sizeVariation;
                
                const brightness = 255;
                const r = brightness, g = brightness, b = brightness;
                p.fill(r, g, b, descriptionAlpha);
                p.noStroke();
                p.textSize(charSize);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(word.text[i], 0, 0);
                
                if (word.isSpecial && glowAlpha > 0) {
                    p.fill(255, 255, 255, glowAlpha * (descriptionAlpha / 255));
                    p.textSize(charSize + 0.4);
                    p.text(word.text[i], 0, 0);
                }
                
                p.pop();
                currentCharX += word.charSpacings[i];
            }
            
            p.pop();
        });
    });
}

// Gruppo 2: Nodi 10-16
function createTextLinesGroup2(node, text, nodeNumber) {
    textLinesGroup2 = [];
    
    const lines = splitTextWithManualBreaks(text, 50);
    const customPos = getFixedDescriptionPosition(nodeNumber);
    const groupSettings = DEFAULT_DESCRIPTION_POSITIONS.group2;
    
    let baseX, baseY;
    if (customPos) {
        baseX = customPos.x;
        baseY = customPos.y;
    } else {
        baseX = groupSettings.baseX;
        baseY = groupSettings.baseY;
    }
    
    const lineHeight = SCREEN_LINE_HEIGHT;
    const startY = baseY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        if (!line.trim()) return;
        
        const words = line.split(' ');
        const wordsInLine = [];
        
        const wordSpacing = SCREEN_WORD_SPACING;
        const estimatedCharWidth = SCREEN_CHAR_SPACING;
        
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * estimatedCharWidth + wordSpacing;
        });
        totalLineWidth -= wordSpacing;
        
        let currentX = baseX - totalLineWidth / 2;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * estimatedCharWidth;
            
            wordsInLine.push({
                text: word,
                x: currentX + wordWidth / 2,
                y: startY + lineIndex * lineHeight,
                baseX: currentX + wordWidth / 2,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth,
                wordIndex: wordIndex,
                totalWords: words.length
            });
            
            currentX += wordWidth + wordSpacing;
        });
        
        const lineObj = {
            words: wordsInLine,
            baseY: startY + lineIndex * lineHeight,
            waveType: lineIndex % 3,
            waveAmp: 2 + Math.random() * 3,
            waveSpeed: 0.02 + Math.random() * 0.02,
            waveOffset: Math.random() * 1000,
            tiltAmp: (Math.random() - 0.5) * 0.006,
            tiltSpeed: 0.005 + Math.random() * 0.01,
            tiltOffset: Math.random() * 1000
        };
        
        textLinesGroup2.push(lineObj);
    });
}

function drawDescriptionGroup2(p) {
    if (descriptionAlpha <= 0 || !activeDescription) return;
    
    const time = p.millis() * 0.001;
    if (wakeTypeFont) p.textFont(wakeTypeFont);
    
    const descriptionIndex = activeDescription.nodeNumber - 2;
    const waveIntensity = getWaveIntensity(descriptionIndex);
    
    textLinesGroup2.forEach((line, lineIndex) => {
        p.push();
        const tilt = Math.sin(time * line.tiltSpeed + line.tiltOffset) * line.tiltAmp;
        const globalWave = Math.sin(time * line.waveSpeed + line.waveOffset) * line.waveAmp;
        
        line.words.forEach((word, wordIndex) => {
            p.push();
            p.translate(word.baseX, word.baseY);
            p.rotate(tilt);
            
            const waveOffset = calculateWaveOffset(p, word.wordIndex, word.totalWords, time, descriptionIndex);
            
            let waveX = 0, waveY = 0;
            switch (line.waveType) {
                case 0:
                    waveX = Math.sin(time * line.waveSpeed * 2 + wordIndex * 0.3) * line.waveAmp * 0.7;
                    waveY = globalWave * 0.5;
                    break;
                case 1:
                    waveY = Math.sin(time * line.waveSpeed * 1.5 + wordIndex * 0.2) * line.waveAmp;
                    waveX = globalWave * 0.3;
                    break;
                case 2:
                    const angle = wordIndex * 0.5 + time * line.waveSpeed * 3;
                    waveX = Math.cos(angle) * line.waveAmp * 0.6;
                    waveY = Math.sin(angle) * line.waveAmp * 0.6;
                    break;
            }
            
            waveX += waveOffset.x * waveIntensity;
            waveY += waveOffset.y * waveIntensity;
            
            p.translate(waveX, waveY);
            const wordRotation = Math.sin(time * line.waveSpeed * 1.2 + wordIndex * 0.4) * 0.003;
            p.rotate(wordRotation);
            
            p.textSize(SCREEN_BASE_TEXT_SIZE);
            p.textAlign(p.CENTER, p.CENTER);
            const brightness = 255;
            p.fill(brightness, brightness, brightness, descriptionAlpha);
            p.noStroke();
            p.text(word.text, 0, 0);
            p.pop();
        });
        p.pop();
    });
}

// Gruppo 3: Nodi 17-21
function createTextLinesGroup3(node, text, nodeNumber) {
    textLinesGroup3 = [];
    
    const lines = splitTextWithManualBreaks(text, 50);
    const customPos = getFixedDescriptionPosition(nodeNumber);
    const groupSettings = DEFAULT_DESCRIPTION_POSITIONS.group3;
    
    let baseX, baseY;
    if (customPos) {
        baseX = customPos.x;
        baseY = customPos.y;
    } else {
        baseX = groupSettings.baseX;
        baseY = groupSettings.baseY;
    }
    
    const lineHeight = SCREEN_LINE_HEIGHT;
    const startY = baseY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        if (!line.trim()) return;
        
        const words = line.split(' ');
        const wordsInLine = [];
        
        const wordSpacing = SCREEN_WORD_SPACING;
        const estimatedCharWidth = SCREEN_CHAR_SPACING;
        
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * estimatedCharWidth + wordSpacing;
        });
        totalLineWidth -= wordSpacing;
        
        let currentX = baseX - totalLineWidth / 2;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * estimatedCharWidth;
            
            wordsInLine.push({
                text: word,
                x: currentX + wordWidth / 2,
                y: startY + lineIndex * lineHeight,
                baseX: currentX + wordWidth / 2,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth,
                wordIndex: wordIndex,
                totalWords: words.length
            });
            
            currentX += wordWidth + wordSpacing;
        });
        
        textLinesGroup3.push({
            words: wordsInLine,
            baseY: startY + lineIndex * lineHeight
        });
    });
    
    textLinesGroup3.blockParams = {
        waveAmpY: 3,
        waveSpeedY: 0.012,
        waveOffsetY: Math.random() * 1000,
        waveAmpX: 2,
        waveSpeedX: 0.008,
        waveOffsetX: Math.random() * 1000,
        rotationAmp: 0.002,
        rotationSpeed: 0.006,
        rotationOffset: Math.random() * 1000,
        lineWaveAmp: 1,
        lineWaveSpeed: 0.02,
        lineWaveOffset: Math.random() * 1000
    };
}

function drawDescriptionGroup3(p) {
    if (descriptionAlpha <= 0 || !activeDescription) return;
    
    const time = p.millis() * 0.001;
    const block = textLinesGroup3.blockParams;
    if (wakeTypeFont) p.textFont(wakeTypeFont);
    
    const descriptionIndex = activeDescription.nodeNumber - 2;
    const waveIntensity = getWaveIntensity(descriptionIndex);
    
    const blockWaveY = Math.sin(time * block.waveSpeedY + block.waveOffsetY) * block.waveAmpY;
    const blockWaveX = Math.sin(time * block.waveSpeedX + block.waveOffsetX) * block.waveAmpX;
    const blockRotation = Math.sin(time * block.rotationSpeed + block.rotationOffset) * block.rotationAmp;
    
    p.push();
    p.translate(blockWaveX, blockWaveY);
    p.rotate(blockRotation);
    
    textLinesGroup3.forEach((line, lineIndex) => {
        if (line.words) {
            const lineWaveY = Math.sin(time * block.lineWaveSpeed + block.lineWaveOffset + lineIndex * 0.3) * block.lineWaveAmp;
            line.words.forEach((word, wordIndex) => {
                p.push();
                
                const waveOffset = calculateWaveOffset(p, word.wordIndex, word.totalWords, time, descriptionIndex);
                const finalWaveX = waveOffset.x * waveIntensity;
                const finalWaveY = lineWaveY + waveOffset.y * waveIntensity;
                
                p.translate(word.baseX + finalWaveX, word.baseY + finalWaveY);
                
                p.textSize(SCREEN_BASE_TEXT_SIZE);
                p.textAlign(p.CENTER, p.CENTER);
                p.fill(255, 255, 255, descriptionAlpha);
                p.noStroke();
                p.text(word.text, 0, 0);
                p.pop();
            });
        }
    });
    p.pop();
}

// Gruppo 4: Nodi 22-25
function createTextLinesGroup4(node, text, nodeNumber) {
    textLinesGroup4 = [];
    
    const lines = splitTextWithManualBreaks(text, 50);
    const customPos = getFixedDescriptionPosition(nodeNumber);
    const groupSettings = DEFAULT_DESCRIPTION_POSITIONS.group4;
    
    let baseX, baseY;
    if (customPos) {
        baseX = customPos.x;
        baseY = customPos.y;
    } else {
        baseX = groupSettings.baseX;
        baseY = groupSettings.baseY;
    }
    
    const lineHeight = SCREEN_LINE_HEIGHT;
    const startY = baseY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        if (!line.trim()) return;
        
        const words = line.split(' ');
        const wordsInLine = [];
        
        const wordSpacing = SCREEN_WORD_SPACING;
        const estimatedCharWidth = SCREEN_CHAR_SPACING;
        
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * estimatedCharWidth + wordSpacing;
        });
        totalLineWidth -= wordSpacing;
        
        let currentX = baseX - totalLineWidth / 2;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * estimatedCharWidth;
            
            wordsInLine.push({
                text: word,
                x: currentX + wordWidth / 2,
                y: startY + lineIndex * lineHeight,
                baseX: currentX + wordWidth / 2,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth,
                wordIndex: wordIndex,
                totalWords: words.length
            });
            
            currentX += wordWidth + wordSpacing;
        });
        
        textLinesGroup4.push({
            words: wordsInLine,
            baseY: startY + lineIndex * lineHeight
        });
    });
}

function drawDescriptionGroup4(p) {
    if (descriptionAlpha <= 0 || !activeDescription) return;
    
    const time = p.millis() * 0.001;
    if (wakeTypeFont) p.textFont(wakeTypeFont);
    
    const descriptionIndex = activeDescription.nodeNumber - 2;
    const waveIntensity = getWaveIntensity(descriptionIndex);
    
    textLinesGroup4.forEach((line, lineIndex) => {
        if (line.words) {
            line.words.forEach((word, wordIndex) => {
                p.push();
                
                const waveOffset = calculateWaveOffset(p, word.wordIndex, word.totalWords, time, descriptionIndex);
                const finalX = word.baseX + waveOffset.x * waveIntensity;
                const finalY = word.baseY + waveOffset.y * waveIntensity;
                
                p.translate(finalX, finalY);
                
                p.textSize(SCREEN_BASE_TEXT_SIZE);
                p.textAlign(p.CENTER, p.CENTER);
                p.fill(255, 255, 255, descriptionAlpha);
                p.noStroke();
                p.text(word.text, 0, 0);
                p.pop();
            });
        }
    });
}

// ============ GESTIONE UI ============
function initUIElements() {
    nodeCounter = document.querySelector('.node-counter');
    descriptionOverlay = document.querySelector('.description-overlay');
    updateUI();
}

function updateUI() {
    const nodeNumber = currentNodeIndex + 1;
    let displayText;
    
    if (nodeNumber === 1 || nodeNumber === 26) {
        displayText = `Nodo ${nodeNumber}`;
        nodeCounter.classList.add('no-image');
    } else {
        displayText = `Immagine ${getImageNumber(nodeNumber)}/24`;
        nodeCounter.classList.remove('no-image');
    }
    
    document.querySelector('.node-number').textContent = displayText;
    if (nodeCounter) nodeCounter.style.opacity = '1';
}

// ============ NAVIGAZIONE ============
function startMoving(direction) {
    if (movementState === 'STOPPED' && !isProcessing) {
        let newTargetNodeIndex = currentNodeIndex + direction;
        newTargetNodeIndex = Math.max(0, Math.min(newTargetNodeIndex, NODE_COUNT - 1));
        if (newTargetNodeIndex === currentNodeIndex) return;
        targetNodeIndex = newTargetNodeIndex;
        movementState = 'MOVING_TO_NODE';
        isProcessing = true;
        for (let i = 1; i <= 26; i++) {
            showNodoImages[i] = false;
            nodoImageAlphas[i] = 0;
            if (i <= 10) {
                nodoImageStates[i] = 'bis';
                nodoImageFadeProgress[i] = 0;
            }
        }
        if (targetNodeIndex >= 0 && targetNodeIndex < 26) {
            const nodeNumber = targetNodeIndex + 1;
            // Mostra immagini solo per nodi 2-25
            if (nodeNumber >= 2 && nodeNumber <= 25) {
                showNodoImages[nodeNumber] = true;
                if (nodeNumber <= 10) {
                    nodoImageStates[nodeNumber] = 'bis';
                    nodoImageFadeProgress[nodeNumber] = 0;
                }
            }
        }
        activeDescription = null;
        descriptionAlpha = 0;
        if (descriptionOverlay) {
            descriptionOverlay.classList.remove('active');
        }
        updateUI();
    }
}

function updateImageTransitions() {
    for (let i = 1; i <= 10; i++) {
        const nodeNumber = i;
        let hasActiveDescription = false;
        if (activeDescription && activeDescription.nodeIndex === i-1) hasActiveDescription = true;
        if (hasActiveDescription) {
            if (nodoImageStates[nodeNumber] !== 'original') nodoImageStates[nodeNumber] = 'original';
            nodoImageFadeProgress[nodeNumber] = Math.min(nodoImageFadeProgress[nodeNumber] + IMAGE_TRANSITION_SPEED, 1);
        } else {
            if (nodoImageStates[nodeNumber] !== 'bis') nodoImageStates[nodeNumber] = 'bis';
            nodoImageFadeProgress[nodeNumber] = Math.max(nodoImageFadeProgress[nodeNumber] - IMAGE_TRANSITION_SPEED, 0);
        }
    }
}

function updateDescriptionAlpha() {
    if (activeDescription !== null) {
        descriptionAlpha = Math.min(descriptionAlpha + DESCRIPTION_FADE_SPEED, 255);
        if (descriptionOverlay) {
            descriptionOverlay.classList.add('active');
        }
    } else {
        descriptionAlpha = Math.max(descriptionAlpha - DESCRIPTION_FADE_SPEED, 0);
        if (descriptionAlpha <= 0 && descriptionOverlay) {
            descriptionOverlay.classList.remove('active');
        }
    }
}

// ============ SKETCH P5 ============
const sketch = (p) => {
    let canvas;
    
    p.smoothstep = function(edge0, edge1, x) {
        x = p.constrain((x - edge0) / (edge1 - edge0), 0.0, 1.0);
        return x * x * (3.0 - 2.0 * x);
    };
    
    function initStarParticles() {
        starParticles = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            starParticles.push({
                x: p.random(p.width * 100),
                y: p.random(p.height * 100),
                size: p.random(1, 4),
                brightness: p.random(100, 200) * 0.5,
                twinkleSpeed: p.random(0.01, 0.03),
                twinklePhase: p.random(p.TWO_PI)
            });
        }
    }
    
    function loadImageSafely(path, placeholderText) {
        return new Promise((resolve) => {
            const img = p.loadImage(
                path,
                (loadedImg) => {
                    console.log(`✅ Immagine caricata: ${path}`);
                    resolve(loadedImg);
                },
                (err) => {
                    console.log(`⚠️ Immagine non trovata: ${path}, creo placeholder`);
                    const placeholder = p.createGraphics(200, 200);
                    placeholder.background(240, 240, 240, 100);
                    placeholder.fill(50, 50, 50);
                    placeholder.textSize(24);
                    placeholder.textAlign(p.CENTER, p.CENTER);
                    placeholder.text(placeholderText, 100, 100);
                    resolve(placeholder);
                }
            );
        });
    }
    
    function drawLightGradient() {
        p.clear();
        p.background(0, 0, 0, 255);
    }
    
    function drawStars(currentPoint) {
        const time = p.millis() * 0.001;
        const zoom = 0.025;
        starParticles.forEach(star => {
            const relX = (star.x - currentPoint.x * zoom) * zoom;
            const relY = (star.y - currentPoint.y * zoom) * zoom;
            if (relX > -p.width/2 && relX < p.width/2 && relY > -p.height/2 && relY < p.height/2) {
                const twinkle = p.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
                const brightness = star.brightness * twinkle;
                p.noStroke();
                p.fill(200, 200, 200, brightness);
                p.ellipse(p.width/2 + relX / zoom, p.height/2 + relY / zoom, star.size, star.size);
            }
        });
    }
    
    function drawSpiralThreads() {
        const time = p.millis();
        const colors = [
            [180, 180, 180], [200, 200, 200], [220, 220, 220], [240, 240, 240],
            [255, 255, 255], [230, 230, 230], [210, 210, 210], [190, 190, 190]
        ];
        for (let threadIndex = 0; threadIndex < 8; threadIndex++) {
            const phaseOffset = (threadIndex / 8) * p.TWO_PI;
            const speed = 0.001;
            const radius = 200 * (0.7 + p.random(0.6));
            const threadPoints = [];
            for (let i = 0; i < smoothPath.length; i += 3) {
                const basePoint = smoothPath[i];
                const t = i / smoothPath.length;
                let nextIndex = Math.min(i + 1, smoothPath.length - 1);
                const dx = smoothPath[nextIndex].x - basePoint.x;
                const dy = smoothPath[nextIndex].y - basePoint.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                let normal = {x: 0, y: 1};
                if (length > 0) normal = { x: -dy / length, y: dx / length };
                const spiralAngle = t * p.PI * 4 + phaseOffset + time * speed;
                const offsetX = Math.cos(spiralAngle) * radius;
                const offsetY = Math.sin(spiralAngle) * radius;
                threadPoints.push({
                    x: basePoint.x + normal.x * offsetX + normal.y * offsetY,
                    y: basePoint.y + normal.y * offsetX - normal.x * offsetY
                });
            }
            const color = colors[threadIndex % colors.length];
            p.stroke(color[0], color[1], color[2], 120);
            p.strokeWeight(15);
            p.strokeCap(p.ROUND);
            p.noFill();
            p.beginShape();
            threadPoints.forEach(point => p.vertex(point.x, point.y));
            p.endShape();
        }
    }
    
    function drawMainPath() {
        const pulse = p.sin(p.millis() * 0.002) * 20;
        const currentThickness = 80 + pulse;
        p.stroke(255, 255, 255, 220);
        p.strokeWeight(currentThickness);
        p.strokeCap(p.ROUND);
        p.drawingContext.setLineDash([100, 40]);
        p.noFill();
        p.beginShape();
        for (let i = 0; i < smoothPath.length; i += 1) p.vertex(smoothPath[i].x, smoothPath[i].y);
        p.endShape();
        p.drawingContext.setLineDash([]);
        for (let i = 1; i <= 3; i++) {
            p.stroke(200, 200, 200, 40 - i * 10);
            p.strokeWeight(currentThickness + i * 60);
            p.beginShape();
            for (let j = 0; j < smoothPath.length; j += 2) p.vertex(smoothPath[j].x, smoothPath[j].y);
            p.endShape();
        }
    }
    
    function drawNodes() {
        const time = p.millis() * 0.001;
        nodes.forEach((node, index) => {
            const isCurrent = index === currentNodeIndex;
            const basePulse = p.sin(time * 3 + index * 0.5) * 0.3 + 0.7;
            const nodeSize = 200 * basePulse;
            if (isCurrent) {
                for (let i = 5; i > 0; i--) {
                    const alpha = 20 - i * 3;
                    const size = 400 + i * 80;
                    const extraPulse = p.sin(time * 2 + i) * 30;
                    p.noStroke();
                    p.fill(node.color[0], node.color[1], node.color[2], alpha);
                    p.ellipse(node.x, node.y, size + extraPulse, size + extraPulse);
                }
            }
            p.push();
            p.translate(node.x, node.y);
            p.rotate(time * 0.5 + index * 0.1);
            p.strokeWeight(30);
            p.stroke(node.color[0], node.color[1], node.color[2], isCurrent ? 200 : 100);
            p.noFill();
            p.ellipse(0, 0, nodeSize * 1.5, nodeSize * 1.5);
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * p.TWO_PI;
                const pointX = p.cos(angle) * nodeSize * 0.75;
                const pointY = p.sin(angle) * nodeSize * 0.75;
                const pointPulse = p.sin(time * 4 + i) * 10;
                p.fill(240, 240, 240, 200);
                p.noStroke();
                p.ellipse(pointX, pointY, 40 + pointPulse, 40 + pointPulse);
            }
            p.pop();
            p.noStroke();
            p.fill(node.color[0], node.color[1], node.color[2], isCurrent ? 255 : 150);
            p.ellipse(node.x, node.y, nodeSize * 0.6, nodeSize * 0.6);
            p.fill(255, 255, 255, 255);
            p.ellipse(node.x, node.y, 40, 40);
            p.fill(255, 255, 255, 255);
            p.ellipse(node.x, node.y, 10, 10);
        });
    }
    
    function drawNodoImage(nodeIndex, alpha) {
        if (!nodes || nodes.length <= nodeIndex || alpha <= 0) return;
        const node = nodes[nodeIndex];
        const nodeNumber = nodeIndex + 1;
        
        // Disegna solo immagini per nodi 2-25
        if (nodeNumber < 2 || nodeNumber > 25) return;
        
        if (!nodoImages[nodeNumber]) return;
        const settings = NODO_IMAGE_SETTINGS[nodeNumber];
        if (!settings) return;
        p.push();
        try {
            const imageX = node.x + settings.offsetX;
            const imageY = node.y + settings.offsetY;
            if (nodeNumber <= 10 && nodoImages[nodeNumber].bis && nodoImages[nodeNumber].original) {
                const fadeProgress = nodoImageFadeProgress[nodeNumber];
                if (fadeProgress < 1) {
                    const img = nodoImages[nodeNumber].bis;
                    if (img && img.width && img.height) {
                        const desiredWidth = img.width * settings.scale;
                        const desiredHeight = img.height * settings.scale;
                        const bisAlpha = alpha * (1 - fadeProgress);
                        p.tint(255, bisAlpha);
                        p.image(img, imageX, imageY, desiredWidth, desiredHeight);
                    }
                }
                if (fadeProgress > 0) {
                    const img = nodoImages[nodeNumber].original;
                    if (img && img.width && img.height) {
                        const desiredWidth = img.width * settings.scale;
                        const desiredHeight = img.height * settings.scale;
                        const originalAlpha = alpha * fadeProgress;
                        p.tint(255, originalAlpha);
                        p.image(img, imageX, imageY, desiredWidth, desiredHeight);
                    }
                }
            } else {
                const img = nodoImages[nodeNumber].original || nodoImages[nodeNumber];
                if (!img || !img.width || !img.height) return;
                const desiredWidth = img.width * settings.scale;
                const desiredHeight = img.height * settings.scale;
                p.tint(255, alpha);
                p.image(img, imageX, imageY, desiredWidth, desiredHeight);
            }
        } catch (e) { console.warn("Errore nel disegno dell'immagine del nodo", nodeNumber, e); }
        p.pop();
    }
    
    function drawMovingDot(currentPoint) {
        const time = p.millis() * 0.001;
        for (let i = 15; i > 0; i--) {
            const size = 300 + i * 40;
            const alpha = 8 - i * 0.4;
            const pulse = p.sin(time * 2 + i * 0.3) * 20;
            p.noStroke();
            p.fill(255, 255, 255, alpha);
            p.ellipse(currentPoint.x, currentPoint.y, size + pulse, size + pulse);
        }
        for (let i = 5; i > 0; i--) {
            const size = 150 + i * 30;
            const alpha = 15 - i * 2;
            const pulse = p.sin(time * 3 + i) * 15;
            p.fill(255, 255, 255, alpha);
            p.ellipse(currentPoint.x, currentPoint.y, size + pulse, size + pulse);
        }
        const mainPulse = p.sin(time * 5) * 25;
        p.noStroke();
        p.fill(255, 255, 255, 220);
        p.ellipse(currentPoint.x, currentPoint.y, 100 + mainPulse, 100 + mainPulse);
        p.fill(200, 200, 200, 255);
        p.ellipse(currentPoint.x, currentPoint.y, 50, 50);
        p.fill(255, 255, 255, 255);
        p.ellipse(currentPoint.x, currentPoint.y, 15, 15);
        if (movementState === 'MOVING_TO_NODE') {
            for (let i = 0; i < 12; i++) {
                const angle = time * 8 + (i / 12) * p.TWO_PI;
                const distance = 60 + p.sin(time * 6) * 30;
                const trailX = currentPoint.x + p.cos(angle) * distance;
                const trailY = currentPoint.y + p.sin(angle) * distance;
                const trailSize = 20 + p.sin(time * 7 + i) * 10;
                p.fill(255, 255, 255, 150);
                p.ellipse(trailX, trailY, trailSize, trailSize);
            }
        }
    }
    
    function handleCanvasClick(e) {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const currentPoint = getPointOnPath(scrollProgress, smoothPath, pathLength);
        const zoom = 0.025;
        const worldX = (clickX - p.width/2) / zoom + currentPoint.x;
        const worldY = (clickY - p.height/2) / zoom + currentPoint.y;
        
        // Prima controlla se c'è una descrizione attiva per chiuderla
        if (activeDescription !== null) {
            activeDescription = null;
            updateUI();
            return;
        }
        
        // Controlla se il click è all'interno di un'immagine di un nodo (solo nodi 2-25)
        for (let nodeIdx = 0; nodeIdx < nodes.length; nodeIdx++) {
            const node = nodes[nodeIdx];
            const nodeNumber = nodeIdx + 1;
            
            // Solo nodi 2-25 hanno immagini e possono essere cliccati
            if (nodeNumber < 2 || nodeNumber > 25) continue;
            
            // Controlla se il click è all'interno dell'immagine del nodo
            if (showNodoImages[nodeNumber] && nodoImageAlphas[nodeNumber] > 0) {
                const settings = NODO_IMAGE_SETTINGS[nodeNumber];
                if (settings && settings.scale > 0) {
                    const imageX = node.x + settings.offsetX;
                    const imageY = node.y + settings.offsetY;
                    
                    // Ottieni le dimensioni reali dell'immagine
                    let imgWidth, imgHeight;
                    const img = nodoImages[nodeNumber].original || nodoImages[nodeNumber];
                    if (img && img.width && img.height) {
                        imgWidth = img.width * settings.scale;
                        imgHeight = img.height * settings.scale;
                        
                        // Controlla se il click è all'interno del rettangolo dell'immagine
                        if (worldX >= imageX && worldX <= imageX + imgWidth && 
                            worldY >= imageY && worldY <= imageY + imgHeight) {
                            handleNodeClick(nodeIdx);
                            return;
                        }
                    }
                }
            }
            
            // Controlla anche i nodi direttamente (solo per nodi 2-25)
            const dist = distance(worldX, worldY, node.x, node.y);
            if (dist < 1500) {
                handleNodeClick(nodeIdx);
                return;
            }
        }
    }
    
    function handleNodeClick(nodeIdx) {
        const nodeNumber = nodeIdx + 1;
        
        // Non fare nulla per l'ultimo nodo (uscita automatica)
        if (nodeNumber === 26) {
            return;
        }
        
        // Non fare nulla per il primo nodo (nessuna immagine)
        if (nodeNumber === 1) {
            return;
        }
        
        let animationType = 'group1';
        if (nodeNumber >= 2 && nodeNumber <= 9) animationType = 'group1';
        else if (nodeNumber >= 10 && nodeNumber <= 16) animationType = 'group2';
        else if (nodeNumber >= 17 && nodeNumber <= 21) animationType = 'group3';
        else if (nodeNumber >= 22 && nodeNumber <= 25) animationType = 'group4';
        
        const textIndex = nodeNumber - 2;
        const letterText = LETTER_TEXTS[textIndex];
        
        if (activeDescription && activeDescription.nodeIndex === nodeIdx) {
            activeDescription = null;
            updateUI();
        } else {
            activeDescription = {
                nodeIndex: nodeIdx,
                animationType: animationType,
                node: nodes[nodeIdx],
                text: letterText,
                startTime: p.millis() * 0.001,
                nodeNumber: nodeNumber,
                imageNumber: getImageNumber(nodeNumber),
                waveIntensity: getWaveIntensity(textIndex)
            };
            
            if (animationType === 'group1') createTextLinesGroup1(nodes[nodeIdx], letterText, nodeNumber);
            else if (animationType === 'group2') createTextLinesGroup2(nodes[nodeIdx], letterText, nodeNumber);
            else if (animationType === 'group3') createTextLinesGroup3(nodes[nodeIdx], letterText, nodeNumber);
            else if (animationType === 'group4') createTextLinesGroup4(nodes[nodeIdx], letterText, nodeNumber);
            
            updateUI();
        }
    }
    
    p.preload = async function() {
        console.log("Caricamento immagini dei nodi...");
        wakeTypeFont = p.loadFont('../Assets/WakeType.ttf');
        console.log("Font WakeType caricato");
        
        for (let imageFileIndex = 1; imageFileIndex <= 26; imageFileIndex++) {
            let nodeIndexForImage = imageFileIndex === 26 ? 0 : imageFileIndex;
            const nodeNumber = nodeIndexForImage + 1;
            const originalPath = `assets/nodo_${imageFileIndex}.png`;
            if (!nodoImages[nodeNumber]) nodoImages[nodeNumber] = {};
            try {
                const originalImg = await loadImageSafely(originalPath, `Img ${imageFileIndex} -> Nodo ${nodeNumber}`);
                nodoImages[nodeNumber].original = originalImg;
                // Salva le dimensioni dell'immagine
                nodoImageDimensions[nodeNumber] = {
                    width: originalImg.width,
                    height: originalImg.height
                };
                console.log(`✅ Immagine originale nodo_${imageFileIndex}.png assegnata al Nodo ${nodeNumber}`);
                if (imageFileIndex <= 10) {
                    const bisPath = `assets/nodo_${imageFileIndex}bis.png`;
                    try {
                        const bisImg = await loadImageSafely(bisPath, `Img ${imageFileIndex}bis -> Nodo ${nodeNumber}`);
                        nodoImages[nodeNumber].bis = bisImg;
                        console.log(`✅ Immagine bis nodo_${imageFileIndex}bis.png assegnata al Nodo ${nodeNumber}`);
                    } catch (e) {
                        console.warn(`Errore nel caricamento di ${bisPath}:`, e);
                        const placeholder = p.createGraphics(200, 200);
                        placeholder.background(200, 200, 255, 100);
                        placeholder.fill(50, 50, 100);
                        placeholder.textSize(24);
                        placeholder.textAlign(p.CENTER, p.CENTER);
                        placeholder.text(`Bis ${nodeNumber}`, 100, 100);
                        nodoImages[nodeNumber].bis = placeholder;
                    }
                }
            } catch (e) {
                console.warn(`Errore nel caricamento di ${originalPath}:`, e);
            }
        }
    };
    
    p.setup = function() {
        console.log("Setup p5.js - Inizializzazione con effetto blur");
        
        // Inizializza le posizioni dinamiche prima di creare il canvas
        initDynamicPositions();
        
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('p5-canvas');
        window.width = p.width;
        window.height = p.height;
        pathPoints = scalePoints(ORIGINAL_POINTS, 8);
        smoothPath = createSmoothPath(pathPoints, 30);
        pathLength = calculatePathLength(smoothPath);
        calculateNodes();
        initStarParticles();
        initUIElements();
        initElementStates();
        
        // Inizializza l'animazione di uscita
        initExitAnimation();
        
        canvas.elt.addEventListener('click', handleCanvasClick);
        canvas.elt.style.cursor = 'pointer';
        window.addEventListener('wheel', function(e) {
            if (isProcessing || movementState !== 'STOPPED') return;
            const direction = e.deltaY > 0 ? 1 : -1;
            startMoving(direction);
        });
        window.addEventListener('keydown', function(e) {
            if (isProcessing || movementState !== 'STOPPED') return;
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'Space') {
                e.preventDefault();
                startMoving(1);
            } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
                e.preventDefault();
                startMoving(-1);
            }
        });
        console.log("Setup completato con", nodes.length, "nodi");
    };
                      
    p.draw = function() {
        updateMovement();
        updateImageTransitions();
        updateDescriptionAlpha();
        const currentPoint = getPointOnPath(scrollProgress, smoothPath, pathLength);
        drawLightGradient();
        drawStars(currentPoint);
        p.push();
        const zoom = 0.025;
        p.translate(p.width/2, p.height/2);
        p.scale(zoom);
        p.translate(-currentPoint.x, -currentPoint.y);
        
        // Disegna elementi del mondo - SOLO IMMAGINI PER NODI 2-25
        for (let nodeIdx = 0; nodeIdx < 26; nodeIdx++) {
            const nodeNumber = nodeIdx + 1;
            // Solo nodi 2-25 hanno immagini
            if (nodeNumber >= 2 && nodeNumber <= 25 && showNodoImages[nodeNumber] && nodoImageAlphas[nodeNumber] > 0) {
                drawNodoImage(nodeIdx, nodoImageAlphas[nodeNumber]);
            }
        }
        
        drawSpiralThreads();
        drawMainPath();
        drawNodes();
        drawMovingDot(currentPoint);
        p.pop(); // Fine del contesto mondo
        
        // ===== DISEGNA LE DESCRIZIONI IN COORDINATE SCHERMO =====
        if (activeDescription && descriptionAlpha > 0) {
            p.push();
            
            // Applica un overlay semi-trasparente per migliorare la leggibilità
            p.fill(0, 0, 0, 30);
            p.noStroke();
            p.rect(0, 0, p.width, p.height);
            
            // Disegna la descrizione appropriata
            switch (activeDescription.animationType) {
                case 'group1': drawDescriptionGroup1(p); break;
                case 'group2': drawDescriptionGroup2(p); break;
                case 'group3': drawDescriptionGroup3(p); break;
                case 'group4': drawDescriptionGroup4(p); break;
            }
            
            p.pop();
        }
        
        updateUI();
    };
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        window.width = p.width;
        window.height = p.height;
        initStarParticles();
        
        // Aggiorna le posizioni dinamiche per le nuove dimensioni
        initDynamicPositions();
        
        // Se c'è una descrizione attiva, ricreala con le nuove dimensioni
        if (activeDescription) {
            const nodeIdx = activeDescription.nodeIndex;
            const nodeNumber = nodeIdx + 1;
            const textIndex = nodeNumber - 2;
            const letterText = LETTER_TEXTS[textIndex];
            
            if (activeDescription.animationType === 'group1') createTextLinesGroup1(nodes[nodeIdx], letterText, nodeNumber);
            else if (activeDescription.animationType === 'group2') createTextLinesGroup2(nodes[nodeIdx], letterText, nodeNumber);
            else if (activeDescription.animationType === 'group3') createTextLinesGroup3(nodes[nodeIdx], letterText, nodeNumber);
            else if (activeDescription.animationType === 'group4') createTextLinesGroup4(nodes[nodeIdx], letterText, nodeNumber);
        }
    };
};

// ============ AVVIO ============
new p5(sketch);