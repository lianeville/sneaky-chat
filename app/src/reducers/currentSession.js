import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

export const currentSession = createSlice({
	name: "currentSession",
	initialState,
	reducers: {
		updateSession: (state, action) => {
			return action.payload
		},
	},
})

export const { updateSession } = currentSession.actions

export default currentSession.reducer
