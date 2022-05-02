import { useState, useEffect } from "react";
import "./home.scss"

// components
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import apiBaseUrl from "../../api";

const Home = () => {

    const [numberOfCustomers, setNumberOfCustomers] = useState(0);
    const [numberOfOrders, setNumberOfOrders] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        countCustomers();
    }, []);

    async function countCustomers() {
        try {
            const response = await fetch(apiBaseUrl + "/api/customers/count")
            const result = await response.json();
            setNumberOfCustomers(result)

        } catch (error) {
            console.log("error:", error)
            setError("There was a problem with count.")
        }
    }

    async function countOrders() {
        try {
            const response = await fetch(apiBaseUrl + "/api/orders/count")
            const result = await response.json();
            setNumberOfOrders(result)

        } catch (error) {
            console.log("error:", error)
            setError("There was a problem with count.")
        }
    }


    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="customer" amount={numberOfCustomers} />
                    <Widget type="order" amount={numberOfOrders} />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart aspect={2 / 1} title="Last 6 Months (Revenue)" />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transaction</div>
                    <Table />
                </div>
            </div>
        </div >
    );
}

export default Home;