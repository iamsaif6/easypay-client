import { useContext, useState } from 'react';
import { AiOutlineTransaction } from 'react-icons/ai';
import { BiBookAdd, BiLogOutCircle, BiSolidDashboard } from 'react-icons/bi';
import { BsCash, BsSendCheckFill } from 'react-icons/bs';
import { FaBars, FaHandHoldingUsd, FaHome, FaUserTie } from 'react-icons/fa';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../Routes/AuthProvider';
import '../Dashboard/dashboard.css';
import { MdManageAccounts, MdSpaceDashboard } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);

  //User Dashboard Menu
  const navUser = (
    <>
      <Menu className=" font-medium text-white">
        <NavLink to="/">
          <MenuItem icon={<BiSolidDashboard className=" text-[20px]" />}>Dashboard</MenuItem>
        </NavLink>
        <NavLink to="/dashboard/sendMoney">
          <MenuItem icon={<BsSendCheckFill className=" text-[20px]" />}>Send Money</MenuItem>
        </NavLink>
        <NavLink to="/dashboard/cashOut">
          <MenuItem icon={<FaHandHoldingUsd className=" text-[20px]" />}>Cash Out</MenuItem>
        </NavLink>
        <NavLink to="/dashboard/cashin">
          <MenuItem icon={<BsCash className=" text-[20px]" />}>Cash In</MenuItem>
        </NavLink>
        <NavLink to="/dashboard/transactions">
          <MenuItem icon={<AiOutlineTransaction className="text-[20px]" />}>Transaction</MenuItem>
        </NavLink>
      </Menu>
    </>
  );

  //Agent Dashboard Menu
  const navAgent = (
    <>
      <Menu className=" font-medium text-white">
        <NavLink to="/">
          <MenuItem icon={<BiSolidDashboard className=" text-[20px]" />}>Dashboard</MenuItem>
        </NavLink>
        <SubMenu defaultOpen={true} label="Transaction Management">
          <NavLink to="/dashboard/cashOut">
            <MenuItem icon={<FaHandHoldingUsd className="text-[20px]" />}>Cash Out</MenuItem>
          </NavLink>
          <NavLink to="/dashboard/cashin">
            <MenuItem icon={<BsCash className=" text-[20px]" />}>Cash In</MenuItem>
          </NavLink>
        </SubMenu>
        <NavLink to="/dashboard/transactions">
          <MenuItem icon={<AiOutlineTransaction className=" text-[20px]" />}>History</MenuItem>
        </NavLink>
      </Menu>
    </>
  );

  //Admin Dashboard Menu
  const navAdmin = (
    <>
      <Menu className=" font-medium">
        <NavLink to="/">
          <MenuItem icon={<MdSpaceDashboard className=" text-[20px]" />}>Dashboard </MenuItem>
        </NavLink>
        <SubMenu defaultOpen={true} label="User Managment" icon={<MdManageAccounts className=" text-[20px]" />}>
          <NavLink to="/dashboard/users">
            <MenuItem icon={<HiUsers className=" text-[20px]" />}>Users</MenuItem>
          </NavLink>
          <NavLink to="/dashboard/agents">
            <MenuItem icon={<FaUserTie className=" text-[20px]" />}>Agents</MenuItem>
          </NavLink>
        </SubMenu>
        <NavLink to="/dashboard/transactions">
          <MenuItem icon={<AiOutlineTransaction className=" text-[20px]" />}>All Transactions </MenuItem>
        </NavLink>
      </Menu>
    </>
  );

  const [data] = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex">
      {/* <Helmet>
        <title>Dashboard</title>
      </Helmet> */}
      <div className="absolute z-50 h-screen">
        <Sidebar
          backgroundColor="#201C19"
          color="#fff"
          className="opacity-100  "
          collapsed={collapsed}
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          onBreakPoint={setBroken}
          breakPoint="md"
        >
          <div className="h-screen   left-0 pt-9 " style={{ display: 'flex', flexDirection: 'column' }}>
            <a className="mb-9 text-center" href="/">
              {/* <img src={logo} className="h-6 sm:h-9 mx-auto" alt="Flowbite React Logo" /> */}
              <span className="self-center whitespace-nowrap text-[30px] font-semibold dark:text-white">
                Easy<span className="text-green-500">Pay</span>
              </span>
            </a>
            <div style={{ flex: 1, marginBottom: '32px' }}>
              {/* Navmenu Here */}
              {data.role === 'user' && navUser}
              {data.role === 'agent' && navAgent}
              {data.role === 'admin' && navAdmin}
              <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                <p fontWeight={600} style={{ letterSpacing: '0.5px' }}>
                  Links
                </p>
              </div>

              <Menu>
                <Link to="/">
                  <MenuItem icon={<FaHome></FaHome>}>Home</MenuItem>
                </Link>
                <MenuItem icon={<BiBookAdd />}>Documentation</MenuItem>
                <MenuItem onClick={signOut} icon={<BiLogOutCircle className="text-[20px]" />}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Sidebar>

        <main>
          <div style={{ padding: '16px 24px', color: '#44596e' }}>
            <div style={{ marginBottom: '16px' }}>
              {broken && (
                <button className="sb-button" onClick={() => setToggled(!toggled)}>
                  <FaBars className="text-[25px]"></FaBars>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      <div className="md:max-w-[950px] flex-1 mt-12 w-full px-4 mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
