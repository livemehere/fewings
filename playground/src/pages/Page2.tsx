import { useQsState } from "@fewings/react-qs";

const Page2 = () => {
  const [query, setQuery] = useQsState<{
    name: string;
    level: string;
  }>({
    name: "kong",
    level: "0",
  });
  return (
    <div>
      <h1>page2</h1>
      <input
        value={query.name}
        onChange={(e) =>
          setQuery((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      <input
        type="number"
        value={query.level}
        onChange={(e) =>
          setQuery((prev) => ({
            ...prev,
            level: e.target.value,
          }))
        }
      />

      <div>name : {query.name}</div>
      <div>level : {query.level}</div>
    </div>
  );
};

export default Page2;
