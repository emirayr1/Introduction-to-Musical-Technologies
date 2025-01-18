// Global değişkenler ve fonksiyonlar
let svg2 = d3.select('#unitCircle')
    .append('svg')
    .attr('width', 400)
    .attr('height', 400);

// Çemberin merkezi ve yarıçapı
const centerX = 200;
const centerY = 200;
const radius = 150;

// Birim çemberi çiziyoruz
svg2.append("circle")
    .attr("cx", centerX)
    .attr("cy", centerY)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("stroke", "black");

// Başlangıçta çizilecek çap çizgisi
const line = svg2.append("line")
    .attr("x1", centerX)
    .attr("y1", centerY)
    .attr("x2", centerX + radius)
    .attr("y2", centerY)
    .attr("stroke", "red")
    .attr("stroke-width", 2);

// Animasyon için başlangıç zamanı
let timeCircle = 0;
let isAnimatingCircle = false;
let animationFrameIdCircle;

// Animasyonu sürekli olarak döndüreceğiz
function animateCircle() {
    // Çap çizgisinin dönüş açısını hesaplıyoruz
    const angle = timeCircle * 0.02; // Zamanı arttırarak döndürme hızını ayarlıyoruz

    // Çapın uç noktasını döndürüyoruz
    const x2 = centerX + radius * Math.cos(angle);
    const y2 = centerY + radius * Math.sin(angle);

    // Çapı güncelliyoruz
    line.attr("x2", x2)
        .attr("y2", y2);

    // Zamanı arttırıyoruz
    timeCircle += 0.1;  // Time'ı arttırarak döndürme hareketi sağlıyoruz

    // Animasyonu tekrar çağırıyoruz
    if (isAnimatingCircle) {
        animationFrameIdCircle = requestAnimationFrame(animateCircle);  // Animasyonu sürekli döndür
    }
}

function startAnimationCircle() {
    if (!isAnimatingCircle) {
        isAnimatingCircle = true;  // Animasyonu aktif yap
        timeCircle = 0;  // Zamanı sıfırla, animasyon başlasın
        animateCircle();  // Animasyonu başlat
    }
}

// Animasyonu durdur
function stopAnimationCircle() {
    isAnimatingCircle = false;  // Animasyonu durdur
    timeCircle = 0;  // Zamanı sıfırlıyoruz
    cancelAnimationFrame(animationFrameIdCircle);  // requestAnimationFrame'ı iptal et
    animationFrameIdCircle = null;  // animationFrameId'yi sıfırlayarak, yeni bir animasyon başlatabilmek için
}
