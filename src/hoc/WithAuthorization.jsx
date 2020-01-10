/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */

import React from 'react';
import axios from 'axios';

const USER_KEY = 'user';

function withAuthorization(Component, apiUrl) {
  const WithAuthorization = (props) => {
    const setCurrent = (user) => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    };

    const unsetCurrent = () => {
      localStorage.removeItem(USER_KEY);
    };

    const getCurrent = () => {
      if (localStorage.getItem(USER_KEY)) {
        try {
          return JSON.parse(localStorage.getItem(USER_KEY));
        } catch (e) {
          console.error(e);
        }
      }
    };

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

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withAuthorization;
