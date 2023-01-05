import { useApi } from '~/plugins/api'
import { RoomRequest } from '@/types/Room'

export default class RoomService {
  static getRooms = (searchParams: RoomRequest = {}) => {
    return useApi.aboApi.get('room', { searchParams }).json()
  }
}
