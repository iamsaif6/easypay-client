import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { useContext } from 'react';
import { AuthContext } from '../Routes/AuthProvider';
import useAxiosPrivate from './useAxiosPrivate';

const useAgents = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;
  const [data] = useAuth();
  const { signOut } = useContext(AuthContext);
  //SingOut the user if the users role is not admin
  if (data?.role !== 'admin') {
    signOut();
  }

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const result = await axiosPrivate.post('/agents', { username, secret });
      return result?.data;
    },
  });

  return [users, isLoading, refetch];
};

export default useAgents;
