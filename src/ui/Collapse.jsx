import {useState, useEffect} from "react";
import "./Collapse/Collapse.css";

export default function Collapse ( {
    title,
    children,
    open = false,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="p-3">
            <div onClick={toggleCollapse}>
                <h3 className="cursor-pointer mb-2"> {isOpen ? "ↆ": "➔"} {title} </h3>
            </div>
            <div className={`collapse-content ${isOpen ? "open": ""}`}>
                {children}
            </div>
        </div>
    );
};