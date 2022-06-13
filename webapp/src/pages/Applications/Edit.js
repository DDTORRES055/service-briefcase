import React, { useState, useEffect } from 'react'
import { NavLink, Redirect, useParams } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button, Select } from '@windmill/react-ui'

import { Spinner } from '../../icons'

import RequestService from '../../services/Request.service'

function Edit() {
  const { id } = useParams()
  const [application, setApplication] = useState({
    application_name: '',
    application_version: '',
    provider_id: '',
  })
  const [providers, setProviders] = useState([])
  const [processing, setProcessing] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    RequestService.get(`/applications/${id}`).then((res) => {
      setApplication(res.data.application)
    })
    RequestService.get('/providers').then((res) => {
      setProviders(res.data)
    })
  }, [])

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setProcessing(true)
    RequestService.put(`/applications/${id}`, {
      ...application,
      provider_id: application.provider_id || null,
    }).then((res) => {
      setProcessing(false)
      setRedirect(true)
      console.log(res)
    })
  }

  return (
    <>
      {redirect && <Redirect to='/app/applications' />}

      <PageTitle>Editar aplicación</PageTitle>

      <form
        className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Nombre</span>
          <Input
            name='application_name'
            className='mt-1'
            placeholder='Aplicación...'
            required
            value={application.application_name}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Versión</span>
          <Input
            name='application_version'
            className='mt-1'
            placeholder='Añade la version de la aplicación'
            required
            value={application.application_version}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Proveedor</span>
          <Select
            name='provider_id'
            className='mt-1'
            value={application.provider_id}
            onChange={handleChange}
          >
            <option value=''>Ninguno</option>
            {providers.map((provider) => (
              <option key={provider.provider_id} value={provider.provider_id}>
                {provider.provider_name}
              </option>
            ))}
          </Select>
        </Label>
        <div className='flex justify-end mt-6'>
          <NavLink to='/app/applications'>
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

export default Edit
