import ContestCard from "../components/ContestCard";
import ContestInfoModal from "../components/ContestInfoModal.tsx";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RootState } from "../components/Store.tsx";
import { useSelector } from "react-redux";

type ContestTypes = {
};

interface Contest {
  _id: string;
  contestId: string;
  contestName: string; // New field for contest name
  contestRules: string;
  totalQuestions: number,
  questions: string[]; // Only storing question IDs
  participants: string[];
  startTime: number;
  timeLimit: number;
  active: boolean;
}



const Contest: React.FC<ContestTypes> = () => {

  const [isActiveButton, setIsActiveButton] = useState('button2');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contests, setContests] = useState<Contest[]>([]); // Type your state here
  const [myContests, setMyContests] = useState<Contest[]>([]);
  const [selectedContest, setSelectedContest] = useState<any>(null);

  const user = useSelector((state: RootState) => state.user.details?.login);

  //const [contestbyId, setContestbyId] = useState(null);

  useEffect(() => {
    //fetchContestById('66c5babaf0706e06623b1abd');
    fetchContests();
    fetchMycontests();
  }, [user]);


  const fetchContests = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/contests`)
      console.log(response.data)
      setContests(response.data);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  const fetchMycontests = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/user/dashboard/${user}`);
      console.log(response.data, "my contests")
      setMyContests(response.data);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  // const fetchContestById = async (id:string) => {
  // try {
  //     const response = await axios.get(`${import.meta.env.VITE_HOST}/api/contests/${id}`);
  //     setContestbyId(response.data)
  //     console.log('Contest details:', response.data);
  //     } catch (error) {
  //     console.error('Error fetching contest details:', error);
  //     }
  // };

  const openModal = (contest: any) => {
    setSelectedContest(contest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContest(null);
    setIsModalOpen(false);
    // document.body.classList.remove('overflow-hidden');
  };

  const handleButtonClick = (button: string) => {
    setIsActiveButton(button);
  }

  return (
    <div className="pb-12 bg-[#111010]">
      <div className=" pt-24 text-center">
        <img src="/trophy.jpg" alt="trophy" className=" h-56 rounded-full mx-auto shadow-sm-light " />
        <h1 className="mt-2 text-4xl text-light text-center">Progmatic Coding Contests</h1>
        <p className="mt-1 text-gray-400">Your Skills. Our Stage. Claim the Trophy!</p>
      </div>
      {/* <div className="flex flex-wrap justify-center mt-8 gap-12">
            {contests.map((contest) => (
                <><ContestCard key={contest.id} contest={contest} openModal={openModal} /> </>
            ))}
            </div> */}
      <div className=" bg-[#262629] shadow-xl mt-16 rounded-xl mx-auto w-2/3 ">
        <div className=" flex justify-center gap-6 p-4 ">
          <button
            className={`py-2 px-4 rounded-lg text-lg font-semibold ${isActiveButton === 'button1' ? 'bg-[#434345] text-white' : 'text-[#c3c3c4]'
              } hover:text-light`}
            onClick={() => handleButtonClick('button1')}
          >
            Past Contests
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-lg font-semibold ${isActiveButton === 'button2' ? 'bg-[#434345] text-white' : 'text-[#c3c3c4]'
              } hover:text-light`}
            onClick={() => handleButtonClick('button2')}
          >
            Current Contests
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-lg font-semibold ${isActiveButton === 'button3' ? 'bg-[#434345] text-white' : 'text-[#c3c3c4]'
              } hover:text-light`}
            onClick={() => handleButtonClick('button3')}
          >
            My Contests
          </button>
        </div>
        <div>
          <div className={`flex flex-wrap gap-6 p-6 justify-center  ${isActiveButton === 'button1' ? 'visible' : 'hidden'}`}>

          </div>
          <div className={`flex flex-wrap gap-6 p-6 justify-center  ${isActiveButton === 'button2' ? 'visible' : 'hidden'}`}>
            {contests.map((contest: ContestTypes & { contestName: string, _id: string }) => (
              <>
                <ContestCard key={contest._id} contest={contest} openModal={() => openModal(contest)} />
              </>
            ))}
          </div>
          <div className={`flex flex-wrap gap-6 p-6 justify-center  ${isActiveButton === 'button3' ? 'visible' : 'hidden'}`}>
            {myContests.map((contest: ContestTypes & { contestName: string, _id: string }) => (
              <>
                <ContestCard key={contest._id} contest={contest} openModal={() => openModal(contest)} />
              </>
            ))}
          </div>
        </div>
      </div>

      {/* {isModalOpen && ( // Assert isModalOpen to be a boolean
            contests.map((contest: ContestTypes & { contestName: string; timeLimit: number ,_id: string}) => (
            <>

                <ContestInfoModal key={contest._id} contest={contest} closeModal={closeModal} /> 
            </>
        ))
)} */}
      {isModalOpen && selectedContest && (
        <ContestInfoModal
          contest={selectedContest}
          closeModal={closeModal}
        />
      )}
    </div>
  )

}

export default Contest;
