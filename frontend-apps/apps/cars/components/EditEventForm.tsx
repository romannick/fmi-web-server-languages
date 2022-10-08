import React, { useState } from 'react'
import { toast } from 'react-toastify'
import useSWR, { mutate } from 'swr'

import Form from '@components/Input/Form/Form'
import TextInput from '@components/Input/TextInput/TextInput'
import Button from '@components/Input/Button/Button'
import { fetchGet, fetchPut, formatPayload } from '@utils/fetch'
import Dropdown, { SelectOption } from '@components/Input/Dropdown/Dropdown'
import DatePicker from '@components/Input/DatePicker/DatePicker'

import config from '../config/config'
import { Event } from '../pages'

const periodicDropdownOptions: SelectOption[] = [
  { value: false, label: 'yes' },
  { value: true, label: 'no' }
]

const EditEventForm: React.FC = () => {
  const { data: eventsData = [] } = useSWR<Event[]>(`${config.gatewayApi}/v1/events/all`, fetchGet)

  const [editEventId, setEditEventId] = useState<number>()
  const [carId, setCarId] = useState<string>('')
  const [date, setDate] = useState<Date>()
  const [kilometers, setKilometers] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [periodic, setPeriodic] = useState<boolean>(false)
  const [nextDate, setNextDate] = useState<Date>()
  const [nextChangeInKilometers, setNextChangeInKilometers] = useState<string>('')

  const onSubmit = async () => {
    await fetchPut(
      `${config.gatewayApi}/v1/events/${editEventId}`,
      formatPayload({
        body: {
          carId,
          date,
          kilometers: Number(kilometers),
          text,
          periodic,
          nextDate,
          nextChangeInKilometers: Number(nextChangeInKilometers)
        }
      })
    )
    await mutate(`${config.gatewayApi}/v1/cars/all`)

    toast.success(`Successfully updated event with id ${editEventId}!`)
  }

  const onEventIdChange = (id: number) => {
    setEditEventId(id)
    const event = eventsData.find((event) => event.id == id)

    setCarId(String(event.carId))
    setDate(new Date(event.date))
    setKilometers(String(event.kilometers))
    setText(event.text)
    setPeriodic(event.periodic)
    setNextDate(new Date(event.nextDate))
    setNextChangeInKilometers(String(event.nextChangeInKilometers))
  }

  const dropdownOptions: SelectOption[] = eventsData.map(({ id, text }) => ({
    value: id,
    label: text
  }))

  return (
    <Form title="Edin an event" className="mt-2">
      <Dropdown onChange={onEventIdChange} options={dropdownOptions} label="Select event" />
      <TextInput labelLeft="Car ID:" value={carId} onChange={setCarId} />
      <DatePicker labelLeft="Date:" value={date} onChange={setDate} />
      <TextInput labelLeft="Kilometers:" value={kilometers} onChange={setKilometers} />
      <TextInput labelLeft="Text:" value={text} onChange={setText} />
      <Dropdown onChange={setPeriodic} options={periodicDropdownOptions} label="Periodic" />
      <DatePicker labelLeft="Next Date:" value={nextDate} onChange={setNextDate} />
      <TextInput
        labelLeft="Next change in kilometers:"
        value={nextChangeInKilometers}
        onChange={setNextChangeInKilometers}
      />
      <Button className="mt-4 m-auto" text="Update Event" size="md" onClick={onSubmit} />
    </Form>
  )
}

export default EditEventForm
