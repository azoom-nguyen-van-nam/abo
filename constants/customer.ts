import { ItemVSelection } from '~~/types/app'

const customerTypes: ItemVSelection[] = [
  { title: '法人', value: 1 },
  { title: '個人', value: 2 }
]

const targetCancelTypes: ItemVSelection[] = [
  { title: '一般', value: 1 },
  { title: '大学', value: 2 }
]

export { customerTypes, targetCancelTypes }
