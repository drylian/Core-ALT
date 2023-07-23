import { action } from 'easy-peasy';

const progress = {
    continuous: false,
    progress: undefined,

    startContinuous: action(state => {
        state.continuous = true;
    }),

    setProgress: action((state, payload) => {
        state.progress = payload;
    }),

    setComplete: action(state => {
        if (state.progress) {
            state.progress = 100;
        }

        state.continuous = false;
    }),
};

export default progress;