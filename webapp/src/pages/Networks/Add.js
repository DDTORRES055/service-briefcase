import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button, Select } from '@windmill/react-ui'

import { Spinner } from '../../icons'

import RequestService from '../../services/Request.service'

function Add() {
  const [network, setNetwork] = useState({
    network_name: '',
    network_components: [],
    provider_id: '',
  })
  const [providers, setProviders] = useState([])
  const [networkComponents, setNetworkComponents] = useState([])
  const [processing, setProcessing] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    RequestService.get('/providers').then((res) => {
      setProviders(res.data)
    })
    RequestService.get('/networkComponents').then((res) => {
      setNetworkComponents(res.data)
    })
  }, [])

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        setNetwork({
          ...network,
          network_components: [
            ...network.network_components,
            Number(e.target.id),
          ],
        })
      } else {
        setNetwork({
          ...network,
          network_components: network.network_components.filter(
            (component) => component !== Number(e.target.id)
          ),
        })
      }
      return
    }
    setNetwork({
      ...network,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setProcessing(true)
    RequestService.post('/networks', {
      ...network,
      provider_id: network.provider_id || null,
    }).then((res) => {
      setProcessing(false)
      setRedirect(true)
    })
  }

  return (
    <>
      {redirect && <Redirect to='/app/networks' />}

      <PageTitle>Añadir una red</PageTitle>

      <form
        className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Nombre</span>
          <Input
            name='network_name'
            className='mt-1'
            placeholder='Red...'
            required
            value={network.network_name}
            onChange={handleChange}
          />
        </Label>

        {networkComponents.length > 0 &&
          networkComponents.map((networkComponent) => {
            return (
              <Label
                key={networkComponent.network_component_id}
                className='mt-4'
              >
                <Input
                  id={networkComponent.network_component_id}
                  className='mt-1'
                  type='checkbox'
                  checked={network.network_components.includes(
                    networkComponent.network_component_id
                  )}
                  onChange={handleChange}
                />
                <span className='ml-2'>
                  {networkComponent.network_component_name}
                </span>
              </Label>
            )
          })}

        <Label className='mt-4'>
          <span>Proveedor</span>
          <Select
            name='provider_id'
            className='mt-1'
            value={network.provider_id}
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
          <NavLink to='/app/networks'>
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
