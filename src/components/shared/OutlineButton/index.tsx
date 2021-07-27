import PropTypes from 'prop-types';
import { action } from "@storybook/addon-actions";

export const Button = ({
  
  label,
  borderWidth = 'medium',
  cellPadding = 'medium',
  textColor = 'white',
  borderColor = '#494866',
  backgroundColor = '#a6a5b8',
}) => {

  const cellPaddingMap = {
    small: '3px',
    medium: '8px',
    large: '15px',
  };
  const borderWidthMap = {
    thin: '1px',
    medium: '2px',
    thick: '3px',
  };

  return (
    <button type='button' onClick={action('clicked')}
          style={{
            color: textColor,
            padding: cellPaddingMap[cellPadding],
            backgroundColor: backgroundColor,
            border: `${borderWidthMap[borderWidth]} solid ${borderColor}`,
            borderRadius: 100,
          }}
        >
          {label}
        </button>
  );
};

Button.propTypes = {
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderWidth: PropTypes.oneOf(['thin', 'medium', 'thick']),
  cellPadding: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired
};


