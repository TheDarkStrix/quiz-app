import PropTypes from "prop-types";
import style from "./button.module.css";

const Button = ({ text, onClick, className, Icon }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
      {Icon && <span className={style.iconRight}>{Icon}</span>}
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
