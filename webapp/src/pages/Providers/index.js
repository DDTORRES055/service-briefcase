import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons'
import RequestService from '../../services/Request.service'

function Providers() {
  const [providers, setProviders] = useState([])

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1)

  // setup data for every table
  const [dataTable, setDataTable] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = providers.length

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p)
  }

  // fetch data from API
  useEffect(() => {
    RequestService.get('/providers').then((res) => {
      setProviders(res.data)
      setDataTable(
        res.data.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage
        )
      )
    })
  }, [])

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable(
      providers.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    )
  }, [pageTable])

  return (
    <>
      <PageTitle>Proveedores</PageTitle>

      <div className='my-6'>
        <NavLink to='/app/providers/add' className='mr-4'>
          <Button onClick={() => {}}>
            Añadir proveedor
            <span className='ml-2' aria-hidden='true'>
              +
            </span>
          </Button>
        </NavLink>
      </div>

      <TableContainer className='mb-8'>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nombre</TableCell>
              <TableCell>Descipción</TableCell>
              <TableCell>Fecha de adición</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((provider, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <p className='font-semibold'>
                      {provider.provider_name}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {provider.provider_description}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {new Date(provider.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-4'>
                    <NavLink to={`/app/providers/edit/${provider.provider_id}`}>
                      <Button layout='link' size='icon' aria-label='Edit'>
                        <EditIcon className='w-5 h-5' aria-hidden='true' />
                      </Button>
                    </NavLink>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label='Table navigation'
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Providers
