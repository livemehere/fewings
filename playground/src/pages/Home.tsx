import { HStack, VStack } from "@fewings/react/components";

const Home = () => {
  return (
    <div>
      <h1>Playground</h1>
      <VStack gap={4}>
        <HStack
          justify={"center"}
          gap={20}
          style={{
            padding: 20,
            background: "#eee",
            color: "black",
          }}
        >
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </HStack>
        <HStack>htllo</HStack>
        <HStack>htllo</HStack>
        <HStack>htllo</HStack>
        <HStack>htllo</HStack>
      </VStack>
    </div>
  );
};

export default Home;
