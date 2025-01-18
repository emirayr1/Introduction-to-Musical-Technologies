window.onload = function () {
  showContent('intro') // Sayfa adı: intro

};


function showContent(topic) {    // SAYFA DEĞİŞTİRME VE AKTİFLİK AYARLAMA - SETCONTAİNERHEİGHT VE SETANİAMTİONPAGE --
  // Hide all content divs
  const sections = document.querySelectorAll('.content > div');
  sections.forEach(section => section.style.display = 'none');

  // Show the selected content div
  document.getElementById(topic).style.display = 'block';


  // SET CONTAINER HEIGHT


  // Remove 'active' class from all sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
  sidebarLinks.forEach(link => link.classList.remove('active'));

  // Add 'active' class to the clicked link
  const activeLink = document.querySelector(`.sidebar ul li a[onclick="showContent('${topic}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  setContainerHeight(topic);
  setAnimationPage(topic)
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

function setAnimationPage(page) {
  stopAnimationCircle();
  stopAnimation();

  if (page == 'fft') {
    resetMolecules();
    createMolecules();
    time = 0;
    startAnimation();
  }
  else if (page == 'fourier') {
    startAnimationCircle();
  }
  else {
    stopAnimation();
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




