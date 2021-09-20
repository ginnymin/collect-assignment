import React, { useEffect, useState } from 'react';

import Item, { ItemInterface } from '../layouts/Item';
import api from '../api';

interface RoomInterface extends ItemInterface {
    spots?: number;
    callback?: Function;
}

const Room = ({
    id,
    spots,
    callback,
    ...rest
}: RoomInterface) => {
    const [booking, setBooking] = useState(false); // if booking action is in progress
    const [bookingStatus, setBookingStatus] = useState(''); // '', 'success', 'error'

    const bookRoom = async (id: string) => {
        try {
            setBooking(true);
            const response = await api.Rooms.bookRoom(id);
            if (response.success) {
                setBooking(false);
                setBookingStatus('success');
                // reload rooms to get updated data
                if (callback) callback(true);
            }
            else {
                throw response;
            }
        }
        catch (error) {
            setBookingStatus('error');
            setBooking(false);
        }
    }

    useEffect(() => {
        // Ideally would show some type of snackbar or notification to indicate success or error status
        if (bookingStatus === 'error') {
            // Reset booking status to allow retry. Could also do this for success.
            setTimeout(() => {
                setBookingStatus('');
            }, 3000);
        }
    }, [bookingStatus]);

    return (
        <Item
            {...rest}
            status={booking ? 'pending' : bookingStatus}
            confirmText={`Book ${rest.title}?`}
            actionLabel={spots && spots > 0 ? 'Book!' : 'Full'}
            action={id && spots && spots > 0 ? () => {
                id && bookRoom(id)
            } : undefined}
        />
    );
}

export default Room;
