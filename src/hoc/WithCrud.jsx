/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import axios from 'axios';

// Фукнция которая возвращает компонент высшего порядка
// Сама принимает оборачиваемый компонент
const withCrud = (Component) => {
  // Компонет высшего порядка
  // Дает нам функции (CRUD) для работы с сервером
  const WithCrud = (props) => {
    // Получаем данные (одно вхождение ? правильно так писать вообще?)
    const get = ({
      url = '',
      body = {},
      parsify = false,
      callback = (f) => f,
    }) => {
      axios.get(
        url,
        {
          params: body,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            if (parsify) {
              const map = JSON.parse(response.data.hallMap);
              callback(map);
            } else {
              callback(response.data);
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            throw new Error(error.response);
          } else if (error.request) {
            throw new Error(error.request);
          } else {
            throw new Error(error.message);
          }
        });
    };

    // Получаем список (несколько вхождений)
    const list = ({
      url = '',
      params,
      callback = (f) => f,
    }) => {
      axios.get(
        url,
        {
          params,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            if (callback) {
              callback(response.data);
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error.message);
          }
        });
    };

    // Добавляем данные
    const add = ({
      url = '',
      body = {},
      responseType = '',
      callback = (f) => f,
    }) => {
      axios.post(
        url,
        body,
        {
          responseType,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            const resType = response.headers['content-type'];

            if (resType === 'image/png') {
              const res = response.data;
              const blob = new Blob([res], { type: 'image/png' });
              const src = URL.createObjectURL(blob);
              callback(src);
            } else {
              callback();
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            throw new Error(error.response);
          } else if (error.request) {
            throw new Error(error.request);
          } else {
            throw new Error(error.message);
          }
        });
    };

    // Обновляем
    const update = ({
      url = '',
      body = {},
      callback = (f) => f,
    }) => {
      axios.put(
        url,
        body,
      )
        .then((response) => {
          if (response.status === 200) {
            if (callback) {
              callback();
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            throw new Error(error.response);
          } else if (error.request) {
            throw new Error(error.request);
          } else {
            throw new Error(error.message);
          }
        });
    };

    // Удаляем
    const remove = ({
      url = '',
      params = {},
      callback = (f) => f,
    }) => {
      axios.delete(
        url,
        {
          params,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            if (callback) {
              callback();
            }
          }
        })
        .catch((error) => {
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
        list={list}
        get={get}
        add={add}
        update={update}
        remove={remove}
        {...props}
      />
    );
  };

  WithCrud.displayName = `WithCrud(${getDisplayName(Component)})`;
  return WithCrud;
};

// Задаем отображаемое имя в DevTools
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withCrud;
