import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // The function runs after every action is applied
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // Send clients the current state when they connect
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('state', store.getState().toJS());
    // creates a new function that, when called, has its 'this' set to the store
    // Calls the dispatch function passing the action sent by the client
    // Using bind ensures the dispatch function is bound to the store
    socket.on('action', store.dispatch.bind(store));
  });
}
