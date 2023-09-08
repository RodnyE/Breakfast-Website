
export default function Spinner ({
    size = "1rem"
}) {
    return (
        <div 
            className="spinner-border" 
            role="status"
            style={{
                width: size,
                height: size,
            }}
        ></div>
    )
}