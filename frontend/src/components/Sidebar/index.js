import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';
import { MdOutlineHome, MdManageAccounts } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { TbPackageImport, TbPackageExport } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { FaKeycdn, FaRegCalendarAlt, FaAngellist } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "./cute.png";

function Sidebar({ change }) {
  const location = useLocation();
  const [selected, setSelected] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const toggleAddDropdown = () => {
    setIsAddOpen(!isAddOpen);
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/home': setSelected(1); break;
      case '/home/manage-product': setSelected(2); break;
      case '/home/import': setSelected(3); break;
      case '/home/export': setSelected(4); break;
      case '/home/user-role':
      case '/home/manage-account':
      case '/home/permissions':
      case '/home/roles-group':
        setSelected(5); break;
      case '/home/calendar': setSelected(6); break;
      case '/home/surprised': setSelected(7); break;
      default: setSelected(1);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    change();
    setIsExpanded(!isExpanded);
  };

  const linkClass = idx => 
    `sidebar__link ${selected === idx ? 'active' : ''} ${!isExpanded ? 'add_jus' : ''}`;

  const iconStyle = !isExpanded ? { marginRight: 0 } : {};

  return (
    <ul className="sidebar" style={{ width: isExpanded ? "20%" : "4%" }}>
      <div
        className="logo-header"
        style={isExpanded ? {} : { display:"flex", justifyContent:"center", alignItems:"center" }}
      >
        {isExpanded && (
          <a href="/home"><img src={logo} height="80px" alt="Logo"/></a>
        )}
        <div
          className={`sidebar__icon ${!isExpanded ? 'add_jus' : ''}`}
          style={!isExpanded ? { marginRight:0, cursor:"pointer" } : { cursor:"pointer" }}
          onClick={toggleSidebar}
        >
          <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </div>
      </div>

      <li><Link to="/home"          className={linkClass(1)} style={!isExpanded?{padding:"15px 0"}:{}}><div className="sidebar__icon" style={iconStyle}><MdOutlineHome/></div>{isExpanded && "Home"}</Link></li>
      <li><Link to="/home/manage-product" className={linkClass(2)} style={!isExpanded?{padding:"15px 0"}:{}}><div className="sidebar__icon" style={iconStyle}><LuClipboardCheck/></div>{isExpanded && "Quản lí hàng hóa"}</Link></li>
      <li><Link to="/home/import"     className={linkClass(3)} style={!isExpanded?{padding:"15px 0"}:{}}><div className="sidebar__icon" style={iconStyle}><TbPackageImport/></div>{isExpanded && "Quản lý kho"}</Link></li>
      <li><Link to="/home/export"     className={linkClass(4)} style={!isExpanded?{padding:"15px 0"}:{}}><div className="sidebar__icon" style={iconStyle}><TbPackageExport/></div>{isExpanded && "Quản lý đơn hàng"}</Link></li>

      <li className="sidebar__add">
        <div
          className={linkClass(5)}
          onClick={toggleAddDropdown}
          style={!isExpanded ? {padding:"15px 0", cursor:"pointer"} : {cursor:"pointer"}}
        >
          <div className="sidebar__icon" style={iconStyle}><IoAddCircleOutline/></div>
          {isExpanded && "Quản lí quyền nhân viên"}
        </div>

        {isAddOpen && (
          <ul className="sidebar__submenu">
            <li>
              <Link to="/home/manage-account" className={linkClass(5)} style={!isExpanded?{padding:"15px 0"}:{}}>
                <div className="sidebar__icon" style={{...iconStyle, marginRight: isExpanded?10:0}}><MdManageAccounts/></div>
                {isExpanded && "Quản lí tài khoản"}
              </Link>
            </li>
            <li>
              <Link to="/home/permissions" className={linkClass(5)} style={!isExpanded?{padding:"15px 0"}:{}}>
                <div className="sidebar__icon" style={{...iconStyle, marginRight: isExpanded?10:0}}><FaKeycdn/></div>
                {isExpanded && "Phân quyền"}
              </Link>
            </li>
            <li>
              <Link to="/home/roles-group" className={linkClass(5)} style={!isExpanded?{padding:"15px 0"}:{}}>
                <div className="sidebar__icon" style={{...iconStyle, marginRight: isExpanded?10:0}}><GrGroup/></div>
                {isExpanded && "Nhóm quyền"}
              </Link>
            </li>
          </ul>
        )}
      </li>

      <li><Link to="/home/calendar"  className={linkClass(6)} style={!isExpanded?{padding:"15px 0"}:{}}><div className="sidebar__icon" style={iconStyle}><FaRegCalendarAlt/></div>{isExpanded && "Quản lí lịch làm việc"}</Link></li>
      <li><Link to="/home/surprised" className={linkClass(7)} style={!isExpanded?{padding:"15px 0"}:{}}><div className="sidebar__icon" style={iconStyle}><FaAngellist/></div>{isExpanded && "Surprised"}</Link></li>
    </ul>
  );
}

export default Sidebar;