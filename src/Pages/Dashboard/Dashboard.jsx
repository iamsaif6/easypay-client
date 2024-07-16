import { useState } from 'react';
import { AiOutlineTransaction } from 'react-icons/ai';
import { BiBookAdd, BiSolidDashboard } from 'react-icons/bi';
import { BsCash, BsSendCheckFill } from 'react-icons/bs';
import { FaBars, FaEdit, FaHandHoldingUsd, FaHome, FaServicestack } from 'react-icons/fa';
import { FaCampground, FaUser } from 'react-icons/fa6';
import { RxDashboard } from 'react-icons/rx';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const isAdmin = false;
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex">
      {/* <Helmet>
        <title>Dashboard</title>
      </Helmet> */}
      <div className=" absolute md:relative h-screen">
        <Sidebar
          className="opacity-100"
          collapsed={collapsed}
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          onBreakPoint={setBroken}
          breakPoint="md"
        >
          <div className="h-screen   left-0 pt-9 " style={{ display: 'flex', flexDirection: 'column' }}>
            <a className="mb-9 text-center" href="/">
              {/* <img src={logo} className="h-6 sm:h-9 mx-auto" alt="Flowbite React Logo" /> */}
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MediCamp</span>
            </a>
            <div style={{ flex: 1, marginBottom: '32px' }}>
              {isAdmin ? (
                <Menu>
                  <NavLink to="/dashboard/profile">
                    <MenuItem icon={<FaUser></FaUser>}> Organizer Profile</MenuItem>
                  </NavLink>
                  <NavLink to="/dashboard/addCamp">
                    <MenuItem icon={<FaCampground></FaCampground>}> Add A Camp</MenuItem>
                  </NavLink>
                  <NavLink to="/dashboard/manageCamp">
                    <MenuItem icon={<FaEdit></FaEdit>}>Manage Camps</MenuItem>
                  </NavLink>
                  <NavLink to="/dashboard/joinedcamp">
                    <MenuItem icon={<FaEdit></FaEdit>}>Registered Camps</MenuItem>
                  </NavLink>
                </Menu>
              ) : (
                <Menu className=" font-medium">
                  <NavLink to="/">
                    <MenuItem icon={<BiSolidDashboard className="text-primary text-[20px]" />}>Dashboard</MenuItem>
                  </NavLink>
                  <NavLink to="/dashboard/transactions">
                    <MenuItem icon={<AiOutlineTransaction className="text-[#50B1B3] text-[20px]" />}>Transaction</MenuItem>
                  </NavLink>
                  <NavLink to="/dashboard/sendMoney">
                    <MenuItem icon={<BsSendCheckFill className="text-[#3128E2] text-[20px]" />}>Send Money</MenuItem>
                  </NavLink>
                  <NavLink to="/dashboard/cashOut">
                    <MenuItem icon={<FaHandHoldingUsd className="text-[#EE8139] text-[20px]" />}>Cash Out</MenuItem>
                  </NavLink>
                  <NavLink to="/dashboard/cashin">
                    <MenuItem icon={<BsCash className="text-[#5FBD43] text-[20px]" />}>Cash In</MenuItem>
                  </NavLink>
                </Menu>
              )}
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
                <MenuItem disabled icon={<FaServicestack />}>
                  Examples
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
      <div className="md:max-w-[950px] mt-12 w-full flex-1 px-4 mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
