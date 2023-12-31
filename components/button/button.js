import PropTypes from "prop-types";
import style from "./button.module.css";

const Button = ({ text, onClick, className, Icon, disabled }) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
      {Icon && <span className={style.iconRight}>{Icon}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  Icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object]),
};

Button.defaultProps = {
  onClick: () => {},
  className: "",
  Icon: null,
  disabled: false,
};

export default Button;
