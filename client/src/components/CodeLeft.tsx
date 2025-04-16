import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useSharedState } from "./SharedStateContext";

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

        // ✅ Set editor content if it's already mounted
        if (editorRef.current && code) {
          editorRef.current.setValue(code);
        }
      } catch (err) {
        console.error("Error fetching boilerplate:", err);
      }
    };

    fetchBoilerplate();
  }, [language, backendUrl]); // 👈 only depend on language and backendUrl

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    if (boilerplate) {
      editor.setValue(boilerplate);
    }
  };

  const runCode = async () => {
    if (editorRef.current) {
      const sourceCode = editorRef.current.getValue();
      const languageId = languageMapping[language];

      setProgramOutput("Running Code...");

      try {
        const { data } = await axios.post(`${backendUrl}/api/judge/run-code`, {
          sourceCode,
          languageId,
          programInput: programInput.current,
        });

        setProgramOutput(data.stdout ? atob(data.stdout) : "No Output");
      } catch (error) {
        console.error("Execution Error:", error);
        setProgramOutput("Execution failed.");
      }
    }
  };

  const submitCode = async () => {
    if (editorRef.current) {
      const sourceCode = editorRef.current.getValue();
      const languageId = languageMapping[language];

      setProgramOutput("Submitting Code...");

      try {
        const { data } = await axios.post(`${backendUrl}/api/judge/submit-code`, {
          sourceCode,
          languageId,
          programInput: "4\n1\n2\n3\n4\n",
          expectedOutput: "1\n2\n6\n24",
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
          <button className="bg-black text-white px-4 py-2 rounded mx-1" onClick={runCode}>
            Run
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded mx-1" onClick={submitCode}>
            Submit
          </button>
        </div>
      </div>
      <Editor
        defaultValue= {boilerplate}
        // value={boilerplate}
        height="70vh"
        language={language}
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeLeft;
