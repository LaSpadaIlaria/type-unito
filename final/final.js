// ============ DATI DEL PERCORSO ============
const ORIGINAL_POINTS = [
    {x: 99272, y: -34041},
    {x: 99539, y: -33915},
    {x: 100013, y: -33871},
    {x: 100161, y: -33776},
    {x: 99956, y: -33672},
    {x: 99614, y: -33694},
    {x: 99328, y: -33776},
    {x: 99204, y: -33754},
    {x: 99147, y: -33650},
    {x: 99387, y: -33454},
    {x: 99912, y: -33352},
    {x: 100139, y: -33410},
    {x: 99890, y: -33498},
    {x: 99387, y: -33454},
    {x: 99204, y: -33330},
    {x: 99272, y: -33125},
    {x: 99570, y: -33103},
    {x: 99703, y: -32992},
    {x: 99614, y: -32730},
    {x: 99451, y: -32652},
    {x: 99407, y: -32686},
    {x: 99495, y: -32758},
    {x: 99614, y: -32730},
    {x: 99659, y: -32550},
    {x: 99629, y: -32443},
    {x: 99703, y: -32217}
];

// ============ COSTANTI ============
const MOVEMENT_SPEED = 0.05;
const STAR_COUNT = 200;

// ============ STATO GLOBALE ============
let scrollProgress = 0;
let pathPoints = [], smoothPath = [], pathLength = 0;
let starParticles = [];

// ============ FUNZIONI UTILITY ============
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

// ============ SKETCH P5 ============
const sketch = (p) => {
    let canvas;
    
    function initStarParticles() {
        starParticles = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            starParticles.push({
                x: p.random(p.width * 100),
                y: p.random(p.height * 100),
                size: p.random(1, 3),
                brightness: p.random(100, 200) * 0.7,
                twinkleSpeed: p.random(0.01, 0.03),
                twinklePhase: p.random(p.TWO_PI)
            });
        }
    }
    
    function drawLightGradient() {
        p.clear();
        p.background(0, 0, 0, 255);
    }
    
    function drawStars(currentPoint) {
        const time = p.millis() * 0.001;
        const zoom = 0.012; // Ridotto per vedere più area
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
            const radius = 250 * (0.7 + p.random(0.6));
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
            p.stroke(color[0], color[1], color[2], 100);
            p.strokeWeight(20);
            p.strokeCap(p.ROUND);
            p.noFill();
            p.beginShape();
            threadPoints.forEach(point => p.vertex(point.x, point.y));
            p.endShape();
        }
    }
    
    function drawMainPath() {
        const pulse = p.sin(p.millis() * 0.002) * 25;
        const currentThickness = 100 + pulse;
        
        // Glow esterno
        for (let i = 3; i > 0; i--) {
            p.stroke(200, 200, 200, 30 - i * 8);
            p.strokeWeight(currentThickness + i * 80);
            p.strokeCap(p.ROUND);
            p.noFill();
            p.beginShape();
            for (let j = 0; j < smoothPath.length; j += 2) {
                p.vertex(smoothPath[j].x, smoothPath[j].y);
            }
            p.endShape();
        }
        
        // Filo principale con effetto tratteggiato
        p.stroke(255, 255, 255, 220);
        p.strokeWeight(currentThickness);
        p.strokeCap(p.ROUND);
        p.drawingContext.setLineDash([120, 50]);
        p.drawingContext.lineDashOffset = -p.millis() * 0.02;
        p.noFill();
        p.beginShape();
        for (let i = 0; i < smoothPath.length; i += 1) {
            p.vertex(smoothPath[i].x, smoothPath[i].y);
        }
        p.endShape();
        p.drawingContext.setLineDash([]);
    }
    
    function drawMovingDot(currentPoint) {
        const time = p.millis() * 0.001;
        
        // Aura esterna
        for (let i = 8; i > 0; i--) {
            const size = 400 + i * 50;
            const alpha = 5 - i * 0.5;
            const pulse = p.sin(time * 2 + i * 0.3) * 20;
            p.noStroke();
            p.fill(255, 255, 255, alpha);
            p.ellipse(currentPoint.x, currentPoint.y, size + pulse, size + pulse);
        }
        
        // Aura media
        for (let i = 4; i > 0; i--) {
            const size = 200 + i * 40;
            const alpha = 15 - i * 3;
            const pulse = p.sin(time * 3 + i) * 15;
            p.fill(255, 255, 255, alpha);
            p.ellipse(currentPoint.x, currentPoint.y, size + pulse, size + pulse);
        }
        
        // Cerchio principale pulsante
        const mainPulse = p.sin(time * 5) * 30;
        p.noStroke();
        p.fill(255, 255, 255, 240);
        p.ellipse(currentPoint.x, currentPoint.y, 120 + mainPulse, 120 + mainPulse);
        
        // Cerchio interno
        p.fill(220, 220, 220, 255);
        p.ellipse(currentPoint.x, currentPoint.y, 60, 60);
        
        // Nucleo
        p.fill(255, 255, 255, 255);
        p.ellipse(currentPoint.x, currentPoint.y, 20, 20);
        
        // Effetto scia
        const speed = Math.abs(scrollProgress - previousScrollProgress) * 100;
        if (speed > 0.001) {
            for (let i = 0; i < 6; i++) {
                const angle = time * 8 + (i / 6) * p.TWO_PI;
                const distance = 80 + p.sin(time * 6) * 40;
                const trailX = currentPoint.x + p.cos(angle) * distance;
                const trailY = currentPoint.y + p.sin(angle) * distance;
                const trailSize = 25 + p.sin(time * 7 + i) * 12;
                p.fill(255, 255, 255, 120);
                p.ellipse(trailX, trailY, trailSize, trailSize);
            }
        }
    }
    
    let previousScrollProgress = 0;
    
    p.setup = function() {
        console.log("Setup p5.js - Visualizzazione a schermo intero");
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('p5-canvas');
        
        // Usiamo i punti con una scala più piccola per farli entrare meglio
        const scaledPoints = ORIGINAL_POINTS.map(point => ({
            x: point.x / 1000,
            y: point.y / 1000
        }));
        
        pathPoints = scaledPoints;
        smoothPath = createSmoothPath(pathPoints, 40); // Più segmenti per curve più fluide
        pathLength = calculatePathLength(smoothPath);
        
        initStarParticles();
        
        // Event listener per lo scroll - più sensibile
        window.addEventListener('wheel', function(e) {
            const direction = e.deltaY > 0 ? 1 : -1;
            previousScrollProgress = scrollProgress;
            scrollProgress = Math.max(0, Math.min(1, scrollProgress + direction * 0.0005));
        });
        
        // Event listener per frecce
        window.addEventListener('keydown', function(e) {
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight' || e.code === 'Space') {
                e.preventDefault();
                previousScrollProgress = scrollProgress;
                scrollProgress = Math.min(1, scrollProgress + 0.01);
            } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
                e.preventDefault();
                previousScrollProgress = scrollProgress;
                scrollProgress = Math.max(0, scrollProgress - 0.01);
            }
        });
        
        console.log("Setup completato. Lunghezza percorso:", pathLength);
    };
                      
    p.draw = function() {
        const currentPoint = getPointOnPath(scrollProgress, smoothPath, pathLength);
        drawLightGradient();
        drawStars(currentPoint);
        
        p.push();
        // Zoom e traslazione simile all'esperienza originale
        const zoom = 0.012; // Zoom fisso per vedere più area
        p.translate(p.width/2, p.height/2);
        p.scale(zoom);
        p.translate(-currentPoint.x, -currentPoint.y);
        
        drawSpiralThreads();
        drawMainPath();
        drawMovingDot(currentPoint);
        p.pop();
        
        previousScrollProgress = scrollProgress;
    };
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        initStarParticles();
    };
};

// ============ AVVIO ============
new p5(sketch);