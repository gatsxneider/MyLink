# 🐋 모래고래 (Sand Whale) - 링크 모음 페이지

신비로운 사막과 우주를 유영하는 **모래고래**의 공식 링크 모음(Link-in-bio) 웹페이지입니다.

---

## 📁 프로젝트 파일 구조

```
CH03/
├── index.html               # 메인 웹페이지
├── README.md                # 사용 가이드
└── assets/
    ├── css/
    │   └── style.css        # 몽환적인 다크 & 글래스모피즘 디자인 스타일시트
    ├── js/
    │   ├── config.js        # 💡 [여기서 주소를 채워주세요!] 링크 및 설정 파일
    │   └── main.js          # 프로필 슬라이더 및 보안 링크 처리 스크립트
    └── images/
        ├── sand_whale_1.jpg # 노을빛 사막을 유영하는 2D 모래고래
        ├── sand_whale_2.jpg # 은하수 밤하늘 별빛 2D 모래고래
        ├── sand_whale_3.jpg # 오아시스 크리스탈 2D 모래고래
        ├── mail_2d.jpg      # 2D 편지봉투 메일 아이콘
        ├── youtube_2d.jpg   # 2D 유튜브 재생 아이콘
        └── instagram_2d.jpg # 2D 인스타그램 카메라 아이콘
```

---

## 🔗 링크 주소 채우는 방법 (간단 안내)

`assets/js/config.js` 파일을 메모장이나 VS Code 등으로 열어 `url: ''` 부분에 실제 주소를 채워 넣으시면 됩니다.

```javascript
window.SAND_WHALE_CONFIG = {
  profile: {
    name: '모래고래',
    bio: '지금부터 시작',
    intervalMs: 3500 // 프로필 사진 전환 속도 (3.5초)
  },
  links: [
    {
      id: 'mail',
      title: '메일 문의',
      desc: '비즈니스 협업 및 문의 메일 보내기',
      url: 'mailto:contact@sandwhale.com', // 👈 여기에 실제 메일 주소 입력
      icon: 'assets/images/mail_2d.jpg'
    },
    {
      id: 'youtube',
      title: '유튜브 (YouTube)',
      desc: '모래고래 공식 채널 및 영상 콘텐츠',
      url: 'https://youtube.com/@sandwhale', // 👈 여기에 유튜브 채널 주소 입력
      icon: 'assets/images/youtube_2d.jpg'
    },
    {
      id: 'instagram',
      title: '인스타그램 (Instagram)',
      desc: '일상 이야기와 사진 및 최신 소식',
      url: 'https://instagram.com/sandwhale', // 👈 여기에 인스타그램 주소 입력
      icon: 'assets/images/instagram_2d.jpg'
    }
  ]
};
```

> **참고**: 주소가 비어있는 상태에서 링크 카드를 클릭하면 안내 메시지(토스트 알림)가 화면 하단에 표시됩니다.

---

## 🛡️ 적용된 보안 기능

1. **XSS(교차 사이트 스크립팅) 방어**:
   - `javascript:`, `data:`, `vbscript:` 등 악성 스크립트 실행 스킴을 차단하고 `http:`, `https:`, `mailto:` 프로토콜만 허용합니다.
   - `innerHTML`을 통한 동적 데이터 주입을 엄격히 통제하고 안전한 DOM 조작을 사용했습니다.
2. **탭내빙(Tabnabbing) 방지**:
   - 새 창으로 열리는 모든 외부 링크에 `rel="noopener noreferrer"` 속성을 강제 적용하여 부모 창 객체 조작 공격을 방어합니다.
3. **콘텐츠 보안 정책(Content Security Policy, CSP)**:
   - 외부 불법 스크립트 주입 및 클릭재킹을 차단하는 CSP 메타 태그가 기본 적용되어 있습니다.
4. **엄격한 리퍼러 정책(Strict-origin-when-cross-origin)** 및 **MIME 스니핑 방지(X-Content-Type-Options)**가 설정되어 있습니다.

---

## 🖥️ 페이지 확인 방법

`index.html` 파일을 더블 클릭하여 크롬, 엣지, 웨일 등 웹 브라우저에서 바로 열람하실 수 있습니다.
