<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/core</h1>      
    <p align="center">
    프론트엔드 개발에 유용한 순수 함수 및 클래스 모음
    <br/>
    각 모듈별로 간결하고 재사용 가능한 유틸리티 함수를 제공합니다
    <br/>
    다른 파생 패키지의 기본 디펜던시 입니다.
    </p>
    <p align="center">
        <a href="https://www.npmjs.com/package/@fewings/core">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/core/README.md">English</a>
    </p>
</>

## 소개

`@fewings/core`는 프론트엔드 개발에서 자주 사용되는 다양한 유틸리티 함수를 제공하는 라이브러리입니다. 각 함수는 최소한의 기능에 집중하여 가볍고 효율적으로 설계되었습니다.

이 라이브러리는 다음과 같은 모듈로 구성되어 있습니다:

- `classes`: 객체 지향 프로그래밍을 위한 클래스 (예: Emitter)
- `color`: 색상 관련 유틸리티
- `converter`: 데이터 변환 유틸리티
- `dom`: DOM 조작 유틸리티
- `fp`: 함수형 프로그래밍 유틸리티 (예: debounce)
- `hash`: 해싱 알고리즘 (예: djb2)
- `math`: 수학 유틸리티 (예: rand, map, clamp, snap)
- `path`: 경로 관련 유틸리티
- `qs`: URL 쿼리 문자열 처리 유틸리티

> 🔍 각 모듈의 함수는 간단하고 명확한 목적을 가지고 있어 소스 코드를 직접 참조하는 것이 가장 좋은 사용법 파악 방법입니다. 대부분의 함수는 자체 설명적인 네이밍과 간결한 구현, 테스트 코드를 가지고 있습니다.

## 설치

```bash
# npm
npm install @fewings/core

# yarn
yarn add @fewings/core

# pnpm
pnpm add @fewings/core
```

## 사용법

각 모듈은 독립적으로 임포트하여 사용할 수 있어, 필요한 기능만 번들에 포함됩니다.

```javascript
// math 모듈에서 특정 함수 임포트
import { clamp } from "@fewings/core/math";

// 값을 특정 범위로 제한
const limitedValue = clamp(150, 0, 100); // 100 반환

// fp 모듈에서 특정 함수 임포트
import { debounce } from "@fewings/core/fp";

// 디바운스된 함수 생성
const debouncedFunction = debounce(() => {
  console.log("창 크기 변경 완료");
}, 300);

// 이벤트 리스너에 적용
window.addEventListener("resize", debouncedFunction);

// hash 모듈 사용
import { djb2 } from "@fewings/core/hash";

const hash = djb2("hello world"); // 문자열에서 해시 생성
```

## Contributing

기여는 언제나 환영합니다! 제안, 버그 신고 또는 기능 요청이 있으시면 [GitHub 저장소](https://github.com/livemehere/fewings)에 이슈를 열거나 풀 리퀘스트를 제출해주세요.
