export interface videoDimensions {
    width: number;
    height: number;
}

export interface videoCurrentDuration {
    currentDuration: number;
}

export interface videoData extends videoDimensions, videoCurrentDuration {
    play: boolean;
    volume: number;
    duration: number;
    muted: boolean;
}