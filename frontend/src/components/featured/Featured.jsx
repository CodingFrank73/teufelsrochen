import './featured.scss';

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={60} text={"60%"} strokeWidth={4} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">420 €</p>
                <p className="desc">Last payments may not be included.</p>

                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Ziel</div>
                        <div className="itemResult positiv">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">12.000€</div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="itemTitle">Letzte Woche</div>
                        <div className="itemResult positiv">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">12.000€</div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="itemTitle">Letzter Monat</div>
                        <div className="itemResult negativ">
                            <KeyboardArrowDownOutlinedIcon fontSize="small" />
                            <div className="resultAmount">12.000€</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;