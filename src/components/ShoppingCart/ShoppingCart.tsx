import "./ShoppingCart.css"
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";


interface cartData {
    name: string,
    color: string,
    price: string,
    img: string,
    size: number,
    quantity: number
}

function ShoppingCart() {
    const [ cart, setCart ] = useLocalStorage('cart',{})
    const [ cartPrice, setCartPrice ] = useState<number>(0)
    const cartItems = () => Object.values(cart || {})

    return(
        <main className="cart">
            <h4 className="cart__headline-main">Shopping Cart</h4>
            <div className="cart__container">
                <div className="cart__items">

                    { cartItems().map( (item ) => {
                        return (
                            <div className="cart__item" key={item._id}>
                                <div className="cart__item-image">
                                    <img src={item.img} className="cart__item-preview" alt="Shoe preview"/>
                                </div>
                                <div className="cart__delimiter"></div>
                                <div className="cart__description">
                                    <p className="cart__description-bold">{item.name}</p>
                                    <p className="cart__description-small">Color: {item.color}</p>
                                    <p className="cart__description-small">Size: {item.size}</p>
                                </div>
                                <div className="cart__item-price">
                                    <p className="cart__price-paragraph">{item.price}</p>
                                    <select className="cart__quantity" defaultValue={item.quantity}>
                                        <option>0</option>
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
                        )
                    })}

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
        </main>
    )
}

export default ShoppingCart;