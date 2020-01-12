/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */


import React from 'react';
import axios from 'axios';

const withCrud = (Component) => {
  const WithCrud = (props) => {
    const get = (data, setter) => {
      axios.get(data.url, {
        params: data.body,
      })
        .then((response) => {
          if (response.status === 200) {
            if (data.parsify) {
              const map = JSON.parse(response.data.hallMap);
              setter(map);
            } else {
              setter(response.data);
            }
            if (data.callback) {
              data.callback();
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

    const list = ({ url, params, callback }) => {
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
            throw new Error(error.response);
          } else if (error.request) {
            throw new Error(error.request);
          } else {
            throw new Error(error.message);
          }
        });
    };

    const add = ({
      url, body, responseType, callback,
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

    const update = ({ url, body, callback }) => {
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

    const remove = ({ url, params, callback }) => {
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

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export default withCrud;
