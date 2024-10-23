import "./Orders.css";
import emptyBox from "../../assets/images/empty-box.svg";

function Orders () {
    return (
        <main className="orders__container">
            <h4 className="orders__headline">Orders</h4>
            <div className="favourites__container empty">
                <img className="favourites__image-empty" src={emptyBox} alt="Broken heart"/>
                <h2 className="favourites__headline">No orders yet!</h2>
            </div>
        </main>
    )
}

export default Orders;