// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit"
import anonUser from "./reducers/anonUser" // Create this file later
// import { composeWithDevTools } from "@redux-devtools/extension"

const store = configureStore({
	reducer: {
		anonUser,
	},
})

export default store
