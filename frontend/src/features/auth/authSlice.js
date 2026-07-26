import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, // { uid, email, phoneNumber, role }
  idToken: null,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user
      state.idToken = action.payload.idToken
    },
    clearAuth(state) {
      state.user = null
      state.idToken = null
    },
    setAuthStatus(state, action) {
      state.status = action.payload
    },
  },
})

export const { setAuth, clearAuth, setAuthStatus } = authSlice.actions
export default authSlice.reducer

