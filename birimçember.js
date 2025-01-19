// Global değişkenler ve fonksiyonlar
let svg2 = d3.select('#unitCircle')
    .append('svg')
    .attr('width', 400)
    .attr('height', 400);

// Çemberin merkezi ve yarıçapı
const centerX = 200;
const centerY = 200;
const radius = 150;
const smallCircleRadius = 20;

// Birim çemberi çiziyoruz
svg2.append("circle")
    .attr("cx", centerX)
    .attr("cy", centerY)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("stroke", "grey");

// Başlangıçta çizilecek çap çizgisi
const line = svg2.append("line")
    .attr("x1", centerX)
    .attr("y1", centerY)
    .attr("x2", centerX + radius)
    .attr("y2", centerY)
    .attr("stroke", "red")
    .attr("stroke-width", 2);


const sinLine = svg2.append("line")
    .attr("x1", centerX + radius)
    .attr("y1", centerY)
    .attr("x2", centerX + radius)
    .attr("y2", centerY)
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

// Kosinüs çizgisi (yatay)
const cosLine = svg2.append("line")
    .attr("x1", centerX)
    .attr("y1", centerY)
    .attr("x2", centerX + radius)
    .attr("y2", centerY)
    .attr("stroke", "green")
    .attr("stroke-width", 2);

const smallCircle = svg2.append("circle")
    .attr("cx", centerX)
    .attr("cy", centerY)
    .attr("r", smallCircleRadius)  // Küçük çemberin yarıçapı
    .attr("fill", "none")
    .attr("stroke", "none")
    .attr("oppacity", 0)


const smallCircleY = svg2.append("line")
    .attr("x1", centerX)
    .attr("y1", centerY)
    .attr("x2", centerX + smallCircleRadius)
    .attr("y2", centerY)
    .attr("fill", "none")
    .attr("stroke", "none")
    .attr("oppacity", 0)


const arcPath = svg2.append("path")
    .attr("fill", "grey")
    .attr("oppacity", 0.001)



let isDragging = false;

// Fare basıldığında (mousedown) drag işlemini başlat
svg2.on("mousedown", (event) => {
    isDragging = true;
    updateLine(event);

});

// Fare hareket ettiğinde (mousemove) çizgiyi güncelle
svg2.on("mousemove", (event) => {
    if (isDragging) {
        updateLine(event);
    }
});

// Fare bırakıldığında (mouseup) drag işlemini durdur
svg2.on("mouseup", () => {
    isDragging = false;
});

// Çizgiyi güncelleyen fonksiyon
function updateLine(event) {
    const [mouseX, mouseY] = d3.pointer(event);

    // Merkezden fareye olan açıyı hesapla
    const angleCircle = Math.atan2(mouseY - centerY, mouseX - centerX);

    let angleDegrees = (-1 * angleCircle) * (180 / Math.PI);
    if (angleDegrees < 0) {
        angleDegrees += 360;
    }

    let angleCircleTransform = (-1 * angleDegrees * (Math.PI / 180));


    const arcGenerator = d3.arc()
        .innerRadius(0)  // İç yarıçap
        .outerRadius(smallCircleRadius)  // Dış yarıçap (küçük çemberin yarıçapı)
        .startAngle(0)  // Başlangıç açısı
        .endAngle(angleCircleTransform);  // Son açı (yavaşça büyüyen dilim)


    // Küçük çemberin diliminin yolunu çiz
    arcPath
        .attr("d", arcGenerator)
        .attr("transform", `translate(${centerX}, ${centerY}) rotate(90)`)  // Çevreyi merkeze taşır

    distanceCos = Math.cos(angleCircle);
    distanceSin = (-1 * Math.sin(angleCircle));

    const newX2 = centerX + radius * Math.cos(angleCircle);
    const newY2 = centerY + radius * Math.sin(angleCircle);

    const sNewX2 = centerX + smallCircleRadius * Math.cos(angleCircle);
    const sNewY2 = centerY + smallCircleRadius * Math.sin(angleCircle);




    // Çizgiyi güncelle
    line
        .attr("x2", newX2)
        .attr("y2", newY2);

    sinLine
        .attr("x1", newX2)
        .attr("y1", newY2)
        .attr("x2", newX2)
        .attr("y2", centerY);

    // Kosinüs (yatay) çizgisini güncelle
    cosLine
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", newX2)
        .attr("y2", centerY);

    smallCircleY
        .attr("x2", sNewX2)
        .attr("y2", sNewY2);



    document.getElementById("SinValue").innerText = distanceSin.toFixed(3);
    document.getElementById("CosValue").innerText = distanceCos.toFixed(3);
}

function resetLines() {
    line
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX + radius)
        .attr("y2", centerY);

    sinLine
        .attr("x1", centerX + radius)
        .attr("y1", centerY)
        .attr("x2", centerX + radius)
        .attr("y2", centerY)

    // Kosinüs (yatay) çizgisini güncelle
    cosLine
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", centerX + radius)
        .attr("y2", centerY)

    arcPath
        .attr("d", d3.arc()
            .innerRadius(0)  // İç yarıçapı sıfırla
            .outerRadius(smallCircleRadius)  // Küçük çemberin yarıçapını koru
            .startAngle(0)  // Başlangıç açısını sıfırla
            .endAngle(0))  // Son açıyı sıfırla
        .attr("opacity", 0.2);  // Opaklığı sıfırla (tamamen saydam)
}

