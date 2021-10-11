import { useContext, useState, useEffect } from 'react';

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import './HeaderCartIcon.scss';

const HeaderCartIcon = (props) => {
    const cartCtx = useContext(CartContext);
    const [isHeaderHighler, setIsHeaderHigher] = useState(false);
    const {items} = cartCtx;
    const numberOfCartItems = cartCtx.items.reduce((currentAmount, item) => {
        return currentAmount + item.amount
    },0)

    const btnClasses = `button ${isHeaderHighler ? 'bump' : ''}`;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setIsHeaderHigher(true);
        const timer = setTimeout(() => {
            setIsHeaderHigher(false);
        },300)

        return () => {
            clearTimeout(timer);
        }
    },[items])

    return <button className={btnClasses} onClick={props.onShowCart}>
        <span className="icon">
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className="badge">{numberOfCartItems}</span> 
    </button>

}

export default HeaderCartIcon;