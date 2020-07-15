import { testActions } from './testAction';
import { videoActions } from './videoAction';

export type Action = testActions | videoActions;

export enum types {
    SET_TEST_VALUE = 'SET_TEST_VALUE',

    SET_VIDEO_FILE = 'SET_VIDEO_FILE',
    SET_VIDEO_DIMENSIONS = 'SET_VIDEO_DIMENSIONS',
    SET_VIDEO_REF = 'SET_VIDEO_REF',
    SET_VIDEO_VOLUME = 'SET_VIDEO_VOLUME'
}