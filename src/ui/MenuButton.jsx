
import { useState } from "react";
import "./MenuButton/MenuButton.css";

export default function HamburgerButton ({
    size = "50px",
    iconColor = "black",
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
            style={{
                width: size, 
                height: size,
                "--icon-color": iconColor,
            }}
            onClick={handleButtonClick}
        >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </div>
    );
};