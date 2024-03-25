import { motion } from "framer-motion";
import './Backdrop.css';
import {Dispatch, SetStateAction} from "react";

interface propTypes {
    children: any,
    setIsActiveLoginPanel:Dispatch<SetStateAction<boolean>>
};

function Backdrop({setIsActiveLoginPanel, children }:propTypes) {

    return(
        <motion.div
            className={"backdrop"}
            onClick={ () => {setIsActiveLoginPanel(false)}}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}>
            {children}
        </motion.div>
    )
}

export default Backdrop;