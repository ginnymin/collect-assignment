// Function to capture error handling across fetch requests
async function fetchApi(url: RequestInfo, data?: RequestInit) {
    try {
        const response = await fetch(url, data);
        const json = await response.json();
        if (!response.ok) throw json;
        return json;
    }
    catch (error) {
        throw error;
    }
}

// GET, POST provided; others such as PUT / DELETE would also be included
const requests = {
    get: (url: RequestInfo) => {
        return fetchApi(url)
    },
    post: (url: RequestInfo, body: RequestInit['body']) => {
        return fetchApi(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    },
};

// Room specific requests. In a larger application this would be in its own file and imported
const Rooms = {
    getRooms: () => {
        return requests.get('https://wetransfer.github.io/rooms.json')
    },
    bookRoom: (id?: string) => {
        return requests.get('https://wetransfer.github.io/bookRoom.json')
    }
};

const Api = {
    Rooms
};

export default Api;