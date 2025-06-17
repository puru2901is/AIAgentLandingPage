// JavaScript for the AI Assistant for Airline MRO Manuals Landing Page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const waitlistBtn = document.getElementById('waitlist-btn');
    const demoBtn = document.getElementById('demo-btn');
    const contactForm = document.getElementById('contact-form');
    const closeFormBtn = document.getElementById('close-form');
    const form = contactForm.querySelector('form');
    
    // Show form when clicking "Join the Waitlist" button
    if (waitlistBtn) {
        waitlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactForm.style.display = 'block';
            // Add a hidden field to indicate this is a waitlist submission
            let formType = document.createElement('input');
            formType.type = 'hidden';
            formType.name = 'formType';
            formType.value = 'waitlist';
            form.appendChild(formType);
            
            // Scroll to the form
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Show form when clicking "Book a Demo" button
    if (demoBtn) {
        demoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactForm.style.display = 'block';
            // Add a hidden field to indicate this is a demo request
            let formType = document.createElement('input');
            formType.type = 'hidden';
            formType.name = 'formType';
            formType.value = 'demo';
            form.appendChild(formType);
            
            // Scroll to the form
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Close form when clicking the close button
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', function() {
            contactForm.style.display = 'none';
            // Remove any existing hidden formType field
            const existingFormType = form.querySelector('input[name="formType"]');
            if (existingFormType) {
                form.removeChild(existingFormType);
            }
        });
    }
    
    // Handle form submission with Google Sheets integration
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Create a loading indicator
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Map your form fields to Google Form fields
            // You'll need to replace these entry.X values with the actual ones from your Google Form

            //https://docs.google.com/forms/d/e/1FAIpQLSdc8dDHk1FbXCqRWmXXzQWAbXGMl70IhhpvoawcV80_ptDUdg/viewform?usp=pp_url&entry.1544920856=name&entry.5055384=company&entry.1097234795=email&entry.229693664=phone&entry.1535001332=message&entry.1132867608=waitlist
            const googleFormData = new FormData();
            googleFormData.append('entry.1544920856', formDataObj.name); // Name field
            googleFormData.append('entry.5055384', formDataObj.company); // Company field
            googleFormData.append('entry.1097234795', formDataObj.email); // Email field
            googleFormData.append('entry.229693664', formDataObj.phone || 'Not provided'); // Phone field
            googleFormData.append('entry.1535001332', formDataObj.message || 'No message'); // Message field
            googleFormData.append('entry.1132867608', formDataObj.formType || 'General inquiry'); // Form type
            
            // Replace with your actual Google Form URL
            const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdc8dDHk1FbXCqRWmXXzQWAbXGMl70IhhpvoawcV80_ptDUdg/formResponse';
            
            // Use an iframe to submit the form (this helps bypass CORS restrictions)
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            // Create a form element to submit through the iframe
            const hiddenForm = document.createElement('form');
            hiddenForm.method = 'POST';
            hiddenForm.action = googleFormUrl;
            hiddenForm.target = 'hidden_iframe';
            
            // Add all Google Form fields to the hidden form
            googleFormData.forEach((value, key) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                hiddenForm.appendChild(input);
            });
            
            document.body.appendChild(hiddenForm);
            
            // Submit the hidden form
            hiddenForm.submit();
            
            // Show success message after a short delay (gives time for the iframe to load)
            setTimeout(() => {
                // Remove the hidden form and iframe
                document.body.removeChild(hiddenForm);
                document.body.removeChild(iframe);
                
                // Show success message
                form.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>We\'ve received your submission and will be in touch soon.</p></div>';
                
                // Reset form after 5 seconds and hide it
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    
                    // Recreate the form (reload page to reset the form)
                    location.reload();
                }, 5000);
            }, 1000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animations for query examples
    const queryItems = document.querySelectorAll('.query-item');
    if (queryItems.length) {
        let currentItem = 0;
        
        // Function to highlight the next query
        function highlightNextQuery() {
            // Remove highlight from all items
            queryItems.forEach(item => item.classList.remove('active'));
            
            // Add highlight to current item
            queryItems[currentItem].classList.add('active');
            
            // Update the counter
            currentItem = (currentItem + 1) % queryItems.length;
        }
        
        // Initial highlight
        highlightNextQuery();
        
        // Set up interval to switch highlighted query every 3 seconds
        setInterval(highlightNextQuery, 3000);
    }
    
    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize active nav link
    updateActiveNavLink();
});
