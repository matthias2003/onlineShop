import "./ShoppingCart.css"
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState} from "react";
import close from "../../assets/icons/close.svg"

interface CartData {
    id:string
    name: string,
    color: string,
    price: string,
    img: string,
    size: number,
    quantity: number
}

interface Cart {
    [key: string]: CartData;
}

function ShoppingCart() {
    const [ cart, setCart ] = useLocalStorage<Cart>('cart',{})
    const [ cartPrice, setCartPrice ] = useState<number>(0)
    const [ cartItemsCounter, setCartItemsCounter ] = useState<number>()
    const cartItems = () => Object.values(cart || {})

    const removeItem = ( id : string, size : number )  => {
        const key : string = `${id}_${size}`;
        delete cart[key]
        setCart(cart)
    }

    const changeQuantity = ( e:React.ChangeEvent<HTMLSelectElement>, id:string) => {
        cart[id].quantity = Number(e.target.value);
        setCart({...cart})
    }

    useEffect(() => {
        let price = 0;
        let semiPrice = 0;
        let items = 0;
        cartItems().map( (item:any ) => {
            semiPrice = Number(item.price.split(" ")[0].replace(",","."))
            semiPrice *= Number(item.quantity)
            price += semiPrice
            // items += Number(item.quantity)
        })
        setCartPrice(price)
        setCartItemsCounter(items);
    },[cart])

    return(
        <main className="cart">
            <h4 className="cart__headline-main">Shopping Cart</h4>
            <div className="cart__container">
                <div className="cart__items">
                    { cartItems().map( (item:any ) => {
                        return (
                            <div className="cart__item" key={item.id + item.size}>
                                <button onClick={() => {removeItem(item.id, item.size)}} className="cart__remove-button">
                                    <img className="cart__remove-icon" src={close} alt="Close button"/>
                                </button>
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
                                    <p className="cart__price-paragraph">{`${ (Number(item.price.split(" ")[0].replace(",",".")) * Number(item.quantity)).toFixed(2)} zł`}</p>
                                    <select onChange={(e) => changeQuantity(e,`${item.id}_${item.size}`) } className="cart__quantity" value={item.quantity}>
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
                            <p className="cart__price">{cartPrice.toFixed(2)} zł</p>
                        </div>
                        <div className="cart__price-wrap">
                            <p className="cart__price">Shipping</p>
                            <p className="cart__price">17.99 zł</p>
                        </div>
                        <div className="cart__price-wrap">
                            <p className="cart__price cart__price-bold">Total</p>
                            <p className="cart__price cart__price-bold">{ (cartPrice + 17.99).toFixed(2) } zł</p>
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