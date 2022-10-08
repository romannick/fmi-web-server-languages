import { CarModel } from './models/car_model'
import { EventModel } from './models/event_model'

CarModel.hasMany(EventModel, { as: 'events', foreignKey: 'carId' })
EventModel.belongsTo(CarModel, { as: 'car', targetKey: 'id' })

export { CarModel, EventModel }
