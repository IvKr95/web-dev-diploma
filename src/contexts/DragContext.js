/* eslint-disable linebreak-style */
import React from 'react';

// Глобальный контекст drag&drop
const DragContext = React.createContext({
  dragging: '',
  setDragging: () => {},
  droppedIn: '',
  setDroppedIn: () => {},
});
DragContext.displayName = 'DragContext';

export default DragContext;
