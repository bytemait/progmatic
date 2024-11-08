import { useState, useRef, useEffect, useMemo } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import axios from 'axios';
import { useSharedState } from './SharedStateContext';

interface LanguageMapping {
  [key: string]: number;
}

const languageMapping: LanguageMapping = {
  "java": 62,
  "cpp": 54,
  "python": 71,
  "javascript": 63
};

const handleResult = (resultData: any) => {
  if (resultData.status.id != 3) {
    return `There is an error in code. \n${atob(resultData.compile_output)}`;
  }
  return resultData.stdout ? atob(resultData.stdout) : "There is no output.";
}
const CodeLeft: React.FC = () => {
  const [language, setLanguage] = useState("java");
  const editorRef = useRef<any>(null);
  // const apikey = import.meta.env.VITE_JUDGE0_API_KEY;
  const backendUrl = import.meta.env.VITE_HOST;
  const { setProgramOutput, programInput } = useSharedState();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    loader.init()
    // .then(monaco => {
    // console.log('Monaco instance:', monaco);
    // });
  }, [])

  const runCode = async () => {
    if (editorRef.current) {
      const sourceCode = editorRef.current.getValue();
      const languageId = languageMapping[language];
      setRunStatus("Submitting Code...");

      try {
        const { data } = await axios.post(`${backendUrl}/api/judge/run-code`, {
          sourceCode,
          languageId,
          programInput: programInput.current,
        });

        setRunStatus(handleResult(data));
      } catch (error) {
        console.error('Failed to execute code:', error);
        setRunStatus("Failed to execute code.");
      }
    }
  };

  const setSubmissionStatus = async (val: string) => {
    setProgramOutput("Submission Status: \n" + val);
  };
  const setRunStatus = async (val: string) => {
    setProgramOutput("Output:\n" + val);
  }
  // In future we can store the code in the format questionId_language, for now it is just stored with language as key.
  const storeCode = () => {
    if (editorRef.current) {
      localStorage.setItem(language, editorRef.current.getValue());
    }
  }

 const submitCode = async () => {
    if (editorRef.current) {
      const sourceCode = editorRef.current.getValue();
      const languageId = languageMapping[language];
      const programInput = '4\n1\n2\n3\n4\n';  // Sample input
      const expectedOutput = '1\n2\n6\n24';   // Expected output

      setSubmissionStatus("Submitting Code...");

      try {
        const { data } = await axios.post(`${backendUrl}/api/judge/submit-code`, {
          sourceCode,
          languageId,
          programInput,
          expectedOutput
        });

        if (data.message === "Accepted the test case") {
          setSubmissionStatus("Accepted the test case");
        } else {
          setSubmissionStatus("Failed the test case");
        }
      } catch (error) {
        console.error('Failed to execute code:', error);
        setSubmissionStatus("Failed to execute code.");
      }
    }
  };

  const editorComponent = useMemo(() => (
    <Editor
      height="80vh"
      language={language}
      value={localStorage.getItem(language) || ""}
      theme='vs-dark'
      onMount={handleEditorDidMount}
      onChange={storeCode}
    />
  ), [language, handleEditorDidMount]);


  return (
    <div>
      <div className='flex justify-between'>
        <select
          className="bg-black text-white rounded hover:bg-zinc-900 py-2 px-4 m-1 cursor-pointer"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
        <div>
          <button
            className="bg-black hover:bg-zinc-900 m-1 text-white font-bold py-2 px-4 rounded"
            onClick={runCode}
          >
            Run
          </button>
          <button
            className="bg-black hover:bg-zinc-900 m-1 text-white font-bold py-2 px-4 rounded"
            onClick={submitCode}
          >
            Submit
          </button>

        </div>
      </div>
      {editorComponent}
    </div>
  );
}

export default CodeLeft;
