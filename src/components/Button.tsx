import React from 'react';
import { createUseStyles } from 'react-jss';

import config from '../config/';

// Styled button component

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button = ({
    children,
    className,
    ...rest
}: ButtonProps) => {
    const classes = useStyles();
    return <button className={`${classes.button} ${className}`} {...rest}>{children}</button>
}

const useStyles = createUseStyles({
    button: {
        border: 'none',
        color: '#fff',
        backgroundColor: config.colors.primary,
        borderRadius: 5,
        padding: `7px 20px`,
        fontSize: 13,
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover:not(:disabled)': {
            opacity: 0.6,
        },
        '&:disabled': {
            backgroundColor: config.colors.disabled,
            cursor: 'default',
        }
    }
});

export default Button;
