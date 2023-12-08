import "./Navbar.scss";
import { useContext } from "react";
import "antd/dist/antd.css";
import { Menu, Dropdown, Popover, Button } from "antd";
import { DownOutlined, DownloadOutlined, UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../Provider/contractProvider";
import { Link } from "react-router-dom"

const Navbar = () => {
    const contractData = useContext(UserContext);

    return (
        <>
            <div className="navbar">
                <div className="brand-name">
                    <Link to="/">
                        <span className="brand-name-blue">Yeah</span>
                    </Link>
                </div>

                <ul className="nav-items">
                    <Link to="/dashboard">
                        <li>
                            Dashboard
                        </li>
                    </Link>
                    <Link to="/feed">
                        <li>
                            Feed
                        </li>
                    </Link>
                    <li>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={"medium"} onClick={() => contractData._initApp()} >
                            Connect
                        </Button>
                    </li>
                    <li>
                        <UserOutlined />
                        <span className="nav-profile-name">{contractData.address === '' ? "please connect" : contractData.address.slice(0, 7) + "..."}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;