import React, { useState, useEffect } from 'react'
import { NavLink, Redirect, useParams } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import InfoCard from '../../components/Cards/InfoCard'
import { Card, CardBody, Button } from '@windmill/react-ui'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from '../../icons'
import RoundIcon from '../../components/RoundIcon'

import { formatWithDayOfWeek } from '../../utils/dateFormat'

import RequestService from '../../services/Request.service'

function Details() {
  const { id } = useParams()
  const [service, setService] = useState({
    service_name: '',
    status_name: '',
    department_name: '',
    environment_name: '',
    hardware_name: '',
    cpu_frecuency: '',
    cpu_architecture: '',
    cpu_cores: '',
    ram_size: '',
    storage_size: '',
    ssd: false,
    hardware_provider_name: '',
    dbms_name: '',
    dbms_version: '',
    dbms_provider_name: '',
    software_name: '',
    software_version: '',
    software_provider_name: '',
    application_name: '',
    application_version: '',
    application_provider_name: '',
    service_data: '',
    sla_file_id: '',
    sla_file_name: '',
    ola_file_id: '',
    ola_file_name: '',
    sac_file_id: '',
    sac_file_name: '',
    created_at: '',
    support_assignations: [],
    network_assignations: [],
    service_users: [],
  })
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    RequestService.get(`/services/details/${id}`).then((res) => {
      setService(res.data.service)
    })
  }, [])

  return (
    <>
      {redirect && <Redirect to='/app/services' />}

      <PageTitle>Servicio {service.service_name}</PageTitle>

      <div className='mt-8'>
        <SectionTitle>Estado</SectionTitle>
        <Card>
          <CardBody>
            <p className='font-semibold text-gray-600 dark:text-gray-300'>
              {service.status_name}
            </p>
          </CardBody>
        </Card>
      </div>

      {service.service_data && (
        <div className='mt-8'>
          <SectionTitle>Datos del servicio</SectionTitle>
          <Card>
            <CardBody>
              <p className='font-semibold text-gray-600 dark:text-gray-300'>
                {service.service_data}
              </p>
            </CardBody>
          </Card>
        </div>
      )}

      <div className='mt-8'>
        <SectionTitle>Departamento encargado</SectionTitle>
        <Card>
          <CardBody>
            <p className='font-semibold text-gray-600 dark:text-gray-300'>
              {service.department_name}
            </p>
          </CardBody>
        </Card>
      </div>

      <div className='mt-8'>
        <SectionTitle>Ambiente</SectionTitle>
        <Card>
          <CardBody>
            <p className='font-semibold text-gray-600 dark:text-gray-300'>
              {service.environment_name}
            </p>
          </CardBody>
        </Card>
      </div>

      {service.hardware_name && (
        <div className='mt-8'>
          <SectionTitle>Hardware</SectionTitle>
          <Card>
            <CardBody>
              <p className='mb-4 font-semibold text-gray-600 dark:text-gray-300'>
                {service.hardware_name}
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Fuecuencia de CPU: {service.cpu_frecuency} GHz
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Arquitectura de CPU: {service.cpu_architecture}
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Número de nucleos: {service.cpu_cores}
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Tamaño de RAM: {service.ram_size} GB
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Tamaño de almacenamiento: {service.storage_size} GB
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                SSD: {service.ssd ? 'Sí' : 'No'}
              </p>
              {service.hardware_provider_name && (
                <p className='mt-2 text-gray-600 dark:text-gray-400'>
                  Proveedor de hardware: {service.hardware_provider_name}
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {service.dbms_name && (
        <div className='mt-8'>
          <SectionTitle>DBMS</SectionTitle>
          <Card>
            <CardBody>
              <p className='mb-4 font-semibold text-gray-600 dark:text-gray-300'>
                {service.dbms_name}
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Versión: {service.dbms_version}
              </p>
              {service.dbms_provider_name && (
                <p className='mt-2 text-gray-600 dark:text-gray-400'>
                  Proveedor: {service.dbms_provider_name}
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {service.software_name && (
        <div className='mt-8'>
          <SectionTitle>Software</SectionTitle>
          <Card>
            <CardBody>
              <p className='mb-4 font-semibold text-gray-600 dark:text-gray-300'>
                {service.software_name}
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Versión: {service.software_version}
              </p>
              {service.software_provider_name && (
                <p className='mt-2 text-gray-600 dark:text-gray-400'>
                  Proveedor: {service.software_provider_name}
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {service.application_name && (
        <div className='mt-8'>
          <SectionTitle>Aplicación</SectionTitle>
          <Card>
            <CardBody>
              <p className='mb-4 font-semibold text-gray-600 dark:text-gray-300'>
                {service.application_name}
              </p>
              <p className='mt-2 text-gray-600 dark:text-gray-400'>
                Versión: {service.application_version}
              </p>
              {service.application_provider_name && (
                <p className='mt-2 text-gray-600 dark:text-gray-400'>
                  Proveedor: {service.application_provider_name}
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      {service.service_users.length > 0 && (
        <div className='mt-8'>
          <SectionTitle>Usuarios del servicio</SectionTitle>
          {service.service_users.map((user, i) => (
            <div className='mt-4' key={i}>
              <InfoCard
                title={user.department_name}
                value={user.department_description}
              >
                <RoundIcon
                  icon={PeopleIcon}
                  iconColorClass='text-orange-500 dark:text-orange-100'
                  bgColorClass='bg-orange-100 dark:bg-orange-500'
                  className='mr-4'
                />
              </InfoCard>
            </div>
          ))}
        </div>
      )}

      {service.network_assignations.length > 0 && (
        <div className='mt-8'>
          <SectionTitle>Redes que usa el servicio</SectionTitle>
          {service.network_assignations.map((network, i) => (
            <div className='mt-4' key={i}>
              <InfoCard title={network.network_name}>
                <RoundIcon
                  icon={ChatIcon}
                  iconColorClass='text-teal-500 dark:text-teal-100'
                  bgColorClass='bg-teal-100 dark:bg-teal-500'
                  className='mr-4'
                />
              </InfoCard>
            </div>
          ))}
        </div>
      )}

      {service.support_assignations.length > 0 && (
        <div className='mt-8'>
          <SectionTitle>Soporte asignado</SectionTitle>
          {service.support_assignations.map((supporter, i) => (
            <div className='mt-4' key={i}>
              <InfoCard
                title={
                  supporter.supporter_type_name === 'equipo'
                    ? supporter.team_name
                    : supporter.provider_name
                }
              >
                <RoundIcon
                  icon={CartIcon}
                  iconColorClass='text-blue-500 dark:text-blue-100'
                  bgColorClass='bg-blue-100 dark:bg-blue-500'
                  className='mr-4'
                />
              </InfoCard>
            </div>
          ))}
        </div>
      )}

      <div className='flex justify-around mt-6'>
        <a
          className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10'
          href={`${process.env.REACT_APP_API_URL}/files/${service.sla_file_id}`}
          target='_blank'
        >
          {service.sla_file_name}
        </a>
        <a
          className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10'
          href={`${process.env.REACT_APP_API_URL}/files/${service.ola_file_id}`}
          target='_blank'
        >
          {service.ola_file_name}
        </a>
        <a
          className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10'
          href={`${process.env.REACT_APP_API_URL}/files/${service.sac_file_id}`}
          target='_blank'
        >
          {service.sac_file_name}
        </a>
      </div>

      <div className='flex justify-center my-8'>
        <p className='text-gray-600 dark:text-gray-300'>
          Servicio creado el {formatWithDayOfWeek(service.created_at)}
        </p>
      </div>
    </>
  )
}

export default Details
