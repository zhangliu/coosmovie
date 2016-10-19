const get = async (url) => {
  const option = {
    credentials: 'include',
    method: 'get',
  }
  const res = await fetch(url, option)
  return (await res.json()).data
}

const post = async (url, data) => {
  const option = {
    credentials: 'include',
    method: 'post',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  }
  const res = await fetch(url, option)
  return (await res.json()).data
}

const put = async (url, data) => {
  const option = {
    credentials: 'include',
    method: 'put',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  }
  const res = await fetch(url, option)
  return (await res.json()).data
}

const del = async (url) => {
  const option = {
    credentials: 'include',
    method: 'delete',
  }
  const res = await fetch(url, option)
  return (await res.json()).data
}

export default {
  get,
  put,
  post,
  del,
}
