document.addEventListener('DOMContentLoaded', function() {
            var drawer = document.querySelector('.side-drawer');
            var toggleBtn = document.querySelector('.toggle-btn');
            var hamburgerBtn = document.querySelector('.hamburger-btn');
            var overlay = document.querySelector('.overlay');
            var chevronIcon = document.querySelector('.chevron-icon');
            var isMobile = window.innerWidth <= 768;

            function updateMobileState() {
                isMobile = window.innerWidth <= 768;
                drawer.classList.remove('open', 'mobile');
                overlay.classList.remove('show');
                if (isMobile) {
                    drawer.classList.add('mobile');
                }
            }

            // Initial mobile check
            if (isMobile) {
                drawer.classList.add('mobile');
            }

            // Event Listeners
            window.addEventListener('resize', updateMobileState);

            toggleBtn.addEventListener('click', function() {
                if (isMobile) {
                    drawer.classList.remove('open');
                    overlay.classList.remove('show');
                } else {
                    drawer.classList.toggle('open');
                    chevronIcon.style.transform = drawer.classList.contains('open') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                }
            });

            hamburgerBtn.addEventListener('click', function() {
                drawer.classList.add('open');
                overlay.classList.add('show');
            });

            overlay.addEventListener('click', function() {
                drawer.classList.remove('open');
                overlay.classList.remove('show');
            });
        });