// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu functionality
    const showMenu=(toggleId,navId) =>{
        const toggle=document.getElementById(toggleId),
        nav = document.getElementById(navId)

        if(toggle && nav){
            toggle.addEventListener('click',()=>{
                nav.classList.toggle('show')
            })
        }
    }
    showMenu('nav-toggle','nav-menu')

    const navLink=document.querySelectorAll('.nav_link')

    function linkAction(){
        // showMenu
        navLink.forEach(n => n.classList.remove('active'))
        this.classList.add('active')
        // RemoveMenu
        const navMenu=document.getElementById('nav-menu')
        navMenu.classList.remove('show')
    }
    navLink.forEach(n => n.addEventListener('click',linkAction))

    // Scroll-based navigation highlighting
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200; // Offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLink.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav_link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavOnScroll);
    
    // Call once on page load to set initial active state
    updateActiveNavOnScroll();

    // Initialize ScrollReveal animations (only if ScrollReveal is loaded)
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin:'top',
            distance: '30px',
            duration: 300,
            reset: false
        })
        // Home
        sr.reveal('.home_title',{})
        sr.reveal('.button',{delay:50})
        sr.reveal('.home_img',{delay:100})
        sr.reveal('.home_social-icon',{interval:100})
        // About
        sr.reveal('.about_img',{})
        sr.reveal('.about_subtitle-',{delay:50})
        sr.reveal('.about_text',{delay:50})
        // Skills
        sr.reveal('.skills-subtitle',{delay:50})
        sr.reveal('.skills_text',{delay:50})
        sr.reveal('.skills_data',{interval:75})
        sr.reveal('.skills_img',{delay:50})
        // Works
        sr.reveal('.work_img',{interval:50})
        // Contact
        sr.reveal('.contact_input',{interval:50})
    }

    // Initialize EmailJS (only if emailjs is loaded)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("3hK9M9GODR-5ZWBYg");
        
        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const formStatus = document.getElementById('form-status');
                const submitButton = document.querySelector('.contact_button');
                
                // Show loading state
                submitButton.value = 'Sending...';
                submitButton.disabled = true;
                formStatus.innerHTML = '<p class="status-loading">Sending your message...</p>';
                
                // Get form data
                const formData = {
                    from_name: this.from_name.value,
                    from_email: this.from_email.value,
                    message: this.message.value,
                    to_name: 'Moiz Hussain' // Your name
                };
                
                // Send email using EmailJS
                emailjs.send('service_u8yoh4g', 'template_7cgnhh2', formData)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        formStatus.innerHTML = '<p class="status-success">✓ Message sent successfully! Thank you for contacting me.</p>';
                        document.getElementById('contact-form').reset();
                    }, function(error) {
                        console.log('FAILED...', error);
                        let errorMessage = 'Failed to send message. Please try again or contact me directly.';
                        
                        // Provide specific error messages
                        if (error.status === 412) {
                            errorMessage = 'Email service authentication error. Please contact me directly at moizhussain@example.com';
                        } else if (error.status === 400) {
                            errorMessage = 'Invalid email format. Please check your email address.';
                        } else if (error.status === 403) {
                            errorMessage = 'Email service temporarily unavailable. Please try again later.';
                        }
                        
                        formStatus.innerHTML = '<p class="status-error">✗ ' + errorMessage + '</p>';
                    })
                    .finally(function() {
                        // Reset button state
                        submitButton.value = 'Send Message';
                        submitButton.disabled = false;
                        
                        // Clear status message after 5 seconds
                        setTimeout(function() {
                            formStatus.innerHTML = '';
                        }, 5000);
                    });
            });
        }
    } else {
        console.error('EmailJS library not loaded. Please check your internet connection.');
    }
    
});

