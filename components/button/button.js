import PropTypes from "prop-types";

const Button = ({ text, onClick, className, Icon }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
      {Icon && <span className="icon-right">{<Icon />}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  Icon: PropTypes.elementType,
};

Button.defaultProps = {
  onClick: () => {},
  className: "",
  Icon: null,
};

export default Button;
