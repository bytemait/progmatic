import axios from "axios";
import moment from "moment-timezone";
import { useAppSelector } from "../store/hooks";
import { RootState } from "./Store";
import { useEffect, useState } from "react";

interface ContestInfoModalProps {
  contest: {
    _id: string;
    contestName: string;
    timeLimit: number;
    totalQuestions: number;
    startTime: string;
    questions: string[];
    participants: string[];
  };
  closeModal: () => void;
}

const ContestInfoModal: React.FC<ContestInfoModalProps> = ({
  contest,
  closeModal,
}) => {
  const username = useAppSelector(
    (state: RootState) => state.user.details?.login
  );
  const user = useAppSelector((state: RootState) => state.user.details);
  const userId = user?._id;
  const hasStarted = moment().isAfter(moment(contest.startTime));
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    console.log("Checking registration...");
    console.log("Username:", username);
    console.log("Participants:", contest.participants);

    if (contest?.participants?.length > 0 && username) {
      const isUserRegistered = contest.participants.some(
        (participantId: string) => participantId.toString() === userId
      );
      console.log("Is user registered?", isUserRegistered);
      setIsRegistered(isUserRegistered);
    }
  }, [contest.participants, username]);

  const handleRegistration = async () => {
    console.log("backend:", {
      contestId: contest._id,
      user: username,
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_HOST}/api/user/register`,
        {
          contestId: contest._id,
          user: username,
        }
      );

      alert(res.data.message);
      setIsRegistered(true);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleUnregistration = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_HOST}/api/user/unregister`,
        {
          contestId: contest._id,
          user: username,
        }
      );
      alert(res.data.message);
      setIsRegistered(false);
    } catch (error) {
      console.error("Error during unregistration:", error);
    }
  };

  const result = contest.totalQuestions * 20;

  // Convert the UTC time to IST and format it
  const formattedTime = moment(contest.startTime)
    .tz("Asia/Kolkata") // Convert to IST
    .format("D MMMM YYYY h:mm A"); // Format as "25 August 2024 5:00 PM"

  return (
    <div className="fixed top-0 left-0 pt-20 right-0 bottom-0 flex justify-center items-center bg-[#061220]">
      <div className="px-10 py-6 h-[630px] w-[1150px] bg-dark max-h-[625px] rounded-2xl  shadow-sm-light">
        <div className="flex justify-between">
          <div className="max-w-2/3 flex gap-8 flex-col">
            <span className=" text-5xl font-extrabold">
              {contest.contestName}
            </span>
            <div className="ml-8">
              <span className="text-2xl font-semibold inline-block mb-2">
                Contest Process:{" "}
              </span>
              <div className="ml-4">
                <div className="mb-1">
                  <span className="font-medium mr-11">Registration:</span>
                  <span className="text-gray-400">
                    Register in {contest.contestName} to compete!
                  </span>
                </div>
                <div className="mb-1">
                  <span className="font-medium mr-10">Participation:</span>
                  <span className="text-gray-400">Free</span>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <span className="text-2xl font-semibold inline-block mb-2">
                Contest Format:{" "}
              </span>
              <div className="ml-4">
                <div className="mb-1">
                  <span className="font-medium mr-16">Duration:</span>
                  <span className="text-gray-400">
                    {contest.timeLimit} minutes
                  </span>
                </div>
                <div className="mb-1">
                  <span className="font-medium mr-14">Problems:</span>
                  <span className="text-gray-400">
                    {contest.totalQuestions} High Quality coding problems
                  </span>
                </div>
                <div className="">
                  <span className="font-medium mr-12">Languages:</span>
                  <span className="text-gray-400">
                    Java, C++, Python, and JavaScript.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center pr-12 pt-16 text-black">
            {isRegistered ? (
              <button
                onClick={handleUnregistration}
                className="bg-gray-600 rounded-full px-6 py-2 w-fit mx-auto text-light hover:bg-gray-800"
              >
                Unregister
              </button>
            ) : (
              <button
                onClick={handleRegistration}
                className="bg-red-600 rounded-full px-6 py-2 w-fit mx-auto text-light hover:bg-red-800"
              >
                Register Now
              </button>
            )}
          </div>
        </div>
        <div className="my-4 ml-8">
          <span className="text-2xl font-semibold inline-block mb-2">
            Contest Details:{" "}
          </span>
          <div className="flex gap-32 px-8 mb-2 text-gray-400 text-lg">
            <span className="w-1/4 text-center">Total Problems</span>
            <span className="w-1/4 text-center">Total Points</span>
            <span className="w-1/4 text-center">Start Time</span>
            {/* <span className="w-1/4 text-center">End Time</span> */}
            <span className="w-1/4 text-center">Duration</span>
          </div>
          <div className="bg-[#212321] h-[90px] w-[1000px] rounded-xl ">
            <div className="flex gap-8 px-16 pt-4 divide-x-2 mb-2 font-semibold text-lg items-center">
              <span className="w-1/4 text-center">
                {contest.totalQuestions}
              </span>
              <span className="w-1/4 text-center">{result}</span>
              <span className="w-1/4 text-center">{formattedTime}</span>
              {/* <span className="w-1/4 text-center">31 Feb 2025</span> */}
              <span className="w-1/4 text-center">
                {contest.timeLimit} Minutes
              </span>
            </div>
          </div>
        </div>

        {/* Conditional Question Links */}
        {isRegistered && hasStarted && contest.questions.length > 0 && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-2 text-light">
              Questions:
            </h3>
            <div className="flex gap-4 justify-center flex-wrap">
              {contest.questions.map((questionId, index) => (
                <a
                  key={questionId}
                  href={`/contest/${contest.contestName}/${questionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-600 underline text-lg"
                >
                  Question {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="text-center mt-6">
          <button
            className="bg-red-600 rounded-full px-6 py-1 text-lg hover:bg-red-800"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestInfoModal;
