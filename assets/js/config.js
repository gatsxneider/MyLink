/**
 * ============================================================================
 * [모래고래 링크 모음 설정 파일]
 * ============================================================================
 * 나중에 링크 주소를 넣으실 때, 아래의 url: '' 따옴표 안에 원하는 주소를 적어주세요.
 * 
 * 예시:
 * - 메일: url: 'mailto:your-email@gmail.com'
 * - 유튜브: url: 'https://youtube.com/@yourchannel'
 * - 인스타그램: url: 'https://instagram.com/yourid'
 * 
 * * 보안 규칙:
 *   보안을 위해 http://, https://, mailto: 로 시작하는 주소만 안전하게 연결됩니다.
 * ============================================================================
 */

// 전역 window 객체에 명시적 할당하여 다른 스크립트에서 안전하게 접근 가능하도록 보장
window.SAND_WHALE_CONFIG = {
  profile: {
    name: '모래고래',
    bio: '지금부터 시작',
    intervalMs: 3500 // 프로필 사진 전환 시간 (밀리초, 3.5초)
  },
  links: [
    {
      id: 'mail',
      title: '메일 문의',
      desc: '비즈니스 협업 및 문의 메일 보내기',
      url: 'mailto:gats.xneider@gmail.com',
      icon: 'assets/images/mail_2d.jpg',
      alt: '귀여운 2D 메일 편지봉투 아이콘'
    },
    {
      id: 'youtube',
      title: '유튜브 (YouTube)',
      desc: '모래고래 공식 채널 및 영상 콘텐츠',
      url: 'https://www.youtube.com/@watergom',
      icon: 'assets/images/youtube_2d.jpg',
      alt: '귀여운 2D 유튜브 재생 아이콘'
    },
    {
      id: 'instagram',
      title: '인스타그램 (Instagram)',
      desc: '일상 이야기와 사진 및 최신 소식',
      url: 'https://www.instagram.com/watergom2',
      icon: 'assets/images/instagram_2d.jpg',
      alt: '귀여운 2D 인스타그램 카메라 아이콘'
    },
    {
      id: 'market',
      title: '감자 마켓',
      desc: '모래고래 공식 굿즈 및 마켓 둘러보기',
      url: 'https://gamja-two.vercel.app/',
      icon: 'assets/images/market_2d.jpg',
      alt: '귀여운 2D 감자 마켓 쇼핑카트 아이콘'
    }
  ]
};
