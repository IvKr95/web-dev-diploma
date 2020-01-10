/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React, { useState } from 'react';

const withLoadingScreen = (Component) => {
  const WithLoadingScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <Component
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        {...props}
      />
    );
  };

  WithLoadingScreen.displayName = `WithLoadingScreen(${getDisplayName(Component)})`;
  return WithLoadingScreen;
};

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withLoadingScreen;
