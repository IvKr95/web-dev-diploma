import React from 'react';

const withModals = (Component) => {
  const WithModals = (props) => (

    <Component
      list={list}
      get={get}
      add={add}
      update={update}
      remove={remove}
      {...props}
    />
  );

  WithModals.displayName = `WithModals(${getDisplayName(Component)})`;
  return WithModals;
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withModals;
