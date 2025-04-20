<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/react</h1>      
    <p align="center">
    유용한 React 컴포넌트 및 훅 모음
    <br/>
    효율적인 React 애플리케이션 개발을 위한 도구들을 제공합니다
    </p>
    <p align="center">
        <a href="https://livemehere.github.io/fewings/?path=/docs/react-components-accordion--docs">DEMO</a>
        &middot;
        <a href="https://www.npmjs.com/package/@fewings/react">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/react/README.md">English</a>
    </p>
</>

## 소개

`@fewings/react`는 React 애플리케이션 개발에 필요한 유용한 컴포넌트와 훅을 제공하는 라이브러리입니다. 복잡한 UI 패턴과 상태 관리를 단순화하는 도구들을 포함하고 있습니다.

대부분의 컴포넌트에 대한 자세한 설명은 Storybook에서 확인할 수 있으며, 이 문서에서는 주요 기능과 Storybook에서 다루지 않은 기능들에 대해 간략히 설명합니다.

## 설치

```bash
# npm
npm install @fewings/react

# yarn
yarn add @fewings/react

# pnpm
pnpm add @fewings/react
```

## 주요 기능

### 컴포넌트 (Components)

컴포넌트에 대한 자세한 사용법과 예제는 [Storybook](https://livemehere.github.io/fewings/?path=/docs/react-components-accordion--docs)에서 확인할 수 있습니다. 주요 컴포넌트는 다음과 같습니다:

- `Accordion`: 접을 수 있는 콘텐츠 섹션을 구현한 컴포넌트
- `Popover`: 트리거 요소에 연결된 팝업 콘텐츠를 표시하는 컴포넌트
- `Slider`: 사용자가 범위 내에서 값을 선택할 수 있는 슬라이더 컴포넌트
- `ToolTip`: 요소에 호버했을 때 추가 정보를 표시하는 컴포넌트
- `Layout`: HStack, VStack, Grid 등 레이아웃 관련 컴포넌트

### 훅 (Hooks)

이 패키지는 React 애플리케이션 개발에 유용한 다양한 커스텀 훅을 제공합니다:

#### useCallbackRef

함수 참조를 안정적으로 유지하면서 내부 로직을 업데이트할 수 있게 해주는 훅입니다. `useCallback` 훅과 비슷하지만, 컴포넌트가 리렌더링되어도 참조가 변경되지 않습니다.

```tsx
const callback = useCallbackRef((arg) => {
  // 컴포넌트가 리렌더링되어도 안정적인 참조를 유지하는 콜백
  console.log(someState, arg);
});
```

#### useControlledState

제어 컴포넌트와 비제어 컴포넌트 모두를 지원하는 상태 관리 훅입니다. (다른 컴포넌트에서 사용 예시를 참고)

```tsx
const [value, setValue] = useControlledState({
  value: controlledValue, // 외부에서 제어하는 값 (옵션)
  defaultValue: defaultValue, // 초기 기본값
  onChange: onValueChange, // 값이 변경될 때 호출될 콜백
});
```

#### useElementPositionObserver

DOM 요소의 위치 변화를 관찰하고 변경 사항을 감지하는 훅입니다.

```tsx
useElementPositionObserver(
  elementRef, // 관찰할 요소의 ref
  (rect) => {
    // 요소의 위치가 변경될 때 실행할 콜백
    console.log(rect.top, rect.left);
  },
  isActive // 관찰 활성화 여부
);
```

#### usePagination

페이지네이션 UI 구현에 필요한 계산을 처리하는 훅입니다.

```tsx
const { pageNumbers, currentGroupIdx, totalGroupLength, isLastGroup } =
  usePagination({
    currentPage: 5,
    totalPages: 20,
    maxVisiblePageButtons: 5,
  });
```

### Context Selector

> [use-context-selector](https://www.npmjs.com/package/use-context-selector) 라이브러의 간단한 대체 구현입니다. 해당 라이브러리는 조금 더 디테일한 기능이 포함되어있습니다. 패키지의 의존성을 줄이고 싶다면 이 구현체를 사용하세요.

성능 최적화된 컨텍스트 API를 제공합니다. React의 기본 Context API와 달리, 필요한 값만 선택적으로 업데이트할 수 있습니다.

```tsx
// 컨텍스트 생성
const MyContext = createContext({ count: 0, user: { name: "" } });

// 컴포넌트에서 필요한 값만 선택적으로 사용
const count = useContextSelector(MyContext, (state) => state.count);
```

### Overlay 시스템

모달, 다이얼로그 등의 오버레이 UI를 쉽게 관리할 수 있는 시스템을 제공합니다.

## 참고사항

이 문서에서는 주요 기능만 간략히 설명했습니다. 더 자세한 사용법과 예제는 소스 코드를 참고하거나 Storybook 문서를 확인해주세요.

## 기여하기

기여는 언제나 환영합니다! 제안, 버그 신고 또는 기능 요청이 있으시면 [GitHub 저장소](https://github.com/livemehere/fewings)에 이슈를 열거나 풀 리퀘스트를 제출해주세요.
