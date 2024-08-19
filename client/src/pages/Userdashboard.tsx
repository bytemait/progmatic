import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import ProgressTable from '../components/ProgressTable';
import { useParams } from 'react-router-dom';

function Userdashboard() {
  const { username } = useParams<{ username: string }>();

  const contestData = [
    { contestCode: 'ABC1', contestName: 'Contest 1', pointsScored: 60, rank: 1 },
    { contestCode: 'ABC2', contestName: 'Contest 2', pointsScored: 70, rank: 2 },
    { contestCode: 'ABC3', contestName: 'Contest 3', pointsScored: 80, rank: 3 },
    { contestCode: 'ABC4', contestName: 'Contest 4', pointsScored: 90, rank: 4 },
    { contestCode: 'ABC5', contestName: 'Contest 5', pointsScored: 100, rank: 5 },
    { contestCode: 'ABC6', contestName: 'Contest 6', pointsScored: 110, rank: 6 },
    { contestCode: 'ABC7', contestName: 'Contest 7', pointsScored: 120, rank: 7 },
    { contestCode: 'ABC8', contestName: 'Contest 8', pointsScored: 130, rank: 8 },
    { contestCode: 'ABC9', contestName: 'Contest 9', pointsScored: 140, rank: 9 },
    { contestCode: 'ABC10', contestName: 'Contest 10', pointsScored: 150, rank: 10 },
    { contestCode: 'ABC11', contestName: 'Contest 11', pointsScored: 160, rank: 11 },
    { contestCode: 'ABC12', contestName: 'Contest 12', pointsScored: 170, rank: 12 },
    // Add more data as needed
  ];

  return (
    <div className="min-h-screen pt-20 flex flex-col md:flex-row bg-gray-900">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/5">
        <Sidebar username={username} />
      </div>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-6">
        <DashboardHeader />
        <ProgressTable data={contestData} />
      </main>
    </div>
  );
}

export default Userdashboard;
