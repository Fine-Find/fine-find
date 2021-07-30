import { action } from "@storybook/addon-actions";

export type ButtonProps = {
  textColor?: string; // you don't have to provide a text color
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: 'thin' | 'medium' | 'thick';
  cellPadding?: 'small' | 'medium' | 'large';
  label: string;
};

export const Button = ({
  label,
  borderWidth = 'medium', // if you don't provide a borderWidth, I'll default to medium
  cellPadding = 'medium',
  textColor = 'white',
  borderColor = '#494866',
  backgroundColor = '#a6a5b8',
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




