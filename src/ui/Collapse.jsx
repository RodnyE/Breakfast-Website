import {useState, useEffect} from "react";
import "./Collapse/Collapse.css";

export default function Collapse ({
    title,
    children,
    show = false,
    onShow = ()=>{},
    onHide = ()=>{},
}) {
    const [isShow, setIsShow] = useState(show);
    
    useEffect(() => {setIsShow(show)}, [show]);
    useEffect(() => {
        if (isShow) onShow();
        else onHide();
    }, [isShow]);
    
    const toggleCollapse = () => {
        setIsShow(!isShow);
    };

    return (
        <div className={`collapse-ui p-3 ${isShow ? "show": ""}`}>
            <div className="collapse-title" onClick={toggleCollapse}>
                <div className="collapse-row"> {">"} </div>
                {title}
            </div>
            <div className="collapse-content">
                {children}
            </div>
        </div>
    );
};