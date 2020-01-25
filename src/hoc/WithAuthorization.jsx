/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
// Используем библиотеку axios для асинхронных запросов
import axios from 'axios';

const USER_KEY = 'user';

// Фукнция которая возвращает компонент высшего порядка
// Сама принимает оборачиваемый компонент и url куда
// посылаются запросы
function withAuthorization(Component, apiUrl) {
  // Компонет высшего порядка
  // Дает нам функции для работы с сервером
  // Также с Local Storage
  const WithAuthorization = (props) => {
    // Устанавливаем текущего пользователя в Local Storage
    const setCurrent = (user) => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    };

    // Удаляем текущего пользователя из Local Storage
    const unsetCurrent = () => {
      localStorage.removeItem(USER_KEY);
    };

    // Получаем пользователя из Local Storage
    const getCurrent = () => {
      if (localStorage.getItem(USER_KEY)) {
        try {
          return JSON.parse(localStorage.getItem(USER_KEY));
        } catch (exception) {
          console.error(exception);
        }
      }
    };

    // Получаем данные о пользователе с сервера
    // Ошибка если неудачно
    const fetch = (callback) => {
      axios.get(
        apiUrl,
        {
          params: {
            action: 'fetch',
          },
        },
      ).then((response) => {
        if (response.status === 200) {
          const currentUser = getCurrent();
          if (currentUser === undefined && response.data.success) {
            setCurrent(response.data.user);
            callback(true);
          } else if (currentUser && response.data.success === false) {
            unsetCurrent();
            callback(false);
          } else if (currentUser && response.data.success) {
            callback(true);
          } else {
            callback(false);
          }
        }
      }).catch((error) => {
        if (error.response) {
          throw new Error(error.response);
        } else if (error.request) {
          throw new Error(error.request);
        } else {
          throw new Error(error.message);
        }
      });
    };

    // Пробуем залогинить пользователя
    // Если не получается, выкидываем ошибку
    const login = (data, resolve, reject) => {
      axios.post(
        apiUrl,
        data,
      ).then((response) => {
        if (response.status === 200) {
          if (response.data.success === false) {
            reject(response.data.content);
          } else {
            setCurrent(response.data.user);
            resolve(response.data.success);
          }
        }
      }).catch((error) => {
        if (error.response) {
          throw new Error(error.response);
        } else if (error.request) {
          throw new Error(error.request);
        } else {
          throw new Error(error.message);
        }
      });
    };

    // Пробуем разлогинить пользователя
    // Если не получается, выкидываем ошибку
    const logout = (callback) => {
      const currentUser = getCurrent();
      axios.post(
        apiUrl,
        {
          userId: currentUser,
          action: 'logout',
        },
      ).then((response) => {
        if (response.status === 200) {
          if (response.data.success === true) {
            unsetCurrent();
            callback(false);
          }
        }
      }).catch((error) => {
        if (error.response) {
          throw new Error(error.response);
        } else if (error.request) {
          throw new Error(error.request);
        } else {
          throw new Error(error.message);
        }
      });
    };

    return (
      <Component
        fetch={fetch}
        login={login}
        logout={logout}
        {...props}
      />
    );
  };

  WithAuthorization.displayName = `WithAuthorization(${getDisplayName(Component)})`;
  return WithAuthorization;
}

// Задаем отображаемое имя в DevTools
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withAuthorization;
