import { ITrack } from './track';

export interface IPlayList{
    tracks: ITrack[];
    name: string;
    totalTracks: number;
    duration: number;
}