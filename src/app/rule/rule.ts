export class Rule {
    name: string;
    behavioralState: BehavioralState;
    communicationAttempt: CommunicationAttempt;
    playlistId: string;
    contexts: Context[];
    time: Time;
}

export class Context{
    context: string;
}

//not the best way to call it
export class Time{
    day: number[];
    start: string;
    end: string;
}


export enum BehavioralState {
    PLEASURE,
    DISPLEASURE,
    NEUTRAL
}

export enum CommunicationAttempt {
    DEMAND,
    COMMENT,
    PROTEST
}