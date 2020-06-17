import { ITrack } from '../track/track';


export class PlayList{
    id: string;
    tracks: ITrack[];
    name: string;
    totalTracks: number;
    duration: number;
}