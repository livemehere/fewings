<p align="center">
    <a href="https://github.com/livemehere/fewings">
        <img src="https://github.com/livemehere/fewings/blob/master/img/logo.png?raw=true" alt="logo" width="200" />
    </a>
    <h1 align="center">@fewings/react-qs</h1>      
    <p align="center">
    URL 쿼리 파라미터를 React 상태처럼 사용할 수 있는 훅
    <br/>
    React Router와 함께 사용하여 URL 파라미터를 통한 상태 관리를 쉽게 구현할 수 있습니다
    </p>
    <p align="center">
        <a href="https://www.npmjs.com/package/@fewings/react-qs">npm</a>
        &middot;
        <a href="https://github.com/livemehere/fewings/blob/master/packages/react-qs/README.md">English</a>
    </p>
</p>

## Motivation

웹 애플리케이션에서 URL 쿼리 파라미터는 페이지 상태를 표현하는 중요한 방법입니다. 하지만 기존의 방식으로는 URL 쿼리를 React의 상태와 동기화하는 것이 번거롭고 보일러플레이트 코드가 많이 필요합니다.

@fewings/react-qs는 이러한 문제를 해결하기 위해 설계되었습니다:

- URL 쿼리 파라미터를 React의 상태처럼 사용할 수 있는 API 제공
- React의 `useState`와 유사한 인터페이스로 쉽게 사용 가능
- 페이지 새로고침 후에도 상태가 유지

## Installation

```bash
# npm
npm install @fewings/react-qs react-router

# yarn
yarn add @fewings/react-qs react-router

# pnpm
pnpm add @fewings/react-qs react-router
```

> ⚠️ 이 패키지는 `react-router`에 의존성이 있습니다.

## Getting Started

### 기본 사용법

`useQsState` 훅은 React의 `useState`와 유사하게 작동하지만, 상태가 URL 쿼리 파라미터에 저장됩니다:

```tsx
import { useQsState } from '@fewings/react-qs';

function SearchPage() {
  // URL 쿼리 파라미터를 상태로 사용
  const [search, setSearch] = useQsState({
    query: '',
    page: '1',
    category: 'all',
  });

  return (
    <div>
      <input
        type="text"
        value={search.query}
        onChange={(e) => setSearch({ ...search, query: e.target.value })}
        placeholder="검색어를 입력하세요"
      />

      <select
        value={search.category}
        onChange={(e) => setSearch({ ...search, category: e.target.value })}
      >
        <option value="all">전체</option>
        <option value="books">도서</option>
        <option value="electronics">전자기기</option>
      </select>

      <div>
        현재 페이지: {search.page}
        <button
          onClick={() =>
            setSearch({
              ...search,
              page: (parseInt(search.page) + 1).toString(),
            })
          }
        >
          다음 페이지
        </button>
      </div>

      <div>
        <h3>검색 결과</h3>
        <pre>{JSON.stringify(search, null, 2)}</pre>
      </div>
    </div>
  );
}
```

### 네비게이션 모드 설정

기본적으로 상태가 변경되면 새 히스토리 항목이 생성됩니다. `replace` 모드를 사용하면 현재 히스토리 항목을 대체할 수 있습니다:

```tsx
const [filter, setFilter] = useQsState(
  { sort: 'newest', view: 'grid' },
  { navigateMode: 'replace' }
);
```

### 함수형 업데이트

`useState`와 마찬가지로 함수형 업데이트를 지원합니다:

```tsx
const [pagination, setPagination] = useQsState({ page: '1', perPage: '10' });

// 함수형 업데이트로 이전 상태 기반 업데이트
setPagination((prev) => ({
  ...prev,
  page: (parseInt(prev.page) + 1).toString(),
}));
```

### 타입 안전성

TypeScript와 함께 사용하면 타입 안전성의 이점을 얻을 수 있습니다:

```tsx
interface SearchParams {
  query: string;
  page: string;
  category: string;
}

const [search, setSearch] = useQsState<SearchParams>({
  query: '',
  page: '1',
  category: 'all',
});
```

### 초기 상태 지정

컴포넌트가 처음 마운트될 때 URL에 쿼리 파라미터가 없으면 초기 상태가 사용됩니다: (⚠️ 이때 URL 쿼리를 변경하지는 않습니다)

```tsx
const [filter, setFilter] = useQsState({
  sort: 'newest', // URL에 ?sort= 파라미터가 없으면 "newest"를 기본값으로 사용
  view: 'grid', // URL에 ?view= 파라미터가 없으면 "grid"를 기본값으로 사용
});
```

## 사용 사례

`useQsState`는 다음과 같은 상황에서 특히 유용합니다:

- 검색 페이지: 검색어, 필터, 정렬 옵션을 URL에 유지
- 페이지네이션: 현재 페이지와 페이지 크기를 URL에 저장
- 필터링 UI: 여러 필터 옵션을 URL에 저장하여 북마크나 공유 가능
- 탭 UI: 현재 선택된 탭을 URL에 저장하여 새로고침 후에도 상태 유지

## Contributing

기여는 언제나 환영합니다! 제안, 버그 신고 또는 기능 요청이 있으시면 [GitHub 저장소](https://github.com/livemehere/fewings)에 이슈를 열거나 풀 리퀘스트를 제출해주세요.
