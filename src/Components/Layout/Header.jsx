import React,{Fragment} from "react";
import headerImage from "../../assets/headerImg.jpg"
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton";
const Header = (props)=>{

return <Fragment>
<nav className={classes.header}>
    <p style={{margin: "10px"}}>Culinary Craft</p>
    <HeaderCartButton onClick={props.onShowCart}/>
</nav>
<div className={classes['main-image']}>
    <img src={headerImage} alt='food-image'/>
</div>
</Fragment>

}

export default Header;