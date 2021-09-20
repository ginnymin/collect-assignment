import React, { useState, useEffect, useCallback, ImgHTMLAttributes } from 'react';
import ContentLoader from 'react-content-loader';
import { createUseStyles } from 'react-jss';
import config from '../config';

// Image wrapper component
// Shows skeleton when image is loading
// Shows an error placeholder when image is unavailable

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const ImageComponent = ({
    src,
    ...props
}: ImageProps) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onLoad = useCallback(() => {
        setLoading(false);
    }, []);

    const onError = useCallback(() => {
        setLoading(false);
        setError(true);
    }, []);

    useEffect(() => {
        // Create image object and set src
        const img = new Image();
        img.src = src as string;

        // Add event listeners to detect when done loading or when there's an error loading the image
        img.addEventListener('load', onLoad);
        img.addEventListener("error", onError);
    
        return () => {
            // cleanup event listeners when image is unmounted
            img.removeEventListener('load', onLoad);
            img.removeEventListener("error", onError);
        };
    }, [src, onLoad, onError]);

    // Loading skeleton
    if (loading) return (
        <ContentLoader width="100%" height="100%">
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
    );

    // Error placeholder
    else if (error) return (
        <span className={classes.errorContainer}>
            Oops! There was an error loading this image.
        </span>
    );

    else return (
        <img {...props} src={src} alt={props.alt} />
    );
}

const useStyles = createUseStyles({
    errorContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        textAlign: 'center',
        padding: 20,
        color: config.colors.textLight,
        backgroundColor: config.colors.gray
    }
});

export default ImageComponent;
