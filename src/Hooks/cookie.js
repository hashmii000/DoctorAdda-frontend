import { useCallback } from 'react'
import Cookies from 'js-cookie'

export default function useCookie() {
  const setCookie = useCallback(function (cname, cvalue, exdays = 30) {
    try {
      Cookies.set(cname, cvalue, { expires: exdays, path: '/' })
      return true
    } catch (error) {
      console.error('Error setting cookie:', error)
      return false
    }
  }, [])

  const getCookie = useCallback(function (cname) {
    try {
      return Cookies.get(cname)
    } catch (error) {
      console.error('Error getting cookie:', error)
      return null
    }
  }, [])

  const removeCookie = useCallback(function (cname) {
    try {
      Cookies.remove(cname, { path: '/' })
      return true
    } catch (error) {
      console.error('Error removing cookie:', error)
      return false
    }
  }, [])

  return { setCookie, getCookie, removeCookie }
}

export const deleteCookie = function (cname) {
  try {
    document.cookie = `${cname}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    return true
  } catch (error) {
    console.error('Error deleting cookie:', error)
    return false
  }
}

// Additional cookie utility functions
export const setCookieItem = function (cname, cvalue, exdays = 30) {
  try {
    Cookies.set(cname, cvalue, { expires: exdays, path: '/' })
    return true
  } catch (error) {
    console.error('Error setting cookie:', error)
    return false
  }
}

export const getCookieItem = function (cname) {
  try {
    return Cookies.get(cname)
  } catch (error) {
    console.error('Error getting cookie:', error)
    return null
  }
}

export const removeCookieItem = function (cname) {
  try {
    Cookies.remove(cname, { path: '/' })
    return true
  } catch (error) {
    console.error('Error removing cookie:', error)
    return false
  }
}

// Clear all authentication cookies
export const clearAuthCookies = function () {
  try {
    const authCookies = ['DoctorAddaPanel', 'userMobile', 'loginTime', 'isAuthenticated', 'Token', 'UserId']
    authCookies.forEach(cookieName => {
      Cookies.remove(cookieName, { path: '/' })
    })
    return true
  } catch (error) {
    console.error('Error clearing auth cookies:', error)
    return false
  }
}
