export interface CreateEventRequest {
  carId: number
  date: Date
  kilometers: number
  text: string
  periodic: boolean
  nextDate: Date
  nextChangeInKilometers: number
  createdAt: Date
  updatedAt: Date
}
