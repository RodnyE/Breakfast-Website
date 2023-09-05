
import { useState } from "react";
import "./HbButton/HbButton.css";

export default function HamburgerButton ({
    size = "50px",
    onClick = ()=>{},
}) {
    const [isActive, setIsActive] = useState(false);

    const handleButtonClick = () => {
        setIsActive(!isActive);
        onClick();
    };

    return (
        <div
            className={`hamburger-button ${isActive ? "active" : ""}`}
            style={size && {width: size, height: size}}
            onClick={handleButtonClick}
        >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </div>
    );
};