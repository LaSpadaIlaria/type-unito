document.addEventListener('DOMContentLoaded', function() {
    // ============ VARIABILI GLOBALI ============
    const mainTitle = document.querySelector('.main-title');
    const heroSection = document.querySelector('.hero-section');
    const fontWeight = document.querySelector('.font-weight');
    const designer = document.querySelector('.designer');
    const year = document.querySelector('.year');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const p5Canvas = document.getElementById('p5-canvas');
    const mainHeader = document.querySelector('.main-header');
    
    // Variabili per lo scrolling lineare
    let linearScrollProgress = 0;
    let targetLinearProgress = 0;
    let smoothLinearProgress = 0;
    let lastScrollY = 0;
    let lastScrollTime = Date.now();
    let isInP5Section = false;
    let heroTransitionComplete = false;

    // ============ ANIMAZIONE DEL TITOLO E DELLA HERO SECTION ============
    function animateHeroSection() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroHeight = heroSection.offsetHeight;
        
        // Calcola l'intensità dello scroll (0-1) nella hero section
        // Il titolo scompare completamente a metà dello scroll della hero section
        const scrollIntensity = Math.min(scrollY / (heroHeight * 0.5), 1);
        
        // Controlla se siamo entrati nella sezione P5
        if (scrollY > heroHeight * 0.7 && !heroTransitionComplete) {
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
            
            // Nascondi l'header gradualmente
            const headerOpacity = 1 - (scrollIntensity * 2);
            mainHeader.style.opacity = Math.max(0, headerOpacity);
            
            // Quando il titolo è quasi scomparso, mostra il canvas p5
            if (scrollIntensity > 0.7) {
                p5Canvas.classList.add('active');
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
            mainTitle.style.letterSpacing = '';
            mainTitle.style.filter = '';
            mainTitle.style.opacity = '';
            mainTitle.style.transform = '';
            
            // Ripristina il sottotitolo
            fontWeight.style.opacity = '';
            fontWeight.style.transform = '';
            fontWeight.style.filter = '';
            
            designer.style.opacity = '';
            year.style.opacity = '';
            
            // Ripristina header
            mainHeader.style.opacity = '';
            
            // Mostra l'indicatore scroll
            scrollIndicator.style.opacity = '0.7';
            
            // Nascondi il canvas p5
            p5Canvas.classList.remove('active');
            isInP5Section = false;
            heroTransitionComplete = false;
        }
    }

    // ============ CODICE P5.JS FORNITO ============
    // ============ DATI DEL PERCORSO ============
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

    // ============ NODI CON IMMAGINI ============
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
    const ZOOM_FACTOR = 0.012;
    const PATH_SCALE = 6;
    const SCROLL_SENSITIVITY = 0.4; // RIDOTTO per movimento più lento
    const SCROLL_THRESHOLD = 3; // AUMENTATA sensibilità
    const BALL_SMOOTHING = 0.03; // Aggiunto smoothing per pallino

    // ============ STATO GLOBALE P5 ============
    let scrollProgress = 0;
    let ballProgress = 0; // Progresso separato per il pallino (più lento)
    let pathPoints = [], smoothPath = [], pathLength = 0;
    let starParticles = [];
    let wireCenterX = 0;
    let viewOffsetY = 0;
    let minPathY = 0;
    let maxPathY = 0;
    
    // Variabili per il tracking dello scroll lineare
    let accumulatedScroll = 0;
    let lastWheelDirection = 0;
    let scrollVelocity = 0;
    let lastVelocityUpdate = Date.now();

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
        const currentTime = Date.now();
        const timeDelta = currentTime - lastScrollTime;
        
        // Calcola la velocità dello scroll
        if (timeDelta > 0) {
            const currentScrollY = window.scrollY;
            scrollVelocity = (currentScrollY - lastScrollY) / timeDelta;
            lastScrollY = currentScrollY;
            lastVelocityUpdate = currentTime;
        }
        
        // Smoothing del progresso lineare - più lento
        smoothLinearProgress += (targetLinearProgress - smoothLinearProgress) * 0.05;
        
        // Calcola il progresso dello scroll basato sul progresso lineare
        scrollProgress = Math.max(0, Math.min(1, smoothLinearProgress));
        
        // Aggiorna il progresso del pallino più lentamente
        ballProgress += (scrollProgress - ballProgress) * BALL_SMOOTHING;
        
        lastScrollTime = currentTime;
    }

    // Gestione dello scroll del mouse per progresso lineare
    function handleWheelScroll(e) {
        // Solo nella sezione P5
        if (!isInP5Section) {
            return; // Lascia lo scroll normale nella hero section
        }
        
        const delta = e.deltaY;
        const currentDirection = Math.sign(delta);
        
        // Accumula lo scroll per filtrare micro-movimenti
        accumulatedScroll += Math.abs(delta);
        
        // Rileva cambio di direzione
        if (lastWheelDirection !== 0 && currentDirection !== lastWheelDirection) {
            accumulatedScroll = 0; // Reset su cambio direzione
        }
        
        lastWheelDirection = currentDirection;
        
        // Applica solo dopo aver superato la soglia
        if (accumulatedScroll > SCROLL_THRESHOLD) {
            const scrollAmount = delta * 0.0008 * SCROLL_SENSITIVITY; // RALLENTATO
            
            // Sempre aggiornare il progresso in entrambe le direzioni
            targetLinearProgress = Math.min(1, Math.max(0, targetLinearProgress + scrollAmount));
            
            // Aggiorna la posizione di scroll della pagina per mantenere sincronizzazione
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
            p.background(255, 255, 255, 0); // Trasparente
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
            console.log("Setup p5.js - Percorso con filo e immagini");
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
            console.log("Y min/max del percorso:", minPathY, maxPathY);
            
            initStarParticles();
            
            // Imposta l'altezza dello spazio di scroll
            document.querySelector('.scroll-space').style.height = TOTAL_SCROLL_HEIGHT + 'px';
            
            console.log("Setup completato. Altezza scroll:", TOTAL_SCROLL_HEIGHT);
        };
        
        p.draw = function() {
            updateLinearScroll();
            
            // Usa ballProgress (più lento) per il pallino
            const currentPoint = getPointOnPath(ballProgress, smoothPath, pathLength);
            
            // Calcola una posizione verticale lineare invece di seguire esattamente il percorso
            const linearY = p.lerp(minPathY, maxPathY, scrollProgress); // Usa scrollProgress per la vista
            
            // Usa una media ponderata tra la y del percorso e quella lineare
            // 80% lineare, 20% del percorso per mantenere il pallino visibile
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
            drawMovingDot(currentPoint); // Il pallino segue il percorso con ballProgress (più lento)
            p.pop();
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            initStarParticles();
        };
    };

    // ============ INIZIALIZZAZIONE ============
    // Avvia il sketch p5
    new p5(sketch);
    
    // Imposta gli event listener per lo scroll
    window.addEventListener('wheel', handleWheelScroll, { passive: false });
    
    // Aggiorna le animazioni durante lo scroll
    function updateAnimations() {
        animateHeroSection();
    }
    
    window.addEventListener('scroll', updateAnimations);
    window.addEventListener('resize', updateAnimations);
    
    // Aggiungi scorciatoie da tastiera per scroll più veloce
    document.addEventListener('keydown', function(e) {
        // Solo nella sezione P5
        if (!isInP5Section) {
            return;
        }
        
        // Freccia giù per avanzare lentamente
        if (e.key === 'ArrowDown') {
            targetLinearProgress = Math.min(1, targetLinearProgress + 0.01);
            const heroHeight = heroSection.offsetHeight;
            const p5ScrollPosition = (heroHeight * 0.3) + (targetLinearProgress * TOTAL_SCROLL_HEIGHT);
            window.scrollTo(0, p5ScrollPosition);
            e.preventDefault();
        } 
        // Freccia su per tornare lentamente indietro
        else if (e.key === 'ArrowUp') {
            targetLinearProgress = Math.max(0, targetLinearProgress - 0.01);
            const heroHeight = heroSection.offsetHeight;
            const p5ScrollPosition = (heroHeight * 0.3) + (targetLinearProgress * TOTAL_SCROLL_HEIGHT);
            window.scrollTo(0, p5ScrollPosition);
            e.preventDefault();
        }
        // Pagina giù per avanzare più velocemente
        else if (e.key === 'PageDown') {
            targetLinearProgress = Math.min(1, targetLinearProgress + 0.05);
            const heroHeight = heroSection.offsetHeight;
            const p5ScrollPosition = (heroHeight * 0.3) + (targetLinearProgress * TOTAL_SCROLL_HEIGHT);
            window.scrollTo(0, p5ScrollPosition);
            e.preventDefault();
        } 
        // Pagina su per tornare più velocemente indietro
        else if (e.key === 'PageUp') {
            targetLinearProgress = Math.max(0, targetLinearProgress - 0.05);
            const heroHeight = heroSection.offsetHeight;
            const p5ScrollPosition = (heroHeight * 0.3) + (targetLinearProgress * TOTAL_SCROLL_HEIGHT);
            window.scrollTo(0, p5ScrollPosition);
            e.preventDefault();
        }
    });
    
    // Tasto Home per tornare all'inizio
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Home') {
            targetLinearProgress = 0;
            const heroHeight = heroSection.offsetHeight;
            window.scrollTo(0, heroHeight * 0.3);
            e.preventDefault();
        }
        // Tasto End per andare alla fine
        else if (e.key === 'End') {
            targetLinearProgress = 1;
            const heroHeight = heroSection.offsetHeight;
            window.scrollTo(0, heroHeight * 0.3 + TOTAL_SCROLL_HEIGHT);
            e.preventDefault();
        }
    });
    
    // Inizializza le animazioni
    updateAnimations();
    
    // Effetto di entrata iniziale
    setTimeout(() => {
        mainTitle.style.opacity = '1';
        mainTitle.style.transform = 'translateY(0)';
    }, 300);
});