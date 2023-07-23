import { action } from 'easy-peasy';
import { httpErrorToHuman } from '../api/http';

export const flashes = {
  items: [],

  addFlash: action((state, payload) => {
    state.items.push(payload);
  }),

  addError: action((state, payload) => {
    state.items.push({ type: 'error', title: 'Error', ...payload });
  }),

  clearAndAddHttpError: action((state, payload) => {
    if (!payload.error) {
      state.items = [];
    } else {
      console.error(payload.error);

      state.items = [
        {
          type: 'error',
          title: 'Error',
          key: payload.key,
          message: httpErrorToHuman(payload.error),
        },
      ];
    }
  }),

  clearFlashes: action((state, payload) => {
    state.items = payload ? state.items.filter(flash => flash.key !== payload) : [];
  }),
};

export default flashes;
