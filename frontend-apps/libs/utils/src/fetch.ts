import fetch from 'isomorphic-unfetch'

export const fetchGet = async <JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init)

  try {
    const data = await res.json()

    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.')
    }

    return data
  } catch (err) {
    throw new Error('An error occurred while fetching the data.')
  }
}

export const fetchPost = async <JSON = unknown>(
  input: RequestInfo,
  payload: unknown = {}
): Promise<JSON> => {
  const res = await fetch(input, Object.assign({ method: 'POST' }, payload))
  const data = await res.json()

  if (!res.ok) {
    throw new Error('An error occurred while pushing data.')
  }

  return data
}

export const fetchPut = async <JSON = unknown>(
  input: RequestInfo,
  payload: unknown = {}
): Promise<JSON> => {
  const res = await fetch(input, Object.assign({ method: 'PUT' }, payload))
  const data = await res.json()

  if (!res.ok) {
    throw new Error('An error occurred while updating data.')
  }

  return data
}

export const fetchDelete = async <JSON = unknown>(input: RequestInfo): Promise<JSON> => {
  const res = await fetch(input, Object.assign({ method: 'DELETE' }))
  const data = await res.json()

  if (!res.ok) {
    throw new Error('An error occurred while deleting data.')
  }

  return data
}

export const formatPayload = (config: any = {}) => {
  const { body } = config

  let headers = {
    accept: 'application/json;v=1.0.3',
    'accept-language': 'en-US,en;q=0.9,bg;q=0.8',
    'access-control-allow-origin': '*',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    pragma: 'no-cache',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site'
  }

  if (config.headers) {
    headers = { ...headers, ...config.headers }
  }

  let payload = { headers }

  if (body) {
    payload['body'] = JSON.stringify(body)
  }

  return payload
}
