import { createStore } from 'easy-peasy';
import flashes from './flashes';
import progress from './progress';

const state = {
    flashes,
    progress,
};

export const store = createStore(state);
