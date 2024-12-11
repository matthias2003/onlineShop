import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BackdropProps } from "../../utilities/interfaces";
import "./Backdrop.css";

function Backdrop({ setIsActive, children, isReset, setIsReset }:BackdropProps ) {
    const navigate = useNavigate();

    const closeHandler = () => {
        if (isReset && setIsReset) {
            setIsActive(false);
            setIsReset(false);
            setTimeout(() => {
                navigate("/");
            },500);
        } else {
            setIsActive(false)
        }
    }

    return(
        <motion.div
            className="backdrop"
            onClick={ closeHandler }
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}>
            { children }
        </motion.div>
    );
}

export default Backdrop;