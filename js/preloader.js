// preloader.js - Standalone Preloader Implementation

/**
 * Initialize the preloader with logo transition
 */
function initPreloader() {
    // Create preloader styles
    const style = document.createElement('style');
    style.textContent = `
        /* Preloader Styles */
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #111;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 1s ease, visibility 1s ease;
        }
        
        .preloader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }
        
        .preloader-logo {
            width: 200px;
            height: auto;
            animation: float 3s ease-in-out infinite;
        }
        
        .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            width: 100%;
        }
        
        .loading-bar {
            width: 300px;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }
        
        .loading-progress {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #7b0091, #ee0979);
            border-radius: 10px;
            transition: width 0.3s ease;
        }
        
        .loading-text {
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 1px;
        }
        
        /* Animations */
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes logoTransition {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translate(var(--final-x), var(--final-y));
            }
        }
    `;
    document.head.appendChild(style);

    // Create preloader HTML
    const preloaderHTML = `
        <div class="preloader">
            <div class="preloader-content">
                <img src="images/logo.png" alt="NEDITS Logo" class="preloader-logo">
                <div class="loading-container">
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                    <div class="loading-text">Loading...</div>
                </div>
            </div>
        </div>
    `;

    // Add preloader to body
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    document.body.style.overflow = 'hidden';

    // Get elements
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('.preloader-logo');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    const headerLogoContainer = document.querySelector('.header-container');

    // Start loading animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        // Random but slowing down progress
        const increment = 1 + Math.random() * (5 - (progress/25));
        progress = Math.min(progress + increment, 100);
        
        loadingProgress.style.width = `${progress}%`;
        loadingText.textContent = `Loading ${Math.floor(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            loadingText.textContent = "Ready!";
            
            // Hide the existing header logo
            const existingLogo = document.querySelector('.logo');
            if (existingLogo) {
                existingLogo.style.opacity = '0';
            }
            
            // Calculate final position for logo
            if (headerLogoContainer) {
                const headerLogoRect = headerLogoContainer.getBoundingClientRect();
                const preloaderLogoRect = preloaderLogo.getBoundingClientRect();
                
                const finalX = headerLogoRect.left - preloaderLogoRect.left + (headerLogoRect.width - 200)/2;
                const finalY = headerLogoRect.top - preloaderLogoRect.top + (headerLogoRect.height - 200)/2;
                
                // Move logo to header position
                preloaderLogo.style.setProperty('--final-x', `${finalX}px`);
                preloaderLogo.style.setProperty('--final-y', `${finalY}px`);
                preloaderLogo.style.animation = 'logoTransition 1s ease-in-out forwards';
                
                // Make logo part of header after animation
                setTimeout(() => {
                    headerLogoContainer.insertBefore(preloaderLogo, headerLogoContainer.firstChild);
                    preloaderLogo.style.width = '80px';
                    preloaderLogo.style.animation = 'none';
                    preloaderLogo.style.position = 'static';
                    preloaderLogo.style.transform = 'none';
                    
                    // Fade out preloader background
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    
                    // Remove preloader and restore scrolling
                    setTimeout(() => {
                        preloader.remove();
                        document.body.style.overflow = 'auto';
                    }, 1000);
                }, 1000);
            } else {
                // Fallback if header not found
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.remove();
                    document.body.style.overflow = 'auto';
                }, 1000);
            }
        }
    }, 100);
}

// Start preloader when DOM is loaded
document.addEventListener('DOMContentLoaded', initPreloader);
