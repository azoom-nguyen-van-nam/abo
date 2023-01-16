import { useApi } from '~~/plugins/api'
import { GetRoomsRequest, Room } from '~~/types/room'

export default class RoomService {
  static getRooms = (searchParams?: GetRoomsRequest) => {
    return useApi.aboApi.get(`rooms`, { searchParams }).json()
  }
  static addRoom = (room: Room) => {
    return useApi.aboApi.post(`rooms`, { json: room }).json()
  }
  static editRoom = (roomId: number, room: Room) => {
    return useApi.aboApi.patch(`rooms/${roomId}`, { json: room }).json()
  }
  static deleteRoom = (roomId: number) => {
    return useApi.aboApi.delete(`rooms/${roomId}`).json()
  }
}
