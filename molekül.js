
let svg = d3.select('#animationContainer')
    .append('svg')
    .attr('width', 600)
    .attr('height', 150);

// Molekül simülasyonu
let moleculeCount = 100;
let molecules = [];
let plotWidth = 600;
let plotHeight = 150;
let amplitude = 0;
let frequency = 1;


const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const slider1Value = document.getElementById('slider1Value');
const slider2Value = document.getElementById('slider2Value');

function createMolecules() {
    for (let i = 0; i < moleculeCount; i++) {
        const moleculeX = (i / moleculeCount) * plotWidth;
        const moleculeY = Math.random() * (plotHeight - 20) + 10;

        molecules.push(
            svg.append('circle')
                .attr('cx', moleculeX)
                .attr('cy', moleculeY)
                .attr('r', 2)
                .attr('fill', 'grey')
        );
    }
}

function resetMolecules() {
    molecules.forEach(molecule => {
        molecule.remove();  // SVG öğelerini DOM'dan kaldır
    });
    molecules = [];  // Moleküller dizisini temizle
}


// Animasyon fonksiyonu
let time = 0;
let animationFrameId;
let isAnimating = false;


function animateMolecules() {


    //console.log('Current time:', time);

    molecules.forEach((molecule, i) => {
        const angle = time + (i / moleculeCount) * Math.PI * 2 * frequency;
        const offsetX = Math.sin(angle) * amplitude;

        molecule.attr('cx', (i / moleculeCount) * plotWidth + offsetX);
    });

    time += 0.1;

    if (isAnimating) {
        animationFrameId = requestAnimationFrame(animateMolecules);
    }

}

function startAnimation() {
    if (!isAnimating) {
        isAnimating = true; // Animasyonu aktif yap
        time = 0; // Zamanı sıfırla, animasyon başlasın
        animateMolecules(); // Animasyonu başlat
    }
}

// Animasyonu durdur
function stopAnimation() {
    isAnimating = false; // Animasyonu durdur
    time = 0;
    cancelAnimationFrame(animationFrameId); // requestAnimationFrame'ı iptal et
    animationFrameId = null; // animationFrameId'yi sıfırlayarak, yeni bir animasyon başlatabilmek için
    toggleButton.innerText = 'Stop Animation'
}



// Buton elementine erişim
const toggleButton = document.getElementById('toggleAnimation');

// Start Animation fonksiyonunu butona bağlama
toggleButton.addEventListener('click', function () {
    if (isAnimating) {
        stopAnimation();
        toggleButton.innerText = 'Start Animation';
    } else {
        startAnimation();
        toggleButton.innerText = 'Stop Animation';
    }
});




slider1.addEventListener('input', function (event) {
    amplitude = event.target.value;  // Slider değeriyle amplitude'u güncelle
    slider1Value.textContent = slider1.value;  // Değeri ekranda göster
});

// Slider 2'nin değeri değiştiğinde
slider2.addEventListener('input', function (event) {
    frequency = event.target.value;
    slider2Value.textContent = slider2.value;

});
