import classes from './Model.module.css'
import { Fragment } from 'react';
import ReactDOM from 'react-dom'
const Backdrop = props =>{
    return <div onClick={props.onClose} className={classes.backdrop}/>
};

const ModelOverlay = props =>{

    return <div className={classes.modal}> 
        <div className={classes.content}>
            {props.children}
        </div>
    </div>
}

const Model = props =>{

return <Fragment>
    {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,document.getElementById('overlays'))}
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,document.getElementById('overlays'))}
</Fragment>
}

export default Model;