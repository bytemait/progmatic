// SharedStateContext.tsx
import React, { createContext, useContext, useRef, useState } from "react";

interface SharedStateContextProps {
  programInput: React.MutableRefObject<string>;
  setProgramInput: (input: string) => void;
  programOutput: string;
  setProgramOutput: (output: string) => void;
  selectedQuestionId: string;
  setSelectedQuestionId: (id: string) => void;
  expectedOutput: React.MutableRefObject<string>;
  setExpectedOutput: (output: string) => void;
}

const SharedStateContext = createContext<SharedStateContextProps | undefined>(undefined);

export const SharedStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const programInput = useRef("");
  const expectedOutput = useRef("");
  const [programOutput, setProgramOutput] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState("");

  const setProgramInput = (input: string) => {
    programInput.current = input;
  };

  const setExpectedOutput = (output: string) => {
    expectedOutput.current = output;
  };

  return (
    <SharedStateContext.Provider
      value={{
        programInput,
        setProgramInput,
        programOutput,
        setProgramOutput,
        selectedQuestionId,
        setSelectedQuestionId,
        expectedOutput,
        setExpectedOutput,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = (): SharedStateContextProps => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
};
