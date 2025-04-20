export type TInlineTag = (typeof InlineAPI.INLINE_TAGS)[number];
export class InlineAPI {
  static INLINE_TAGS = [
    "A", // 하이퍼링크
    "B", // 굵은 텍스트 (의미 없음, 단순 스타일)
    "STRONG", // 강조 (중요함)
    "I", // 이탤릭 (의미 없음)
    "EM", // 강조 (강조 억양)
    "U", // 밑줄
    "S", // 취소선 (빠뜨려 있었음, 에디터에서 자주 사용)
    "SPAN", // 스타일 처리용 범용 컨테이너
    "MARK", // 하이라이트
    "SUB", // 아래 첨자
    "SUP", // 위 첨자
    "IMG", // 이미지 삽입
    "BR", // 줄바꿈
    "CODE", // 코드 블럭
    "Q", // 짧은 인용문
    "SMALL", // 작은 글씨
    "ABBR", // 약어
  ] as const;

  static isInlineElement(element: HTMLElement) {
    return this.INLINE_TAGS.includes(
      element.tagName.toUpperCase() as TInlineTag
    );
  }

  static wrap(textNode: Node, tagName: TInlineTag) {
    const wrapEl = document.createElement(tagName);
    wrapEl.innerHTML = textNode.textContent ?? "";
    textNode.parentNode!.insertBefore(wrapEl, textNode);
    textNode.parentNode!.removeChild(textNode);
  }

  static bold() {
    return document.execCommand("bold");
  }

  static italic() {
    return document.execCommand("italic");
  }

  static underline() {
    return document.execCommand("underline");
  }

  static strikethrough() {
    return document.execCommand("strikethrough");
  }

  static removeFormat() {
    return document.execCommand("removeFormat");
  }

  static heading(tagName: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
    return document.execCommand("formatBlock", false, tagName);
  }

  static align(align: "justifyLeft" | "justifyCenter" | "justifyRight") {
    return document.execCommand(align, false);
  }

  static color(color: string) {
    return document.execCommand("foreColor", false, color);
  }

  static bgColor(color: string) {
    return document.execCommand("backColor", false, color);
  }

  static link(href: string) {
    return document.execCommand("createLink", false, href);
  }

  static indent() {
    return document.execCommand("indent", false);
  }

  static outdent() {
    return document.execCommand("outdent", false);
  }
}
