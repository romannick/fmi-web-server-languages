import React from 'react'
import Table from '@components/Table/Table'
import Svg, { close } from '@components/Svg'
import { fetchDelete } from '@utils/fetch'
import { mutate } from 'swr'
import { toast } from 'react-toastify'

import config from '../config/config'

interface Props {
  id: number
  events: Event[]
}

const CarsExpandedRow: React.FC<Props> = ({ id, events }) => {
  const tableColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Km',
      accessor: 'kilometers',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Text',
      accessor: 'text',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Periodic',
      accessor: 'periodic',
      Cell: ({ cell: { value } }) => (value === true ? 'Yes' : 'No')
    },
    {
      Header: 'Next Date',
      accessor: 'nextDate',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Next change kms',
      accessor: 'nextChangeInKilometers',
      Cell: ({ cell: { value } }) => value
    },
    {
      Header: 'Delete',
      id: 'delete',
      Cell: ({ cell: { row } }) => (
        <Svg
          path={close}
          className="bg-red cursor-pointer"
          onClick={() => onDeleteEvent(row.original.id)}
        />
      )
    }
  ]

  const onDeleteEvent = async (id: number): Promise<void> => {
    await fetchDelete(`${config.gatewayApi}/v1/events/${id}`)
    await mutate(`${config.gatewayApi}/v1/cars/all`)

    toast.success(`Successfully deleted event with id ${id}!`)
  }

  return <Table title="Events for car" columns={tableColumns} data={events} />
}

export default CarsExpandedRow
