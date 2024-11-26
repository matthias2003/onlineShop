import { motion } from "framer-motion";
import './Backdrop.css';
import { BackdropProps } from "../../utilities/interfaces";


function Backdrop({setIsActive, children }:BackdropProps) {
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