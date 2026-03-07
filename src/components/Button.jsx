const Button = (props) => {
  const { className = "", type = "button", onClick, children } = props;

  return (
    <button className={`button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
