# Front end Assignment - Collect

A small company has an internal system to handle their meeting rooms.

Write a simple web app that handles the following user scenarios:

- A user wants to be able to see all of the rooms available
- A user wants to book a room if it has available spots

## Implementation

---

Generally, each component file contains its related types, FC definitions, and styles.

- **Layout components** (`layouts` folder) - Reusable UI layouts
- **General components** (`components` folder) - Reusable UI elements
- **Container components** (`containers` folder) - Wrapper components that handle any logic and pass data to layout components

API and data fetching functions are found in the `api` folder. Application-specific config values are in the `config` folder.

Features/folders/files not included in this project but would be in a normal larger-scale application:

- Routing and routing logic
- Shared styles
- Helpers and hooks
- Use of context API or store/state management (easy peasy, redux, recoil)
- Unit and integration tests (see more on this below)

## Typescript

---

I've started using Typescript only recently so my understanding and use of it is limited.  
Despite this, I used it here because I believe it to be very useful for code maintability and consistency.  
I would definitely choose to use it in any new project I am a part of.  

## Testing

---

I've included only a few tests here, but I'm aware that this is only a tiny portion of what would normally be covered in a production-level application.

Front end automated and unit testing is another area where I have limited experience due to the nature of the positions I've been in, but it is something that I believe to be extremely important. I look forward to and would love to gain professional experience writing meaningful front-end tests.

## Other Notes

---

Things not included, things I would do differently, etc:

- Polling of getRooms to make sure room availability is continually up to date
- A snackbar type of notification for success / error messaging after booking a room
- I purposely did not decrement the number of spots on the front-end after successful booking, opting for a reload of the rooms data instead. The reason for this was the thought that there could be other users booking rooms elsewhere in real time and wanted to ensure the most up-to-date information.
- I pass a callback property from `Rooms.tsx` to `Room.tsx` in order to accomplish the above, but perhaps using Context or something similar would be better.

UI/UX notes:

I took some liberties with the UI flow of booking a room, i.e. including a confirm step with Yes/No buttons. Same can be said for handling loading and error states. Generally I wouldn't call myself a UI/UX expert so I'm sure these parts could be greatly improved, particularly with the transitions.


## Available Scripts

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
