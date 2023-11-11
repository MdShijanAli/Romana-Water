import './style.css'


  // Get the navbar element
  const navbar = document.getElementById('mainNavbar');

  // Function to toggle the 'scrolled' class based on the scroll position
  function handleScroll() {
    const scrollY = window.scrollY;

    // Adjust this value based on when you want the background color to change
    const scrollThreshold = 50;

    if (scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Listen for the scroll event and call the handleScroll function
  window.addEventListener('scroll', handleScroll);

