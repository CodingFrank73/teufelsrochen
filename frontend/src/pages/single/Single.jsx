import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./single.scss";
import apiBaseUrl from "../../api";


// componentes
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Single = ({ titles }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    console.log("id:", id);
    const [item, setItem] = useState();

    const mainRouteArray = location.pathname.split("/")
    console.log(location);

    useEffect(() => {
        // console.log(titles[0].text_1);
        const foundItem = getItem(id)
            .then(result => {
                setItem(result)
            })
    }, []);

    const getItem = async (id) => {
        try {
            const response = await fetch(apiBaseUrl + `/api/${mainRouteArray[1]}/single/` + id)
            const result = await response.json()
            return result

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">

                        <div className="editButton">
                            <button className="addNew" onClick={() => (navigate(`detail`))}>Edit</button>
                        </div>

                        <h1 className="title">Information</h1>
                        {item && <div className="item">
                            <img src="https://images.vectorhq.com/images/previews/4e1/female-user-icon-clip-art-92637.png" alt="itemImg" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">{item.firstName} {item.lastName}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">{titles[0].text}:</span>
                                    <span className="itemValue">{item.loginEmail}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">{titles[1].text}:</span>
                                    <span className="itemValue">0221-223344</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">{titles[2].text}:</span>
                                    <span className="itemValue">{item.address}, {item.postalCode} {item.city}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{item.country}</span>
                                </div>

                            </div>
                        </div>}
                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title="User Spending (Last 6 Month)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
            Single
        </div >
    );
}

export default Single;