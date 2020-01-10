async function loginForm(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  }
  throw new Error(`Ошибка HTTP: ${response.status}`);
}

export default loginForm;
