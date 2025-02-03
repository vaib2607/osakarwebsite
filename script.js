// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS - Replace "YOUR_PUBLIC_KEY" with your actual EmailJS public key
    emailjs.init("bHWRXu_XC2UijLUQ5");
  
    // EmailJS Form Submission
    const form = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');
  
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
  
        // Disable button and show loading state
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
  
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
  
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
          return;
        }
  
        if (name.length < 2) {
          alert('Please enter your full name');
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
          return;
        }
  
        if (message.length < 10) {
          alert('Message must be at least 10 characters long');
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
          return;
        }
  
        try {
          // Send email using EmailJS - Replace service_id and template_id with your actual IDs
          const response = await emailjs.send(
            "service_9zecr5l", // Replace with your EmailJS service ID
            "template_jp0l4je", // Replace with your EmailJS template ID
            {
              from_name: name,
              reply_to: email,
              subject: subject,
              message: message,
            }
          );
  
          if (response.status === 200) {
            alert('Thank you for your message. We will get back to you soon!');
            form.reset();
          } else {
            throw new Error('Failed to send message. Please try again later.');
          }
        } catch (error) {
          alert(error.message);
        } finally {
          // Re-enable the button
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
        }
      });
    }
  
    class ProductCarousel {
      constructor(element) {
        this.carousel = element;
        this.inner = element.querySelector('.carousel-inner');
        this.images = Array.from(this.inner.querySelectorAll('img'));
        this.prevBtn = element.querySelector('.carousel-prev');
        this.nextBtn = element.querySelector('.carousel-next');
        this.currentIndex = 0;
        this.imageWidth = 100; // percentage
        
        this.init();
      }
  
      init() {
        // Set initial styles
        this.inner.style.display = 'flex';
        this.inner.style.transition = 'transform 0.3s ease-in-out';
        this.images.forEach(img => {
          img.style.flex = '0 0 100%';
          img.style.width = '100%';
          img.style.height = 'auto';
          img.style.objectFit = 'cover';
        });
  
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.slide('prev'));
        this.nextBtn.addEventListener('click', () => this.slide('next'));
  
        // Update visibility of navigation buttons
        this.updateNavButtons();
      }
  
      slide(direction) {
        if (direction === 'next' && this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
        } else if (direction === 'prev' && this.currentIndex > 0) {
          this.currentIndex--;
        }
  
        const translateX = -this.currentIndex * this.imageWidth;
        this.inner.style.transform = `translateX(${translateX}%)`;
        this.updateNavButtons();
      }
  
      updateNavButtons() {
        this.prevBtn.style.display = this.currentIndex === 0 ? 'none' : 'block';
        this.nextBtn.style.display = this.currentIndex === this.images.length - 1 ? 'none' : 'block';
      }
    }
  
    // Initialize all product carousels
    const carousels = document.querySelectorAll('.product-image-carousel');
    carousels.forEach(carousel => new ProductCarousel(carousel));
  });
  document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger menu element
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
  
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
  
    // Add elements to the document
    document.body.appendChild(overlay);
    document.querySelector('header .container').appendChild(hamburgerMenu);
  
    const nav = document.querySelector('nav');
    let isMenuOpen = false;
  
    // Toggle menu function
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      hamburgerMenu.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
  
    // Event listeners
    hamburgerMenu.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
  
    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) {
          toggleMenu();
        }
      });
    });
  
    // Close menu on window resize if open
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        toggleMenu();
      }
    });
  });