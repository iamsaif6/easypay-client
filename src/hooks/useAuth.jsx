import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useAuth = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;
  const { data, isPending, refetch } = useQuery({
    queryKey: [username, secret],
    queryFn: async () => {
      let result;
      const token = localStorage.getItem('token');
      if (username && secret && token) {
        result = await axiosPrivate.post('/verify', { username, secret });
        return result.data;
      } else if (!token || !username || !secret) {
        return (result.data.isVerified = false);
      }
    },
  });

  return [data, isPending, refetch];
};

export default useAuth;
