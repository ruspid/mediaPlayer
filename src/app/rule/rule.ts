export class Rule {
    id: string;
    name: string;
    behavioralState: BehavioralState;
    communicationAttempt: CommunicationAttempt;
    playlist: string;
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