import {Alert} from "@mui/material";
import React from "react";
import {ResponseObject} from "./ResponseObject";

function LoadingComponent(props: any) {
    return (
        <div className="flexbox">
            <Alert severity="error">
                <h1>An error occured!</h1>
                <h2>Error {props.responseObject.error_id}: {props.responseObject.error_name}: {props.responseObject.error_message}</h2>
            </Alert>
        </div>
    )
}

export default LoadingComponent;