import { testActions } from './testAction';
import { videoActions } from './videoAction';
import { timeLineActions } from './timeLineAction';

export type Action = testActions | videoActions | timeLineActions;

export enum types {
    SET_TEST_VALUE = 'SET_TEST_VALUE',

    SET_VIDEO_FILE = 'SET_VIDEO_FILE',
    SET_VIDEO_DIMENSIONS = 'SET_VIDEO_DIMENSIONS',
    SET_VIDEO_LENGTH = 'SET_VIDEO_LENGTH',
    SET_VIDEO_REF = 'SET_VIDEO_REF',
    SET_VIDEO_VOLUME = 'SET_VIDEO_VOLUME',
    SET_VIDEO_PLAY = 'SET_VIDEO_PLAY',
    SET_VIDEO_CURRENT_DURATION = 'SET_VIDEO_CURRENT_DURATION',
    SET_VIDEO_DURATION = 'SET_VIDEO_DURATION',

    CREATE_NEW_TRACK = 'CREATE_NEW_TRACK'
}