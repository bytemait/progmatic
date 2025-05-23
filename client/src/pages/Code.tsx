import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeLeft from "../components/CodeLeft";
import CodeRight from "../components/CodeRight";
import { SharedStateProvider, useSharedState } from "../components/SharedStateContext";
import Split from "@uiw/react-split";
import axios from "axios";

interface Example {
  input: string;
  output: string;
}

interface Question {
  _id: string;
  questionName: string;
  description: string;
  example: Example;
  constraints: string;
}

const CodeContent: React.FC<{ questionId: string }> = ({ questionId }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const { setSelectedQuestionId, setProgramInput, setExpectedOutput } = useSharedState();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_HOST}/api/question/${questionId}`
        );
        const q = res.data.question;
        setQuestion(q);
        setSelectedQuestionId(q._id);
        setProgramInput(q.example?.input || "");
        setExpectedOutput(q.example?.output || "");
      } catch (error: any) {
        console.error("Error fetching question:", error.message);
        if (error.response) {
          console.error("Server responded with:", error.response.status);
          console.error("Error data:", error.response.data);
        }
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (!question) {
    return <div className="text-white p-10">Loading question...</div>;
  }

  return (
    <>
      <div className="pt-20 px-4">
        <h1 className="text-yellow-300 text-2xl font-bold mb-4">
          {question.questionName}
        </h1>

        <div className="text-white whitespace-pre-line leading-relaxed mb-4">
          <strong className="block text-lg mb-1">Problem Statement:</strong>
          {question.description}
        </div>

        <div className="text-white mb-4">
          <strong className="block text-lg">Example:</strong>
          <p>
            <span className="font-semibold">Input:</span>{" "}
            {question.example?.input ?? "N/A"}
          </p>
          <p>
            <span className="font-semibold">Output:</span>{" "}
            {question.example?.output ?? "N/A"}
          </p>
        </div>

        <div className="text-white mb-4">
          <strong className="block text-lg">Constraints:</strong>
          <pre className="whitespace-pre-line">{question.constraints}</pre>
        </div>
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
    </>
  );
};

const Code: React.FC = () => {
  const { contestId, id } = useParams<{ contestId: string; id: string }>();

  return (
    <SharedStateProvider>
      <CodeContent questionId={id || "67ffcb5e8936c481cfe1e03d"} />
    </SharedStateProvider>
  );
};

export default Code;
