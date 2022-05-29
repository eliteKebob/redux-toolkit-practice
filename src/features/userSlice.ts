import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserState {
  data: User | null
  loading: boolean
  error: string
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: '',
}

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  const response = await axios.get<User>('https://randomuser.me/api/')
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.error = 'Error fetching user data'
    })
  },
})

export default userSlice.reducer

export interface Name {
  title: string
  first: string
  last: string
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Timezone {
  offset: string
  description: string
}

export interface Location {
  street: string
  city: string
  state: string
  postcode: string
  coordinates: Coordinates
  timezone: Timezone
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Dob {
  date: Date
  age: number
}

export interface Registered {
  date: Date
  age: number
}

export interface Id {
  name: string
  value: string
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export interface Result {
  gender: string
  name: Name
  location: Location
  email: string
  login: Login
  dob: Dob
  registered: Registered
  phone: string
  cell: string
  id: Id
  picture: Picture
  nat: string
}

export interface Info {
  seed: string
  results: number
  page: number
  version: string
}

export interface User {
  results: Result[]
  info: Info
}
