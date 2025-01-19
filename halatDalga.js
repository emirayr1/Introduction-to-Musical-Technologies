// Global alanına startRopeAnimation fonksiyonu ekleniyor
let startRopeAnimation;
let stopRopeAnimation;
let isAnimatingDalga = false;
let mouseX = 0;
let mouseY = 0;
// Canvas nesnesi burada global olarak tanımlanıyor
const canvas = document.getElementById("cw");
const context = canvas.getContext("2d");

if (!canvas || !context) {
    console.error("Canvas veya context bulunamadı!");
}

(function () {
    // Halat dokusunu önceden oluştur
    const ropePatternCanvas = document.createElement("canvas");
    const ropePatternContext = ropePatternCanvas.getContext("2d");
    ropePatternCanvas.width = 40;
    ropePatternCanvas.height = 40;
    ropePatternContext.fillStyle = "#C8A165";
    ropePatternContext.fillRect(0, 0, ropePatternCanvas.width, ropePatternCanvas.height);
    ropePatternContext.strokeStyle = "#8B5A2B";
    ropePatternContext.lineWidth = 3;
    ropePatternContext.beginPath();
    ropePatternContext.moveTo(0, 0);
    ropePatternContext.lineTo(40, 40);
    ropePatternContext.stroke();
    ropePatternContext.beginPath();
    ropePatternContext.moveTo(0, 40);
    ropePatternContext.lineTo(40, 0);
    ropePatternContext.stroke();
    const ropePattern = context.createPattern(ropePatternCanvas, "repeat");

    class Rope {
        constructor(N) {
            this.N = N;
            this.x = [...Array(this.N)].map((_, i) => i / this.N);
            this.y_t0 = this.x.map(() => 0);
            this.y_t1 = this.y_t0.slice();
            this.y_t2 = this.y_t0.slice();
            this.gam = 50;
            this.l = 0.002;
            this.dx = this.x[1] - this.x[0];
            this.c = 1 / 15;
            this.dt = 0.03;
        }

        update(i, y_t0, y_t1, c, gam, l, dx, dt) {
            return (
                (1 / (1 / (c * dt) ** 2 + gam / (2 * dt))) *
                (1 / dx ** 2 * (y_t1[i + 1] - 2 * y_t1[i] + y_t1[i - 1]) -
                    1 / (c * dt) ** 2 * (y_t0[i] - 2 * y_t1[i]) +
                    (gam / (2 * dt)) * y_t0[i] -
                    (l / dx ** 2) ** 2 *
                    (y_t1[i - 2] - 4 * y_t1[i - 1] + 6 * y_t1[i] - 4 * y_t1[i + 1] + y_t1[i + 2]))
            );
        }

        move(draw) {
            this.y_t2[0] = this.y_t1[0];
            this.y_t2[1] = this.y_t1[1];
            this.y_t2[this.N - 2] = this.y_t1[this.N - 2];
            this.y_t2[this.N - 1] = this.y_t1[this.N - 1];

            for (let i = 2; i < this.y_t1.length - 2; i++) {
                this.y_t2[i] = this.update(i, this.y_t0, this.y_t1, this.c, this.gam, this.l, this.dx, this.dt);
            }
            if (draw) this.drawRope();

            [this.y_t0, this.y_t1, this.y_t2] = [this.y_t1, this.y_t2, this.y_t0];
        }

        drawRope() {
            context.beginPath();
            context.lineWidth = 6;
            context.strokeStyle = ropePattern;
            const centerCanvasY = canvas.height / 2;
            for (let i = 1; i < this.x.length; i++) {
                // const { x_cnv: x_cnv0, y_cnv: y_cnv0 } = this.strng2cnv_coords(this.x[i - 1], this.y_t1[i - 1]);
                // const { x_cnv: x_cnv1, y_cnv: y_cnv1 } = this.strng2cnv_coords(this.x[i], this.y_t1[i]);
                // context.moveTo(x_cnv0, y_cnv0);
                // context.lineTo(x_cnv1, y_cnv1);
                context.moveTo(this.x[i - 1] * canvas.width, this.y_t1[i - 1] + centerCanvasY);
                context.lineTo(this.x[i] * canvas.width, this.y_t1[i] + centerCanvasY);
            }
            context.stroke();
        }

        strng2cnv_coords(x_str, y_str) {
            return { x_cnv: canvas.width * x_str, y_cnv: y_str * canvas.width + canvas.height / 2 };
        }
    }

    let mouseY = 0;
    let mouseX = 0;
    let isDraggingDalga = false;
    let MODE = "MOVE_LEFT_END";
    let rope = null;

    let isMouseInsideCanvas = false;

    canvas.addEventListener("mouseenter", () => {
        isMouseInsideCanvas = true;
    });

    canvas.addEventListener("mouseleave", () => {
        isMouseInsideCanvas = false;
    });

    addEventListener("mousemove", (e) => {
        if (!isMouseInsideCanvas) return; // Mouse canvas dışındaysa işlem yapma

        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });


    // Mouse basılınca sürükleme durumu aktif
    addEventListener("mousedown", () => {
        isDraggingDalga = true;

        let { x_str, y_str } = cnv2strng_coords(mouseX, mouseY);
        //console.log(Math.abs((mouseX - rope.x[0])));
        if (Math.abs((mouseX - rope.x[0]) < 10)) {
            MODE = "MOVE_LEFT_END"; // Sol uç seçildi

        }
    });

    // Mouse bırakılınca sürükleme durumu durur
    addEventListener("mouseup", () => {
        isDraggingDalga = false;
        MODE = null; // Dragging'i durdur
    });

    function dragRope(rope) {
        if (MODE === "MOVE_LEFT_END") {
            //let { x_str, y_str } = cnv2strng_coords(mouseX, mouseY);
            rope.y_t1[0] = rope.y_t1[1] = mouseY - canvas.height / 2; // Sol ucu sürükle
            console.log("MOUSEY", mouseY);
            console.log("rope.yt1", rope.y_t1[0]);
        }
    }

    // Boyutlandırma
    function setSize() {
        canvas.width = 400;
        canvas.height = 400;
    }

    // Animasyon fonksiyonu
    function animDalga() {
        if (!isAnimatingDalga) return;  // Animasyon aktifse devam etsin

        //console.log("animasyon çalışıyor");
        requestAnimationFrame(animDalga);  // Animasyonu döngüde sürekli çağır

        context.clearRect(0, 0, canvas.width, canvas.height);  // Canvas temizle

        for (let i = 5; i--;) {
            rope.move(draw = (i == 0));  // Halat hareketini güncelle
            if (isDraggingDalga) dragRope(rope);  // Mouse etkileşimini işleyelim
        }
    }

    // Burada startRopeAnimation fonksiyonunu global yapıyoruz
    startRopeAnimation = function () {
        if (isAnimatingDalga) return;  // Animasyon zaten çalışıyorsa tekrar başlatma

        rope = new Rope(200);
        setSize();
        isAnimatingDalga = true;  // Animasyonu başlat
        animDalga();  // Animasyonu başlat
    };

    stopRopeAnimation = function () {
        isAnimatingDalga = false;  // Animasyonu durdur

        //console.log("Animasyon durduruldu.");
    };


    // Başlatma fonksiyonunu çağırıyoruz
    startRopeAnimation();

})();

// Koordinat dönüşümü: Canvas koordinatlarını halat (string) koordinatlarına dönüştürür
function cnv2strng_coords(x_cnv, y_cnv) {
    const x_str = x_cnv / canvas.width;  // Canvas'ın genişliği ile oranla
    const y_str = (y_cnv - canvas.height / 2) / canvas.width;  // Y koordinatını, halat sistemine dönüştür
    return { x_str, y_str };
}

