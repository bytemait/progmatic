import React from "react";
import CodeLeft from "../components/CodeLeft";
import CodeRight from "../components/CodeRight";
import { SharedStateProvider } from "../components/SharedStateContext";
import Split from "@uiw/react-split";

const Code: React.FC = () => {
  return (
    <SharedStateProvider>
      <div className="pt-20 p-4">
        <h1 className="text-yellow-300 text-xl font-bold">Two Sum</h1>
        <p className="text-white-600 whitespace-pre-line">
          <strong>Problem Statement:</strong> <br />

          Given an array of integers <code>nums</code> and an integer{" "}
          <code>target</code>, return the indices of the two numbers such that
          they add up to <code>target</code>. You may assume that each input
          would have exactly one solution, and you may not use the same
          element twice. You can return the answer in any order.
          <br />
          <strong>Example 1: </strong>
          <code> Input: nums = [2,7,11,15], target = 9 </code>
          <code>Output: [0,1]</code>
          Explanation: Because <code>nums[0] + nums[1] == 9</code>, we
          return <code>[0, 1]</code>.
          <br />
          <strong>Example 2: </strong>
          <code>Input: nums = [3,2,4], target = 6 </code>
          <code>Output: [1,2]</code>
        </p>
      </div>
      <Split
        style={{
          height: "80vh",
          width: "100%",
          border: "1px solid #d5d5d5",
          borderRadius: 3,
        }}
      >
        <div style={{ width: "50%" }}>
          <CodeLeft />
        </div>
        <div style={{ width: "50%" }}>
          <CodeRight />
        </div>
      </Split>
    </SharedStateProvider>
  );
};

export default Code;
