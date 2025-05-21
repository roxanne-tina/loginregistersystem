document.addEventListener('DOMContentLoaded', function() {
  // Prevent zoom on iOS when focusing on inputs
  const metaViewport = document.querySelector('meta[name=viewport]');
  if (metaViewport) {
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  }
  
  // Fix for iOS 100vh issue (viewport height calculation)
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Set initial value
  setVH();
  
  // Update on resize and orientation change
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  
  // Add active state for touch devices
  document.addEventListener('touchstart', function() {}, true);
});
