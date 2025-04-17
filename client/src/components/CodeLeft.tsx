import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSharedState } from "./SharedStateContext";
import Editor from "@monaco-editor/react";

const languageMapping: Record<string, number> = {
  java: 62,
  cpp: 54,
  python: 71,
  javascript: 63,
};

const CodeLeft: React.FC = () => {
  const [language, setLanguage] = useState("cpp");
  const [boilerplate, setBoilerplate] = useState<string>("");
  const editorRef = useRef<any>(null);
  const backendUrl = import.meta.env.VITE_HOST;

  const { setProgramOutput, programInput } = useSharedState();
  const hardcodedQuestionId = "67ffcb5e8936c481cfe1e03d"; // ✅ your fixed ID

  useEffect(() => {
    const fetchBoilerplate = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/question/${hardcodedQuestionId}`);
        const code = data?.question?.boilerplate?.[language];
        setBoilerplate(code || "");

        if (editorRef.current && code) {
          editorRef.current.setValue(code);
        }
      } catch (err) {
        console.error("Error fetching boilerplate:", err);
      }
    };

    fetchBoilerplate();
  }, [language, backendUrl]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    if (boilerplate) {
      editor.setValue(boilerplate);
    }
  };

  const submitCode = async () => {
    if (editorRef.current) {
      const sourceCode = editorRef.current.getValue();
      const languageId = languageMapping[language];

      // Fetch the driver code and test cases from the backend
      try {
        const { data: questionData } = await axios.get(`${backendUrl}/api/question/${hardcodedQuestionId}`);

        // Fetch the driver code based on language
        const driverCode = questionData?.question?.driverCode?.[language] || "";

        // Fetch the test cases from the backend (adjust key if needed)
        const testCases = questionData?.question?.testCases || [];

        // Combine driver code with the boilerplate code
        const combinedCode = `${sourceCode}\n${driverCode}`;

        // Prepare the expected output for validation (modify if you have different logic)
        const expectedOutput = testCases.map((testCase: any) => testCase.expected).join("\n");

        setProgramOutput("Submitting Code...");

        const { data } = await axios.post(`${backendUrl}/api/judge/submit-code`, {
          sourceCode: combinedCode,
          languageId,
          programInput: programInput,  // Custom input from the frontend
          expectedOutput: expectedOutput,  // Expected output from test cases
        });

        setProgramOutput(data.message === "Accepted the test case" ? "✅ Accepted" : "❌ Failed");
      } catch (error) {
        console.error("Submission Error:", error);
        setProgramOutput("Submission failed.");
      }
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between mb-2">
        <select
          className="bg-black text-white rounded py-2 px-4 cursor-pointer"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
        <div>
          <button className="bg-black text-white px-4 py-2 rounded mx-1" onClick={submitCode}>
            Submit
          </button>
        </div>
      </div>
      <Editor
        defaultValue={boilerplate}
        height="70vh"
        language={language}
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeLeft;
