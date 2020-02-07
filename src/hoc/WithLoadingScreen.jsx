/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';

// Фукнция которая возвращает компонент высшего порядка
// Сама принимает оборачиваемый компонент
const withLoadingScreen = (Component) => {
  // Компонет высшего порядка
  // Оборачиваем компоненты которым нужен
  // загрузочный экран пока работаем с сервером
  const WithLoadingScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);

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

// Задаем отображаемое имя в DevTools
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withLoadingScreen;
