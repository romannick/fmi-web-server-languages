import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Form from '@components/Input/Form/Form'
import TextInput from '@components/Input/TextInput/TextInput'
import Button from '@components/Input/Button/Button'
import { fetchPost, formatPayload } from '@utils/fetch'
import Dropdown, { SelectOption } from '@components/Input/Dropdown/Dropdown'

import config from '../config/config'
import DatePicker from "@components/Input/DatePicker/DatePicker";
import { mutate } from "swr";

const dropdownOptions: SelectOption[] = [
  { value: false, label: 'yes' },
  { value: true, label: 'no' }
]

const CreateEventForm: React.FC = () => {
  const [carId, setCarId] = useState<string>('')
  const [date, setDate] = useState<Date>()
  const [kilometers, setKilometers] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [periodic, setPeriodic] = useState<boolean>(false)
  const [nextDate, setNextDate] = useState<Date>()
  const [nextChangeInKilometers, setNextChangeInKilometers] = useState<string>('')

  const onSubmit = async () => {
    await fetchPost(
      `${config.gatewayApi}/v1/events/create`,
      formatPayload({
        body: {
          carId: Number(carId),
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
    await mutate(`${config.gatewayApi}/v1/events/all`)

    setCarId('')
    setDate(undefined)
    setKilometers('')
    setText('')
    setPeriodic(false)
    setNextDate(undefined)
    setNextChangeInKilometers('')

    toast.success('Successfully created a new event!')
  }

  return (
    <Form title="Create an event" width={480} className="mt-2">
      <TextInput labelLeft="Car ID:" value={carId} onChange={setCarId} />
      <DatePicker labelLeft="Date:" value={date} onChange={setDate} />
      <TextInput labelLeft="Kilometers:" value={kilometers} onChange={setKilometers} />
      <TextInput labelLeft="Text:" value={text} onChange={setText} />
      <Dropdown onChange={setPeriodic} options={dropdownOptions} label="Periodic" />
      <DatePicker labelLeft="Next Date:" value={nextDate} onChange={setNextDate} />
      <TextInput
        labelLeft="Next change in kilometers:"
        value={nextChangeInKilometers}
        onChange={setNextChangeInKilometers}
      />
      <Button className="mt-4 m-auto" text="Create Event" size="md" onClick={onSubmit} />
    </Form>
  )
}

export default CreateEventForm
