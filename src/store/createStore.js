/**
 * Aqui ficam todas as criações de Store. Ficou em um arquivo separado pq vai
 * ficar mt grande, e aí o index do store ia ficar mt grande.
 *
 * Do jeito criado não faria sentido. Fará qnd precisarmos encapsular o
 * Reactotron junto.
 */

import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
