import { Link } from 'react-router-dom';

import './widget.scss';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const Widget = ({ type, amount }) => {

    let data;

    // Bis daten da sind
    // const amount = 100;
    const diff = 20;

    switch (type) {
        case "customer":
            data = {
                title: "BENUTZER",
                isMoney: false,
                link: "Alle Benutzer anzeigen",
                amount: amount,
                route: "customers",
                icon: (
                    <PersonOutlinedIcon className="icon" style={{
                        backgroundColor: "rgba(255, 0,0,.2",
                        color: "crimson"
                    }} />
                )
            }
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View all orders",
                amount: amount,
                icon: (
                    <ShoppingCartOutlinedIcon className="icon" style={{
                        backgroundColor: "rgba(218, 165, 32, .2",
                        color: "goldenrod"
                    }} />
                )
            }
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "View net earnings",
                icon: (
                    <MonetizationOnOutlinedIcon className="icon" style={{
                        color: "green",
                        backgroundColor: "rgba(0, 128, 0, .2"
                    }} />
                )
            }
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See details",
                icon: (
                    <AccountBalanceWalletOutlinedIcon className="icon" style={{
                        color: "purple",
                        backgroundColor: "rgba(128, 0, 128, .2"
                    }} />
                )
            }
            break;
        default:
            break;
    }


    return (
        <div className="widget">
            <div className="left">

                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {data.amount}</span>
                <Link to={"/" + data.route} style={{ textDecoration: "none" }}>
                    <span className="link">{data.link}</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage positiv">
                    <KeyboardArrowUpIcon />
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div >
    );
}

export default Widget;