import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Textarea, Button, Select } from '@windmill/react-ui'

import { Spinner } from '../../icons'

import RequestService from '../../services/Request.service'

function Add() {
  const [service, setService] = useState({
    service_name: '',
    status_id: '',
    owner_id: '',
    environment_id: '',
    hardware_id: '',
    dbms_id: '',
    software_id: '',
    application_id: '',
    service_data: '',
    service_sla: null,
    service_ola: null,
    service_sac: null,
    support_assignations: [],
    network_assignations: [],
    service_users: [],
  })
  const [statuses, setStatuses] = useState([])
  const [departments, setDepartments] = useState([])
  const [environments, setEnvironments] = useState([])
  const [hardwares, setHardwares] = useState([])
  const [dbmss, setDBMSS] = useState([])
  const [softwares, setSoftwares] = useState([])
  const [applications, setApplications] = useState([])
  const [supporters, setSupporters] = useState([])
  const [networks, setNetworks] = useState([])
  const [processing, setProcessing] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    RequestService.get('/statuses').then((res) => {
      setStatuses(res.data)
    })
    RequestService.get('/departments').then((res) => {
      setDepartments(res.data)
    })
    RequestService.get('/environments').then((res) => {
      setEnvironments(res.data)
    })
    RequestService.get('/hardware').then((res) => {
      setHardwares(res.data)
    })
    RequestService.get('/dbms').then((res) => {
      setDBMSS(res.data)
    })
    RequestService.get('/software').then((res) => {
      setSoftwares(res.data)
    })
    RequestService.get('/applications').then((res) => {
      setApplications(res.data)
    })
    RequestService.get('/supporters').then((res) => {
      setSupporters(res.data)
    })
    RequestService.get('/networks').then((res) => {
      setNetworks(res.data)
    })
  }, [])

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      const [type, id] = e.target.id.split('-')
      console.log(e.target.id)
      console.log({ type, id })
      if (e.target.checked) {
        setService({
          ...service,
          [type]: [...service[type], Number(id)],
        })
      } else {
        setService({
          ...service,
          [type]: service[type].filter((component) => component !== Number(id)),
        })
      }
      return
    }
    if (e.target.type === 'file') {
      setService({
        ...service,
        [e.target.name]: e.target.files[0],
      })
      return
    }
    setService({
      ...service,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)
    const response = await RequestService.post('/services', {
      ...service,
      hardware_id: service.hardware_id || null,
      dbms_id: service.dbms_id || null,
      software_id: service.software_id || null,
      application_id: service.application_id || null,
    })
    const { service_id } = response.data.service
    const formDataSla = new FormData()
    formDataSla.append('service_id', service_id)
    formDataSla.append('file_type', 'sla')
    formDataSla.append('file', service.service_sla)
    await RequestService.post('/files', formDataSla)

    const formDataOla = new FormData()
    formDataOla.append('service_id', service_id)
    formDataOla.append('file_type', 'ola')
    formDataOla.append('file', service.service_ola)
    await RequestService.post('/files', formDataOla)

    const formDataSac = new FormData()
    formDataSac.append('service_id', service_id)
    formDataSac.append('file_type', 'sac')
    formDataSac.append('file', service.service_sac)
    await RequestService.post('/files', formDataSac)
    setProcessing(false)
    setRedirect(true)
  }

  return (
    <>
      {redirect && <Redirect to='/app/services' />}

      <PageTitle>Añadir un servicio</PageTitle>

      <form
        className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Nombre</span>
          <Input
            name='service_name'
            className='mt-1'
            placeholder='Servicio...'
            required
            value={service.service_name}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Estado</span>
          <Select
            name='status_id'
            className='mt-1'
            required
            value={service.status_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {statuses.map((status) => (
              <option key={status.status_id} value={status.status_id}>
                {status.status_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className='mt-4'>
          <span>Departamento encargado</span>
          <Select
            name='owner_id'
            className='mt-1'
            required
            value={service.owner_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {departments.map((department) => (
              <option
                key={department.department_id}
                value={department.department_id}
              >
                {department.department_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className='mt-4'>
          <span>Ambiente</span>
          <Select
            name='environment_id'
            className='mt-1'
            required
            value={service.environment_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {environments.map((environment) => (
              <option
                key={environment.environment_id}
                value={environment.environment_id}
              >
                {environment.environment_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className='mt-4'>
          <span>Hardware</span>
          <Select
            name='hardware_id'
            className='mt-1'
            value={service.hardware_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {hardwares.map((hardware) => (
              <option key={hardware.hardware_id} value={hardware.hardware_id}>
                {hardware.hardware_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className='mt-4'>
          <span>DBMS</span>
          <Select
            name='dbms_id'
            className='mt-1'
            value={service.dbms_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {dbmss.map((dbms) => (
              <option key={dbms.dbms_id} value={dbms.dbms_id}>
                {dbms.dbms_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className='mt-4'>
          <span>Software</span>
          <Select
            name='software_id'
            className='mt-1'
            value={service.software_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {softwares.map((software) => (
              <option key={software.software_id} value={software.software_id}>
                {software.software_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className='mt-4'>
          <span>Aplicación</span>
          <Select
            name='application_id'
            className='mt-1'
            value={service.application_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {applications.map((application) => (
              <option
                key={application.application_id}
                value={application.application_id}
              >
                {application.application_name}
              </option>
            ))}
          </Select>
        </Label>

        <Label className='mt-4'>
          <span>Departamentos usuarios del servicio</span>
        </Label>
        {departments.length > 0 &&
          departments.map((department) => {
            return (
              <Label key={department.department_id} className='mt-4'>
                <Input
                  id={`service_users-${department.department_id}`}
                  className='mt-1'
                  type='checkbox'
                  checked={service.service_users.includes(
                    department.department_id
                  )}
                  onChange={handleChange}
                />
                <span className='ml-2'>{department.department_name}</span>
              </Label>
            )
          })}

        <Label className='mt-4'>
          <span>Equipos o Proveedores que soportan el servicio</span>
        </Label>
        {supporters.length > 0 &&
          supporters.map((supporter) => {
            return (
              <Label key={supporter.supporter_id} className='mt-4'>
                <Input
                  id={`support_assignations-${supporter.supporter_id}`}
                  className='mt-1'
                  type='checkbox'
                  checked={service.support_assignations.includes(
                    supporter.supporter_id
                  )}
                  onChange={handleChange}
                />
                <span className='ml-2'>
                  {supporter.supporter_type_name === 'equipo'
                    ? supporter.team_name
                    : supporter.provider_name}
                </span>
              </Label>
            )
          })}

        <Label className='mt-4'>
          <span>Redes que usa el servicio</span>
        </Label>
        {networks.length > 0 &&
          networks.map((network) => {
            return (
              <Label key={network.network_id} className='mt-4'>
                <Input
                  id={`network_assignations-${network.network_id}`}
                  className='mt-1'
                  type='checkbox'
                  checked={service.network_assignations.includes(
                    network.network_id
                  )}
                  onChange={handleChange}
                />
                <span className='ml-2'>{network.network_name}</span>
              </Label>
            )
          })}

        <Label className='mt-4'>
          <span>Datos</span>
          <Textarea
            name='service_data'
            className='mt-1'
            rows='3'
            placeholder='Añade los datos del servicio'
            required
            value={service.service_data}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span className='ml-2'>Documento PDF SLA</span>
          <Input
            className='mt-1'
            type='file'
            name='service_sla'
            accept='.pdf'
            required
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span className='ml-2'>Documento PDF OLA</span>
          <Input
            className='mt-1'
            type='file'
            name='service_ola'
            accept='.pdf'
            required
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span className='ml-2'>Documento PDF SAC</span>
          <Input
            className='mt-1'
            type='file'
            name='service_sac'
            accept='.pdf'
            required
            onChange={handleChange}
          />
        </Label>

        <div className='flex justify-end mt-6'>
          <NavLink to='/app/services'>
            <Button className='w-full sm:w-auto' layout='outline'>
              Cancelar
            </Button>
          </NavLink>
          <Button
            tag='label'
            htmlFor='submit-group'
            className='w-full sm:w-auto ml-4'
            disabled={processing}
          >
            {!processing ? (
              'Guardar'
            ) : (
              <>
                <span className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'>
                  <Spinner />
                </span>
                Procesando
              </>
            )}
            <input id='submit-group' className='w-0 h-0' type='submit' />
          </Button>
        </div>
      </form>
    </>
  )
}

export default Add
