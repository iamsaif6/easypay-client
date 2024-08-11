import Heading from '../../components/Heading';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const [data, isPending] = useAuth();

  return (
    <div>
      {data?.role === 'admin' && <Heading text="Admin Dashboard"></Heading>}
      {data?.role === 'user' && <Heading text="User Dashboard"></Heading>}
      {data?.role === 'agent' && <Heading text="Agent Dashboard"></Heading>}
    </div>
  );
};

export default Home;
