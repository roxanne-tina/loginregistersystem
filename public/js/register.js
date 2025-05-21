document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  const alertContainer = document.getElementById('alert-container');
  
  registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    // Clear previous alerts
    alertContainer.innerHTML = '';
    
    // Validate passwords match
    if (password !== confirmPassword) {
      showAlert('Passwords do not match!', 'danger');
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        showAlert(data.message, 'danger');
        return;
      }
      
      showAlert('Registration successful! Redirecting to login...', 'success');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      showAlert('An error occurred. Please try again.', 'danger');
    }
  });
  
  function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alertContainer.appendChild(alert);
  }
});
