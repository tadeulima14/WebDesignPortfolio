document.addEventListener('DOMContentLoaded', () => {
  function scrollToSection(serviceCategory) {
    const section = document.getElementById(serviceCategory);
    if (section) {
        console.log(`Scrolling to section: ${serviceCategory}`);
        section.scrollIntoView({ behavior: "smooth" });
    } else {
        console.warn(`No section found for service category: ${serviceCategory}`);
    }
  }

  // Attach event listeners to buttons
  const serviceButtons = document.querySelectorAll('.service-button');
  serviceButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor tag behavior
        const serviceCategory = button.getAttribute('data-category');
        console.log(`Button clicked: ${serviceCategory}`);
        scrollToSection(serviceCategory);
    });
  });
});
