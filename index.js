import makeStore from './src/store';
import startServer from './src/server';

// Create a store and export it
export const store = makeStore();
startServer(store);

// Set our initial state
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
