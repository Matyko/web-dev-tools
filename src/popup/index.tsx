import React, {FC, useEffect} from "react";
import {render} from "react-dom";

interface IProps {

}

export const Popup: FC<IProps> = () => {
    useEffect(() => {
    }, []);

    return (
        <div>
            Popup Page
        </div>
    );
}

render(<Popup />, document.getElementById("popup"))