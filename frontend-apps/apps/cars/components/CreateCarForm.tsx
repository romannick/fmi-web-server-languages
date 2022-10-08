import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Form from '@components/Input/Form/Form'
import TextInput from '@components/Input/TextInput/TextInput'
import Button from '@components/Input/Button/Button'
import { fetchPost, formatPayload } from '@utils/fetch'
import { mutate } from 'swr'

import config from '../config/config'

const CreateCarForm: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [brand, setBrand] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [license, setLicense] = useState<string>('')

  const onSubmit = async () => {
    await fetchPost(
      `${config.gatewayApi}/v1/cars/create`,
      formatPayload({
        body: {
          name,
          brand,
          model,
          year,
          license
        }
      })
    )
    await mutate(`${config.gatewayApi}/v1/cars/all`)

    toast.success('Successfully created a new car!')

    setName('')
    setBrand('')
    setModel('')
    setYear('')
    setLicense('')
  }

  return (
    <Form title="Create a car" className="mt-2">
      <TextInput labelLeft="Name:" value={name} onChange={setName} />
      <TextInput labelLeft="Brand:" value={brand} onChange={setBrand} />
      <TextInput labelLeft="Model:" value={model} onChange={setModel} />
      <TextInput labelLeft="Year:" value={year} onChange={setYear} />
      <TextInput labelLeft="License:" value={license} onChange={setLicense} />
      <Button className="mt-4 m-auto" text="Create Car" size="md" onClick={onSubmit} />
    </Form>
  )
}

export default CreateCarForm
