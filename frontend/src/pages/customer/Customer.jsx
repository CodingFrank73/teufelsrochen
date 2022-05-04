import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "../customer/styles/customer.scss";

import apiBaseUrl from "../../api";



// componentes
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import CustomerCard from "../../components/customerCard/CustomerCard";

const Customer = ({ titles }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    console.log("id:", id);
    const [customer, setCustomer] = useState();

    const mainRouteArray = location.pathname.split("/")
    console.log(location);

    useEffect(() => {
        fetchData(id)
            .then(console.log(customer))

    }, []);

    const fetchData = async (id) => {
        try {
            const response = await fetch(apiBaseUrl + `/api/${mainRouteArray[1]}/single/` + id)
            const result = await response.json()
            setCustomer(result)
        } catch (error) {

        }
    }


    return (
        <div className="customer">
            <Sidebar />
            <div className="customerContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        {customer && <CustomerCard customer={customer} />}
                    </div>
                    <div className="right">
                        <Chart aspect={2 / 1} title="Getätigter Umsatz in den letzten 6 Monaten" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Bestellhistorie</h1>
                    <List />
                </div>
            </div>
        </div >
    );
}

export default Customer;