<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/svgr</h1>      
    <p align="center">
    SVG를 React 컴포넌트 코드로 변환하는 도구
    <br/>
    SVG 파일에 대한 TypeScript 타입과 상수를 자동으로 생성하여 React 애플리케이션에서 쉽게 사용할 수 있게 합니다
    </p>
    <p align="center">
        <a href="https://www.npmjs.com/package/@fewings/svgr">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/svgr/README.md">English</a>
    </p>
</p>

## Motivation

React 애플리케이션에서 SVG 아이콘을 다룰 때는 보통 아이콘 매핑과 타입을 수동으로 설정하고 관리해야 합니다.

@fewings/svgr는 이 과정을 다음과 같이 자동화합니다:

- SVG 파일 디렉토리 스캔
- SVG 파일에 대한 TypeScript 타입 생성
- 쉬운 임포트를 위한 SVG 컴포넌트 맵 생성
- 선택적으로 바로 사용 가능한 Icon 컴포넌트 생성

이를 통해 보일러플레이트 코드 관리보다는 SVG 사용에 집중할 수 있습니다.

## Installation

```bash
# npm
npm install --save-dev @fewings/svgr

# yarn
yarn add -D @fewings/svgr

# pnpm
pnpm add -D @fewings/svgr
```

## Getting Started

@fewings/svgr를 사용하는 방법은 두 가지가 있습니다:

1. CLI 도구: 빌드 스크립트와 일회성 생성에 이상적
2. Vite 플러그인: 개발 중에 자동 감시 및 재빌드 제공

### CLI Usage

CLI 도구를 사용하면 명령줄이나 NPM 스크립트에서 SVG 매핑을 생성할 수 있습니다.

```bash
# 기본 사용법
fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon

# 컴포넌트 생성 포함
fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon --componentName Icon

# 감시 모드 사용
fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon --watch
```

**npm 스크립트에 추가하기:**

```json
"scripts": {
  "build:svgr": "fewings-svgr --svgPath ./public/assets/svg --outDir ./src/Icon --componentName Icon"
}
```

### CLI Options

| 옵션            | 설명                                   | 필수 여부 | 기본값                            |
| --------------- | -------------------------------------- | --------- | --------------------------------- |
| `svgPath`       | SVG 파일이 있는 디렉토리 경로          | 예        | -                                 |
| `outDir`        | 생성된 파일의 출력 디렉토리            | 예        | -                                 |
| `constName`     | 생성된 SVG 맵 상수의 이름              | 아니오    | `IconMap`                         |
| `typeName`      | 생성된 TypeScript 타입의 이름          | 아니오    | `IconKeys`                        |
| `svgImportBase` | SVG 임포트 기본 경로(절대 경로 사용시) | 아니오    | 자동 생성된 상대 경로             |
| `componentName` | 생성된 컴포넌트의 이름                 | 아니오    | 생략하면 컴포넌트가 생성되지 않음 |
| `watch`         | SVG 디렉토리의 변경 사항 감시          | 아니오    | `false`                           |

### Vite Plugin Usage

Vite 플러그인은 개발 중에 SVG 파일의 변경 사항을 자동으로 감시합니다.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { fewingsSvgrVitePlugin } from '@fewings/svgr';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr(), // SVG를 React 컴포넌트로 임포트하기 위한 표준 SVGR 플러그인
    fewingsSvgrVitePlugin({
      svgPath: './public/assets/svg',
      outDir: './src/Icon',
      componentName: 'Icon',
      importBase: '@assets/svg', // 선택사항: SVG 임포트 기본 경로
    }),
  ],
});
```

### Plugin Options

| 옵션            | 설명                          | 필수 여부 | 기본값                            |
| --------------- | ----------------------------- | --------- | --------------------------------- |
| `svgPath`       | SVG 파일이 있는 디렉토리 경로 | 예        | -                                 |
| `outDir`        | 생성된 파일의 출력 디렉토리   | 예        | -                                 |
| `constName`     | 생성된 SVG 맵 상수의 이름     | 아니오    | `IconMap`                         |
| `typeName`      | 생성된 TypeScript 타입의 이름 | 아니오    | `IconKeys`                        |
| `svgImportBase` | SVG 임포트 기본 경로          | 아니오    | 자동 생성된 상대 경로             |
| `componentName` | 생성된 컴포넌트의 이름        | 아니오    | 생략하면 컴포넌트가 생성되지 않음 |

## Usage Example

@fewings/svgr가 SVG 파일을 처리한 후에는 다음과 같은 것들이 생성됩니다:

1. 모든 SVG 컴포넌트의 맵
2. 타입 안전성을 위한 TypeScript 타입
3. 선택적으로, 앱에서 바로 사용할 수 있는 Icon 컴포넌트

### 사용 예시:

```tsx
// 생성된 Icon 컴포넌트 사용
import { Icon } from './src/Icon/Icon';

function App() {
  return (
    <div>
      <Icon name="arrow-right" width={24} height={24} />
      <Icon name="home" color="#ff0000" />
    </div>
  );
}

// 생성된 맵 직접 사용
import { IconMap, IconKeys } from './src/Icon/IconMap';

function CustomIcon({
  name,
  ...props
}: { name: IconKeys } & React.SVGProps<SVGSVGElement>) {
  const SvgComponent = IconMap[name];
  return <SvgComponent {...props} />;
}
```

## Contributing

기여는 언제나 환영합니다! 제안, 버그 신고 또는 기능 요청이 있으시면 [GitHub 저장소](https://github.com/livemehere/fewings)에 이슈를 열거나 풀 리퀘스트를 제출해주세요.
