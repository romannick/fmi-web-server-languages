import React, { useMemo } from 'react'
import { useExpanded, useTable, useSortBy } from 'react-table'
import classNames from 'classnames'

import sharedStyles from '../shared.module.css'

import styles from './Table.module.css'
import Spinner from '@components/Spinner/Spinner'
import { close, open } from '@components/OpenCloseIcons'

interface Props {
  title: string
  columns: any
  data: any[]
  tableWidth?: number
  className?: string
  loading?: boolean
  expandedRow?: (row) => React.ReactNode
  enableActionsRow?: boolean
}

const actionsColumn = {
  Header: 'Actions',
  width: 100,
  Cell: ({
    cell: {
      row: { isExpanded, getToggleRowExpandedProps }
    }
  }) => (
    <div className={styles.openCloseButton} {...getToggleRowExpandedProps()}>
      <span className="pt-3 pl-2">{isExpanded ? close : open}</span>
    </div>
  )
}

const Table: React.FC<Props> = ({
  title,
  columns,
  data,
  tableWidth = 850,
  className,
  loading,
  expandedRow,
  enableActionsRow
}) => {
  const tableColumns = useMemo(() => (enableActionsRow ? [...columns, actionsColumn] : columns), [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } =
    useTable(
      {
        columns: tableColumns,
        data: data || []
      },
      useSortBy,
      useExpanded
    )

  return (
    <div className={classNames(styles.tableContainer, className)}>
      <div>
        <div className={styles.tableHeader}>
          <div className={sharedStyles.title}>{title}</div>
        </div>
        <div className={styles.inner}>
          <div {...getTableProps()}>
            <table className={styles.table} style={{ width: tableWidth }} {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <th key={index} style={{ width: column.width }}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {loading ? (
                  <tr className="h-12">
                    <td colSpan={100}>
                      <Spinner />
                    </td>
                  </tr>
                ) : (
                  rows.map((row, index) => {
                    prepareRow(row)

                    return (
                      <React.Fragment key={index}>
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell, index) => (
                            <td key={index} {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                        {expandedRow && row.isExpanded && (
                          <tr className="even:bg-white odd:bg-table-brown">
                            <td colSpan={visibleColumns.length}>{expandedRow(row)}</td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
