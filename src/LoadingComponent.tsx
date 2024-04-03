import {CircularProgress} from "@mui/material";

function LoadingComponent() {
    return (
        <>
            <div className="flexbox">
                <h1>Loading...</h1>
                <CircularProgress/>
            </div>
        </>
    )
}

export default  LoadingComponent;