import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../customer/styles/customerDetail.scss";

import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

// components
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import apiBaseUrl from "../../api";

const CustomerDetail = () => {

    const [file, setFile] = useState("");
    const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [loginEmali, setLoginEmali] = useState("");
    const [password, setPassword] = useState("");
    const [isActivated, setIsActivated] = useState(true);
    const [customer, setCustomer] = useState();

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        getCustomer(id)
            .then(customer => {
                setGender(customer.gender)
                setFirstName(customer.firstName)
                setLastName(customer.lastName)
                setAddress(customer.address)
                setPostalCode(customer.postalCode)
                setCity(customer.city)
                setCountry(customer.country)
                setDateOfBirth(customer.dateOfBirth)
                setIsActivated(customer.isActivated)
            })

    }, []);

    const getCustomer = async (id) => {
        try {
            const response = await fetch(apiBaseUrl + "/api/customers/single/" + id)
            const result = await response.json()
            return result

        } catch (error) {

        }
    }

    return (
        <div className="customerDetail">
            <Sidebar />
            <div className="customerDetailContainer">
                <Navbar />

                <div className="top">
                    <h1>hallo test</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt="pic" />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={e => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div className="formInput" >
                                <label htmlFor="">Geschlecht</label>
                                <input
                                    type="text"
                                    id="gender"
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                    placeholder="w / m / d"
                                />
                            </div>
                            <div className="fullname">
                                <div className="formInput" >
                                    <label htmlFor="">Vorname</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        placeholder="max"
                                    />
                                </div>
                                <div className="formInput" >
                                    <label htmlFor="">Nachname</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        placeholder="mustermann"
                                    />
                                </div>
                            </div>
                            <div className="formInput" >
                                <label htmlFor="">Strasse</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    placeholder="musterstrasse"
                                />
                            </div>
                            <div className="fullcity">
                                <div className="formInput" >
                                    <label htmlFor="">Plz</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        value={postalCode}
                                        onChange={e => setPostalCode(e.target.value)}
                                        placeholder="11111"
                                    />
                                </div>
                                <div className="formInput" >
                                    <label htmlFor="">Stadt</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        placeholder="musterstadt"
                                    />
                                </div>
                            </div>
                            <div className="formInput" >
                                <label htmlFor="">Land</label>
                                <input
                                    type="text"
                                    id="country"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    placeholder="musterland"
                                />
                            </div>
                            <div className="formInput" >
                                <label htmlFor="">Geburtsdatum</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    value={dateOfBirth}
                                    onChange={e => setDateOfBirth(e.target.value)}
                                />
                            </div>

                            <div className="formInput" >
                                <label htmlFor="">Status</label>
                                <select name="" id="isActivated" onChange={e => setIsActivated(e.target.value)}>
                                    <option value="true">aktiviert</option>
                                    <option value="false">gesperrt</option>
                                </select>
                            </div>
                            <button>Send</button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default CustomerDetail;