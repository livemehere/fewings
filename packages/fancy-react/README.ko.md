<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/fancy-react</h1>      
    <p align="center">
    화려한 스타일과 효과를 갖춘 React 컴포넌트 모음
    <br/>
    애니메이션과 시각적 효과를 활용한 인터렉션 컴포넌트를 제공합니다
    </p>
    <p align="center">
        <a href="https://www.npmjs.com/package/@fewings/fancy-react">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/fancy-react/README.md">English</a>
    </p>
</>

## 소개

`@fewings/fancy-react`는 애니메이션과 인터랙션이 강화된 React 컴포넌트 라이브러리입니다. Motion 라이브러리를 기반으로 부드럽고 시각적으로 흥미로운 UI 요소를 제공합니다.

현재 제공 중인 컴포넌트:

- `AnimateNumber`: 숫자가 변경될 때 애니메이션을 적용하여 부드럽게 전환됩니다.

## 설치

```bash
# npm
npm install @fewings/fancy-react motion

# yarn
yarn add @fewings/fancy-react motion

# pnpm
pnpm add @fewings/fancy-react motion
```

> ⚠️ 이 패키지는 `motion` 라이브러리에 의존성이 있습니다.

## AnimateNumber 사용하기

AnimateNumber 컴포넌트는 숫자 값이 변경될 때 부드러운 애니메이션 효과를 적용합니다. 숫자가 증가하거나 감소할 때 사용자 경험을 향상시킵니다.

### 기본 사용법

```tsx
import { AnimateNumber } from "@fewings/fancy-react/AnimateNumber";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AnimateNumber value={count} />
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
    </div>
  );
}
```

### 애니메이션 속도 조정

```tsx
<AnimateNumber
  value={count}
  countDur={0.8} // 숫자 카운팅 애니메이션 지속 시간(초)
  sizeDur={0.5} // 너비 변경 애니메이션 지속 시간(초)
/>
```

### 숫자 형식 지정

원하는 형식으로 숫자를 표시할 수 있습니다:

```tsx
<AnimateNumber value={price} format={(value) => `₩${value.toLocaleString()}`} />
```

### 스타일 적용

일반 div 요소처럼 스타일을 지정할 수 있습니다:

```tsx
<AnimateNumber
  value={score}
  style={{
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2563eb",
  }}
/>
```

## AnimateNumber 속성

| 속성       | 타입                        | 기본값            | 설명                                 |
| ---------- | --------------------------- | ----------------- | ------------------------------------ |
| `value`    | `number`                    | 필수              | 표시할 숫자 값                       |
| `countDur` | `number`                    | `0.5`             | 숫자 카운팅 애니메이션 지속 시간(초) |
| `sizeDur`  | `number`                    | `0.3`             | 너비 변경 애니메이션 지속 시간(초)   |
| `format`   | `(value: number) => string` | `(v) => \`${v}\`` | 숫자 형식을 지정하는 함수            |

추가로 컴포넌트는 `div` 요소의 모든 표준 속성을 지원합니다.

## 원리

AnimateNumber 컴포넌트는 내부적으로 다음과 같은 방식으로 작동합니다:

1. 숫자가 변경되면 이전 값에서 새 값으로의 전환을 감지합니다.
2. 숫자의 각 자릿수를 개별적으로 애니메이션화합니다.
3. 숫자가 증가하거나 감소할 때 방향에 따라 적절한 애니메이션 효과를 적용합니다.
4. 너비 변경이 필요한 경우 부드러운 크기 조정 애니메이션을 적용합니다.

## Contributing

기여는 언제나 환영합니다! 제안, 버그 신고 또는 기능 요청이 있으시면 [GitHub 저장소](https://github.com/livemehere/fewings)에 이슈를 열거나 풀 리퀘스트를 제출해주세요.
