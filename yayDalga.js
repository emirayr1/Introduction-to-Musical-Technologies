const canvasSpring = document.getElementById("yay");
const contextSpring = canvasSpring.getContext("2d");
let animSpring;
let stopSpringAnimaton;

canvasSpring.width = 400;
canvasSpring.height = 400;

(function () {
    let mouseX = 0, isDraggingSpring = false;
    const naturalLength = 400; // Sinüsün doğal dalga boyu
    let currentLength = naturalLength; // Mevcut dalga boyu
    let springVelocity = 0; // Yay hareketinin hızı
    const springConstant = 0.02; // Yay sabiti
    const damping = 0.98; // Sönümleme faktörü
    const amplitude = 20; // Sinüsün yüksekliği
    const waveCount = 3; // Sabit frekansta tepe/çukur sayısı

    // Derinlik efekti için gradient oluştur
    function createGradient() {
        const gradient = contextSpring.createLinearGradient(0, canvasSpring.height / 2 - amplitude, 0, canvasSpring.height / 2 + amplitude);
        gradient.addColorStop(0, "#FFB347"); // Üst kısım
        gradient.addColorStop(0.5, "#FF5733"); // Orta kısım
        gradient.addColorStop(1, "#C70039"); // Alt kısım
        return gradient;
    }

    // Sinüs dalgasını çizme fonksiyonu
    function drawWave(length) {
        const step = length / (waveCount * Math.PI * 2); // Sabit frekansta dalga boyu
        const centerY = canvasSpring.height / 2;

        // Dış çizgi (gölge efekti)
        contextSpring.beginPath();
        contextSpring.lineWidth = 4;
        contextSpring.strokeStyle = "rgba(0, 0, 0, 0.3)";
        for (let x = 0; x <= length; x += 1) {
            const y = centerY + amplitude * Math.sin((x / step) * Math.PI);
            if (x === 0) {
                contextSpring.moveTo(x, y);
            } else {
                contextSpring.lineTo(x, y);
            }
        }
        contextSpring.stroke();

        // İç çizgi (parlak dalga)
        contextSpring.beginPath();
        contextSpring.lineWidth = 6;
        contextSpring.strokeStyle = createGradient(); // Gradient rengi
        for (let x = 0; x <= length; x += 1) {
            const y = centerY + amplitude * Math.sin((x / step) * Math.PI);
            if (x === 0) {
                contextSpring.moveTo(x, y);
            } else {
                contextSpring.lineTo(x, y);
            }
        }
        contextSpring.stroke();
    }

    // Yay hareketini güncelleyen fonksiyon
    function updateSpring() {
        if (!isDraggingSpring) {
            const springForce = -springConstant * (currentLength - naturalLength); // Hooke Kanunu
            springVelocity += springForce; // Kuvvetten hız türet
            springVelocity *= damping; // Sönümleme uygula
            currentLength += springVelocity; // Dalga boyunu güncelle
        }
    }

    // Animasyon fonksiyonu
    animSpring = function () {
        requestAnimationFrame(animSpring);
        contextSpring.clearRect(0, 0, canvasSpring.width, canvasSpring.height); // Ekranı temizle
        updateSpring(); // Yay hareketini güncelle
        drawWave(currentLength); // Sinüs dalgasını çiz
    };

    // Mouse olayları
    canvasSpring.addEventListener("mousemove", (e) => {
        if (isDraggingSpring) {
            mouseX = e.clientX - canvasSpring.offsetLeft;
            currentLength = Math.max(200, mouseX); // Minimum uzunluk sınırı
        }
    });

    canvasSpring.addEventListener("mousedown", () => {
        isDraggingSpring = true;
        springVelocity = 0; // Hızı sıfırla
    });

    canvasSpring.addEventListener("mouseup", () => {
        isDraggingSpring = false;
    });

    // Canvas boyutlandırma
    setSizeSpring = function () {
        canvasSpring.width = window.innerWidth * 0.8;
        canvasSpring.height = window.innerHeight * 0.4;
    };

    window.addEventListener("resize", setSizeSpring);
    setSizeSpring();
    animSpring();

    // Fonksiyonları global nesneye ekle
    window.setSizeSpring = setSizeSpring;
    window.animSpring = animSpring;
})();
