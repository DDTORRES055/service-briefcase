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

function Services() {
  const [services, setServices] = useState([])

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1)

  // setup data for every table
  const [dataTable, setDataTable] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = services.length

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p)
  }

  // fetch data from API
  useEffect(() => {
    RequestService.get('/services').then((res) => {
      setServices(res.data)
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
      services.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    )
  }, [pageTable])

  return (
    <>
      <PageTitle>Servicios</PageTitle>

      <div className='my-6'>
        <NavLink to='/app/services/add' className='mr-4'>
          <Button onClick={() => {}}>
            Añadir servicio
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
              <TableCell>Estado</TableCell>
              <TableCell>Encargado</TableCell>
              <TableCell>Entorno</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>DBMS</TableCell>
              <TableCell>Software</TableCell>
              <TableCell>Aplicación</TableCell>
              <TableCell>Datos</TableCell>
              <TableCell>SLA</TableCell>
              <TableCell>OLA</TableCell>
              <TableCell>SAC</TableCell>
              <TableCell>Fecha de adición</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((service, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <NavLink to={`/app/services/details/${service.service_id}`}>
                      <p className='font-semibold hover:text-purple-600'>
                        {service.service_name}
                      </p>
                    </NavLink>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>{service.status_name}</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>{service.department_name}</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>{service.environment_name}</span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.hardware_name || 'Ninguno'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.dbms_name || 'Ninguno'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.software_name || 'Ninguno'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.application_name || 'Ninguna'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.service_data || 'Ninguno'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.sla_file_name || 'Ninguno'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.ola_file_name || 'Ninguno'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {service.sac_file_name || 'Ninguno'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>
                    {new Date(service.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center space-x-4'>
                    <NavLink to={`/app/services/edit/${service.service_id}`}>
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

export default Services
