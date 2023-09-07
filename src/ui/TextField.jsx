
export default function TextField ({
    className = "", 
    placeholder, 
    type, 
    value,
    onInput, 
    onChange, 
    disabled,
}) {
    return (
      <input 
        className={"form-control " + className}
        type={type}
        value={value}
        placeholder={placeholder}
        
        disabled={disabled}
        onInput={onInput}
        onChange={onChange}
      />
    );
}
