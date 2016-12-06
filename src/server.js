import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // The function runs after every action is applied
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // Send clients the current state when they connect
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    // TODO: Research this
    // dispatch 'action' events sent by the clients
    socket.on('action', store.dispatch.bind(store));
  });
}
