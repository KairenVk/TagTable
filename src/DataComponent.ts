import {useEffect, useState} from "react";

function GetTags() {
    const [loadingState, setLoadingState] = useState("loading");
    const [data, setData] = useState("");

    useEffect(() => {
        fetch("https://api.stackexchange.com/tags?site=stackoverflow&pagesize=100", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                setData(responseData);
                setLoadingState("loaded");

            })
            .catch((error) => {
                console.log(error);
                setLoadingState("error");
            })
    }, []);
    return [loadingState, data]
}

export default GetTags;