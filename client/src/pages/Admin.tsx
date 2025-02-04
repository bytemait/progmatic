import React, { useState, useEffect } from "react";
import axios from "axios";

interface Question {
  _id: string;
  questionId: string;
  questionName: string;
}

interface Contest {
  _id: string;
  contestId: string;
  contestName: string; // New field for contest name
  contestRules: string; // Field for contest rules
  questions: string[]; // Only storing question IDs
  participants: string[];
  timeLimit: number;
  active: boolean;
}

const Admin: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(0);

  useEffect(() => {
    fetchContests();
    fetchQuestions();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/contests/`
      );
      console.log(response.data);
      setContests(response.data);
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };

  
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/question/`);
      console.log("Fetched Questions:", response.data); 
      
      if (response.data && Array.isArray(response.data.questions)) {
        setQuestions(response.data.questions); // Extract the questions array properly
      } else {
        console.error("Invalid data format received for questions:", response.data);
        setQuestions([]); 
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]); 
    }
  };
  

  const handleContestCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContest) {
      try {
        if (selectedContest._id) {
          // Update Contest
          await axios.put(
            `${import.meta.env.VITE_HOST}/api/contests/${selectedContest._id}`,
            selectedContest
          );
        } else {
          // Create Contest
          await axios.post(
            `${import.meta.env.VITE_HOST}/api/contests/createContest`,
            selectedContest
          );
        }
        fetchContests();
        setSelectedContest(null);
      } catch (error) {
        console.error("Error saving contest:", error);
      }
    }
  };

  const handleQuestionChange = (index: number, questionId: string) => {
    if (selectedContest) {
      const updatedQuestions = [...selectedContest.questions];
      updatedQuestions[index] = questionId; // Set the selected question ID 
      setSelectedContest({ ...selectedContest, questions: updatedQuestions });
    }
  };

  const handleQuestionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Allow backspace to clear input
    if (value === "") {
      setQuestionCount(0);
      return;
    }
  
    const count = Math.max(1, parseInt(value, 10) || 1);
    setQuestionCount(count);
  
    if (!selectedContest) return; // Avoid null value error
  
    // Ensure the selectedContest.questions array has enough items for the count
    const updatedQuestions = [...selectedContest.questions];
  
    // Adjust the array size based on the count
    if (updatedQuestions.length < count) {
      while (updatedQuestions.length < count) {
        updatedQuestions.push("");
      }
    } else {
      updatedQuestions.length = count;
    }
  
    // Update the selected contest with the modified question array
    setSelectedContest({ ...selectedContest, questions: updatedQuestions });
  };
  
  const handleContestDelete = async (id: string) => {
    try {
      await axios.get(`${import.meta.env.VITE_HOST}/api/contests/delete/${id}`);
      fetchContests();
    } catch (error) {
      console.error("Error deleting contest:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin's Den</h1>

      {/* Display Contests */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Contests</h2>
        <ul className="space-y-2">
          {contests.map((contest) => (
            <li key={contest._id} className="flex items-center space-x-2">
              <span>{contest.contestId}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => setSelectedContest(contest)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleContestDelete(contest._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-green-500 text-white px-2 py-1 rounded mt-2"
          onClick={() =>
            setSelectedContest({
              _id: "",
              contestId: "",
              contestName: "",
              contestRules: "",
              questions: [],
              participants: [],
              timeLimit: 0,
              active: false,
            })
          }
        >
          Add Contest
        </button>
      </div>

      {/* Contest Form */}
      {selectedContest && (
        <form onSubmit={handleContestCreateOrUpdate}>
          <h2 className="text-xl font-semibold mb-4">
            {selectedContest._id ? "Edit Contest" : "Add Contest"}
          </h2>

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Contest ID"
            value={selectedContest.contestId}
            onChange={(e) =>
              setSelectedContest({
                ...selectedContest,
                contestId: e.target.value,
              })
            }
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Contest Name"
            value={selectedContest.contestName}
            onChange={(e) =>
              setSelectedContest({
                ...selectedContest,
                contestName: e.target.value,
              })
            }
            required
          />

          <input
            className="border p-2 mb-2 text-black w-full"
            type="text"
            placeholder="Contest Rules"
            value={selectedContest.contestRules}
            onChange={(e) =>
              setSelectedContest({
                ...selectedContest,
                contestRules: e.target.value,
              })
            }
            required
          />

          <input
            className="border text-black p-2 mb-2 w-full"
            type="number"
            placeholder="Time Limit"
            value={selectedContest.timeLimit}
            onChange={(e) =>
              setSelectedContest({
                ...selectedContest,
                timeLimit: parseInt(e.target.value),
              })
            }
          />

          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectedContest.active}
              onChange={(e) =>
                setSelectedContest({
                  ...selectedContest,
                  active: e.target.checked,
                })
              }
            />
            <span className="ml-2">Active</span>
          </label>

          <label className="text-white">Number of Questions</label>
          <input
            className="border text-black p-2 mb-2 w-full"
            type="number"
            placeholder="Number of Questions"
            value={questionCount}
            min={1} // Set minimum value to ensure at least one question
            max={10} // Set a maximum value if needed
            step={1} // Step to increment/decrement by one
            onChange={handleQuestionCountChange}
          />

          {Array.from({ length: questionCount }).map((_, index) => (
            <select
              key={index}
              className="border text-black p-2 mb-2 w-full"
              value={selectedContest.questions[index] || ""}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            >
              {Array.isArray(questions) && questions.length > 0 ? (
                questions.map((question) => (
                  <option key={question._id} value={question._id}>
                    {question.questionName}
                  </option>
                ))
              ) : (
                <option disabled>No questions available</option>
              )}
            </select>
          ))}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            {selectedContest._id ? "Update Contest" : "Create Contest"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
