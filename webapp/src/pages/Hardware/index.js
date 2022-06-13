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

function Hardware() {
  const [hardware, setHardware] = useState([])

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1)

  // setup data for every table
  const [dataTable, setDataTable] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = hardware.length

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p)
  }

  // fetch data from API
  useEffect(() => {
    RequestService.get('/hardware').then((res) => {
      setHardware(res.data)
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
      hardware.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    )
  }, [pageTable])

  return (
    <>
      <PageTitle>Hardware</PageTitle>

      <div className='my-6'>
        <NavLink to='/app/hardware/add' className='mr-4'>
          <Button onClick={() => {}}>
            Añadir hardware
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
              <TableCell>Frecuencia del procesador</TableCell>
              <TableCell>Arquitectura del procesador</TableCell>
              <TableCell>Nucleos del procesador</TableCell>
              <TableCell>Memoria RAM</TableCell>
              <TableCell>Almacenamiento</TableCell>
              <TableCell>SSD</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Fecha de adición</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((_hardware, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <p className='font-semibold'>
                      {_hardware.hardware_name}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {_hardware.cpu_frecuency} GHz
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {_hardware.cpu_architecture}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {_hardware.cpu_cores}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {_hardware.ram_size} GB
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {_hardware.storage_size} GB
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {_hardware.ssd ? "Si" : "No"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {_hardware.provider_name || "Ninguno"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {new Date(_hardware.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-4'>
                    <NavLink to={`/app/hardware/edit/${_hardware.hardware_id}`}>
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

export default Hardware
