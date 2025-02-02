// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS - Replace "YOUR_PUBLIC_KEY" with your actual EmailJS public key
    emailjs.init("bHWRXu_XC2UijLUQ5");
    
    const form = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    form.addEventListener('submit', async function(e) {
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
});