---
name: cute-pastel-design
description: >-
  지금까지 구축된 모래고래 링크 모음 웹사이트를 기반으로 한 밝고 귀여운 파스텔 크림 & 소프트 스카이블루 디자인 시스템 가이드입니다.
  새로운 웹페이지나 UI 컴포넌트를 설계할 때 크림색 배경, 흰색 둥근 카드, 소프트 플로팅 그림자, 부드러운 하늘색 포인트 색상 및 보안/접근성 원칙을 적용해야 할 때 사용합니다.
---

# Cute Pastel & Soft Sky Design Skill

이 스킬은 **모래고래(Sand Whale)** 웹사이트에서 확립된 **밝고 귀여운 파스텔 크림 & 소프트 하늘색 글래스모피즘(Bright & Soft Pastel Cream UI)** 디자인 시스템을 다른 페이지나 컴포넌트에 일관되게 적용할 수 있도록 안내하는 디자인 표준 가이드입니다.

---

## 🎨 1. 디자인 철학 및 핵심 감성

1. **따뜻하고 부드러운 인상 (Warm & Welcoming)**
   - 차갑거나 삭막한 무채색 대신 따스한 크림 아이보리와 파스텔 톤을 사용하여 편안하고 친근한 감성을 전달합니다.
2. **소프트 플로팅 & 라운딩 (Soft Floating & Rounded)**
   - 넉넉한 곡률(`border-radius: 20px ~ 24px`)과 옅고 부드러운 확산 그림자를 통해 카드가 구름처럼 살짝 떠 있는 가벼운 입체감을 부여합니다.
3. **선명한 가독성 (High Readability)**
   - 밝은 파스텔 배경에서도 눈이 피로하지 않도록 텍스트는 짙은 차콜/슬레이트 계열(`Dark Slate`)로 명도 대비(WCAG AA 기준)를 확실하게 유지합니다.
4. **해킹 방어 및 웹 접근성 (Security & Accessibility First)**
   - 화려한 UI 뒤에 엄격한 XSS 방어, 안전한 링크 처리, 키보드 접근성(ESC 닫기, 포커스 링)을 기본 탑재합니다.

---

## 🌈 2. 디자인 토큰 및 색상 시스템 (Design Tokens)

```css
:root {
  /* [배경] 부드러운 크림 & 연한 파스텔 하늘빛 그라데이션 */
  --bg-gradient: linear-gradient(155deg, #fdfbf7 0%, #f7f9fd 45%, #eef6fc 100%);
  --pastel-glow-sky: rgba(186, 230, 253, 0.45);
  --pastel-glow-peach: rgba(254, 215, 170, 0.25);

  /* [카드] 흰색 베이스 & 부드러운 경계선 */
  --card-bg: #ffffff;
  --card-border: rgba(226, 232, 240, 0.9);
  --card-hover-bg: #ffffff;
  --card-hover-border: rgba(125, 211, 252, 0.75);

  /* [텍스트] 밝은 배경 전용 고대비 가독성 색상 */
  --text-primary: #1e293b;   /* 주요 타이틀 및 헤드라인 */
  --text-secondary: #475569; /* 본문 및 설명 문구 */
  --text-muted: #64748b;     /* 보조 정보, 날짜, 화살표 */

  /* [포인트] 연하고 부드러운 파스텔 하늘색 */
  --accent-sky: #38bdf8;        /* 활성 하이라이트 */
  --accent-sky-soft: #7dd3fc;   /* 버튼 그라데이션 시작색 */
  --accent-sky-deep: #0284c7;   /* 호버 강조 및 가독성 텍스트 */

  /* [그림자] 옅고 부드러운 입체감 */
  --shadow-card: 0 6px 20px rgba(148, 163, 184, 0.12), 0 2px 6px rgba(148, 163, 184, 0.06);
  --shadow-card-hover: 0 14px 28px rgba(125, 211, 252, 0.22), 0 4px 10px rgba(148, 163, 184, 0.1);
  --shadow-modal: 0 20px 45px rgba(15, 23, 42, 0.12), 0 0 25px rgba(125, 211, 252, 0.2);

  /* [곡률] 둥글고 귀여운 라운딩 */
  --radius-card: 22px;
  --radius-modal: 24px;
  --radius-badge: 9999px;
  --radius-button: 14px;
}
```

---

## 🧩 3. 컴포넌트별 구현 표준

### 1) 배경 앰비언트 글로우 (Ambient Glow)
배경에 은은한 파스텔 빛 번짐 효과를 주어 몽환적이고 따뜻한 공간감을 형성합니다.
```css
body::before {
  content: "";
  position: fixed;
  top: -15%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--pastel-glow-sky) 0%, rgba(224, 242, 254, 0.35) 45%, transparent 70%);
  filter: blur(70px);
  z-index: 0;
  pointer-events: none;
  animation: pulseGlow 12s ease-in-out infinite alternate;
}
```

### 2) 화이트 둥근 카드 (Floating Rounded Card)
- **HTML 구조**:
  ```html
  <a href="https://..." class="link-card" target="_blank" rel="noopener noreferrer">
    <div class="link-thumb-wrapper">
      <img src="..." alt="..." class="link-thumb">
    </div>
    <div class="link-content">
      <div class="link-title">카드 제목</div>
      <div class="link-description">상세 설명 문구</div>
    </div>
    <div class="link-arrow" aria-hidden="true">
      <svg ...><!-- chevron icon --></svg>
    </div>
  </a>
  ```
- **인터랙션**:
  - 마우스 호버 시 `transform: translateY(-4px) scale(1.01)`로 가볍게 떠오름.
  - 그림자에 연한 파스텔 하늘빛(`rgba(125, 211, 252, 0.22)`)이 자연스럽게 감돎.
  - 카드 표면을 스쳐 지나가는 쉬머(Sheen) 효과 제공.

### 3) 팝업 모달창 (Cute Pastel Modal)
- **오버레이**: 뒤쪽 콘텐츠가 살짝 어두워지며 은은한 블러(`backdrop-filter: blur(6px)`) 적용.
- **카드 본체**: 순백색 바탕 + `border-radius: 24px` + 연한 파스텔 하늘빛 보더.
- **배지 태그**:
  ```css
  .modal-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    background: rgba(224, 242, 254, 0.85);
    border: 1px solid rgba(125, 211, 252, 0.6);
    border-radius: 9999px;
    font-size: 0.84rem;
    color: var(--accent-sky-deep);
    font-weight: 600;
  }
  ```
- **닫기 버튼**:
  ```css
  .modal-close-btn {
    background: linear-gradient(135deg, #7dd3fc, #38bdf8);
    border-radius: 14px;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35);
  }
  ```

---

## 🛡️ 4. 필수 보안 및 접근성 체크리스트

새로운 화면이나 디자인을 확장할 때 다음 규칙을 항상 준수합니다:

1. **외부 링크 보안 (Reverse Tabnabbing 방지)**
   - `target="_blank"` 속성을 사용할 때는 반드시 `rel="noopener noreferrer"`를 함께 명시합니다.
2. **안전한 URL 프로토콜 화이트리스트 검증**
   - 사용자 입력 링크는 반드시 `https:`, `http:`, `mailto:` 프로토콜만 허용하고 `javascript:`, `data:` 스킴을 원천 차단합니다.
3. **CSP(Content Security Policy) 준수**
   - HTML 태그 내 `onclick="..."` 인라인 자바스크립트를 금지하고, 외부 JS 파일에서 `addEventListener`를 통해 바인딩합니다.
4. **키보드 접근성 (Accessibility)**
   - 팝업 및 모달은 `Escape` 키 입력 시 닫히도록 이벤트 핸들러를 바인딩하고, `role="dialog"`와 `aria-modal="true"` 속성을 부여합니다.
   - 포커스 가능한 모든 요소에 `outline: 2px solid var(--accent-sky)` 포커스 링을 제공합니다.
