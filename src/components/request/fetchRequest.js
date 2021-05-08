export default async function doFetch(request) {
  const url = request.url ? request.url : ''
  const body = request.body ? request.body : ''
  const type = request.type ? request.type : ''
  let data = {
      res: undefined,
      error: false,
      errorMessage: ''
  }

  if (type === "GET") {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
      const res = await response.json()
      if (res && response.ok) {
        console.log('res', res)
        data.res = res
        return data
      } else {
        data.res = res
        data.error = true
        data.errorMessage = res['error']
        return data
      }
    } catch (error) {
      data.error = true
      data.errorMessage = error
      return data
    }
  } else {
    try {
      const response = await fetch(url, {
        method: `${type}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        mode: 'cors',
      })
      const res = await response.json()
      if (res && response.ok) {
        data.res = res
        return data
      } else {
          data.res = res
        data.error = true
        data.errorMessage = res['error']
        return data
      }
  } catch (error) {
      data.error = true
      data.errorMessage = error
      return data
    }
  }
}
