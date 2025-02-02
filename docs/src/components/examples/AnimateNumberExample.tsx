"use client";

import { useEffect, useState } from "react";
import { rand } from "@fewings/core/math";
import { AnimateNumber } from "@fewings/fancy-react";
import { withCommas } from "@fewings/core/converter";
import { HStack, Space, VStack } from "@fewings/react/components";
import Input from "@/components/Input";

const nums = [0, 12030, 12445823, 938293, 2353, 2999993435, 24];

const getRandNum = () => nums[rand(0, nums.length - 1, true)];

const AnimateNumberExample = () => {
  const [value, setValue] = useState(nums[0]);
  const [countDur, setCountDur] = useState(0.8);
  const [sizeDur, setSizeDur] = useState(0.3);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue(getRandNum());
    }, 1500);
    return () => {
      window.clearInterval(id);
    };
  }, []);

  return (
    <div>
      <Space y={40} />
      <HStack justify={"center"} gap={20}>
        <VStack align={"center"} gap={8}>
          <Input
            type="number"
            step={0.01}
            value={countDur}
            onChange={(e) => setCountDur(Number(e.target.value))}
          />
          <div>Rolling Duration</div>
        </VStack>
        <VStack align={"center"} gap={8}>
          <Input
            type="number"
            step={0.01}
            value={sizeDur}
            onChange={(e) => setSizeDur(Number(e.target.value))}
          />
          <div>Sizing Duration</div>
        </VStack>
      </HStack>
      <Space y={50} />
      <HStack justify={"center"}>
        <AnimateNumber
          value={value}
          countDur={countDur}
          sizeDur={sizeDur}
          format={(v) => withCommas(v)}
          style={{
            fontSize: 38,
            fontWeight: "bold",
            lineHeight: "100%",
          }}
        />
      </HStack>
    </div>
  );
};

export default AnimateNumberExample;
