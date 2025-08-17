/*
 *  Copyright (c) Alexis Fiolleau <fiolleaua@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  ATTENTION! FREE SOFTWARE
 *  This website is free software (free as in freedom).
 *  If you use any part of this code, you must make your entire project's source code
 *  publicly available under the same license. This applies whether you modify the code
 *  or use it as it is in your own project. This ensures that all modifications and
 *  derivative works remain free software, so that everyone can benefit.
 *  If you are not willing to comply with these terms, you must refrain from using any part of this code.
 *
 *  For full license terms and conditions, you can read the AGPL-3.0 here:
 *  https://www.gnu.org/licenses/agpl-3.0.html
 */

export function initInvertedCursor() {
  console.log('Initializing inverted cursor system...');
  
  // Add class to body to enable custom cursor styles
  document.body.classList.add('custom-cursor-enabled');
  
  // Create custom cursor elements
  const cursorDot = document.createElement('div');
  const cursorPointer = document.createElement('div');
  const cursorGrab = document.createElement('div');
  
  // Add identifying classes for debugging
  cursorDot.className = 'custom-cursor custom-cursor-dot';
  cursorPointer.className = 'custom-cursor custom-cursor-pointer';
  cursorGrab.className = 'custom-cursor custom-cursor-grab';
  
  // Base cursor styles
  const baseCursorStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '99999',
    mixBlendMode: 'difference',
    transition: 'transform 0.05s ease-out',
  };
  
  // Dot cursor (default) - make it more visible for testing
  Object.assign(cursorDot.style, baseCursorStyle, {
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    border: '2px solid #000', // Add border for visibility
    left: '50px', // Initial position
    top: '50px'   // Initial position
  });
  
  // Triangle cursor (pointer)
  Object.assign(cursorPointer.style, baseCursorStyle, {
    width: '0',
    height: '0',
    backgroundColor: 'transparent',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '16px solid #fff',
    borderRadius: '0',
    transform: 'translate(-50%, -85%)',
    display: 'none',
    filter: 'drop-shadow(0 0 2px #000)', // Add shadow for visibility
    left: '50px', // Initial position
    top: '50px'   // Initial position
  });
  
  // Square cursor (grab)
  Object.assign(cursorGrab.style, baseCursorStyle, {
    width: '16px',
    height: '16px',
    backgroundColor: '#fff',
    borderRadius: '2px',
    transform: 'translate(-50%, -50%)',
    display: 'none',
    border: '2px solid #000', // Add border for visibility
    left: '50px', // Initial position
    top: '50px'   // Initial position
  });
  
  // Add cursors to body
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorPointer);
  document.body.appendChild(cursorGrab);
  
  console.log('Cursor elements created and added to DOM');
  
  let currentCursor = cursorDot;
  
  // Get current mouse position immediately
  let mouseX = 50;
  let mouseY = 50;
  
  // Try to get the current mouse position if available
  document.addEventListener('mousemove', function initMousePos(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Update cursor position immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    cursorPointer.style.left = mouseX + 'px';
    cursorPointer.style.top = mouseY + 'px';
    cursorGrab.style.left = mouseX + 'px';
    cursorGrab.style.top = mouseY + 'px';
    console.log('Initial mouse position set:', mouseX, mouseY);
    // Remove this listener after first use
    document.removeEventListener('mousemove', initMousePos);
  }, { once: true });
  
  // Update cursor position
  function updateCursorPosition(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    // Always update all cursor positions
    cursorDot.style.left = x + 'px';
    cursorDot.style.top = y + 'px';
    cursorPointer.style.left = x + 'px';
    cursorPointer.style.top = y + 'px';
    cursorGrab.style.left = x + 'px';
    cursorGrab.style.top = y + 'px';
    
    // Debug logging (remove later)
    if (Math.random() < 0.01) { // Only log 1% of the time to avoid spam
      console.log('Cursor position updated:', x, y);
    }
  }
  
  // Change cursor type based on element
  function updateCursorType(e) {
    const target = e.target;
    
    // Ensure target is an Element and has the matches method
    if (!target || typeof target.matches !== 'function') {
      // Default to dot cursor if target is not a valid element
      cursorDot.style.display = 'block';
      cursorPointer.style.display = 'none';
      cursorGrab.style.display = 'none';
      currentCursor = cursorDot;
      return;
    }
    
    // Hide all cursors first
    cursorDot.style.display = 'none';
    cursorPointer.style.display = 'none';
    cursorGrab.style.display = 'none';
    
    // Show appropriate cursor
    if (target.matches('a, button, [role="button"], .clickable, .app-button, .remove-button') || 
        target.closest('a, button, [role="button"], .clickable, .app-button, .remove-button')) {
      cursorPointer.style.display = 'block';
      currentCursor = cursorPointer;
    } else if (target.matches('.draggable, [draggable="true"], .window, .project-card') || 
               target.closest('.draggable, [draggable="true"], .window, .project-card')) {
      cursorGrab.style.display = 'block';
      currentCursor = cursorGrab;
    } else {
      cursorDot.style.display = 'block';
      currentCursor = cursorDot;
    }
  }
  
  // Event listeners
  document.addEventListener('mousemove', (e) => {
    updateCursorPosition(e);
    updateCursorType(e);
  });
  
  // Also listen on window for better coverage
  window.addEventListener('mousemove', (e) => {
    updateCursorPosition(e);
  });
  
  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    console.log('Mouse left document');
    cursorDot.style.display = 'none';
    cursorPointer.style.display = 'none';
    cursorGrab.style.display = 'none';
  });
  
  // Show cursor when mouse enters window
  document.addEventListener('mouseenter', (e) => {
    console.log('Mouse entered document');
    updateCursorType(e);
    updateCursorPosition(e);
  });
  
  // Initial visibility check
  console.log('Cursor dot display:', cursorDot.style.display);
  console.log('Cursor dot position:', cursorDot.style.left, cursorDot.style.top);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInvertedCursor);
} else {
  initInvertedCursor();
}
