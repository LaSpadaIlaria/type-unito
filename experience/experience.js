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
    26: { offsetX: 2000, offsetY: -2000, scale: 0 }
};

// Testi delle lettere (nodi 2-25 corrispondono a testi 1-24)
const LETTER_TEXTS = [
    // Testo 1 - Nodo 2
    "Nebulosa... non la raggiungi... la percepisci solo quando riesci a seguirla. Non sai bene dove sei... lo spazio è confuso. Le grazie si avvolgono... turbini... filamenti d'inchiostro che nascondono... La lettera c'è... forse... dietro... Ti muovi... cerchi di afferrarla... ma lei si ritrae... si nasconde nelle sue stesse curve... Lo spazio respira... ondeggia... E tu cerchi... una strada... tra quei filamenti che si intrecciano... pensieri appena formati...",
    
    // Testo 2 - Nodo 3
    "Qualcosa si avvolge… una curva che danza… ritmo… rapidità… Le grazie conducono alla lettera, la creano, la fanno nascere: Scende la prima asta. Veloce, spessa, non guarda dove va… poi…rallenta. La barra diventa un punto di sospensione che devia il movimento verso destra, un'altra asta … SLASH! Un taglio. E poi… rinascita.",
    
    // Testo 3 - Nodo 4
    "Inizi a muoverti... inizi a definirti... forse sai dove ti trovi? Le curve salgono... scendono... salgono di nuovo... Tre archi che si inseguono... fluidi... senza interruzione. Scorre il gesto, continuo, come acqua che trova la sua strada. Non ci sono angoli, solo movimento. Il pennino danza sulla superficie, lascia tracce morbide, quasi trasparenti. Dove finisce una curva ne inizia un'altra.",
    
    // Testo 4 - Nodo 5
    "Una curva ampia si solleva... sale... cerca l'alto... poi si spezza. Si interrompe. Un taglio che attraversa, obliquo, deciso. Il tratto superiore si attorciglia su se stesso, si avvolge in una voluta che non sa dove andare, mentre quello inferiore scende, si allunga in una coda sottile che si perde nello spazio. La forma si frammenta... cerca di tenersi insieme... ma qualcosa l'ha divisa. Due parti che erano una... ora separate... sospese... La grazia finale si ripiega come un uncino, come se volesse aggrapparsi a qualcosa che non c'è più.",
    
    // Testo 5 - Nodo 6
    "Qualcosa si addensa. Le forme si fanno più scure... più dense... come se il sogno stesse prendendo corpo. Aste che salgono come torri ma poi si fratturano in angoli acuti... quasi spine. C'è un'architettura qui... ma è quella di un castello che ricordi solo a metà... con guglie che bucano la nebbia. Il nero si accumula... si stratifica in zone d'ombra... Le grazie diventano artigli... la lettera si aggrappa allo spazio cercando di non dissolversi.",
    
    // Testo 6 - Nodo 7
    "Pelosa... Spinosa... Un avvolgimento? La curva si apre, ampia, generosa, ma il suo bordo è frastagliato, irregolare, come se fosse coperta di peli o spine che escono dal tracciato principale. Ricorda quasi una creatura, o forse una pianta... ma è una lettera. Il nero non è uniforme: si sfrangia, si diffonde in piccole proiezioni che sembrano vibrare, pulsare. Si avvolge come una coda, morbida all'interno, aggressiva all'esterno. La texture è tattile, quasi la senti sotto le dita. Il gesto calligrafico ha lasciato tracce organiche, vive. La forma respira... si muove... abita lo spazio?",
    
    // Testo 7 - Nodo 8
    "Un unico tratto... Non si stacca mai. Inizia con un ricciolo che si volge su se stesso, come un grembo... una spirale che gira, gira, scende, poi si allunga verso l'alto. Sale in una curva morbida, quasi silvano, leggera, che si gonfia e si chiude creando sospensione. Poi scende, fluida, senza interruzione, e si apre di nuovo in una seconda pancia, più ampia, più generosa della prima... gira. Il gesto è continuo, ininterrotto, come un nastro che danza nell'aria. Non ci sono angoli, non ci sono pause. Solo movimento che si piega, si ripiega, si avvolge su se stesso cercando di contenere qualcosa... o forse di proteggerlo.",
    
    // Testo 8 - Nodo 9
    "Si spezza... Due curve opposte, una sopra e una sotto, unite da un tracciato che scende, taglia, attraversa. Ma i bordi non sono netti. La curva superiore si gonfia a sinistra, termina in una piccola punta, un accenno rapido. Il segno che le collega vibra leggermente, come se stesse perdendo definizione, come se i contorni iniziassero a sfumare. La curva inferiore riprende quella peluria della creatura di prima, ma solo un pelo, un'appendice vitale che esce dal corpo della lettera. E poi si riavvolge su se stessa, termina in quel ricciolo denso, pieno, quella coda che ancora pulsa di vita. È una forma che va in due direzioni opposte, che si strappa tra alto e basso... tra dove era e dove va.",
    
    // Testo 9 - Nodo 10
    "Due occhi... Due fori circolari, perfetti, che ti fissano. La forma è massiccia, geometrica, costruita su verticali spesse e curve che si chiudono formando due pupille simmetriche. Al centro un elemento a mandorla, una forma ovale piena che divide e unisce allo stesso tempo. I terminali laterali si aprono come code, grazie che escono verso l'esterno quasi come corna o antenne. Il nero è pieno, compatto, solido... Non c'è più la fluidità dei segni precedenti: qui la forma è densa, quasi pesante... come se il sogno stesse coagulando, prendendo corpo. La lettera ti guarda, ti osserva, quasi consapevole di sé.",
    
    // Testo 10 - Nodo 11
    "Massiccia... Quadrata... Una verticale ferma, pesante, quasi muta. Superiore e inferiore si espandono... si rigonfiano. Una pressione trattenuta, come aria pronta a uscire ma ancora compressa. Eppure qualcosa vibra. Non ovunque. Al centro. Si spinge verso destra, si gonfia, si incurva. Un solo ricciolo, denso, morbido, come un prolungamento del respiro. Sembra una tromba: non decora, emette. Amplifica. La struttura in sé resta immobile, ma da quel punto nasce un'onda. Silenzio e suono insieme. La lettera non si muove, eppure risuona. La senti?",
    
    // Testo 11 - Nodo 12
    "Qui si ricade. Il sogno ritorna, più denso, più ornato. La verticale scende lunga, poi si ripiega in una curva ampia che si avvolge su se stessa formando una spirale generosa, irregolare. Ma non è sola: dall'asta principale nascono altri riccioli, spirali più piccole che escono come germogli, come tentacoli che cercano lo spazio. Una in alto a sinistra, una a destra a metà discesa. I contorni vibrano, si gonfiano, si assottigliano in modo irregolare. La natura qui è dinamica, infinita, si espande senza controllo. Le forme si moltiplicano, si intrecciano, creano un movimento sublime che non si ferma mai. È una lettera che cresce, che vive, che respira con un'energia organica, incontrollabile.",
    
    // Testo 12 - Nodo 13
    "La curva superiore sembra tirarla indietro, come se trattenesse qualcosa che sta per sfuggire, mentre quella inferiore pare allungarla verso un altrove incerto. Le grazie ai due estremi non appaiono decorative: sembrano afferrarla, forse tenderla, forse scioglierla, e la forma si distende come una corda che qualcuno tira da due parti senza decidersi. Nei pressi dei nodi il tratto si assottiglia fino a diventare un filo, e quei due pallini d'inchiostro potrebbero essere esitazioni del pennino… o punti in cui la lettera si è stretta per un istante, come se stesse cercando di trattenere la propria forma.",
    
    // Testo 13 - Nodo 14
    "La verticale a sinistra non è stabile, è morbida. Parte da destra, si piega, ondula leggermente prima di scendere. Non è dritta, non è ferma: ha un movimento interno, una curvatura che la rende viva. E poi sulla destra si apre la spirale. Cerchi concentrici che si stringono, si avvolgono sempre più vicini verso il centro, verso quel punto denso, nero, pieno. È un occhio. Un vortice. Ti guarda e ti attira, ti porta giù, sempre più giù nel suo nucleo. Non puoi resistere: il movimento è ipnotico, centripeto, ti risucchia nel buio. La forma gira, gira, si stringe fino a quel puntino finale dove tutto converge, dove tutto sprofonda. Stai cadendo nel mondo onirico, più in profondità di prima. Il centro ti chiama, ti inghiotte.",
    
    // Testo 14 - Nodo 15
    "Dopo la caduta, un cerchio. Ampio, generoso, che si chiude su se stesso formando un contenitore, un grembo. Ma dentro c'è un'altra forma, una curva a cuore che si avvolge verso il centro, puntando verso il basso, creando un punto di tensione interna. La forma cerca di chiudersi, di proteggersi. Ma qualcosa sfugge… Una lunga coda, morbida, esce dal corpo circolare e si allunga obliqua verso il basso a destra. Si gonfia al centro, poi si assottiglia e termina in un ricciolo che si ripiega su se stesso. È una via di fuga. Un tentativo di uscire dal cerchio, di rompere la chiusura. Quella coda si protende nello spazio esterno, vuole staccarsi, liberarsi. Ma il ricciolo finale la trattiene ancora, esita. È sospesa tra il restare dentro e l'andare fuori, tra il contenimento e la liberazione.",
    
    // Testo 15 - Nodo 16
    "La verticale scende, ferma, decisa. Sale fino a raggiungere l'altezza, poi da lì parte una spalla che si protende verso destra. Ma non si chiude. Si apre, si solleva formando un arco che termina arrotolato su se stesso in una spirale stretta, compatta. È come una testa che guarda indietro, un riccio che si avvolge. La forma è semplice nella sua struttura base, ma quella terminazione a spirale conserva ancora un ricordo del movimento onirico. Il gesto si concentra in quel punto finale, dove la curva si stringe, si raccoglie. La lettera ha un piede piantato... ma la testa ancora sogna...",
    
    // Testo 16 - Nodo 17
    "La pancia si apre ampia, generosa, sul lato sinistro crea un varco che lascia entrare lo spazio, una spirale…. Sul lato destro la curva si chiude quasi completamente. La spalla parte dal punto più rotondo, sale dritto terminando con appena un accenno di chiusura. In basso a destra, una piccola appendice sporge, quasi un terminale che punta obliquo. La curva scorre continua, senza interruzioni brusche, il modulo è contenuto ma respira... ancora morbida... ma la struttura si definisce.",
    
    // Testo 17 - Nodo 18
    "Due archi paralleli che salgono e scendono creando due controforme gemelle. Al centro, dove i due archi si incontrano, si forma un vertice, un rettangolo, che scende leggermente… un tronco… un albero. Le terminazioni inferiori si riavvolgono su se stesse in piccoli riccioli, guardano verso l'interno. La forma ha un ritmo binario, un movimento che si ripete, si duplica. Simmetria... battito doppio... le curve ancora morbide, non rigide... respirano insieme, sincronizzate.",
    
    // Testo 18 - Nodo 19
    "La lettera si apre con due braccia diagonali che convergono verso il basso formando un apice appuntito. Ma le terminazioni superiori non sono semplici: quella di sinistra si arrotola su se stessa in un ricciolo pieno, denso, che guarda indietro. Quella di destra termina con una goccia morbida, quasi un lacrima. Il vertice inferiore è affilato, preciso. Le due aste hanno peso variabile, si assottigliano avvicinandosi al punto di incontro. È una lettera che ancora si volta, che conserva memoria di dove è stata... nostalgica.",
    
    // Testo 19 - Nodo 20
    "Sinuosità. Liquida, ondulata, scorre come acqua o come un serpente che si erge. Si gonfia, si assottiglia, ha un movimento interno che la fa vibrare. La curva basale collega questo flusso a un'asta destra più stabile, più dritta, che termina con una grazia appena accennata, quasi geometrica. La controforma è ampia, generosa, l'apertura superiore lascia respirare lo spazio interno. Il contrasto tra la parte sinistra organica e quella destra più controllata crea tensione... guarda, osserva.",
    
    // Testo 20 - Nodo 21
    "La D ha un'asta sinistra stabile che termina in due piccole grazie leggermente abbozzate, e un arco destro ampio che culmina in una curva schiacciata. I tratti superiori e inferiori oscillano andando a creare una maggiore tensione nella controforma interna portando quasi ad una sorta di vibrazione all'occhio… o forse si sta proprio muovendo?",
    
    // Testo 21 - Nodo 22
    "Controforma ampia, quasi circolare, con apertura sul lato destro che interrompe la continuità della forma. Lo sperone orizzontale si inserisce perpendicolarmente, estendendosi verso l'interno della controforma creando una chiusura parziale. Ma i bordi esterni... i bordi vibrano. Piccole escrescenze triangolari si proiettano verso l'esterno: una nella zona superiore destra, come una punta acuminata che fuoriesce dalla curva, un'altra inferiore sinistra che sporge asimmetrica. Non sono grazie convenzionali, sono interruzioni del contorno, come se la forma stesse respirando, pulsando. Il peso del tratto è sostanzialmente uniforme ma queste proiezioni creano tensione visiva. La struttura è geometrica, definita... ma qualcosa sfugge, si protende.",
    
    // Testo 22 - Nodo 23
    "Due aste inclinate di peso consistente, simmetrico. Scendono parallele dall'altezza maiuscola e si congiungono in una curva basale regolare, ad arco. La controforma interna è stretta, una fenditura creata da due aste parallele, a distanza costante. I terminali superiori sono netti, tagliati in diagonale senza grazie. La curva inferiore ha raggio uniforme, collega le due verticali con fluidità, eppure... se guardi bene... il bordo esterno sinistro vibra appena, impercettibilmente. Un'oscillazione minima del contorno, come un tremito. Il tratto non è perfettamente liscio, ha microvariazioni che l'occhio quasi non coglie. Stabilità che trema.",
    
    // Testo 23 - Nodo 24
    "Costruzione binoculare con occhio orizzontale regolare. La barra mediana attraversa lo spazio posizionandosi leggermente sotto la linea mediana dell'altezza. L'apertura verso destra è contenuta, terminale superiore con becco pronunciato rivolto verso l'alto. Il peso è distribuito uniformemente lungo tutto il tracciato, le curve hanno raggio costante. Ma il bordo... il bordo della curva superiore presenta irregolarità, ondulazioni del contorno come se la superficie stesse per dissolversi, come se l'occhio si assottigliasse per scrutare meglio… osservare. La forma è definita, leggibile, funzionale. Eppure qualcosa sotto la pelle si muove ancora.",
    
    // Testo 24 - Nodo 25
    "È l'unica che osa ancora scendere. Mentre tutto intorno fluttua, lei affonda. La sua asta verticale, dritta e decisa, taglia la linea di base, la attraversa, come a cercare un terreno solido, reale. L'occhiello ellittico tende verso l'alto, un asse verticale lo attraversa. All'estremità inferiore dell'asta, la grazia si fa pesante, appuntita, si aggrappa attraverso un raccordo, un pesante incudine. Il tratto è uniforme, costruito con precisione tecnica, ma la sua forma racconta un'altra storia: quella di una radice che non si arrende, che fa piccole incursioni nel buio prima di tornare in superficie. Un becco sottile sulla sommità dell'asta punta verso sinistra, ripensando al viaggio percorso… ti stai svegliando?"
];

// ============ COSTANTI ============
const NODE_COUNT = 26;
const MOVEMENT_SPEED = 0.15;
const STAR_COUNT = 100;
const NODO_IMAGE_TARGET_ALPHA = 200;
const NODO_IMAGE_FADE_SPEED = 5;
const DESCRIPTION_FADE_SPEED = 8;
const IMAGE_TRANSITION_SPEED = 0.05;

// ============ STATO GLOBALE ============
let scrollProgress = 0;
let pathPoints = [], smoothPath = [], pathLength = 0;
let nodes = [], currentNodeIndex = 0;
let movementState = 'STOPPED';
let targetNodeIndex = 0;
let isProcessing = false;

let nodoImages = {};
let showNodoImages = {};
let nodoImageAlphas = {};
let nodoImageStates = {};
let nodoImageFadeProgress = {};

let starParticles = [];

// Stato per le descrizioni
let activeDescription = null; // { nodeIndex: number, animationType: 'group1' | 'group2' | 'group3' | 'group4', text: string }
let descriptionAlpha = 0;

// Variabili per le animazioni delle descrizioni
let textLinesGroup1 = []; // Per nodi 2-9
let textLinesGroup2 = []; // Per nodi 10-16
let textLinesGroup3 = []; // Per nodi 17-21 (blocco intero animato)
let textLinesGroup4 = []; // Per nodi 22-25 (statico)

let nodeCounter;

// Inizializza gli stati delle immagini
for (let i = 1; i <= 26; i++) {
    showNodoImages[i] = false;
    nodoImageAlphas[i] = 0;
    nodoImageStates[i] = 'bis';
    nodoImageFadeProgress[i] = 0;
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
            
            const x = 0.5 * ((2 * p1.x) +
                            (-p0.x + p2.x) * t +
                            (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * t2 +
                            (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3);
            
            const y = 0.5 * ((2 * p1.y) +
                            (-p0.y + p2.y) * t +
                            (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 +
                            (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3);
            
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
            return {
                x: p1.x + dx * segmentT,
                y: p1.y + dy * segmentT
            };
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
            color: [
                [220, 220, 220],
                [240, 240, 240],
                [255, 255, 255],
                [200, 200, 200]
            ][i % 4]
        });
    }
}

function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// ============ GESTIONE UI ============
function initUIElements() {
    nodeCounter = document.querySelector('.node-counter');
    updateUI();
}

function updateUI() {
    const nodeNumber = currentNodeIndex + 1;
    document.querySelector('.node-number').textContent = `Nodo ${nodeNumber}/26`;
    
    if (nodeCounter) {
        nodeCounter.style.opacity = '1';
    }
    
    updateStatusMessage();
}

function updateStatusMessage() {
    const statusMessageElement = nodeCounter.querySelector('.status-message');
    if (!statusMessageElement) return;
    
    if (activeDescription !== null) {
        statusMessageElement.textContent = "Click per chiudere la descrizione";
        statusMessageElement.style.display = 'block';
    } else if (movementState === 'MOVING_TO_NODE') {
        statusMessageElement.textContent = "Raggiungendo il nodo...";
        statusMessageElement.style.display = 'block';
    } else {
        statusMessageElement.style.display = 'none';
    }
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
        
        // Nascondi tutte le immagini
        for (let i = 1; i <= 26; i++) {
            showNodoImages[i] = false;
            nodoImageAlphas[i] = 0;
            if (i <= 10) {
                nodoImageStates[i] = 'bis';
                nodoImageFadeProgress[i] = 0;
            }
        }
        
        // Mostra l'immagine del nodo target
        if (targetNodeIndex >= 0 && targetNodeIndex < 26) {
            const nodeNumber = targetNodeIndex + 1;
            showNodoImages[nodeNumber] = true;
            if (nodeNumber <= 10) {
                nodoImageStates[nodeNumber] = 'bis';
                nodoImageFadeProgress[nodeNumber] = 0;
            }
        }
        
        // Nascondi tutte le descrizioni
        activeDescription = null;
        descriptionAlpha = 0;
        
        updateStatusMessage();
    }
}

function updateMovement() {
    if (movementState === 'MOVING_TO_NODE') {
        const targetT = nodes[targetNodeIndex].t;
        const distanceToTarget = Math.abs(targetT - scrollProgress);
        
        const nodoIndex = targetNodeIndex + 1;
        if (nodoIndex >= 1 && nodoIndex <= 26 && showNodoImages[nodoIndex]) {
            if (distanceToTarget < 0.008) {
                nodoImageAlphas[nodoIndex] = Math.min(
                    nodoImageAlphas[nodoIndex] + NODO_IMAGE_FADE_SPEED, 
                    NODO_IMAGE_TARGET_ALPHA
                );
            }
        }
        
        scrollProgress += (targetT - scrollProgress) * MOVEMENT_SPEED;
        
        if (distanceToTarget < 0.0005) {
            scrollProgress = targetT;
            currentNodeIndex = targetNodeIndex;
            movementState = 'STOPPED';
            isProcessing = false;
            
            updateStatusMessage();
            
            const nodoIndex = currentNodeIndex + 1;
            if (nodoIndex >= 1 && nodoIndex <= 26) {
                nodoImageAlphas[nodoIndex] = NODO_IMAGE_TARGET_ALPHA;
                if (nodoIndex <= 10) {
                    nodoImageStates[nodoIndex] = 'bis';
                    nodoImageFadeProgress[nodoIndex] = 0;
                }
            } else {
                for (let i = 1; i <= 26; i++) {
                    showNodoImages[i] = false;
                    nodoImageAlphas[i] = 0;
                }
            }
        }
    }
}

function updateImageTransitions() {
    for (let i = 1; i <= 10; i++) {
        const nodeNumber = i;
        
        let hasActiveDescription = false;
        if (activeDescription && activeDescription.nodeIndex === i-1) {
            hasActiveDescription = true;
        }
        
        if (hasActiveDescription) {
            if (nodoImageStates[nodeNumber] !== 'original') {
                nodoImageStates[nodeNumber] = 'original';
            }
            nodoImageFadeProgress[nodeNumber] = Math.min(
                nodoImageFadeProgress[nodeNumber] + IMAGE_TRANSITION_SPEED, 
                1
            );
        } else {
            if (nodoImageStates[nodeNumber] !== 'bis') {
                nodoImageStates[nodeNumber] = 'bis';
            }
            nodoImageFadeProgress[nodeNumber] = Math.max(
                nodoImageFadeProgress[nodeNumber] - IMAGE_TRANSITION_SPEED, 
                0
            );
        }
    }
}

function updateDescriptionAlpha() {
    if (activeDescription !== null) {
        descriptionAlpha = Math.min(descriptionAlpha + DESCRIPTION_FADE_SPEED, 255);
    } else {
        descriptionAlpha = Math.max(descriptionAlpha - DESCRIPTION_FADE_SPEED, 0);
    }
}

// ============ FUNZIONI PER LE DESCRIZIONI ============

// Funzione per dividere il testo in righe di circa 70 caratteri
function splitTextIntoLines(text, maxCharsPerLine = 70) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        if (currentLine.length + word.length + 1 <= maxCharsPerLine) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    return lines;
}

// Gruppo 1: Nodi 2-9 - Animazioni molto diverse tra loro, parole che ondeggiano, inclinano, esplodono
function createTextLinesGroup1(node, text) {
    textLinesGroup1 = [];
    
    // Dividi il testo in righe
    const lines = splitTextIntoLines(text, 70);
    
    const offsetX = 0;
    const offsetY = 0;
    const lineHeight = 1200;
    const startY = node.y + offsetY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        const words = line.split(' ');
        const wordsInLine = [];
        
        const wordSpacing = 350;
        const estimatedCharWidth = 320;
        
        // Calcola larghezza approssimativa della riga per centrare
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * estimatedCharWidth + wordSpacing;
        });
        totalLineWidth -= wordSpacing;
        
        let currentX = node.x + offsetX - totalLineWidth / 2;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * estimatedCharWidth;
            
            // Tipo di animazione RANDOM per ogni parola
            const animationType = Math.random();
            
            wordsInLine.push({
                text: word,
                x: currentX + wordWidth / 2,
                y: startY + lineIndex * lineHeight,
                baseX: currentX + wordWidth / 2,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth,
                
                // Determinazione del tipo di animazione
                animationType: animationType < 0.2 ? 'wave' : 
                              animationType < 0.4 ? 'tilt' :
                              animationType < 0.6 ? 'bounce' :
                              animationType < 0.8 ? 'explode' : 'float',
                
                // Parametri specifici per ogni tipo di animazione
                waveAmp: 30 + Math.random() * 40,
                waveSpeed: 0.02 + Math.random() * 0.03,
                waveOffset: Math.random() * 1000,
                
                tiltAmp: (Math.random() - 0.5) * 0.3,
                tiltSpeed: 0.01 + Math.random() * 0.02,
                tiltOffset: Math.random() * 1000,
                
                bounceAmp: 40 + Math.random() * 50,
                bounceSpeed: 0.03 + Math.random() * 0.04,
                bounceOffset: Math.random() * 1000,
                
                explodeAmp: 60 + Math.random() * 80,
                explodeSpeed: 0.04 + Math.random() * 0.05,
                explodeOffset: Math.random() * 1000,
                explodeScale: 0.5 + Math.random() * 1.0,
                
                floatAmpX: 30 + Math.random() * 40,
                floatAmpY: 20 + Math.random() * 30,
                floatSpeedX: 0.015 + Math.random() * 0.02,
                floatSpeedY: 0.01 + Math.random() * 0.015,
                floatOffsetX: Math.random() * 1000,
                floatOffsetY: Math.random() * 1000,
                
                // Animazioni dei caratteri (diverse per ogni tipo)
                charRotations: [],
                charSpacings: [],
                charScales: []
            });
            
            // Inizializza animazioni per ogni carattere
            const lastWord = wordsInLine[wordsInLine.length - 1];
            const baseCharSpacing = 320;
            
            for (let i = 0; i < word.length; i++) {
                // Per l'effetto "explode", i caratteri hanno spaziatura variabile
                if (lastWord.animationType === 'explode') {
                    lastWord.charSpacings.push(baseCharSpacing * (1.5 + Math.random() * 1.0));
                    lastWord.charRotations.push((Math.random() - 0.5) * 0.5);
                    lastWord.charScales.push(0.8 + Math.random() * 0.6);
                } 
                // Per l'effetto "tilt", caratteri inclinati uniformemente
                else if (lastWord.animationType === 'tilt') {
                    lastWord.charSpacings.push(baseCharSpacing);
                    lastWord.charRotations.push((i / word.length - 0.5) * 0.4);
                    lastWord.charScales.push(1.0);
                }
                // Per altri effetti, spaziatura e rotazioni normali
                else {
                    lastWord.charSpacings.push(baseCharSpacing + (Math.random() - 0.5) * 50);
                    lastWord.charRotations.push((Math.random() - 0.5) * 0.1);
                    lastWord.charScales.push(0.9 + Math.random() * 0.3);
                }
            }
            
            currentX += wordWidth + wordSpacing;
        });
        
        textLinesGroup1.push(wordsInLine);
    });
    
    // Aggiungi inclinazione alle righe
    textLinesGroup1.forEach((wordsInLine, lineIndex) => {
        const lineRotation = (Math.random() - 0.5) * 0.15;
        
        if (wordsInLine[0]) {
            wordsInLine[0].lineRotation = lineRotation;
        }
    });
}

function drawDescriptionGroup1(p) {
    if (descriptionAlpha <= 0 || !activeDescription) return;
    
    const time = p.millis() * 0.001;
    
    textLinesGroup1.forEach((wordsInLine, lineIndex) => {
        const lineRotation = wordsInLine[0]?.lineRotation || 0;
        
        wordsInLine.forEach((word, wordIndex) => {
            p.push();
            
            // Applica rotazione della riga
            p.translate(word.baseX, word.baseY);
            p.rotate(lineRotation);
            
            // Calcola animazione in base al tipo
            let animX = 0, animY = 0, animRotation = 0, animScale = 1.0;
            
            switch (word.animationType) {
                case 'wave':
                    animY = Math.sin(time * word.waveSpeed + word.waveOffset) * word.waveAmp;
                    animRotation = Math.sin(time * word.waveSpeed * 0.7 + word.waveOffset) * 0.1;
                    break;
                    
                case 'tilt':
                    animRotation = Math.sin(time * word.tiltSpeed + word.tiltOffset) * word.tiltAmp;
                    animY = Math.abs(Math.sin(time * word.tiltSpeed * 1.5 + word.tiltOffset)) * 20;
                    break;
                    
                case 'bounce':
                    const bounceT = Math.abs(Math.sin(time * word.bounceSpeed + word.bounceOffset));
                    animY = -bounceT * word.bounceAmp;
                    animScale = 1.0 + bounceT * 0.2;
                    break;
                    
                case 'explode':
                    const explodeT = Math.sin(time * word.explodeSpeed + word.explodeOffset);
                    const explodeFactor = Math.max(0, explodeT);
                    animX = (Math.random() - 0.5) * explodeFactor * word.explodeAmp;
                    animY = (Math.random() - 0.5) * explodeFactor * word.explodeAmp;
                    animScale = 1.0 + explodeFactor * word.explodeScale;
                    break;
                    
                case 'float':
                    animX = Math.sin(time * word.floatSpeedX + word.floatOffsetX) * word.floatAmpX;
                    animY = Math.cos(time * word.floatSpeedY + word.floatOffsetY) * word.floatAmpY;
                    animRotation = Math.sin(time * 0.02 + wordIndex * 0.1) * 0.05;
                    break;
            }
            
            // Applica animazione della parola
            p.translate(animX, animY);
            p.rotate(animRotation);
            p.scale(animScale);
            
            // Dimensione testo uniforme
            const baseTextSize = 700;
            
            // Disegna ogni carattere individualmente
            const totalWidth = word.charSpacings.reduce((a, b) => a + b, 0) - 
                             (word.charSpacings.length > 0 ? word.charSpacings[word.charSpacings.length - 1] : 0);
            const startX = -totalWidth / 2;
            
            p.translate(startX, 0);
            
            let currentCharX = 0;
            for (let i = 0; i < word.text.length; i++) {
                p.push();
                
                // Sposta alla posizione del carattere
                p.translate(currentCharX, 0);
                
                // Rotazione individuale del carattere
                const charRotation = word.charRotations[i] + 
                    Math.sin(time * 0.03 + i * 0.1) * 0.1;
                p.rotate(charRotation);
                
                // Scala individuale del carattere
                const charScale = word.charScales[i] + 
                    (word.animationType === 'explode' ? Math.sin(time * 0.05 + i) * 0.2 : 0);
                p.scale(charScale);
                
                // Colore con effetti speciali
                let brightness = 220;
                let r = brightness, g = brightness, b = brightness;
                
                // Effetti di colore in base al tipo di animazione
                if (word.animationType === 'explode') {
                    const colorPulse = Math.sin(time * 0.1 + i * 0.2) * 50;
                    r = Math.min(255, brightness + colorPulse);
                    g = Math.max(0, brightness - colorPulse * 0.5);
                    b = Math.max(0, brightness - colorPulse);
                } else if (word.animationType === 'float') {
                    r = brightness + Math.sin(time * 0.05 + i) * 30;
                    g = brightness + Math.sin(time * 0.05 + i + 1) * 30;
                    b = brightness + Math.sin(time * 0.05 + i + 2) * 30;
                }
                
                p.fill(r, g, b, descriptionAlpha);
                p.noStroke();
                
                // Disegna il carattere
                p.textSize(baseTextSize);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(word.text[i], 0, 0);
                
                p.pop();
                
                // Sposta alla posizione del prossimo carattere
                currentCharX += word.charSpacings[i];
            }
            
            p.pop();
        });
    });
}

// Gruppo 2: Nodi 10-16 - Parole che ondeggiano in sincrono per riga
function createTextLinesGroup2(node, text) {
    textLinesGroup2 = [];
    
    // Dividi il testo in righe
    const lines = splitTextIntoLines(text, 70);
    
    const offsetX = 0;
    const offsetY = 0;
    const lineHeight = 1200;
    
    const startY = node.y + offsetY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        const words = line.split(' ');
        const wordsInLine = [];
        
        const wordSpacing = 350;
        const estimatedCharWidth = 320;
        
        // Calcola larghezza approssimativa della riga per centrare
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * estimatedCharWidth + wordSpacing;
        });
        totalLineWidth -= wordSpacing;
        
        let currentX = node.x + offsetX - totalLineWidth / 2;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * estimatedCharWidth;
            
            wordsInLine.push({
                text: word,
                x: currentX + wordWidth / 2,
                y: startY + lineIndex * lineHeight,
                baseX: currentX + wordWidth / 2,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth
            });
            
            currentX += wordWidth + wordSpacing;
        });
        
        // Parametri di animazione SINCRONI per l'intera riga
        const lineObj = {
            words: wordsInLine,
            baseY: startY + lineIndex * lineHeight,
            
            // Onde sincrone per tutta la riga
            waveType: lineIndex % 3, // 0: onda orizzontale, 1: onda verticale, 2: onda circolare
            waveAmp: 40 + Math.random() * 50,
            waveSpeed: 0.02 + Math.random() * 0.02,
            waveOffset: Math.random() * 1000,
            
            // Inclinazione della riga
            tiltAmp: (Math.random() - 0.5) * 0.12,
            tiltSpeed: 0.005 + Math.random() * 0.01,
            tiltOffset: Math.random() * 1000
        };
        
        textLinesGroup2.push(lineObj);
    });
}

function drawDescriptionGroup2(p) {
    if (descriptionAlpha <= 0 || !activeDescription) return;
    
    const time = p.millis() * 0.001;
    
    textLinesGroup2.forEach((line, lineIndex) => {
        p.push();
        
        // Calcola inclinazione della riga
        const tilt = Math.sin(time * line.tiltSpeed + line.tiltOffset) * line.tiltAmp;
        
        // Calcola movimento d'onda per tutta la riga
        const globalWave = Math.sin(time * line.waveSpeed + line.waveOffset) * line.waveAmp;
        
        // Disegna ogni parola della riga in SINCRONIA
        line.words.forEach((word, wordIndex) => {
            p.push();
            
            // Posizione base della parola
            p.translate(word.baseX, word.baseY);
            
            // Applica inclinazione della riga
            p.rotate(tilt);
            
            // Calcola movimento d'onda sincrono in base al tipo
            let waveX = 0, waveY = 0;
            
            switch (line.waveType) {
                case 0: // Onda orizzontale
                    waveX = Math.sin(time * line.waveSpeed * 2 + wordIndex * 0.3) * line.waveAmp * 0.7;
                    waveY = globalWave * 0.5;
                    break;
                    
                case 1: // Onda verticale
                    waveY = Math.sin(time * line.waveSpeed * 1.5 + wordIndex * 0.2) * line.waveAmp;
                    waveX = globalWave * 0.3;
                    break;
                    
                case 2: // Onda circolare
                    const angle = wordIndex * 0.5 + time * line.waveSpeed * 3;
                    waveX = Math.cos(angle) * line.waveAmp * 0.6;
                    waveY = Math.sin(angle) * line.waveAmp * 0.6;
                    break;
            }
            
            // Applica movimento d'onda
            p.translate(waveX, waveY);
            
            // Rotazione leggera della parola in sincrono con l'onda
            const wordRotation = Math.sin(time * line.waveSpeed * 1.2 + wordIndex * 0.4) * 0.05;
            p.rotate(wordRotation);
            
            // Dimensione testo uniforme
            p.textSize(700);
            p.textAlign(p.CENTER, p.CENTER);
            
            // Colore con leggera modulazione in sincrono
            const brightness = 220 + Math.sin(time * line.waveSpeed + wordIndex * 0.1) * 20;
            p.fill(brightness, brightness, brightness, descriptionAlpha);
            p.noStroke();
            
            // Disegna la parola
            p.text(word.text, 0, 0);
            
            p.pop();
        });
        
        p.pop();
    });
}

// Gruppo 3: Nodi 17-21 - Intero blocco di testo che si muove e si inclina
function createTextLinesGroup3(node, text) {
    textLinesGroup3 = [];
    
    // Dividi il testo in righe
    const lines = splitTextIntoLines(text, 70);
    
    const offsetX = 0;
    const offsetY = 0;
    const lineHeight = 1200;
    
    const startY = node.y + offsetY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        const words = line.split(' ');
        const wordsInLine = [];
        
        const wordSpacing = 350;
        const estimatedCharWidth = 320;
        
        // Calcola larghezza approssimativa della riga per centrare
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * estimatedCharWidth + wordSpacing;
        });
        totalLineWidth -= wordSpacing;
        
        let currentX = node.x + offsetX - totalLineWidth / 2;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * estimatedCharWidth;
            
            wordsInLine.push({
                text: word,
                x: currentX + wordWidth / 2,
                y: startY + lineIndex * lineHeight,
                baseX: currentX + wordWidth / 2,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth
            });
            
            currentX += wordWidth + wordSpacing;
        });
        
        textLinesGroup3.push({
            words: wordsInLine,
            baseY: startY + lineIndex * lineHeight
        });
    });
    
    // Parametri per l'animazione dell'intero blocco
    textLinesGroup3.blockParams = {
        // Movimento del blocco
        waveAmpY: 50,
        waveSpeedY: 0.012,
        waveOffsetY: Math.random() * 1000,
        
        waveAmpX: 30,
        waveSpeedX: 0.008,
        waveOffsetX: Math.random() * 1000,
        
        // Inclinazione del blocco
        rotationAmp: 0.04,
        rotationSpeed: 0.006,
        rotationOffset: Math.random() * 1000,
        
        // Oscillazione verticale delle righe all'interno del blocco
        lineWaveAmp: 20,
        lineWaveSpeed: 0.02,
        lineWaveOffset: Math.random() * 1000
    };
}

function drawDescriptionGroup3(p) {
    if (descriptionAlpha <= 0 || !activeDescription) return;
    
    const time = p.millis() * 0.001;
    const block = textLinesGroup3.blockParams;
    
    // Calcola movimento dell'intero blocco
    const blockWaveY = Math.sin(time * block.waveSpeedY + block.waveOffsetY) * block.waveAmpY;
    const blockWaveX = Math.sin(time * block.waveSpeedX + block.waveOffsetX) * block.waveAmpX;
    const blockRotation = Math.sin(time * block.rotationSpeed + block.rotationOffset) * block.rotationAmp;
    
    p.push();
    
    // Applica trasformazione all'intero blocco
    p.translate(blockWaveX, blockWaveY);
    p.rotate(blockRotation);
    
    // Disegna tutte le righe con oscillazione verticale aggiuntiva
    textLinesGroup3.forEach((line, lineIndex) => {
        if (line.words) {
            const lineWaveY = Math.sin(time * block.lineWaveSpeed + block.lineWaveOffset + lineIndex * 0.3) * block.lineWaveAmp;
            
            // Disegna ogni parola della riga
            line.words.forEach((word, wordIndex) => {
                p.push();
                
                p.translate(word.baseX, word.baseY + lineWaveY);
                
                // Dimensione testo uniforme
                p.textSize(700);
                p.textAlign(p.CENTER, p.CENTER);
                
                // Colore
                p.fill(220, 220, 220, descriptionAlpha);
                p.noStroke();
                
                // Disegna la parola
                p.text(word.text, 0, 0);
                
                p.pop();
            });
        }
    });
    
    p.pop();
}

// Gruppo 4: Nodi 22-25 - Testo statico (mantenuto per completezza)
function createTextLinesGroup4(node, text) {
    textLinesGroup4 = [];
    
    // Dividi il testo in righe
    const lines = splitTextIntoLines(text, 70);
    
    const offsetX = 0;
    const offsetY = 0;
    const lineHeight = 1200;
    
    const startY = node.y + offsetY - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, lineIndex) => {
        const words = line.split(' ');
        const wordsInLine = [];
        
        const wordSpacing = 350;
        const estimatedCharWidth = 320;
        
        // Calcola larghezza approssimativa della riga per centrare
        let totalLineWidth = 0;
        words.forEach(word => {
            totalLineWidth += word.length * estimatedCharWidth + wordSpacing;
        });
        totalLineWidth -= wordSpacing;
        
        let currentX = node.x + offsetX - totalLineWidth / 2;
        
        words.forEach((word, wordIndex) => {
            const wordWidth = word.length * estimatedCharWidth;
            
            wordsInLine.push({
                text: word,
                x: currentX + wordWidth / 2,
                y: startY + lineIndex * lineHeight,
                baseX: currentX + wordWidth / 2,
                baseY: startY + lineIndex * lineHeight,
                width: wordWidth
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
    
    // Disegna tutte le righe staticamente
    textLinesGroup4.forEach((line, lineIndex) => {
        if (line.words) {
            line.words.forEach((word, wordIndex) => {
                p.push();
                
                p.translate(word.baseX, word.baseY);
                
                // Dimensione testo uniforme
                p.textSize(700);
                p.textAlign(p.CENTER, p.CENTER);
                
                // Colore
                p.fill(220, 220, 220, descriptionAlpha);
                p.noStroke();
                
                // Disegna la parola
                p.text(word.text, 0, 0);
                
                p.pop();
            });
        }
    });
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
            [180, 180, 180],
            [200, 200, 200],
            [220, 220, 220],
            [240, 240, 240],
            [255, 255, 255],
            [230, 230, 230],
            [210, 210, 210],
            [190, 190, 190]
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
                if (length > 0) {
                    normal = { x: -dy / length, y: dx / length };
                }
                
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
            threadPoints.forEach(point => {
                p.vertex(point.x, point.y);
            });
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
        for (let i = 0; i < smoothPath.length; i += 1) {
            p.vertex(smoothPath[i].x, smoothPath[i].y);
        }
        p.endShape();
        p.drawingContext.setLineDash([]);
        
        for (let i = 1; i <= 3; i++) {
            p.stroke(200, 200, 200, 40 - i * 10);
            p.strokeWeight(currentThickness + i * 60);
            
            p.beginShape();
            for (let j = 0; j < smoothPath.length; j += 2) {
                p.vertex(smoothPath[j].x, smoothPath[j].y);
            }
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
        
        if (!nodoImages[nodeNumber]) return;
        
        const settings = NODO_IMAGE_SETTINGS[nodeNumber];
        if (!settings) {
            console.log(`Nessuna impostazione per l'immagine del nodo ${nodeNumber}`);
            return;
        }
        
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
            
        } catch (e) {
            console.warn("Errore nel disegno dell'immagine del nodo", nodeNumber, e);
        }
        
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
        
        // Prima controlla se il click è su un'immagine (lettera)
        for (let nodeIdx = 0; nodeIdx < nodes.length; nodeIdx++) {
            const node = nodes[nodeIdx];
            const nodeNumber = nodeIdx + 1;
            
            // Controlla se c'è un'immagine visibile per questo nodo
            if (showNodoImages[nodeNumber] && nodoImageAlphas[nodeNumber] > 0) {
                const settings = NODO_IMAGE_SETTINGS[nodeNumber];
                if (settings && settings.scale > 0) {
                    const imageX = node.x + settings.offsetX;
                    const imageY = node.y + settings.offsetY;
                    
                    // Stima le dimensioni dell'immagine (semplificata)
                    let imgWidth = 1000 * settings.scale;
                    let imgHeight = 1000 * settings.scale;
                    
                    // Controlla se il click è dentro l'area dell'immagine
                    if (Math.abs(worldX - imageX) < imgWidth/2 && 
                        Math.abs(worldY - imageY) < imgHeight/2) {
                        
                        handleNodeClick(nodeIdx);
                        return;
                    }
                }
            }
        }
        
        // Se non è stato cliccato su un'immagine, controlla i nodi
        for (let nodeIdx = 0; nodeIdx < nodes.length; nodeIdx++) {
            const node = nodes[nodeIdx];
            const nodeNumber = nodeIdx + 1;
            
            const dist = distance(worldX, worldY, node.x, node.y);
            if (dist < 1500) {
                handleNodeClick(nodeIdx);
                return;
            }
        }
        
        // Se si clicca altrove, chiudi la descrizione
        if (activeDescription) {
            activeDescription = null;
            updateStatusMessage();
        }
    }
    
    function handleNodeClick(nodeIdx) {
        const nodeNumber = nodeIdx + 1;
        
        // Nodi 1 e 26 non mostrano descrizioni
        if (nodeNumber === 1 || nodeNumber === 26) {
            return;
        }
        
        // Determina il tipo di animazione in base al gruppo del nodo
        let animationType = 'group1'; // Predefinito
        
        if (nodeNumber >= 2 && nodeNumber <= 9) {
            animationType = 'group1'; // Animazioni molto diverse tra loro
        } else if (nodeNumber >= 10 && nodeNumber <= 16) {
            animationType = 'group2'; // Onde sincrone per riga
        } else if (nodeNumber >= 17 && nodeNumber <= 21) {
            animationType = 'group3'; // Intero blocco animato
        } else if (nodeNumber >= 22 && nodeNumber <= 25) {
            animationType = 'group4'; // Testo statico
        }
        
        // Ottieni il testo corrispondente alla lettera (nodo 2-25 → testo 0-23)
        const textIndex = nodeNumber - 2;
        const letterText = LETTER_TEXTS[textIndex];
        
        // Gestione toggle della descrizione
        if (activeDescription && activeDescription.nodeIndex === nodeIdx) {
            // Chiudi la descrizione se clicchi sullo stesso nodo
            activeDescription = null;
        } else {
            // Apri una nuova descrizione
            activeDescription = {
                nodeIndex: nodeIdx,
                animationType: animationType,
                node: nodes[nodeIdx],
                text: letterText
            };
            
            // Prepara le linee di testo per le animazioni
            if (animationType === 'group1') {
                createTextLinesGroup1(nodes[nodeIdx], letterText);
            } else if (animationType === 'group2') {
                createTextLinesGroup2(nodes[nodeIdx], letterText);
            } else if (animationType === 'group3') {
                createTextLinesGroup3(nodes[nodeIdx], letterText);
            } else if (animationType === 'group4') {
                createTextLinesGroup4(nodes[nodeIdx], letterText);
            }
        }
        
        updateStatusMessage();
    }
    
    p.preload = async function() {
        console.log("Caricamento immagini dei nodi...");
        
        for (let imageFileIndex = 1; imageFileIndex <= 26; imageFileIndex++) {
            let nodeIndexForImage;
            if (imageFileIndex === 26) {
                nodeIndexForImage = 0;
            } else {
                nodeIndexForImage = imageFileIndex;
            }
            
            const nodeNumber = nodeIndexForImage + 1;
            const originalPath = `assets/nodo_${imageFileIndex}.png`;
            
            if (!nodoImages[nodeNumber]) {
                nodoImages[nodeNumber] = {};
            }
            
            try {
                const originalImg = await loadImageSafely(
                    originalPath, 
                    `Img ${imageFileIndex} -> Nodo ${nodeNumber}`
                );
                nodoImages[nodeNumber].original = originalImg;
                console.log(`✅ Immagine originale nodo_${imageFileIndex}.png assegnata al Nodo ${nodeNumber}`);
                
                if (imageFileIndex <= 10) {
                    const bisPath = `assets/nodo_${imageFileIndex}bis.png`;
                    try {
                        const bisImg = await loadImageSafely(
                            bisPath, 
                            `Img ${imageFileIndex}bis -> Nodo ${nodeNumber}`
                        );
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
        console.log("Setup p5.js - 26 nodi con sistema di transizione immagini");
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
        
        // Aggiungi elemento per il messaggio di stato
        const navigationInfo = document.querySelector('.navigation-info');
        if (navigationInfo && !document.querySelector('.status-message')) {
            const statusMessage = document.createElement('div');
            statusMessage.className = 'status-message';
            statusMessage.style.display = 'none';
            navigationInfo.appendChild(statusMessage);
        }
        
        canvas.elt.addEventListener('click', handleCanvasClick);
        canvas.elt.style.cursor = 'pointer';
        
        // Scrolling in avanti e indietro
        window.addEventListener('wheel', function(e) {
            if (isProcessing || movementState !== 'STOPPED') return;
            
            const direction = e.deltaY > 0 ? 1 : -1;
            startMoving(direction);
        });
        
        // Tasti freccia per navigazione
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
        
        // Disegna le immagini dei nodi con il sistema di transizione
        for (let nodeIdx = 0; nodeIdx < 26; nodeIdx++) {
            const nodeNumber = nodeIdx + 1;
            if (showNodoImages[nodeNumber] && nodoImageAlphas[nodeNumber] > 0) {
                drawNodoImage(nodeIdx, nodoImageAlphas[nodeNumber]);
            }
        }
        
        drawSpiralThreads();
        drawMainPath();
        drawNodes();
        drawMovingDot(currentPoint);
        
        // Disegna la descrizione attiva se presente
        if (activeDescription && descriptionAlpha > 0) {
            switch (activeDescription.animationType) {
                case 'group1':
                    drawDescriptionGroup1(p);
                    break;
                case 'group2':
                    drawDescriptionGroup2(p);
                    break;
                case 'group3':
                    drawDescriptionGroup3(p);
                    break;
                case 'group4':
                    drawDescriptionGroup4(p);
                    break;
            }
        }
        
        p.pop();
        
        updateUI();
    };
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        window.width = p.width;
        window.height = p.height;
        initStarParticles();
    };
};

// ============ AVVIO ============
new p5(sketch);