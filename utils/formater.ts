import { roles } from '@/constants/user'

export const formatRole = (role: 0 | 1) => {
  const [roleText] = Object.entries(roles).find(
    ([key, value]) => value === role
  ) || ['Not defined']
  return roleText
}
