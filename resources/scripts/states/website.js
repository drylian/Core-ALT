import { action } from 'easy-peasy';

const website = {
    data: undefined,
    // Criando uma action para carregar os dados do website através da API.
    setWebsite: action((state, payload) => {
        state.data = payload;
    }),
};

export default website;