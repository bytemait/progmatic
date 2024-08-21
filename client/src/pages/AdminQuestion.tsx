import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TestCase {
  input: string;
  output: string;
}

interface Example {
  input: string;
  output: string;
}

interface Question {
  _id?: string;
  questionId: string;
  questionName: string;
  title: string;
  description: string;
  platformLink: string;
  solved: boolean;
  tags: string[];
  testCases: TestCase[];
  answer: string;
  example: Example;
  constraints: string;
}

const QuestionAdmin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/question');
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuestionCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestion) {
      try {
        if (selectedQuestion._id) {
          // Update Question
          await axios.put(`http://localhost:5000/api/question/update/${selectedQuestion._id}`, selectedQuestion);
        } else {
          // Create Question
          await axios.post('http://localhost:5000/api/question/add', selectedQuestion);
        }
        fetchQuestions();
        setSelectedQuestion(null);
      } catch (error) {
        console.error('Error saving question:', error);
      }
    }
  };

  const handleQuestionDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/question/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleTestCaseChange = (index: number, field: keyof TestCase, value: string) => {
    if (selectedQuestion) {
      const updatedTestCases = [...selectedQuestion.testCases];
      updatedTestCases[index][field] = value;
      setSelectedQuestion({ ...selectedQuestion, testCases: updatedTestCases });
    }
  };

  const handleAddTestCase = () => {
    if (selectedQuestion) {
      const updatedTestCases = [...selectedQuestion.testCases, { input: '', output: '' }];
      setSelectedQuestion({ ...selectedQuestion, testCases: updatedTestCases });
    }
  };

  const handleRemoveTestCase = (index: number) => {
    if (selectedQuestion) {
      const updatedTestCases = selectedQuestion.testCases.filter((_, i) => i !== index);
      setSelectedQuestion({ ...selectedQuestion, testCases: updatedTestCases });
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin's Question Management</h1>

      {/* Display Questions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Questions</h2>
        <ul className="space-y-2">
          {questions.map((question) => (
            <li key={question._id} className="flex items-center space-x-2">
              <span>{question.questionName}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => setSelectedQuestion(question)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleQuestionDelete(question._id!)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-green-500 text-white px-2 py-1 rounded mt-2"
          onClick={() =>
            setSelectedQuestion({
              questionId: '',
              questionName: '',
              title: '',
              description: '',
              platformLink: '',
              solved: false,
              tags: [],
              testCases: [],
              answer: '',
              example: { input: '', output: '' },
              constraints: ''
            })
          }
        >
          Add Question
        </button>
      </div>

      {/* Question Form */}
      {selectedQuestion && (
        <form onSubmit={handleQuestionCreateOrUpdate}>
          <h2 className="text-xl font-semibold mb-4">{selectedQuestion._id ? 'Edit Question' : 'Add Question'}</h2>

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Question ID"
            value={selectedQuestion.questionId}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questionId: e.target.value })}
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Question Name"
            value={selectedQuestion.questionName}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, questionName: e.target.value })}
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Title"
            value={selectedQuestion.title}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, title: e.target.value })}
            required
          />

          <textarea
            className="border p-2 mb-2 text-black w-full"
            placeholder="Description"
            value={selectedQuestion.description}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, description: e.target.value })}
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Platform Link"
            value={selectedQuestion.platformLink}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, platformLink: e.target.value })}
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Constraints"
            value={selectedQuestion.constraints}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, constraints: e.target.value })}
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Answer"
            value={selectedQuestion.answer}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })}
            required
          />

          <h3 className="font-semibold mb-2">Example</h3>
          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Example Input"
            value={selectedQuestion.example.input}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, example: { ...selectedQuestion.example, input: e.target.value } })}
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Example Output"
            value={selectedQuestion.example.output}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, example: { ...selectedQuestion.example, output: e.target.value } })}
            required
          />

          <h3 className="font-semibold mb-2">Test Cases</h3>
          {selectedQuestion.testCases.map((testCase, index) => (
            <div key={index} className="mb-4">
              <input
                className="border p-2 mb-2 text-black w-full"
                type="text"
                placeholder="Test Case Input"
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                required
              />
              <input
                className="border p-2 mb-2 text-black w-full"
                type="text"
                placeholder="Test Case Output"
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                required
              />
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                type="button"
                onClick={() => handleRemoveTestCase(index)}
              >
                Remove Test Case
              </button>
            </div>
          ))}

          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" type="button" onClick={handleAddTestCase}>
            Add Test Case
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            {selectedQuestion._id ? 'Update Question' : 'Create Question'}
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionAdmin;
