export const bookingStatusText = [
  { value: 1, prop: 'tentative', title: '仮予約' },
  { value: 2, prop: 'success', title: '本予約' },
  { value: 3, prop: 'checkedIn', title: '受付済み' },
  { value: 4, prop: 'pending', title: '保留' },
  { value: 5, prop: 'paid', title: '精算済み' },
  { value: 6, prop: 'cancel', title: 'キャンセル' }
]

export const bookingStatus = {
  tentative: 1,
  success: 2,
  checkedIn: 3,
  pending: 4,
  paid: 5,
  cancel: 6
}
