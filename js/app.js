// Show a main section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
  }
  
  // Show a subsection within the Projects section
  function showSubsection(subsectionId) {
    const subsections = document.querySelectorAll('#projects .subsection');
    subsections.forEach((subsection) => {
      subsection.classList.remove('active');
    });
    document.getElementById(subsectionId).classList.add('active');
  }
  