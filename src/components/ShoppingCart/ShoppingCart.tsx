import jordan from "./air-jordan-4-retro-sb-pine-green-tnrs8GeNwpUbX2iP0eAUK8neMftEH9.png";
import nike from "./nike-air-force-1-white-umZRglKPI8DvMdHr6Kg0nf06DYqhOF-enlpilfy36fPM96ymznOLnOd1zei8e.png";
import "./ShoppingCart.css"

function ShoppingCart() {
    return(
        <div className="cart">
            <h4 className="cart__headline-main">Shopping Cart</h4>
            <div className="cart__container">
                <div className="cart__items">
                    <div className="cart__item">
                        <div className="cart__item-image">
                            <img src={jordan} className="cart__item-preview" alt="Shoe preview"/>
                        </div>
                        <div className="cart__delimiter"></div>
                        <div className="cart__description">
                            <p className="cart__description-bold">Air Jordan 4</p>
                            <p className="cart__description-small">Color: green / white</p>
                            <p className="cart__description-small">Size: 43</p>
                        </div>
                        <div className="cart__item-price">
                            <p className="cart__price-paragraph">1299,99 zł</p>
                            <select className="cart__quantity" defaultValue="1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                    </div>

                    <div className="cart__item">
                        <div className="cart__item-image">
                            <img src={nike} className="cart__item-preview" alt="Shoe preview"/>
                        </div>
                        <div className="cart__delimiter"></div>
                        <div className="cart__description">
                            <p className="cart__description-bold">Air Force 1</p>
                            <p className="cart__description-small">Color: white / white / white</p>
                            <p className="cart__description-small">Size: 41</p>
                        </div>
                        <div className="cart__item-price">
                            <p className="cart__price-paragraph">579,99 zł</p>
                            <select className="cart__quantity" defaultValue="1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div className="cart__summary">
                    <div className="cart__summary-wrap">
                        <h4 className="cart__summary-headline">Order summary</h4>
                        <div className="cart__price-wrap">
                            <p className="cart__price">Subtotal</p>
                            <p className="cart__price">1879,98 zł</p>
                        </div>
                        <div className="cart__price-wrap">
                            <p className="cart__price">Shipping</p>
                            <p className="cart__price">17,99 zł</p>
                        </div>
                        <div className="cart__price-wrap">
                            <p className="cart__price cart__price-bold">Total</p>
                            <p className="cart__price cart__price-bold">1897,97 zł</p>
                        </div>
                        <div className="cart__promo-wrap">
                            <p className="cart__promo">Have a promo code?</p>
                            <div className="cart__promo-form">
                                <input className="cart__input" type="text"/>
                                <button className="cart__promo-button">Apply</button>
                            </div>
                        </div>
                        <button className="cart__button-submit">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;