import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GitHubUser {
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
  details: GitHubUser | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  details: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<GitHubUser>) {
      state.isLoggedIn = true;
      state.details = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.details = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
