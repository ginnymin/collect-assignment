import React from 'react';
import { createUseStyles } from 'react-jss';

import Page, { PageProps } from './Page';
import { LoadingItem, ItemInterface } from './Item';

import config from '../config';

// Grid layout component

interface GridProps extends PageProps {
    items: ItemInterface[];
    itemComponent: React.ComponentType<ItemInterface> // Component to wrap generic items with
}

const Grid = ({
    loading = false, // override page loading to show grid-specific loading layout
    items,
    itemComponent: Component,
    ...rest
}: GridProps) => {
    const classes = useStyles();

    return (
        <Page {...rest}>
            {loading ?
                // Loading state - shows skeleton placeholders of items
                <section className={classes.container}>
                    {Array.from(Array(8)).map((item, index) => <LoadingItem key={`loading-item-${index}`} />)}
                </section> :

                // Display items in grid
                <section className={classes.container}>
                    {items.map((item, index) => <Component key={item.id} {...item} />)}
                </section>
            }
        </Page>
    );
}

const useStyles = createUseStyles({
    container: {
        // Minimum grid item width, stretch items to fill columns to container width 
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${config.grid.itemWidth}px, 1fr))`,
        gridColumnGap: 20,
        gridRowGap: 35
    }
});

export default Grid;
