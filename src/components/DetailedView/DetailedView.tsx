import "./DetailedView.css"
import {useParams} from "react-router-dom";

function DetailedView() {
    const { name } = useParams();
    return(
        <h1>{name}</h1>
    )
}

export default DetailedView;