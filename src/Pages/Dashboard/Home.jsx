import { FaUsers, FaUsersCog } from 'react-icons/fa';
import Heading from '../../components/Heading';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';
import useAgents from '../../hooks/useAgents';

const Home = () => {
  const [data, isPending] = useAuth();
  const [agents] = useAgents();
  const [users] = useUsers();

  return (
    <div>
      {data?.role === 'admin' && <Heading text="Admin Dashboard"></Heading>}
      {data?.role === 'user' && <Heading text="User Dashboard"></Heading>}
      {data?.role === 'agent' && <Heading text="Agent Dashboard"></Heading>}

      <p>User Total Balance : {data.balance} Taka</p>

      {data?.role === 'admin' && (
        <section className="grid gap-4">
          <div className="bg-[#FDF4E0] p-9 rounded-2xl flex flex-col gap-8 justify-between">
            <p>Total Users</p>
            <div className="flex flex-row justify-between">
              <p className="text-[#132027] text-[25px] font-bold">{users?.length}</p>
              <FaUsers className="text-[#F0947A] text-[30px]" />
            </div>
          </div>
          <div className="bg-[#E2FBE8] p-9 rounded-2xl flex flex-col gap-8 justify-between">
            <p>Total Agent</p>
            <div className="flex flex-row justify-between">
              <p className="text-[#132027] text-[25px] font-bold">{agents?.length}</p>
              <FaUsersCog className="text-[#68DA6E] text-[30px]" />
            </div>
          </div>
          <div className="bg-[#F1E8FD] p-9 rounded-2xl flex flex-col gap-8 justify-between">
            <p>Total Users</p>
            <div className="flex flex-row justify-between">
              <p className="text-[#132027] text-[25px] font-bold">999</p>
              <FaUsers className="text-[#944CF6] text-[30px]" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
