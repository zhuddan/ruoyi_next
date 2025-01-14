import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useAppBreakpoints() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  return breakpoints
}
