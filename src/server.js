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
    socket.on('action', action => store.dispatch(action));
  });
}
