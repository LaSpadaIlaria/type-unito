document.addEventListener('DOMContentLoaded', function() {
    // ============ FORZA LA PAGINA A INIZIARE DALL'ALTO ============
    window.scrollTo(0, 0);
    
    // Previeni il comportamento di scroll restoration del browser
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    
    // ============ VARIABILI GLOBALI ============
    const mainTitle = document.querySelector('.main-title');
    const heroSection = document.querySelector('.hero-section');
    const fontWeight = document.querySelector('.font-weight');
    const designer = document.querySelector('.designer');
    const year = document.querySelector('.year');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const p5Canvas = document.getElementById('p5-canvas');
    const mainHeader = document.querySelector('.main-header');
    const glyphSection = document.querySelector('.glyph-section');
    const bigLetter = document.querySelector('.big-letter');
    const glyphItems = document.querySelectorAll('.glyph-item');
    
    // Resetta tutte le classi e stili iniziali
    heroSection.classList.remove('scrolled', 'hidden');
    mainTitle.classList.remove('scrolled');
    p5Canvas.classList.remove('active', 'fading', 'hidden');
    p5Canvas.style.opacity = '1';
    glyphSection.classList.remove('active');
    
    // ============ COSTANTI PER I TESTI ============
    const TEXT_COORDINATES = [
        { id: 'text1', x: 84064, y: -25000 },
        { id: 'text2', x: 93900, y: -22000 },
        { id: 'text3', x: 84064, y: -18500 },
        { id: 'text4', x: 93900, y: -15500 },
        { id: 'text5', x: 84064, y: -12500 },
        { id: 'text6', x: 93900, y: -8000 }
    ];

    const TEXT_OFFSET_X = -1000;
    const TEXT_OFFSET_Y = -2000;
    
    // Variabili per i testi
    let textElements = [];
    
    // Variabili per lo scrolling
    let linearScrollProgress = 0;
    let targetLinearProgress = 0;
    let smoothLinearProgress = 0;
    let isInP5Section = false;
    let heroTransitionComplete = false;
    let hasUserScrolled = false;
    let initialScrollY = window.scrollY;
    let isInGlyphSection = false;
    let activeGlyph = 'a';

    // ============ INIZIALIZZAZIONE TESTI ============
    function initializeTextElements() {
        textElements = [];
        TEXT_COORDINATES.forEach(coord => {
            const element = document.getElementById(coord.id);
            if (element) {
                textElements.push({
                    element: element,
                    originalX: coord.x,
                    originalY: coord.y,
                    scaledX: coord.x * PATH_SCALE,
                    scaledY: coord.y * PATH_SCALE
                });
                element.style.display = 'none';
            }
        });
        console.log(`Inizializzati ${textElements.length} elementi di testo`);
    }

    // ============ INIZIALIZZAZIONE GLYPH ============
    function initializeGlyphInteraction() {
        // Imposta il glifo attivo iniziale
        const initialGlyph = document.querySelector('.glyph-item[data-glyph="a"]');
        if (initialGlyph) {
            initialGlyph.classList.add('active');
        }
        
        // Aggiungi event listener a tutti i glifi
        glyphItems.forEach(glyph => {
            glyph.addEventListener('click', handleGlyphClick);
            glyph.addEventListener('mouseenter', handleGlyphHover);
            glyph.addEventListener('mouseleave', handleGlyphLeave);
        });
        
        console.log(`Inizializzati ${glyphItems.length} glifi interattivi`);
    }
    
    function handleGlyphClick(event) {
        const glyph = event.currentTarget;
        const glyphChar = glyph.getAttribute('data-glyph');
        
        // Rimuovi la classe active da tutti i glifi
        glyphItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Aggiungi la classe active al glifi cliccato
        glyph.classList.add('active');
        
        // Aggiorna la lettera grande
        updateBigLetter(glyphChar);
        
        // Salva il glifo attivo
        activeGlyph = glyphChar;
        
        // Aggiungi un effetto di animazione
        glyph.style.transform = 'scale(0.95)';
        setTimeout(() => {
            glyph.style.transform = '';
        }, 150);
    }
    
    function handleGlyphHover(event) {
        const glyph = event.currentTarget;
        if (!glyph.classList.contains('active')) {
            glyph.style.backgroundColor = '#f0f0f0';
        }
    }
    
    function handleGlyphLeave(event) {
        const glyph = event.currentTarget;
        if (!glyph.classList.contains('active')) {
            glyph.style.backgroundColor = '#f9f9f9';
        }
    }
    
    function updateBigLetter(char) {
        // Effetto di transizione
        bigLetter.style.opacity = '0';
        bigLetter.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            bigLetter.textContent = char;
            bigLetter.style.opacity = '1';
            bigLetter.style.transform = 'scale(1)';
        }, 150);
    }

    // ============ GESTIONE POSIZIONAMENTO TESTI ============
    function updateTextPositions() {
        if (!textElements.length || !isInP5Section) return;
        
        const zoom = ZOOM_FACTOR;
        const viewCenterX = wireCenterX;
        const viewCenterY = viewOffsetY;
        
        textElements.forEach(text => {
            // Calcola la posizione nello spazio del canvas
            const canvasX = (text.scaledX - viewCenterX) * zoom + window.innerWidth / 2;
            const canvasY = (text.scaledY - viewCenterY) * zoom + window.innerHeight / 2;
            
            // Applica offset per centrare meglio
            const screenX = canvasX + TEXT_OFFSET_X * zoom;
            const screenY = canvasY + TEXT_OFFSET_Y * zoom;
            
            // Aggiorna la posizione
            text.element.style.left = `${screenX}px`;
            text.element.style.top = `${screenY}px`;
            
            // Calcola la visibilità in base alla posizione nello scroll
            const textFadeStart = 0.05;
            const textFadeEnd = 1.05;
            
            if (scrollProgress >= textFadeStart && scrollProgress <= textFadeEnd) {
                const middleScroll = (textFadeStart + textFadeEnd) / 2;
                const distanceFromMiddle = Math.abs(scrollProgress - middleScroll);
                const maxDistance = middleScroll - textFadeStart;
                let opacity = Math.max(0, 1 - (distanceFromMiddle / maxDistance));
                
                opacity = Math.max(0.3, opacity);
                
                text.element.style.opacity = opacity;
                
                if (opacity > 0.1) {
                    text.element.classList.add('active');
                } else {
                    text.element.classList.remove('active');
                }
            } else {
                text.element.style.opacity = 0;
                text.element.classList.remove('active');
            }
        });
    }

    // ============ GESTIONE OPACITÀ CANVAS P5 ============
    function updateCanvasOpacity() {
        if (!isInP5Section) {
            p5Canvas.classList.remove('active', 'fading', 'hidden');
            return;
        }
        
        const canvasFadeStart = 0.85;
        const canvasFadeEnd = 0.95;
        
        if (scrollProgress >= canvasFadeStart && scrollProgress <= canvasFadeEnd) {
            const fadeProgress = (scrollProgress - canvasFadeStart) / (canvasFadeEnd - canvasFadeStart);
            const opacity = 1 - fadeProgress;
            
            p5Canvas.style.opacity = opacity;
            
            if (fadeProgress > 0.5) {
                p5Canvas.classList.add('fading');
                p5Canvas.classList.remove('active');
            } else {
                p5Canvas.classList.add('active');
                p5Canvas.classList.remove('fading');
            }
            
            if (fadeProgress >= 0.95) {
                p5Canvas.classList.add('hidden');
            } else {
                p5Canvas.classList.remove('hidden');
            }
        } else if (scrollProgress < canvasFadeStart) {
            p5Canvas.style.opacity = '1';
            p5Canvas.classList.add('active');
            p5Canvas.classList.remove('fading', 'hidden');
        }
    }

    // ============ GESTIONE SEZIONE GLYPH ============
    function updateGlyphSection() {
        const glyphFadeStart = 0.95;
        const glyphFadeEnd = 1.0;
        
        if (scrollProgress >= glyphFadeStart && scrollProgress <= glyphFadeEnd) {
            const fadeProgress = (scrollProgress - glyphFadeStart) / (glyphFadeEnd - glyphFadeStart);
            const opacity = Math.min(1, fadeProgress * 5);
            
            glyphSection.style.opacity = opacity;
            
            if (opacity > 0.1) {
                glyphSection.classList.add('active');
                isInGlyphSection = true;
            }
        } else if (scrollProgress < glyphFadeStart) {
            glyphSection.style.opacity = '0';
            glyphSection.classList.remove('active');
            isInGlyphSection = false;
        }
    }

    // ============ ANIMAZIONE DEL TITOLO E DELLA HERO SECTION ============
    function animateHeroSection() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroHeight = heroSection.offsetHeight;
        
        // Rileva il primo scroll dell'utente
        if (!hasUserScrolled && scrollY > 5) {
            hasUserScrolled = true;
            initialScrollY = scrollY;
        }
        
        // Se l'utente non ha ancora scrollato o è tornato all'inizio, mantieni tutto visibile
        if (!hasUserScrolled || scrollY < 10) {
            // Stato iniziale - tutto visibile
            mainTitle.classList.remove('scrolled');
            heroSection.classList.remove('scrolled');
            heroSection.classList.remove('hidden');
            
            mainTitle.style.letterSpacing = '0.15em';
            mainTitle.style.filter = 'blur(0px)';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'scale(1)';
            
            fontWeight.style.opacity = '1';
            fontWeight.style.transform = 'translateY(0)';
            fontWeight.style.filter = 'blur(0px)';
            
            designer.style.opacity = '1';
            year.style.opacity = '1';
            
            scrollIndicator.style.opacity = '0.7';
            p5Canvas.classList.remove('active', 'fading', 'hidden');
            p5Canvas.style.opacity = '1';
            
            // Nascondi tutti i testi
            textElements.forEach(text => {
                text.element.style.display = 'none';
                text.element.classList.remove('active');
            });
            
            isInP5Section = false;
            heroTransitionComplete = false;
            return;
        }
        
        // Calcola l'intensità dello scroll (0-1) nella hero section
        const adjustedScrollY = scrollY - initialScrollY;
        const scrollIntensity = Math.min(adjustedScrollY / (heroHeight * 0.5), 1);
        
        // Controlla se siamo entrati nella sezione P5
        if (adjustedScrollY > heroHeight * 0.7 && !heroTransitionComplete) {
            heroTransitionComplete = true;
            isInP5Section = true;
        }
        
        // Applica gli effetti al titolo
        if (scrollIntensity > 0.05) {
            mainTitle.classList.add('scrolled');
            heroSection.classList.add('scrolled');
            
            // Calcola la spaziatura delle lettere (da 0.15em a 0.4em)
            const letterSpacing = 0.15 + (scrollIntensity * 0.25);
            mainTitle.style.letterSpacing = `${letterSpacing}em`;
            
            // Calcola il blur (da 0px a 8px)
            const blurValue = scrollIntensity * 8;
            mainTitle.style.filter = `blur(${blurValue}px)`;
            
            // Calcola l'opacità (da 1 a 0)
            const opacity = 1 - scrollIntensity;
            mainTitle.style.opacity = opacity;
            
            // Calcola lo scale (da 1 a 1.05)
            const scale = 1 + (scrollIntensity * 0.05);
            mainTitle.style.transform = `scale(${scale})`;
            
            // Effetti sul sottotitolo (più veloci del titolo)
            const subtitleIntensity = Math.min(scrollIntensity * 1.5, 1);
            const subtitleOpacity = 1 - subtitleIntensity;
            const subtitleTransform = subtitleIntensity * 20;
            const subtitleBlur = subtitleIntensity * 4;
            
            fontWeight.style.opacity = subtitleOpacity;
            fontWeight.style.transform = `translateY(${subtitleTransform}px)`;
            fontWeight.style.filter = `blur(${subtitleBlur}px)`;
            
            designer.style.opacity = subtitleOpacity;
            year.style.opacity = subtitleOpacity;
            
            // Nascondi l'indicatore scroll rapidamente
            const indicatorOpacity = 1 - (scrollIntensity * 3);
            scrollIndicator.style.opacity = Math.max(0, indicatorOpacity);
            
            // Quando il titolo è quasi scomparso, mostra il canvas p5 e i testi
            if (scrollIntensity > 0.7) {
                // Mostra i testi
                textElements.forEach(text => {
                    text.element.style.display = 'block';
                });
                
                // Aggiorna l'opacità del canvas
                updateCanvasOpacity();
            }
            
            // Quando il titolo è completamente scomparso, nascondi la hero section
            if (scrollIntensity >= 1) {
                heroSection.classList.add('hidden');
                isInP5Section = true;
            } else {
                heroSection.classList.remove('hidden');
            }
            
        } else {
            mainTitle.classList.remove('scrolled');
            heroSection.classList.remove('scrolled');
            heroSection.classList.remove('hidden');
            
            // Ripristina lo stato originale del titolo
            mainTitle.style.letterSpacing = '0.15em';
            mainTitle.style.filter = 'blur(0px)';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'scale(1)';
            
            // Ripristina il sottotitolo
            fontWeight.style.opacity = '1';
            fontWeight.style.transform = 'translateY(0)';
            fontWeight.style.filter = 'blur(0px)';
            
            designer.style.opacity = '1';
            year.style.opacity = '1';
            
            // Mostra l'indicatore scroll
            scrollIndicator.style.opacity = '0.7';
            
            // Nascondi il canvas p5 e i testi
            p5Canvas.classList.remove('active', 'fading', 'hidden');
            p5Canvas.style.opacity = '1';
            textElements.forEach(text => {
                text.element.style.display = 'none';
                text.element.classList.remove('active');
            });
            
            isInP5Section = false;
            heroTransitionComplete = false;
        }
    }

    // ============ CODICE P5.JS ============
    const ORIGINAL_POINTS = [
        {x: 82771, y: -40310},
        {x: 87465, y: -38233},
        {x: 93666, y: -37731},
        {x: 95749, y: -36252},
        {x: 90430, y: -34791},
        {x: 84058, y: -36252},
        {x: 81520, y: -36252},
        {x: 81090, y: -34418},
        {x: 84816, y: -31589},
        {x: 92326, y: -30252},
        {x: 95247, y: -31087},
        {x: 92326, y: -32335},
        {x: 84816, y: -31589},
        {x: 82018, y: -29547},
        {x: 82520, y: -26816},
        {x: 88420, y: -25934},
        {x: 87918, y: -21212},
        {x: 85067, y: -19847},
        {x: 85569, y: -21463},
        {x: 87918, y: -21212},
        {x: 88420, y: -18339},
        {x: 87918, y: -16832},
        {x: 88922, y: -13817},
        {x: 88420, y: -10261},
        {x: 89173, y: -3938},
    ];

    const NODES = [
        {
            name: "nodo1",
            x: 92179,
            y: -37731,
            imagePath: "assets/nodo1.png",
            image: null,
            maxWidth: 150000,
            maxHeight: 15000,
            offsetX: 0,
            offsetY: -9000
        },
        {
            name: "nodo2",
            x: 91913,
            y: -34821,
            imagePath: "assets/nodo2.png",
            image: null,
            maxWidth: 150000,
            maxHeight: 15000,
            offsetX: 0,
            offsetY: -9000
        },
        {
            name: "nodo3",
            x: 84802,
            y: -35957,
            imagePath: "assets/nodo3.png",
            image: null,
            maxWidth: 150000,
            maxHeight: 15000,
            offsetX: 0,
            offsetY: -9000
        },
        {
            name: "nodo4",
            x: 82390,
            y: -32817,
            imagePath: "assets/nodo4.png",
            image: null,
            maxWidth: 150000,
            maxHeight: 15000,
            offsetX: 2000,
            offsetY: -9500
        },
        {
            name: "nodo5",
            x: 92553,
            y: -30164,
            imagePath: "assets/nodo5.png",
            image: null,
            maxWidth: 150000,
            maxHeight: 15000,
            offsetX: 0,
            offsetY: -8000
        },
        {
            name: "nodo6",
            x: 87087,
            y: -32297,
            imagePath: "assets/nodo6.png",
            image: null,
            maxWidth: 150000,
            maxHeight: 15000,
            offsetX: 0,
            offsetY: -6000
        }
    ];

    // ============ COSTANTI ============
    const STAR_COUNT = 150;
    const TOTAL_SCROLL_HEIGHT = 25000;
    const PATH_SCALE = 6;
    const ZOOM_FACTOR = 0.012;
    const SCROLL_SENSITIVITY = 0.4;
    const SCROLL_THRESHOLD = 3;
    const BALL_SMOOTHING = 0.03;

    // ============ STATO GLOBALE P5 ============
    let scrollProgress = 0;
    let ballProgress = 0;
    let pathPoints = [], smoothPath = [], pathLength = 0;
    let starParticles = [];
    let wireCenterX = 0;
    let viewOffsetY = 0;
    let minPathY = 0;
    let maxPathY = 0;
    
    // Variabili per il tracking dello scroll lineare
    let accumulatedScroll = 0;
    let lastWheelDirection = 0;

    // ============ FUNZIONI UTILITY ============
    function scalePoints(points, multiplier) {
        return points.map(p => ({ x: p.x * multiplier, y: p.y * multiplier }));
    }

    function scaleNodes(nodes, multiplier) {
        return nodes.map(node => ({
            ...node,
            scaledX: node.x * multiplier,
            scaledY: node.y * multiplier
        }));
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

    // Funzione per gestire lo scroll lineare
    function updateLinearScroll() {
        // Smoothing del progresso lineare
        smoothLinearProgress += (targetLinearProgress - smoothLinearProgress) * 0.05;
        
        // Calcola il progresso dello scroll basato sul progresso lineare
        scrollProgress = Math.max(0, Math.min(1, smoothLinearProgress));
        
        // Aggiorna il progresso del pallino più lentamente
        ballProgress += (scrollProgress - ballProgress) * BALL_SMOOTHING;
    }

    // Gestione dello scroll del mouse per progresso lineare
    function handleWheelScroll(e) {
        // Se siamo nella sezione glyph, gestisci lo scroll verticale normalmente
        if (isInGlyphSection) {
            return;
        }
        
        // Solo nella sezione P5
        if (!isInP5Section) {
            return;
        }
        
        const delta = e.deltaY;
        const currentDirection = Math.sign(delta);
        
        // Accumula lo scroll per filtrare micro-movimenti
        accumulatedScroll += Math.abs(delta);
        
        // Rileva cambio di direzione
        if (lastWheelDirection !== 0 && currentDirection !== lastWheelDirection) {
            accumulatedScroll = 0;
        }
        
        lastWheelDirection = currentDirection;
        
        // Applica solo dopo aver superato la soglia
        if (accumulatedScroll > SCROLL_THRESHOLD) {
            const scrollAmount = delta * 0.0008 * SCROLL_SENSITIVITY;
            
            // Aggiorna il progresso in entrambe le direzioni
            targetLinearProgress = Math.min(1, Math.max(0, targetLinearProgress + scrollAmount));
            
            // Aggiorna la posizione di scroll della pagina
            const heroHeight = heroSection.offsetHeight;
            const p5ScrollPosition = (heroHeight * 0.3) + (targetLinearProgress * TOTAL_SCROLL_HEIGHT);
            window.scrollTo(0, p5ScrollPosition);
            
            accumulatedScroll = 0;
            e.preventDefault();
        }
    }

    // ============ SKETCH P5 ============
    const sketch = (p) => {
        let canvas;
        let scaledNodes = [];
        
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
                    size: p.random(0.5, 2),
                    brightness: p.random(100, 200) * 0.3,
                    twinkleSpeed: p.random(0.01, 0.03),
                    twinklePhase: p.random(p.TWO_PI)
                });
            }
        }
        
        function drawLightGradient() {
            p.clear();
            p.background(255, 255, 255, 0);
        }
        
        function drawStars() {
            const time = p.millis() * 0.001;
            const zoom = ZOOM_FACTOR;
            
            starParticles.forEach(star => {
                const viewCenterX = wireCenterX;
                const viewCenterY = viewOffsetY;
                
                const relX = (star.x - viewCenterX) * zoom;
                const relY = (star.y - viewCenterY) * zoom;
                
                if (Math.abs(relX) < p.width && Math.abs(relY) < p.height) {
                    const twinkle = p.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
                    const brightness = star.brightness * twinkle;
                    p.noStroke();
                    p.fill(30, 30, 30, brightness);
                    p.ellipse(
                        p.width/2 + relX / zoom, 
                        p.height/2 + relY / zoom, 
                        star.size, 
                        star.size
                    );
                }
            });
        }
        
        function drawSpiralThreads() {
            const time = p.millis();
            const colors = [
                [20, 20, 20], [30, 30, 30], [40, 40, 40], [50, 50, 50],
                [10, 10, 10], [25, 25, 25], [35, 35, 35], [45, 45, 45]
            ];
            
            for (let threadIndex = 0; threadIndex < 8; threadIndex++) {
                const phaseOffset = (threadIndex / 8) * p.TWO_PI;
                const speed = 0.001;
                const radius = 350 * (0.7 + p.random(0.6));
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
                p.strokeWeight(8);
                p.strokeCap(p.ROUND);
                p.noFill();
                p.beginShape();
                threadPoints.forEach(point => p.vertex(point.x, point.y));
                p.endShape();
            }
        }
        
        function drawMainPath() {
            const pulse = p.sin(p.millis() * 0.002) * 10;
            const currentThickness = 90 + pulse;
            
            p.stroke(0, 0, 0, 220);
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
                p.stroke(0, 0, 0, 40 - i * 10);
                p.strokeWeight(currentThickness + i * 30);
                p.beginShape();
                for (let j = 0; j < smoothPath.length; j += 2) {
                    p.vertex(smoothPath[j].x, smoothPath[j].y);
                }
                p.endShape();
            }
        }
        
        function drawMovingDot(currentPoint) {
            const time = p.millis() * 0.001;
            
            for (let i = 15; i > 0; i--) {
                const size = 150 + i * 20;
                const alpha = 8 - i * 0.4;
                const pulse = p.sin(time * 2 + i * 0.3) * 10;
                p.noStroke();
                p.fill(0, 0, 0, alpha);
                p.ellipse(currentPoint.x, currentPoint.y, size + pulse, size + pulse);
            }
            
            for (let i = 5; i > 0; i--) {
                const size = 75 + i * 15;
                const alpha = 15 - i * 2;
                const pulse = p.sin(time * 3 + i) * 8;
                p.fill(0, 0, 0, alpha);
                p.ellipse(currentPoint.x, currentPoint.y, size + pulse, size + pulse);
            }
            
            const mainPulse = p.sin(time * 5) * 15;
            p.noStroke();
            p.fill(0, 0, 0, 220);
            p.ellipse(currentPoint.x, currentPoint.y, 50 + mainPulse, 50 + mainPulse);
            
            p.fill(0, 0, 0, 255);
            p.ellipse(currentPoint.x, currentPoint.y, 25, 25);
            
            p.fill(255, 255, 255, 255);
            p.ellipse(currentPoint.x, currentPoint.y, 8, 8);
        }
        
        function drawNodes() {
            scaledNodes.forEach(node => {
                if (node.image) {
                    p.imageMode(p.CENTER);
                    
                    const imgWidth = node.image.width;
                    const imgHeight = node.image.height;
                    const imgAspectRatio = imgWidth / imgHeight;
                    
                    let displayWidth = node.maxWidth;
                    let displayHeight = node.maxHeight;
                    
                    if (imgAspectRatio > 1) {
                        displayHeight = node.maxWidth / imgAspectRatio;
                        if (displayHeight > node.maxHeight) {
                            displayHeight = node.maxHeight;
                            displayWidth = node.maxHeight * imgAspectRatio;
                        }
                    } else {
                        displayWidth = node.maxHeight * imgAspectRatio;
                        if (displayWidth > node.maxWidth) {
                            displayWidth = node.maxWidth;
                            displayHeight = node.maxWidth / imgAspectRatio;
                        }
                    }
                    
                    p.image(
                        node.image, 
                        node.scaledX + node.offsetX, 
                        node.scaledY + node.offsetY,
                        displayWidth,
                        displayHeight
                    );
                }
            });
        }
        
        p.preload = async function() {
            console.log("Caricamento immagini nodi...");
            
            for (let node of NODES) {
                try {
                    node.image = p.loadImage(node.imagePath);
                } catch (error) {
                    console.error(`Errore nel caricamento di ${node.imagePath}:`, error);
                }
            }
            
            console.log("Caricamento completato");
        };
        
        p.setup = function() {
            console.log("Setup p5.js");
            canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('p5-canvas');
            
            pathPoints = scalePoints(ORIGINAL_POINTS, PATH_SCALE);
            smoothPath = createSmoothPath(pathPoints, 30);
            pathLength = calculatePathLength(smoothPath);
            
            scaledNodes = scaleNodes(NODES, PATH_SCALE);
            
            let minX = Infinity, maxX = -Infinity;
            minPathY = Infinity;
            maxPathY = -Infinity;
            
            for (let point of smoothPath) {
                if (point.x < minX) minX = point.x;
                if (point.x > maxX) maxX = point.x;
                if (point.y < minPathY) minPathY = point.y;
                if (point.y > maxPathY) maxPathY = point.y;
            }
            
            wireCenterX = (minX + maxX) / 2;
            console.log("Centro orizzontale del filo:", wireCenterX);
            
            initStarParticles();
            
            // Imposta l'altezza dello spazio di scroll
            document.querySelector('.scroll-space').style.height = TOTAL_SCROLL_HEIGHT + 'px';
            
            console.log("Setup completato");
        };
        
        p.draw = function() {
            updateLinearScroll();
            updateTextPositions();
            updateCanvasOpacity();
            updateGlyphSection();
            
            // Usa ballProgress per il pallino
            const currentPoint = getPointOnPath(ballProgress, smoothPath, pathLength);
            
            // Calcola una posizione verticale lineare
            const linearY = p.lerp(minPathY, maxPathY, scrollProgress);
            
            // Usa una media ponderata
            const targetViewY = currentPoint.y * 0.2 + linearY * 0.8;
            
            // Smooth della posizione verticale
            viewOffsetY += (targetViewY - viewOffsetY) * 0.1;
            
            drawLightGradient();
            drawStars();
            
            p.push();
            const zoom = ZOOM_FACTOR;
            
            p.translate(p.width/2, p.height/2);
            p.scale(zoom);
            p.translate(-wireCenterX, -viewOffsetY);
            
            drawSpiralThreads();
            drawMainPath();
            drawNodes();
            drawMovingDot(currentPoint);
            p.pop();
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            initStarParticles();
            updateTextPositions();
            updateCanvasOpacity();
            updateGlyphSection();
        };
    };

    // ============ INIZIALIZZAZIONE ============
    // Inizializza gli elementi di testo
    initializeTextElements();
    
    // Inizializza l'interazione con i glifi
    initializeGlyphInteraction();
    
    // Avvia il sketch p5
    new p5(sketch);
    
    // Imposta gli event listener per lo scroll
    window.addEventListener('wheel', handleWheelScroll, { passive: false });
    
    // Aggiorna le animazioni durante lo scroll
    function handleScroll() {
        animateHeroSection();
        updateLinearScroll();
        updateTextPositions();
        updateCanvasOpacity();
        updateGlyphSection();
        
        // Se siamo nella sezione P5, aggiorna il progresso lineare
        if (isInP5Section) {
            const heroHeight = heroSection.offsetHeight;
            const scrollY = window.scrollY;
            const p5ScrollY = Math.max(0, scrollY - (heroHeight * 0.3));
            targetLinearProgress = Math.min(1, p5ScrollY / TOTAL_SCROLL_HEIGHT);
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Inizializza le animazioni
    handleScroll();
    
    // Aggiungi scorciatoie da tastiera
    document.addEventListener('keydown', function(e) {
        // Solo nella sezione P5 o glyph
        if (!isInP5Section && !isInGlyphSection) {
            return;
        }
        
        if (e.key === 'ArrowDown') {
            targetLinearProgress = Math.min(1, targetLinearProgress + 0.01);
            updateScrollPosition();
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            targetLinearProgress = Math.max(0, targetLinearProgress - 0.01);
            updateScrollPosition();
            e.preventDefault();
        } else if (e.key === 'PageDown') {
            targetLinearProgress = Math.min(1, targetLinearProgress + 0.05);
            updateScrollPosition();
            e.preventDefault();
        } else if (e.key === 'PageUp') {
            targetLinearProgress = Math.max(0, targetLinearProgress - 0.05);
            updateScrollPosition();
            e.preventDefault();
        } else if (e.key === 'Home') {
            targetLinearProgress = 0;
            window.scrollTo(0, 0);
            hasUserScrolled = false;
            handleScroll();
            e.preventDefault();
        } else if (e.key === 'End') {
            targetLinearProgress = 1;
            const heroHeight = heroSection.offsetHeight;
            window.scrollTo(0, heroHeight * 0.3 + TOTAL_SCROLL_HEIGHT);
            e.preventDefault();
        }
    });
    
    function updateScrollPosition() {
        const heroHeight = heroSection.offsetHeight;
        const p5ScrollPosition = (heroHeight * 0.3) + (targetLinearProgress * TOTAL_SCROLL_HEIGHT);
        window.scrollTo(0, p5ScrollPosition);
    }
});