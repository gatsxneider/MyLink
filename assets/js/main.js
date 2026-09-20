/**
 * Sand Whale (모래고래) - Link Collection Main Logic
 * - Profile Image Smooth Cross-fade Animation & Indicators
 * - Security: XSS Sanitization, Safe Protocol Whitelist (http, https, mailto), Tabnabbing Prevention
 * - Interactive Feedback: Toast message when link URL is not yet configured
 */

(function () {
  'use strict';

  // config.js에서 설정을 불러오거나 기본값 사용 (window 프로퍼티 및 스코프 식별자 모두 지원)
  const config = (window.SAND_WHALE_CONFIG || (typeof SAND_WHALE_CONFIG !== 'undefined' ? SAND_WHALE_CONFIG : null)) || {
    profile: {
      name: '모래고래',
      bio: '지금부터 시작',
      intervalMs: 3500
    },
    links: [
      {
        id: 'mail',
        title: '메일 문의',
        desc: '비즈니스 협업 및 문의 메일 보내기',
        url: '',
        icon: 'assets/images/mail_2d.jpg',
        alt: '귀여운 2D 메일 편지봉투 아이콘'
      },
      {
        id: 'youtube',
        title: '유튜브 (YouTube)',
        desc: '모래고래 공식 채널 및 영상 콘텐츠',
        url: '',
        icon: 'assets/images/youtube_2d.jpg',
        alt: '귀여운 2D 유튜브 재생 아이콘'
      },
      {
        id: 'instagram',
        title: '인스타그램 (Instagram)',
        desc: '일상 이야기와 사진 및 최신 소식',
        url: '',
        icon: 'assets/images/instagram_2d.jpg',
        alt: '귀여운 2D 인스타그램 카메라 아이콘'
      }
    ]
  };

  /* ==========================================================================
     보안 유틸리티 (Security & Anti-XSS Verification)
     - Safe Protocol Whitelisting: http, https, mailto만 허용
     - javascript:, data:, vbscript: 등 악성 스킴 원천 방지
     ========================================================================== */
  function isSafeUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return false;
    const trimmed = rawUrl.trim();
    if (trimmed === '' || trimmed === '#') return false;

    // mailto: 형식 검증 (RFC 이메일 포맷 기본 검증)
    if (/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\?.*)?$/i.test(trimmed)) {
      return true;
    }

    // http 또는 https 프로토콜 검증
    try {
      const parsed = new URL(trimmed);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /* ==========================================================================
     토스트 알림 (미등록 링크 클릭 시 안내)
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toastNotice');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 3200);
  }

  /* ==========================================================================
     프로필 사진 슬라이더 (부드러운 크로스페이드 전환)
     ========================================================================== */
  function initProfileSlider() {
    const slides = document.querySelectorAll('.profile-slide');
    const dots = document.querySelectorAll('.indicator-dot');
    const container = document.querySelector('.profile-avatar-frame');
    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlideInterval = null;
    const intervalTime = config.profile.intervalMs || 3500;

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
      }, intervalTime);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    // 도트 클릭 시 해당 슬라이드로 이동
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const targetIdx = parseInt(e.currentTarget.dataset.index, 10);
        if (!isNaN(targetIdx)) {
          showSlide(targetIdx);
          startAutoSlide();
        }
      });
    });

    // 프로필 이미지 클릭 시 다음 이미지로 바로 전환
    if (container) {
      container.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        startAutoSlide();
      });
      container.addEventListener('mouseenter', stopAutoSlide);
      container.addEventListener('mouseleave', startAutoSlide);
    }

    // 탭 비활성화 시 자동 정지
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });

    // 초기 표시
    showSlide(0);
    startAutoSlide();
  }

  /* ==========================================================================
     링크 목록 렌더링
     ========================================================================== */
  function renderLinks() {
    const container = document.getElementById('linksContainer');
    if (!container) return;

    container.innerHTML = '';

    config.links.forEach((item) => {
      const card = document.createElement('a');
      card.className = 'link-card';
      card.id = `link-${item.id}`;

      // URL 유효성 및 보안 검사
      const isSafe = isSafeUrl(item.url);
      if (isSafe) {
        card.href = item.url.trim();
        // mailto는 같은 창에서 열리도록, 일반 웹 링크는 새 창으로 보안 옵션과 함께 오픈
        if (/^mailto:/i.test(item.url.trim())) {
          card.target = '_self';
        } else {
          card.target = '_blank';
          card.rel = 'noopener noreferrer'; // 탭내빙 방지
        }
      } else {
        card.href = '#';
        card.setAttribute('role', 'button');
        card.setAttribute('aria-haspopup', 'dialog');
      }

      // 1) 대표 이미지 썸네일
      const thumbWrapper = document.createElement('div');
      thumbWrapper.className = 'link-thumb-wrapper';

      const img = document.createElement('img');
      img.className = 'link-thumb';
      img.src = item.icon;
      img.alt = item.alt || `${item.title} 아이콘`;
      img.loading = 'lazy';
      thumbWrapper.appendChild(img);

      // 2) 텍스트 설명문구 및 부가정보
      const content = document.createElement('div');
      content.className = 'link-content';

      const title = document.createElement('div');
      title.className = 'link-title';
      title.textContent = item.title;

      const desc = document.createElement('div');
      desc.className = 'link-description';
      desc.textContent = item.desc;

      content.appendChild(title);
      content.appendChild(desc);

      // 3) 이동 화살표 아이콘
      const arrow = document.createElement('div');
      arrow.className = 'link-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;

      card.appendChild(thumbWrapper);
      card.appendChild(content);
      card.appendChild(arrow);

      // 클릭 이벤트 (주소 비어있을 때 토스트 안내)
      card.addEventListener('click', (e) => {
        if (!isSafe) {
          e.preventDefault();
          showToast(`'${item.title}' 주소를 아직 입력하지 않았습니다. assets/js/config.js 파일에서 입력해주세요.`);
        }
      });

      container.appendChild(card);
    });
  }

  /* ==========================================================================
     최신 소식 팝업 모달 (보안 및 접근성 친화적 제어)
     - 페이지 첫 진입 시 모달 표시
     - 닫기 버튼, X 버튼, 배경 오버레이 클릭, Escape 키 누를 시 닫힘
     - CSP 준수: addEventListener로 안전하게 등록
     ========================================================================== */
  function initNewsModal() {
    const modal = document.getElementById('newsModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const closeIconBtn = document.getElementById('modalCloseIconBtn');

    if (!modal) return;

    function closeModal() {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (closeIconBtn) {
      closeIconBtn.addEventListener('click', closeModal);
    }

    // 어두운 배경(오버레이) 클릭 시 팝업 닫기
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // 키보드 접근성: ESC 키를 누르면 팝업 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     초기화
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initNewsModal();
    initProfileSlider();
    renderLinks();
  });
})();
