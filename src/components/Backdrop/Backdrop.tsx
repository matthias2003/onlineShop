import { motion } from "framer-motion";
import './Backdrop.css';
import { Dispatch, SetStateAction } from "react";

interface propTypes {
    children: any,
    setIsActive:Dispatch<SetStateAction<boolean>>
}

function Backdrop({setIsActive, children }:propTypes) {
    return(
        <motion.div
            className={"backdrop"}
            onClick={ () => {setIsActive(false)}}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}>
            {children}
        </motion.div>
    )
}

export default Backdrop;