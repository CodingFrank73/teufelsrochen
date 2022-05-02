import { Link } from "react-router-dom";

import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" className="link">
                    <span className="logo">TR - FischShop</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    {/*------------------- MAIN -------------------*/}
                    <p className="title">MAIN</p>
                    <Link to="/dashboard" className="link">
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>

                    {/*------------------- LISTS -------------------*/}
                    <p className="title">LISTS</p>

                    <Link to="/customers" className="link">
                        <li>
                            <GroupIcon className="icon" />
                            <span>Kunden</span>
                        </li>
                    </Link>

                    <Link to="/products" className="link">
                        <li>
                            <CategoryIcon className="icon" />
                            <span>Produkte</span>
                        </li>
                    </Link>

                    <li>
                        <ShoppingCartCheckoutIcon className="icon" />
                        <span>Bestellungen</span>
                    </li>

                    {/*------------------- USERS -------------------*/}
                    <p className="title">Users</p>

                    <Link to="/users" className="link">
                        <li>
                            <PeopleAltOutlinedIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>

                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li>


                    <li>
                        <ExitToAppIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">color</div>
        </div>
    );
}

export default Sidebar;