import type { NextPage } from 'next'
import React from 'react'
import useSWR, { mutate } from "swr";

import config from '../config/config'

import styles from './index.module.css'
import Table from '@components/Table/Table'
import CreateCarForm from '../components/CreateCarForm'
import { fetchDelete, fetchGet } from '@utils/fetch'
import CreateEventForm from '../components/CreateEventForm'
import CarsExpandedRow from '../components/CarsExpandedRow'
import Svg, { close } from '@components/Svg'
import { toast } from "react-toastify";
import EditEventForm from "../components/EditEventForm";

interface Car {
  id: number
  name: string
  brand: string
  model: string
  year: number
  license: string
  createdAt: Date
  updatedAt: Date
  events?: Event[]
}

export interface Event {
  id: number
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

const Home: NextPage = () => {
  const { data: carsData } = useSWR<Car[]>(`${config.gatewayApi}/v1/cars/all`, fetchGet)

  const tableColumns = [
    {
      Header: 'id',
      accessor: 'id',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Brand',
      accessor: 'brand',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Model',
      accessor: 'model',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Year',
      accessor: 'year',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'License Plate',
      accessor: 'license',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Delete',
      id: 'delete',
      Cell: ({ cell: { row } }) => (
        <Svg path={close} className="bg-red cursor-pointer" onClick={() => onDeleteCar(row.original.id)} />
      )
    }
  ]

  const onDeleteCar = async (id: number): Promise<void> => {
    await fetchDelete(`${config.gatewayApi}/v1/cars/${id}`)
    await mutate(`${config.gatewayApi}/v1/cars/all`)

    toast.success(`Successfully deleted car with id ${id}!`)
  }

  return (
    <>
      <h1 className={styles.heading}>Cars app for FMI Plovidv</h1>
      <div className={styles.content}>
        <Table
          title="All cars"
          columns={tableColumns}
          data={carsData}
          enableActionsRow
          expandedRow={(row) => (
            <CarsExpandedRow id={row.original.id} events={row.original.events} />
          )}
        />
        <CreateCarForm />
        <CreateEventForm />
        <EditEventForm/>
      </div>
    </>
  )
}

export default Home
