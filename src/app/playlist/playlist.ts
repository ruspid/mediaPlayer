import { ITrack } from '../track/track';


export interface IPlayList{
    id: string;
    tracks: ITrack[];
    name: string;
    totalTracks: number;
    duration: number;
}