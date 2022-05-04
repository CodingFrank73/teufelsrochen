
import { color } from "@mui/system";
import { useNavigate, Link } from "react-router-dom";

import "./customerCard.scss";

const CustomerCard = ({ customer }) => {
    const navigate = useNavigate();

    return (
        <div className="customerCard">
            <div className="customerCardContainer">
                {/* <div className="editButton">
                    <button className="addNew" onClick={() => (navigate(`detail`))}>Edit</button>
                </div> */}

                <h1 className="title">Information</h1>

                <div className="item">
                    <img src="https://images.vectorhq.com/images/previews/4e1/female-user-icon-clip-art-92637.png" alt="itemImg" className="itemImg" />
                    <div className="details">
                        <Link to={`detail`} className="linkto" >
                            <h1 className="itemTitle">{customer.firstName} {customer.lastName}</h1>
                        </Link>
                        <div className="detailItem">
                            <p className="itemValue">{customer.loginEmail}</p>
                            <p className="itemValue">{customer.contacts}</p>
                            <p className="itemValue">{customer.address}</p>
                            <p className="itemValue">{customer.postalCode} {customer.city}</p>
                            <p className="itemValue">{customer.country}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default CustomerCard;