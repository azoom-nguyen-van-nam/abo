import { defineStore } from 'pinia'
import RoomService from '~~/models/room'
import { Room, GetRoomsRequest } from '~~/types/room'

type RoomState = {
  rooms: Room[]
}

export const useRoomStore = defineStore('room', {
  state: (): RoomState => ({
    rooms: []
  }),

  actions: {
    async getRooms(searchParams?: GetRoomsRequest): Promise<void> {
      const rooms: Room[] = await RoomService.getRooms(searchParams)
      this.rooms = rooms
    }
  }
})
