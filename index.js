import makeStore from './src/store';
import startServer from './src/server';

// Create a store and export it
export const store = makeStore();
startServer(store);
