export function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            try {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                const response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Server error');
                }
                
                // Show success message
                const successAlert = document.createElement('div');
                successAlert.className = 'alert alert-success';
                successAlert.textContent = result.message;
                contactForm.prepend(successAlert);
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    successAlert.remove();
                }, 5000);
                
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                const errorAlert = document.createElement('div');
                errorAlert.className = 'alert alert-error';
                errorAlert.textContent = error.message;
                contactForm.prepend(errorAlert);
                
                setTimeout(() => {
                    errorAlert.remove();
                }, 5000);
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
}