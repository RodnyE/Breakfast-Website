
import {useState, useEffect} from "react"


export default function Pagination ({
    className,
    length,
    disabled,
    value = 0,
    onChange = ()=>{},
}) {
    const [position, setPosition] = useState(value);
    
    // Change value param 
    useEffect(() => setPosition(value), [value]);
    
    // Call onChange event
    useEffect(() => onChange(position), [position]);
    
    
    return (
      <nav className={className}>
        <ul className={`pagination ${disabled ? "disabled" : ""}`}>
            <li 
                className={"page-item page-link" + (position === 0 ? " disabled" : "")}
                onClick={() => setPosition(position - 1)}
            > Atrás </li>
           
            {(()=>{
                const listdom = [];
                
                for (let i = 0; i < length; i++) {
                    listdom.push(
                        <li 
                            key={i} 
                            className={"page-item page-link" + (i === position? " active":"")}
                            onClick={() => setPosition(i)}
                        > {i} </li>
                    );
                }
                return listdom;
            })()}
            
            <li 
                className={"page-item page-link" + (position === length - 1 ? " disabled" : "")}
                onClick={() => setPosition(position + 1)}
            > Delante </li>
        </ul>
      </nav>
    )
}