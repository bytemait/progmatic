import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  _id: string;
  questionId: string;
  questionName: string;
  title: string;
  description: string;
  platformLink: string;
  solved: boolean;
  tags: string[];
  testCases: string[];
  answer: string;
  example: string;
  constraints: string;
}

interface Contest {
  _id: string;
  contestId: string;
  questions: Question[];
  participants: string[];
  gitHubUsername: string[];
  timeLimit: number;
}

const Admin: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    console.log('chal rha');
    fetchContests();
    fetchQuestions();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await axios.get('/api/contests');
      if (Array.isArray(response.data)) {
        console.log("ok report");
        setContests(response.data);
      } else {
        console.error('Unexpected response data:', response.data);
        setContests([]);
      }
    } catch (error) {
      console.error('Error fetching contests:', error);
      setContests([]);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/api/question');
      if (Array.isArray(response.data)) {
        setQuestions(response.data);
        console.log(response.data);
      } else {
        console.error('Unexpected response data:', response.data);
        setQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const handleContestCreate = async (contest: Omit<Contest, '_id'>) => {
    try {
      await axios.post('/api/contests/createContest', contest);
      fetchContests();
    } catch (error) {
      console.error('Error creating contest:', error);
    }
  };

  // const handleContestUpdate = async (contest: Contest) => {
  //   try {
  //     await axios.put(`/api/contests/${contest._id}`, contest);
  //     fetchContests();
  //   } catch (error) {
  //     console.error('Error updating contest:', error);
  //   }
  // };

  const handleContestDelete = async (id: string) => {
    try {
      await axios.delete(`/api/contests/${id}`);
      fetchContests();
    } catch (error) {
      console.error('Error deleting contest:', error);
    }
  };

  const handleQuestionCreate = async (question: Omit<Question, '_id'>) => {
    try {
      await axios.post('/api/question/add', question);
      fetchQuestions();
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleQuestionUpdate = async (question: Question) => {
    try {
      await axios.put(`/api/question/update/${question._id}`, question);
      fetchQuestions();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleQuestionDelete = async (id: string) => {
    try {
      await axios.delete(`/api/question/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin&apos;s&nbsp; Den</h1>
      {contests.length === 0 && questions.length === 0 ? (
        <button
        className="bg-green-500 text-white px-2 py-1 rounded mt-2"
        onClick={() =>
          setSelectedContest({
            _id: '',
            contestId: '',
            questions: [],
            participants: [],
            gitHubUsername: [],
            timeLimit: 0,
          })
        }
      >
        Add Contest
      </button>
      ) : (
        <>
          <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Contests</h2>
              {contests.length === 0 ? (
                <p>No contests available.</p>
              ) : (
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
              )}
              <button
                className="bg-green-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => setSelectedContest({ _id: '', contestId: '', questions: [], participants: [], gitHubUsername: [], timeLimit: 0 })}
              >
                Add Contest
              </button>
          </div>

          <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Questions</h2>
          {questions.length === 0 ? (
            <button
              className="bg-green-500 text-white px-2 py-1 rounded mt-2"
              onClick={() =>
                setSelectedQuestion({
                  _id: '',
                  questionId: '',
                  questionName: '',
                  title: '',
                  description: '',
                  platformLink: '',
                  solved: false,
                  tags: [],
                  testCases: [],
                  answer: '',
                  example: '',
                  constraints: '',
                })
              }
            >
              Add Question
            </button>
          ) : (
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
                    onClick={() => handleQuestionDelete(question._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      {selectedContest && (
        <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {selectedContest._id ? 'Edit Contest' : 'Add Contest'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (selectedContest._id) {
            // handleContestUpdate(selectedContest);
          } else {
            handleContestCreate(selectedContest);
          }
          setSelectedContest(null);
        }}>
          <input
            className="border p-2 mb-2 w-full"
            type="text"
            placeholder="Contest ID"
            value={selectedContest.contestId}
            onChange={(e) => setSelectedContest({ ...selectedContest, contestId: e.target.value })}
          />
          <input
            className="border p-2 mb-2 w-full"
            type="number"
            placeholder="Time Limit"
            value={selectedContest.timeLimit}
            onChange={(e) => setSelectedContest({ ...selectedContest, timeLimit: parseInt(e.target.value) })}
          />
          <div className="mb-2">
            <h3 className="font-semibold">Questions</h3>
            {selectedContest.questions.map((question, index) => (
              <input
                key={index}
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder={`Question ${index + 1} ID`}
                value={question._id}
                onChange={(e) => {
                  const updatedQuestions = [...selectedContest.questions];
                  updatedQuestions[index] = { ...updatedQuestions[index], _id: e.target.value };
                  setSelectedContest({ ...selectedContest, questions: updatedQuestions });
                }}
              />
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => setSelectedContest({ ...selectedContest, questions: [...selectedContest.questions, { _id: '', questionId: '', questionName: '', title: '', description: '', platformLink: '', solved: false, tags: [], testCases: [], answer: '', example: '', constraints: '' }] })}
            >
              Add Question
            </button>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Participants</h3>
            {selectedContest.participants.map((participant, index) => (
              <input
                key={index}
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder={`Participant ${index + 1}`}
                value={participant}
                onChange={(e) => {
                  const updatedParticipants = [...selectedContest.participants];
                  updatedParticipants[index] = e.target.value;
                  setSelectedContest({ ...selectedContest, participants: updatedParticipants });
                }}
              />
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => setSelectedContest({ ...selectedContest, participants: [...selectedContest.participants, ''] })}
            >
              Add Participant
            </button>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">GitHub Usernames</h3>
            {selectedContest.gitHubUsername.map((username, index) => (
              <input
                key={index}
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder={`GitHub Username ${index + 1}`}
                value={username}
                onChange={(e) => {
                  const updatedUsernames = [...selectedContest.gitHubUsername];
                  updatedUsernames[index] = e.target.value;
                  setSelectedContest({ ...selectedContest, gitHubUsername: updatedUsernames });
                }}
              />
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => setSelectedContest({ ...selectedContest, gitHubUsername: [...selectedContest.gitHubUsername, ''] })}
            >
              Add GitHub Username
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            {selectedContest._id ? 'Update Contest' : 'Create Contest'}
          </button>
        </form>
      </div>
      )}

      {selectedQuestion && (
        <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{selectedQuestion._id ? 'Edit Question' : 'Add Question'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (selectedQuestion._id) {
            handleQuestionUpdate(selectedQuestion);
          } else {
            handleQuestionCreate(selectedQuestion);
          }
          setSelectedQuestion(null);
        }}>
          <div className="mb-2">
            <h3 className="font-semibold">Tags</h3>
            {selectedQuestion.tags.map((tag, index) => (
              <input
                key={index}
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder={`Tag ${index + 1}`}
                value={tag}
                onChange={(e) => {
                  const updatedTags = [...selectedQuestion.tags];
                  updatedTags[index] = e.target.value;
                  setSelectedQuestion({ ...selectedQuestion, tags: updatedTags });
                }}
              />
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => setSelectedQuestion({ ...selectedQuestion, tags: [...selectedQuestion.tags, ''] })}
            >
              Add Tag
            </button>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">Test Cases</h3>
            {selectedQuestion.testCases.map((testCase, index) => (
              <input
                key={index}
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder={`Test Case ${index + 1}`}
                value={testCase}
                onChange={(e) => {
                  const updatedTestCases = [...selectedQuestion.testCases];
                  updatedTestCases[index] = e.target.value;
                  setSelectedQuestion({ ...selectedQuestion, testCases: updatedTestCases });
                }}
              />
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => setSelectedQuestion({ ...selectedQuestion, testCases: [...selectedQuestion.testCases, ''] })}
            >
              Add Test Case
            </button>
          </div>
          <textarea
            className="border p-2 mb-2 w-full"
            placeholder="Answer"
            value={selectedQuestion.answer}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })}
          ></textarea>
          <textarea
            className="border p-2 mb-2 w-full"
            placeholder="Example"
            value={selectedQuestion.example}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, example: e.target.value })}
          ></textarea>
          <textarea
            className="border p-2 mb-2 w-full"
            placeholder="Constraints"
            value={selectedQuestion.constraints}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, constraints: e.target.value })}
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            {selectedQuestion._id ? 'Update Question' : 'Create Question'}
          </button>
        </form>
        </div>
      )}
      </>
    )}
    </div>
  );
};

export default Admin;
