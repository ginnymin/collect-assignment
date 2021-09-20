import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import Grid from '../layouts/Grid';
import Room from './Room';

interface RoomDataInterface {
    name: string;
    spots: number;
    thumbnail: string;
}

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /*
        Loads rooms data
        @param {boolean} background If set to true, loading state won't be updated. 
                                    Use case - reloading data after booking to update availability but don't want UI for full page to change
     */
    const loadData = useCallback(async (background = false) => {
        try {
            if (!background) setLoading(true);
            const data = await api.Rooms.getRooms();
            const rooms = data?.rooms?.map((room: RoomDataInterface, index: number) => ({
                id: `room-${index}`,
                title: room.name,
                description: `${room.spots} spots remaining`,
                image: room.thumbnail,
                spots: room.spots,
                callback: loadData
            }));
            rooms && setRooms(rooms);
            if (!background) setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <Grid
            headerTitle="Rooms"
            headerSubtitle="Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor ultricies donec risus sodales. Tempus quis et."
            loading={loading}
            error={error}
            items={rooms}
            itemComponent={Room}
        />
    );
}

export default Rooms;
