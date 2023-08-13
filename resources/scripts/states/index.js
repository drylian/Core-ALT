import { createStore } from 'easy-peasy';
import website from './website.js'
import progress from './progress.js';
const state = {
    website,
    progress
};

export const store = createStore(state);