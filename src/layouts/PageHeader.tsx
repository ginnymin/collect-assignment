import React from 'react';
import { createUseStyles } from 'react-jss';

import config from '../config/';

// Page header component - page title and subtitle

interface HeaderProps {
    title?: string;
    subtitle?: string;
}

const PageHeader = ({
    title,
    subtitle
}: HeaderProps) => {
    const classes = useStyles();
    return (
        <header className={classes.container}>
            {title && <h1 className={classes.title}>{title}</h1>}
            {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
        </header>
    );
}

const useStyles = createUseStyles({
    container: {
        width: `50%`,
        marginBottom: 40
    },
    title: {
        fontWeight: 'normal',
        fontSize: 36,
        color: config.colors.text,
        margin: 0,
        marginBottom: 6
    },
    subtitle: {
        fontSize: 20,
        color: config.colors.textLight,
        margin: 0
    },
    [`@media (max-width: ${config.breakpoints.md}px)`]: {
        container: {
            width: 'auto'
        }
    }
});

export default PageHeader;
