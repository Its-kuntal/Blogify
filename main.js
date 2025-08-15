document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeToggle && themeIcon) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
        }
    }

    // Like Button Functionality
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('.likes-count');
            let count = parseInt(countSpan.textContent);

            this.classList.toggle('liked');
            
            if (icon) {
                if (this.classList.contains('liked')) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill');
                    countSpan.textContent = count + 1;
                } else {
                    icon.classList.remove('bi-heart-fill');
                    icon.classList.add('bi-heart');
                    countSpan.textContent = count - 1;
                }
            }
        });
    });

    // Share Button Functionality
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl;
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Calculate Reading Time for all blog posts
    document.querySelectorAll('.card').forEach(card => {
        const text = card.querySelector('.card-text').textContent;
        const title = card.querySelector('.card-title').textContent;
        const totalWords = (text + ' ' + title).trim().split(/\s+/).length;
        const readingTime = Math.max(1, Math.ceil(totalWords / 200)); // Assume 200 words per minute

        // Create or update reading time badge
        let readTimeEl = card.querySelector('.read-time');
        if (!readTimeEl) {
            readTimeEl = document.createElement('span');
            readTimeEl.className = 'badge bg-secondary read-time';
            card.querySelector('.card-title').parentNode.insertBefore(readTimeEl, card.querySelector('.card-text'));
        }
        readTimeEl.textContent = `${readingTime} min read`;
    });
});
