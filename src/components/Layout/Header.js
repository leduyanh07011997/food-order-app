import React, { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg'
import HeaderCartIcon from './HeaderCartIcon'
import './Header.scss';

const Header = (props) => {
    return <Fragment>
        <header className="header">
            <h1>ReactMeals</h1>
            <HeaderCartIcon onShowCart={props.onShowCart}/>
        </header>
        <div className="main-image">
            <img src={mealsImage} alt="A table full of delicious food!"/>
        </div>
    </Fragment>
}

export default Header;