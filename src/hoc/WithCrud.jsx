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
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    };

    const list = (data) => {
      axios.get(data.url, {
        params: data.body,
      })
        .then((response) => {
          if (response.status === 200) {
            data.callback(response.data);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    };

    const add = (data) => {
      axios.post(
        data.url,
        data.body,
        {
          responseType: data.responseType,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            const resType = response.headers['content-type'];

            if (resType === 'image/png') {
              const res = response.data;
              const blob = new Blob([res], { type: 'image/png' });
              const url = URL.createObjectURL(blob);
              data.callback(url);
            } else {
              data.callback();
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    };

    const update = (data) => {
      axios.put(
        data.url,
        data.body,
      )
        .then((response) => {
          if (response.status === 200) {
            data.callback();
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
    };

    const remove = (data) => {
      axios.delete(
        data.url,
        {
          data: data.body,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            data.callback();
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
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
