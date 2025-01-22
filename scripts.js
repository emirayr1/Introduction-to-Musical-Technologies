let isHomeClicked = false;



window.onload = function () {
  showContent('homePage') // Sayfa adı: intro
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


function homeClick() {
  isHomeClicked = true;
  console.log(isHomeClicked);

  const sidebar = document.querySelector('.sidebar');
  const container = document.querySelector('.container');


  sidebar.classList.add('hide');
  sidebar.classList.remove('show');


  const sidebarButtons = document.querySelectorAll('.menüButonları button');
  sidebarButtons.forEach(button => {
    button.classList.remove('active-button');
  });

  const allMenus = document.querySelectorAll('.menus');
  allMenus.forEach(menu => {
    menu.style.display = 'none'; // Tüm menüleri gizle
  });

  showContent('homePage');

  const houseLogo = document.querySelector('.house-logo');
  houseLogo.classList.add('active');

}
function showMenus(menuId) {
  // Tüm container'ları seç
  // Menülerdeki tüm .menus sınıfına sahip öğeleri gizle
  const allMenus = document.querySelectorAll('.menus');
  allMenus.forEach(menu => {
    menu.style.display = 'none'; // Tüm menüleri gizle
  });

  // Tıklanan container'ı göster
  const activeMenus = document.getElementById(menuId);
  if (activeMenus) {
    activeMenus.style.display = 'block'; // Tıklanan menüyü göster
  }

  const sidebar = document.querySelector('.sidebar');
  const container = document.querySelector('.container');
  sidebar.classList.remove('hide');
  sidebar.style.display = 'block'; // Sidebar'ı göster

  setTimeout(() => {
    sidebar.classList.add('show'); // Animasyonla sidebar'ı aşağı kaydırarak göster
  }, 10);

  // Tüm butonlardan aktif sınıfını kaldır
  const sidebarButtons = document.querySelectorAll('.menüButonları button');
  sidebarButtons.forEach(button => {
    button.classList.remove('active-button');
  });

  // Tıklanan butona aktif sınıfını ekle
  const clickedButton = Array.from(sidebarButtons).find(button =>
    button.getAttribute('onclick').includes(menuId)
  );


  if (clickedButton) {
    clickedButton.classList.add('active-button');
    const buttonName = clickedButton.innerText || clickedButton.textContent;

    // Tıklanan buton adına göre bir işlem yap
    if (buttonName === "Ses Fiziği") {
      showContent('introFizik')
    } else if (buttonName === "Mikrofonlama Teknikleri") {
      console.log("Mikrofonlama Teknikleri menüsü açıldı!");
    }
  }
  const houseLogo = document.querySelector('.house-logo');
  houseLogo.classList.remove('active');
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
  } else if (page == 'HALAT') {
    container.style.height = '200vh';
    textCanvasAlt.height = '1000px';
  } else if (page == 'BirimÇember') {
    container.style.height = '200vh';
    textCanvasAlt.height = '1000px';
  } else if (page == 'MOLEKÜL') {
    container.style.height = '200vh';
    textCanvasAlt.height = '1000px';
  }
  else {
    container.style.height = 'auto';
    textCanvasAlt.height = 'auto' // Diğer sayfalarda otomatik
  }
}

function setAnimationPage(page) {

  stopAnimation();
  resetMolecules();
  resetLines();
  stopRopeAnimation();

  if (page == 'MOLEKÜL') {
    createMolecules();
    time = 0;
    startAnimation();
  }
  else if (page == 'HALAT') {
    startRopeAnimation();

    animSpring();
  }
  else if (page == 'BirimÇember') {
    console.log("tamamglddik")
  }
  else {
    stopAnimation();
  }
}




// Footer navigation logic
const sectionsOrder = ['introFizik', 'Trigonometri', 'BirimÇember', 'Temelkavramlar', 'Vector',
  'Kuvvet', 'Basınç', 'Güçenerji', 'Sesnedir', 'Sesoluşumu', 'Periyodikhareket',
  'Birimçembervesinüs', 'Dalgakavramı', 'Sesdalgalarıvesinüs', 'Sinüsformülü',
  'Hareketinegöredalga', 'Enerjidalga', 'Sesdalgasıçeşitleri', 'Sesdalgakatısıvı',
  'Sesdalgagaz', 'Sesdalgaenerji', 'Sesdalgaşiddet', 'Sesşiddetidüzeyi', 'Girişim',
  'HALAT', 'MOLEKÜL'
];

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