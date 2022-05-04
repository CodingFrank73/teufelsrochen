import { useState, useEffect } from "react";

import "./list.scss"

// components
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/datatable/Datatable";
import { Outlet } from "react-router-dom";



const List = ({ route, columns }) => {

    const [currentRoute, setCurrentRoute] = useState("");

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable route={route} columns={columns} />
            </div>
            {/* <Outlet /> */}
        </div >
    );
}

export default List;