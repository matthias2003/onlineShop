import "./Orders.css";
import emptyBox from "../../assets/images/empty-box.svg";

function Orders () {
    return (
        <main className="orders__container">
            <h4 className="orders__headline">Orders</h4>
            <div className="orders__container empty">
                <div className="orders__empty-content">
                    <img className="orders__image-empty" src={emptyBox} alt="Package box"/>
                    <h2 className="orders__headline">No orders yet!</h2>
                    </div>
                </div>
        </main>
)
}

export default Orders;