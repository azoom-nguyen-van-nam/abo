import { useApi } from '~~/plugins/api'
import { GetRoomsRequest } from '~~/types/room'

export default class RoomService {
  static getRooms = (searchParams?: GetRoomsRequest) => {
    return useApi.aboApi.get(`rooms`, { searchParams }).json()
  }
}
