//**************************************************/
//Scripts for homepage animation sequences  *******/
//************************************************/
//Element #1: Animation Only Runs Once per Reload
// Check if animation has already played this session
    const ANIMATION_KEY = 'landingAnimationPlayed';
    let animationCompleted = sessionStorage.getItem(ANIMATION_KEY) === 'true';

   //Element #2: Animation Only Runs Once per Reload--Wrap whole thing in "if" statement linked to sequence completion
   if (!animationCompleted) {
      // Sequence the animations with delays
      
      // Nav slides in on page load (CSS handles this automatically)

      // After Nav slides from top left, H1 slides from right 
      setTimeout(() => {
         const h1Element = document.getElementById('h1-animation');
         h1Element.innerHTML = "Web Design for Creatives, Makers, and Business Owners";
         h1Element.classList.add('show');
         animationCompleted = true;
      }, 1000);
      
      // After H1 completes (1s), show logo
      setTimeout(() => {
         const logoContainer = document.getElementById('logo-container');
         logoContainer.classList.add('show');
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
         console.log('Found columns:', columns.length); // Should show 3
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
         animationCompleted = true;
        }
        
    } else {
        // Show everything immediately without animation
        showAllElementsImmediately();
        }
    
    function showAllElementsImmediately() {
        const h1 = document.getElementById('h1-animation');
        h1.innerHTML = "Web Design for Creatives, Makers, and Business Owners";
        h1.classList.add('show');
            
        document.getElementById('logo-container').classList.add('show');
        document.getElementById('landing-content').classList.add('show');
        document.querySelector('.landing-intro').classList.add('show');
        document.querySelector('.landing-thanks').classList.add('show');
            
        const largeHeart = document.querySelector('.heart-large');
        if (largeHeart) largeHeart.classList.add('show');
    }
    
//**************************************************/
//Scripts for digital-design animation sequences **/
//************************************************/