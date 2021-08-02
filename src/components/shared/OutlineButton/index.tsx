export type ButtonProps = {
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: 'thin' | 'medium' | 'thick';
  cellPadding?: 'small' | 'medium' | 'large';
  label: string;
  textSize?: string;
  width?: string;
  marginRight?: boolean;
  onClick?: () => void;
};

export const Button = ({
  label,
  textSize,
  width,
  marginRight,
  borderWidth = 'medium',
  cellPadding = 'medium',
  textColor = '#000',
  borderColor = '#000',
  backgroundColor = '#E8E8E8',
  onClick,
}: ButtonProps) => {
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

  // const disappear = (disabled) ? {};

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        color: textColor,
        padding: cellPaddingMap[cellPadding],
        backgroundColor: backgroundColor,
        border: `${borderWidthMap[borderWidth]} solid ${borderColor}`,
        borderRadius: 100,
        fontSize: textSize,
        width: width,
        marginRight: marginRight ? '75px' : '0px',
      }}
    >
      {label}
    </button>
  );
};
