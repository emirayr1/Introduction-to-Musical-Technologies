window.onload = function () {
  showContent('intro') // Sayfa adı: intro

};


function showContent(topic) {
  // Hide all content divs
  const sections = document.querySelectorAll('.content > div');
  sections.forEach(section => section.style.display = 'none');

  // Show the selected content div
  document.getElementById(topic).style.display = 'block';


  // SET CONTAINER HEIGHT
  setContainerHeight(topic);

  // Remove 'active' class from all sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
  sidebarLinks.forEach(link => link.classList.remove('active'));

  // Add 'active' class to the clicked link
  const activeLink = document.querySelector(`.sidebar ul li a[onclick="showContent('${topic}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Scroll to the top of the page
  window.scrollTo(0, 0);
}

function setContainerHeight(page) {
  const container = document.querySelector('.container');
  const textCanvasAlt = document.querySelector('.text_canvasAlt');

  if (page === 'intro') {
    container.style.height = '200vh';
    textCanvasAlt.height = '50px';
    // Introduction sayfası
  } else if (page === 'signals') {
    container.style.height = '200vh';
    textCanvasAlt.height = '1000px';
  } else if (page == 'sine_cosine') {
    container.style.height = '200vh';
    textCanvasAlt.height = '1000px';
  } else if (page == 'fourier') {
    container.style.height = '200vh';
    textCanvasAlt.height = '1000px';
  } else if (page == 'fft') {
    container.style.height = '200vh';
    textCanvasAlt.height = '1000px';
  }
  else {
    container.style.height = 'auto';
    textCanvasAlt.height = 'auto' // Diğer sayfalarda otomatik
  }
}

// Footer navigation logic
const sectionsOrder = ['intro', 'signals', 'sine_cosine', 'fourier', 'fft'];

function navigateToNext() {
  const currentSection = getCurrentVisibleSection();
  const currentIndex = sectionsOrder.indexOf(currentSection);
  if (currentIndex < sectionsOrder.length - 1) {
    showContent(sectionsOrder[currentIndex + 1]);
  }
}

function navigateToPrev() {
  const currentSection = getCurrentVisibleSection();
  const currentIndex = sectionsOrder.indexOf(currentSection);
  if (currentIndex > 0) {
    showContent(sectionsOrder[currentIndex - 1]);
  }
}

function getCurrentVisibleSection() {
  const sections = document.querySelectorAll('.content > div');
  for (let section of sections) {
    if (section.style.display === 'block') {
      return section.id;
    }
  }
  return null; // Default case if no section is visible
}

// Add event listeners to footer buttons
document.getElementById('nextButton').addEventListener('click', navigateToNext);
document.getElementById('prevButton').addEventListener('click', navigateToPrev);

// Signal drawing animation (for 'Signals' section)
function drawSignal() {
  const canvas = document.getElementById('signalCanvas');
  const ctx = canvas.getContext('2d');

  // Canvas dimensions and properties
  const width = canvas.width;
  const height = canvas.height;
  const amplitude = 50; // Height of the wave
  const frequency = 0.05; // Tightness of the wave
  const speed = 0.1; // Speed of wave movement
  let time = 0;

  // Function to animate the sine wave
  function animateWave() {
    ctx.clearRect(0, 0, width, height); // Clear the canvas
    ctx.beginPath();
    ctx.strokeStyle = '#ff5e5e'; // Wave color
    ctx.lineWidth = 2;

    for (let x = 0; x < width; x++) {
      const y = Math.sin(frequency * (x + time)) * amplitude + height / 2;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke(); // Draw the wave
    time += speed; // Increment time
    requestAnimationFrame(animateWave); // Keep animating
  }

  animateWave(); // Start animation
}
