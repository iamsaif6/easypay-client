import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Tooltip } from 'flowbite-react';
import Heading from '../../../components/Heading';
import { useEffect, useState } from 'react';
import { FaCheck, FaHourglassStart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { TbCurrencyTaka } from 'react-icons/tb';
import TableSkeleton from '../../../components/TableSkeleton';
import { MdBlock } from 'react-icons/md';
import { CgUnblock } from 'react-icons/cg';
import useAgents from '../../../hooks/useAgents';

const Agents = () => {
  const username = localStorage.getItem('userInfo') || null;
  const secret = localStorage.getItem('secret') || null;
  const [users, isLoading, refetch] = useAgents();
  const [user, setUser] = useState();
  //set user to a state
  useEffect(() => {
    setUser(users);
  }, [isLoading, users]);
  const axiosPrivate = useAxiosPrivate();

  //Handle Approve Button
  const handleApprove = id => {
    Swal.fire({
      title: 'Approve agent ?',
      text: `Please make sure the agent is verified!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosPrivate.patch('/agentApprove', { id: id, username, secret }).then(res => {
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

  //handle Block Button
  const handleBlock = id => {
    Swal.fire({
      title: 'Block the user ?',
      text: `The user will be restricted!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Block!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosPrivate.patch('/block', { id: id, username, secret }).then(res => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: 'Blocked!',
              text: 'The user has been blocked!',
              icon: 'success',
            });
            refetch();
          }
        });
      }
    });
  };

  //handle UnBlock Button
  const handleUnBlock = id => {
    Swal.fire({
      title: 'Unblock user ?',
      text: `The user will be unblocked!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Block!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosPrivate.patch('/unblock', { id: id, username, secret }).then(res => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: 'Unblocked!',
              text: 'The user has been Unblocked!',
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
      <Heading text="Manage Agents"></Heading>
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>User Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Balance</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Block / Unblock</TableHeadCell>
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
                      {user?.status === 'pending' && user?.isBlocked === false && (
                        <Tooltip placement="right" content="Pending">
                          <button
                            onClick={() => handleApprove(user._id)}
                            className="bg-orange-500 p-2 rounded-full text-[10px] hover:bg-slate-600 text-white"
                          >
                            <FaHourglassStart />
                          </button>
                        </Tooltip>
                      )}
                      {user?.status === 'approved' && user?.isBlocked === false && (
                        <Tooltip placement="right" content="Approved">
                          <button disabled className="bg-green-400 p-2  text-[10px] rounded-full text-white">
                            <FaCheck />
                          </button>
                        </Tooltip>
                      )}
                      {user?.isBlocked === true && (
                        <Tooltip placement="right" content="Blocked">
                          <button disabled className="text-[13px] rounded-full text-white">
                            <MdBlock className="text-[23px] text-red-600" />
                          </button>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>
                      {user?.isBlocked ? (
                        <Tooltip placement="right" content="Unblock">
                          <button onClick={() => handleUnBlock(user._id)}>
                            <CgUnblock className="text-[25px] text-green-600" />
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip placement="right" content="Block">
                          <button onClick={() => handleBlock(user._id)}>
                            <MdBlock className="text-[23px] text-red-600" />
                          </button>
                        </Tooltip>
                      )}
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

export default Agents;
