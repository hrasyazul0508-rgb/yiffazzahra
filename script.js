// Shared navigation, gallery filters, and contact form feedback.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      navigation.classList.toggle('open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        navigation.classList.remove('open');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 850) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        navigation.classList.remove('open');
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const filters = document.querySelectorAll('.filter-button');
  const tiles = document.querySelectorAll('.gallery-tile');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filters.forEach((filter) => filter.classList.toggle('active', filter === button));
      tiles.forEach((tile) => {
        const visible = category === 'all' || tile.dataset.category === category;
        tile.classList.toggle('is-hidden', !visible);
      });
    });
  });

  // Trailer source is configured on the player in gallery.html.
  const trailer = document.querySelector('.trailer-player');
  if (trailer) {
    const playButton = trailer.querySelector('.trailer-play');
    const video = trailer.querySelector('.trailer-video');
    const status = trailer.querySelector('.trailer-status');

    const showPlaceholder = (message) => {
      trailer.classList.remove('is-playing');
      status.textContent = message;
    };

    video.addEventListener('error', () => {
      showPlaceholder('Add your trailer file at the path shown below, or switch the source to YouTube.');
    });

    playButton.addEventListener('click', () => {
      const type = trailer.dataset.videoType.toLowerCase();
      const source = trailer.dataset.videoSrc.trim();
      status.textContent = '';

      if (type === 'youtube') {
        let videoId = '';
        try {
          const url = new URL(source);
          if (url.hostname.includes('youtu.be')) {
            videoId = url.pathname.split('/').filter(Boolean)[0] || '';
          } else if (url.pathname.includes('/embed/')) {
            videoId = url.pathname.split('/embed/')[1].split('/')[0];
          } else {
            videoId = url.searchParams.get('v') || '';
          }
        } catch (_error) {
          videoId = source;
        }

        if (!/^[\w-]{11}$/.test(videoId)) {
          status.textContent = 'Add a valid YouTube video URL in data-video-src.';
          return;
        }

        const frame = document.createElement('iframe');
        frame.className = 'trailer-embed';
        frame.title = 'Wondervale game trailer on YouTube';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        frame.allowFullscreen = true;
        frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
        trailer.querySelector('.trailer-player-screen').append(frame);
        trailer.classList.add('is-playing');
        return;
      }

      if (type !== 'mp4') {
        status.textContent = 'Set data-video-type to "mp4" or "youtube".';
        return;
      }

      video.src = source;
      video.load();
      trailer.classList.add('is-playing');
      video.play().catch(() => {
        showPlaceholder('Add your MP4 trailer at the path shown below, then press play again.');
      });
    });
  }

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.elements.name.value.trim();
      status.textContent = `Thank you${name ? `, ${name}` : ''}! Your note is ready for the Wondervale team.`;
      form.reset();
    });
  }
});
