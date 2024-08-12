import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import { useContext } from 'react';
import { AuthContext } from '../Routes/AuthProvider';
import useAxiosPrivate from './useAxiosPrivate';

const useUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;
  const [data] = useAuth();
  const { signOut } = useContext(AuthContext);
  //SingOut the user if the users role is not admin
  // if (data?.role !== 'admin') {
  //   signOut();
  // }

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [data?.role],
    queryFn: async () => {
      const result = await axiosPrivate.post('/users', { username, secret });
      if (data?.role !== 'admin') {
        return null;
      }
      return result?.data;
    },
  });

  return [users, isLoading, refetch];
};

export default useUsers;
