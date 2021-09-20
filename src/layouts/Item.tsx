import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { createUseStyles } from 'react-jss';
import { FaSpinner, FaCheck } from 'react-icons/fa';

import Image from '../components/Image';
import Button from '../components/Button';
import config from '../config/';

// Generic item component - Image, title, description, and action button elements

const IMAGE_RATIO = config.grid.imageRatio;
const IMAGE_WIDTH = config.grid.itemWidth;
const IMAGE_HEIGHT = config.grid.imageHeight;

export interface ItemInterface {
    id?: string;
    className?: string;
    title: string;
    description?: string;
    confirmText?: string;
    image?: string;
    actionLabel?: string;
    action?: () => void;
    status?: string;
}

interface LoadingItemInterface {
    className?: string;
}

const Item = ({
    className,
    title,
    description,
    confirmText,
    image,
    actionLabel,
    action,
    status
}: ItemInterface) => {
    const classes = useStyles();
    const [confirm, setConfirm] = useState(false); // Show confirm actions
    const actionDisabled = !action || status === 'pending' || status === 'success';

    return (
        <article className={`${className || ''} ${classes.container}`}>
            <div className={classes.imageWrapper}>
                <Image src={image} className={classes.image} alt={title} />
            </div>
            <div className={classes.content}>
                <div className={classes.info}>
                    {confirm ?
                        <h3>{confirmText}</h3>
                    :
                    status === 'error' ?
                        <p className="error">Something went wrong. Please try again.</p>
                    :
                        <>
                            <h3>{title}</h3>
                            {description && <p>{description}</p>}
                        </>
                    }
                </div>
                {confirm ?
                    <>
                        <Button
                            className={classes.button}
                            onClick={() => {
                                action && action();
                                setConfirm(false);
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={() => {
                                setConfirm(false);
                            }}
                        >
                            No
                        </Button>
                    </> 
                : 
                    <Button
                        className={`${classes.button} ${classes.buttonWidth}`}
                        disabled={actionDisabled}
                        onClick={() => {
                            setConfirm(true);
                        }}
                    >
                        {status === 'pending' ?
                            <FaSpinner className={classes.spinner} title="pending" />
                        :
                        status === 'success' ?
                            <FaCheck title="success" />
                        :
                            actionLabel
                        }
                    </Button>
                }
            </div>
        </article>
    );
}

// Loading placeholder skeleton for item

export const LoadingItem = ({
    className
}: LoadingItemInterface) => {
    return (
        <ContentLoader viewBox={`0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT + 55}`} width="100%" className={className}>
            <rect x="0" y="0" rx="10" ry="10" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
            <rect x="0" y="232" rx="3" ry="3" width="40%" height="16" />
            <rect x="0" y="258" rx="3" ry="3" width="55%" height="16" />
            <rect x="243" y="232" rx="4" ry="4" width="90" height="28" />
        </ContentLoader>
    );
}

const useStyles = createUseStyles({
    container: {
    },
    imageWrapper: {
        position: 'relative',
        paddingTop: `${IMAGE_RATIO * 100}%`,
        borderRadius: 11,
        overflow: 'hidden'
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 12
    },
    info: {
        flex: 1,
        '& > h3': {
            margin: 0,
            marginBottom: 6,
            fontSize: 18
        },
        '& > p': {
            margin: 0,
            fontSize: 18,
            color: config.colors.primary,
            '&.error': {
                color: config.colors.error,
                fontSize: 18
            }
        }
    },
    button: {
        marginLeft: 12
    },
    buttonWidth: {
        minWidth: 90
    },
    '@keyframes spin': {
        '0%': { transform: `rotate(0deg)` },
        '100%': { transform: `rotate(359deg)` }
    },
    spinner: {
        animation: '$spin 1s steps(8) infinite'
    }
});

export default Item;
