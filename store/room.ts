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
    },
    async addRoom(room: Room): Promise<void | boolean> {
      try {
        await RoomService.addRoom(room)
        useSnackbar({ message: '会議室の情報を登録しました。' })
        return true
      } catch (_) {
        useSnackbar({
          status: false,
          message: '会議室の情報を登録できませんでした。'
        })
      }
    },
    async editRoom(roomId: number, room: Room): Promise<void | boolean> {
      try {
        await RoomService.editRoom(roomId, room)
        useSnackbar({ message: '会議室を更新しました。' })
        return true
      } catch (_) {
        useSnackbar({
          status: false,
          message: '会議室を更新出来ませんでした。'
        })
      }
    },
    async deleteRoom(roomId: number): Promise<void | boolean> {
      try {
        await RoomService.deleteRoom(roomId)
        useSnackbar({ message: ' 会議室を削除しました。' })
        return true
      } catch (_) {
        useSnackbar({
          status: false,
          message: '会議室を削除出来ませんでした。'
        })
      }
    }
  }
})
