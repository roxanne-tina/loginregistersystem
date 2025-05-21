document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token || !user) {
    // Redirect to login if not logged in
    window.location.href = '/login';
    return;
  }
  
  // Display user information
  document.getElementById('welcome-text').textContent = `Welcome, ${user.fullName}!`;
  document.getElementById('user-name').textContent = user.fullName;
  document.getElementById('user-email').textContent = user.email;
  
  // Handle logout
  document.getElementById('logout-btn').addEventListener('click', function() {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = '/login';
  });
});
