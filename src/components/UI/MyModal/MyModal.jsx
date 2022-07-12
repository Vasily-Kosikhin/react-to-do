import React from 'react';
import cl from './MyModal.module.css';

function MyModal({ children, visible, setVisible }) {
  const rootClasses = [cl.myModal];

  function stopDrag(e) {
    e.preventDefault();
  }

  if (visible) {
    rootClasses.push(cl.active);
  }
  return (
    <div
      className={rootClasses.join(' ')}
      onClick={() => setVisible(false)}
      draggable={true}
      onDragStart={(e) => stopDrag(e)}
    >
      <div onClick={(e) => e.stopPropagation()} className={cl.myModalContent}>
        {children}
      </div>
    </div>
  );
}
export default MyModal;
