import { ITrack } from '../track/track';

export enum PlayerEventType{
    PLAYED = 'PLAYED', 
    STOPPED = 'STOPPED', 
    PLAYLIST_PLAYED = 'PLAYLIST_PLAYED', 
    RESUMED = 'RESUMED', 
    PAUSED = 'PAUSED'
}


export interface PlayerEvent {
    type: PlayerEventType; object: ITrack;
  }