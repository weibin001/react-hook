export const root = (typeof global === 'object' && global && global.Object === Object && global) || window || {}

export const debounce = (func, wait, options) => {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  wait = +wait || 0

  if (Object.prototype.toString.call(options) === '[object Object]') {
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(wait, +options.maxWait || 0) : maxWait
    leading = !!options.leading
    trailing = !!options.trailing
  }
  //  whether to use requestAnimationFrame
  const useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function'

  // Invoke function
  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastThis = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  // Judge condition
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    // Init call or Call time expired or Invote time expired
    return lastCallTime === undefined || timeSinceLastCall > wait || (maxing && timeSinceLastInvoke > maxWait)
  }

  // Time expired
  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  // rest time
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  // (Time expired and trailing = true) => Invoke func
  function trailingEdge(time) {
    timerId = undefined
    if (lastArgs && trailing) return invokeFunc(time)
    lastArgs = lastThis = undefined
    return result
  }

  //
  function leadingEdge(time) {
    lastInvokeTime = time
    timerId = startTimer(timerExpired, wait)
    if (leading) invokeFunc(time)
    // return leading ? invokeFunc(time) : result
    // if (leading) invokeFunc(time)
    // return leading ? invokeFunc(time) : result
  }

  // Start timer
  function startTimer(pendingFunc, wait) {
    if (useRAF) return root.requestAnimationFrame(pendingFunc)
    return setTimeout(pendingFunc, wait)
  }

  // Clear timer
  function cancelTimer(id) {
    if (useRAF) return root.cancelAnimationFrame(id)
    return clearTimeout(id)
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  // Entry
  function debounce(...rest) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)
    lastArgs = rest
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) return leadingEdge(lastCallTime)
      else if (maxing) {
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    return result
  }

  debounce.cancel = cancel

  return debounce
}

export const throttle = (func, wait, options) => {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') throw new TypeError('Expected a function')

  if (options && Object.prototype.toString.call(options) === '[object Object]') {
    leading = options.leading || false
    trailing = options.trailing || false
  }

  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  })
}
