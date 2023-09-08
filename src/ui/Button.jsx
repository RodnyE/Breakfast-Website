 export default function Button ({
     onClick = ()=>{},
     children,
     disabled,
 }) {
    return (
        <div   
            disabled={disabled}
            onClick={onClick} 
            className={`btn btn-primary ${disabled && "disabled"}`}
        >
            {children}
        </div>
    )
 }