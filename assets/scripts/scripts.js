//**************************************************/
//Scripts for homepage animation sequences  *******/
//************************************************/
//Element #1: Animation Only Runs Once per Reload

// Only run landing animations if we're on a page that has the landing elements
if (document.querySelector('.landing-body')) {

    const ANIMATION_KEY = 'landingAnimationPlayed';

    // Check if this is a page reload (hard refresh)
    const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';

    // If it's a reload, clear the animation flag so it plays again
    if (isReload) {
        sessionStorage.removeItem(ANIMATION_KEY);
    }
    let animationCompleted = sessionStorage.getItem(ANIMATION_KEY) === 'true';

    //Element #2: Animation Only Runs Once per Reload--Wrap whole thing in "if" statement linked to sequence completion
    if (!animationCompleted) {
        // Sequence the animations with delays
        
        // Nav slides in on page load (CSS handles this automatically)

        // After Nav slides from top left, H1 slides from right 
        setTimeout(() => {
            const h1Element = document.getElementById('h1-animation');
            h1Element.classList.add('show');
        }, 1000);
        
        // After H1 completes (1s), show logo
        setTimeout(() => {
            const logoContainer = document.getElementById('logo-container');
            logoContainer.classList.add('show');
        }, 2000);

        // Change nav.landing-nav from padding: 1rem to padding: 0;
        setTimeout(() => {
            const navAnimation = document.getElementById('nav-animation');
            navAnimation.classList.add('show');
        }, 2000);
        
        //After logo loads, landing-content comes up from bottom right
        setTimeout(() => {
            const landingContent = document.getElementById('landing-content');
            landingContent.classList.add('show');

            // After landing-content completes its 0.8s transition, start heart animation
            setTimeout(() => {
                triggerHeartAnimation();
            }, 800); // Wait for landing-content transition to complete
            
        }, 3000);

        // Heart animation sequence
        
        function triggerHeartAnimation() {
            // Start the falling hearts with cascade
            const columns = document.querySelectorAll('.heart-column');
            console.log('Found columns:', columns.length); // Testing:Should show 3
            columns.forEach((col, index) => {
                col.classList.add('animate', `delay-${index + 1}`);
            });
            
            // Fade in large heart at 2.5s
            const largeHeart = document.querySelector('.heart-large');
            console.log('Large heart element:', largeHeart); // Should show the img element
    
            if (largeHeart) {
                largeHeart.classList.add('show');
            } else {
                console.error('Large heart not found!');
            }
            
            // After large heart fully appears (2.5s animation start + 0.8s fade = 3.3s total)
            setTimeout(() => {
                showLandingIntro();
            }, 500);
        }

        function showLandingIntro() {
            const landingIntro = document.querySelector('.landing-intro');
            landingIntro.classList.add('show');
            
            // After landing-intro completes (600ms based on your CSS)
            setTimeout(() => {
                showLandingThanks();
            }, 600);
        }

        function showLandingThanks() {
            const landingThanks = document.querySelector('.landing-thanks');
            landingThanks.classList.add('show');
            sessionStorage.setItem(ANIMATION_KEY, 'true');
        }
        
    } else {
        // Show everything immediately without animation
        showAllElementsImmediately();
    }
    
    function showAllElementsImmediately() {

        // Add a class to bypass all CSS transitions/animations
        document.querySelector('.landing-body').classList.add('skip-animations');
    
        const h1 = document.getElementById('h1-animation');
        h1.innerHTML = "Web Design for Creatives, Makers, and Business Owners";
        h1.classList.add('show');

        const nav = document.getElementById('nav-animation');
        nav.classList.add('show');       
            
        document.getElementById('logo-container').classList.add('show');
        document.getElementById('landing-content').classList.add('show');
        document.querySelector('.landing-intro').classList.add('show');
        document.querySelector('.landing-thanks').classList.add('show');
            
        const largeHeart = document.querySelector('.heart-large');
        if (largeHeart) largeHeart.classList.add('show');
    }

} // End of landing page animations conditional

//**********************************************************************/
//*********** Scripts for loading .portfolio-section ******************/
//*********** with js observe on user scroll **************************/
//*********************************************************************/

document.addEventListener('DOMContentLoaded', () => {
  
  function getThreshold() {
    const width = window.innerWidth;
    
    if (width < 576) {
      return 0.15;
    } else {
      return 0.25;
    }
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: getThreshold()
  });
  
  document.querySelectorAll('.portfolio-section').forEach(section => {
    observer.observe(section);
  });
  
});

//**************************************************/
//******* Scripts for info-panel ******************/
//************************************************/

// Portfolio info panel toggle
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all portfolio entries
    const portfolioEntries = document.querySelectorAll('.portfolio-entry');
    
    portfolioEntries.forEach(entry => {
        const toggleBtn = entry.querySelector('.info-toggle');
        const closeBtn = entry.querySelector('.info-close');
        const infoPanel = entry.querySelector('.info-panel');
        
        // Only add listeners if this entry has an info panel
        if (!toggleBtn || !infoPanel) return;
        
        // Open panel
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            infoPanel.removeAttribute('hidden');
            infoPanel.classList.add('is-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            
            // Initialize scroll indicator when panel opens
            initScrollIndicator(entry);
        });
        
        // Close panel
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                infoPanel.classList.remove('is-open');
                toggleBtn.setAttribute('aria-expanded', 'false');
                
                // Wait for transition to finish before hiding
                setTimeout(() => {
                    if (!infoPanel.classList.contains('is-open')) {
                        infoPanel.setAttribute('hidden', '');
                    }
                }, 300);
            });
        }
    });
    
});

//**************************************************/
//***** Scripts for blinking indicator arrow ******/
//************************************************/

function initScrollIndicator(entry) {
    const infoContent = entry.querySelector('.info-content');
    const scrollIndicator = entry.querySelector('.scroll-indicator');
    
    if (!infoContent || !scrollIndicator) return;
    
    function checkScroll() {
        const hasScroll = infoContent.scrollHeight > infoContent.clientHeight;
        const isAtBottom = infoContent.scrollHeight - infoContent.scrollTop <= infoContent.clientHeight + 5;
        
        if (hasScroll && !isAtBottom) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
    }
    
    // Click handler to scroll to bottom
    scrollIndicator.addEventListener('click', function() {
        infoContent.scrollTo({
            top: infoContent.scrollHeight,
            behavior: 'smooth'
        });
    });
    
    // Remove existing scroll listeners to prevent duplicates
    const scrollHandler = checkScroll;
    infoContent.removeEventListener('scroll', scrollHandler);
    
    infoContent.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // Initial check
    checkScroll();
}