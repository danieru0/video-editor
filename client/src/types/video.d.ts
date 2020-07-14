export interface videoDimensions {
    width: number;
    height: number;
}

export interface videoCurrentDuration {
    currentDuration: number;
}

export interface videoRef extends videoCurrentDuration {
    videoRef: any;
}

export interface videoData extends videoDimensions {
    play: boolean;
    volume: number;
    duration: number;
    muted: boolean;
}