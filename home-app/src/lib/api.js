import qs from 'qs'

export const getStrapiURL = (path = '') => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'}${path}`
}

export const fetchAPI = async (path, urlParamsObject = {}, options = {}) => {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}
