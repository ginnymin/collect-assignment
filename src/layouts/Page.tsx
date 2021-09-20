import React from 'react';
import ContentLoader from 'react-content-loader';
import { createUseStyles } from 'react-jss';

import Header from './PageHeader';

// Generic page layout - optional header and content with error and loading states

export interface PageProps {
    showHeader?: boolean; // Option to show or hide header tag
    headerTitle?: string; // Page title
    headerSubtitle?: string; // Page description/subtitle
    loading?: boolean; // Is page in loading state?
    error?: boolean; // Is page in an error state?
    children?: any;
}

const Page = ({
    showHeader = true,
    headerTitle,
    headerSubtitle,
    loading = false,
    error = false,
    children
}: PageProps) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {showHeader && <Header title={headerTitle} subtitle={headerSubtitle} />}
            <main>
                {error ?
                    <p>Oops! We experienced an error loading the content. Please try again.</p> :
                loading ?
                    <ContentLoader width="100%" height="300">
                        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
                    </ContentLoader> 
                :
                    children
                }
            </main>
        </div>
    );
}

const useStyles = createUseStyles({
    container: {
        margin: 30
    }
});

export default Page;
