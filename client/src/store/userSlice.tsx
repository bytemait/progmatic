import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GitHubUser {
  _id: string; // ✅ Add this field from your MongoDB backend
  avatar_url: string;
  bio: string | null;
  blog: string;
  company: string | null;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string | null;
  login: string;
  name: string;
  node_id: string;
  notification_email: string | null;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string | null;
  type: string;
  updated_at: string;
  url: string;
}

interface UserState {
  isLoggedIn: boolean;
  details: {
    _id : string;
    login : string;
    name: string;
    avatar_url : string;
    email : string| null;
    bio : string| null;
    html_url ?: string;
    site_admin ?: boolean;
  } | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  details: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ user: GitHubUser; role: string }>
    ) {

      const {_id, login, name, avatar_url, email, bio, html_url, site_admin} = action.payload.user;
      state.isLoggedIn = true;
      state.details = {
        _id,
        login,
        name,
        avatar_url,
        email,
        bio,
        html_url,
        site_admin
      };
    },
    logout(state) {
      state.isLoggedIn = false;
      state.details = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
