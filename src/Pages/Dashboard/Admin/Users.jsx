import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip } from 'flowbite-react';
import Heading from '../../../components/Heading';
import useUsers from '../../../hooks/useUsers';
import { useEffect, useState } from 'react';
import { FaCheck, FaHourglassStart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { TbCurrencyTaka } from 'react-icons/tb';
import TableSkeleton from '../../../components/TableSkeleton';

const Users = () => {
  const username = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;
  const [users, isLoading, refetch] = useUsers();
  const [user, setUser] = useState();
  //set user to a state
  useEffect(() => {
    setUser(users);
  }, [isLoading, users]);
  const axiosPrivate = useAxiosPrivate();

  //Handle Approve Button
  const handleApprove = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Please make sure the user has all varifications !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosPrivate.patch('/approve', { id: id, username, secret }).then(res => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: 'Approved!',
              text: 'The user has been approved!',
              icon: 'success',
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <Heading text="Manage Users"></Heading>
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>User Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Balance</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Block</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {user &&
              user.map(user => {
                return (
                  <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.email}</TableCell>
                    <TableCell>{user?.phone}</TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        <TbCurrencyTaka className="inline text-[20px]" />
                        {user?.balance}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user?.status === 'pending' && (
                        <Tooltip placement="right" content="Pending">
                          <button
                            onClick={() => handleApprove(user._id)}
                            className="bg-orange-500 p-2 rounded-full text-[10px] hover:bg-slate-600 text-white"
                          >
                            <FaHourglassStart />
                          </button>
                        </Tooltip>
                      )}
                      {user?.status === 'approved' && (
                        <Tooltip placement="right" content="Approved">
                          <button disabled className="bg-green-400 p-2  text-[10px] rounded-full text-white">
                            <FaCheck />
                          </button>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Edit
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {isLoading && <TableSkeleton />}
      </div>
    </div>
  );
};

export default Users;
