# 🐋 모래고래 (Sand Whale) - 링크 모음 페이지

신비로운 사막과 우주를 유영하는 **모래고래**의 공식 링크 모음(Link-in-bio) 웹페이지입니다.
밝고 귀여운 파스텔 크림 & 소프트 스카이블루 테마와 그룹별(Personal, Products) 카드 레이아웃이 적용되어 있습니다.

---

## 📁 프로젝트 파일 구조

```
CH03/
├── index.html               # 메인 웹페이지
├── README.md                # 사용 가이드
└── assets/
    ├── css/
    │   └── style.css        # 밝고 귀여운 파스텔 크림 UI 스타일시트
    ├── js/
    │   ├── config.js        # 💡 [여기서 주소를 수정하세요!] 링크 및 그룹 설정 파일
    │   └── main.js          # 프로필 슬라이더, 그룹 렌더링 및 보안 링크 스크립트
    └── images/
        ├── sand_whale_1.jpg # 노을빛 사막을 유영하는 2D 모래고래
        ├── sand_whale_2.jpg # 은하수 밤하늘 별빛 2D 모래고래
        ├── sand_whale_3.jpg # 오아시스 크리스탈 2D 모래고래
        ├── mail_2d.jpg      # 2D 편지봉투 메일 아이콘
        ├── youtube_2d.jpg   # 2D 유튜브 재생 아이콘
        ├── instagram_2d.jpg # 2D 인스타그램 카메라 아이콘
        ├── book_2d.jpg      # 2D 코지 독서 클럽 책과 찻잔 아이콘
        └── market_2d.jpg    # 2D 감자 마켓 쇼핑카트 아이콘
```

---

## 🔗 링크 및 그룹 설정 방법 (`assets/js/config.js`)

`assets/js/config.js` 파일에서 링크 그룹 및 주소를 손쉽게 수정하거나 추가할 수 있습니다:

```javascript
window.SAND_WHALE_CONFIG = {
  profile: {
    name: '모래고래',
    bio: '반갑습니다',
    intervalMs: 3500 // 프로필 사진 전환 속도 (3.5초)
  },
  groups: [
    {
      id: 'products',
      title: 'Products',
      links: [
        {
          id: 'cozy-book-club',
          title: '코지 독서 클럽',
          desc: '다정한 사람들의 온기 있는 서재 및 독서 모임',
          url: 'https://bookclub-liard-one.vercel.app/',
          icon: 'assets/images/book_2d.jpg'
        },
        {
          id: 'market',
          title: '감자 마켓',
          desc: '모래고래 공식 굿즈 및 마켓 둘러보기',
          url: 'https://gamja-two.vercel.app/',
          icon: 'assets/images/market_2d.jpg'
        }
      ]
    },
    {
      id: 'personal',
      title: 'Personal',
      links: [
        {
          id: 'mail',
          title: '메일 문의',
          desc: '비즈니스 협업 및 문의 메일 보내기',
          url: 'mailto:gats.xneider@gmail.com',
          icon: 'assets/images/mail_2d.jpg'
        },
        {
          id: 'youtube',
          title: '유튜브 (YouTube)',
          desc: '모래고래 공식 채널 및 영상 콘텐츠',
          url: 'https://www.youtube.com/@watergom',
          icon: 'assets/images/youtube_2d.jpg'
        },
        {
          id: 'instagram',
          title: '인스타그램 (Instagram)',
          desc: '일상 이야기와 사진 및 최신 소식',
          url: 'https://www.instagram.com/watergom2',
          icon: 'assets/images/instagram_2d.jpg'
        }
      ]
    }
  ]
};
```

> **참고**: 주소가 비어있는 상태에서 링크 카드를 클릭하면 안내 메시지(토스트 알림)가 화면 하단에 표시됩니다.

---

## 🛡️ 적용된 보안 기능

1. **XSS(교차 사이트 스크립팅) 방어**:
   - `javascript:`, `data:`, `vbscript:` 등 악성 스크립트 실행 스킴을 차단하고 `http:`, `https:`, `mailto:` 프로토콜만 허용합니다.
   - `textContent`를 통한 안전한 텍스트 바인딩을 적용하여 HTML 인젝션을 원천 차단했습니다.
2. **탭내빙(Tabnabbing) 방지**:
   - 새 창으로 열리는 모든 외부 링크에 `rel="noopener noreferrer"` 속성을 적용하여 부모 창 객체 조작 공격을 방어합니다.
3. **콘텐츠 보안 정책(Content Security Policy, CSP)**:
   - 외부 불법 스크립트 주입 및 클릭재킹을 차단하는 CSP 메타 태그가 기본 적용되어 있습니다.
4. **엄격한 리퍼러 정책(Strict-origin-when-cross-origin)** 및 **MIME 스니핑 방지(X-Content-Type-Options)**가 설정되어 있습니다.

---

## 🖥️ 페이지 확인 방법

`index.html` 파일을 더블 클릭하여 크롬, 엣지, 웨일 등 웹 브라우저에서 바로 열람하실 수 있습니다.
