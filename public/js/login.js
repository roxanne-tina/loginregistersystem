document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const alertContainer = document.getElementById('alert-container');
  
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Clear previous alerts
    alertContainer.innerHTML = '';
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        showAlert(data.message, 'danger');
        return;
      }
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      showAlert('Login successful! Redirecting...', 'success');
      
      // Redirect to welcome page after 1 second
      setTimeout(() => {
        window.location.href = '/welcome';
      }, 1000);
      
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
