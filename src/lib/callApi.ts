import {
    AuthUser,
    LoginUserDto,
    PasswordChangeDto,
    RegisterUserDto,
    UpdateProfileDto,
    User,
} from "@/types/user";

import { fetchData } from "./api";
import { ApiResponse } from "@/types/api";
import {
    CreatePlaylistDto,
    Playlist,
    UpdatePlaylistDto,
} from "@/types/playlist";

export const login = async (data: LoginUserDto): Promise<AuthUser> => {
    return await fetchData("login/", data, "POST");
};

export const signup = async (
    data: RegisterUserDto,
): Promise<ApiResponse<AuthUser>> => {
    return await fetchData("register/", data, "POST");
};

export const logout = async (): Promise<ApiResponse<undefined>> => {
    return await fetchData("auth/logout", null, "POST");
};

export const refreshToken = async (): Promise<ApiResponse<AuthUser>> => {
    return await fetchData("auth/refresh", null, "POST");
};

export const editProfile = async (
    data: UpdateProfileDto,
): Promise<ApiResponse<User>> => {
    return await fetchData("users/profile", data, "PATCH");
};

export const changePassword = async (data: PasswordChangeDto) => {
    return await fetchData("users/change-password", data, "POST");
};

export const createPlaylist = async (): Promise<ApiResponse<Playlist>> => {
    return await fetchData("music/playlists/", null, "POST");
};

export const updatePlaylist = async (
    data: UpdatePlaylistDto,
    id: number,
): Promise<ApiResponse<Playlist>> => {
    return await fetchData(`music/playlists/${id}/`, data, "PATCH");
};

export const deleteSongInPlaylist = async (
    data: { songs: number[] },
    id: number,
): Promise<ApiResponse<Playlist>> => {
    return await fetchData(`music/playlists/${id}/`, data, "DELETE");
};

export const addSongToPlaylist = async (
    data: { songs: number[] },
    playlistId: number,
): Promise<ApiResponse<Playlist>> => {
    return await fetchData(`music/playlists/${playlistId}/`, data, "POST");
};
