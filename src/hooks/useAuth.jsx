import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useAuth = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;
  const { data, isPending } = useQuery({
    queryKey: [username, secret],
    queryFn: async () => {
      let result;
      if (username && secret) {
        result = await axiosPrivate.post('/verify', { username, secret });
      }
      console.log(result.data);
      return result.data;
    },
  });

  return [data, isPending];
};

export default useAuth;
