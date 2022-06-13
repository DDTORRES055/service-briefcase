import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Button, Select } from '@windmill/react-ui'

import { Spinner } from '../../icons'

import RequestService from '../../services/Request.service'

function Add() {
  const [hardware, setHardware] = useState({
    hardware_name: '',
    cpu_frecuency: '',
    cpu_architecture: '',
    cpu_cores: '',
    ram_size: '',
    storage_size: '',
    ssd: false,
    provider_id: '',
  })
  const [providers, setProviders] = useState([])

  const [processing, setProcessing] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    RequestService.get('/providers').then((res) => {
      setProviders(res.data)
    })
  }, [])

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setHardware({
        ...hardware,
        [e.target.name]: e.target.checked,
      })
      return
    }
    setHardware({
      ...hardware,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setProcessing(true)
    RequestService.post('/hardware', {
      ...hardware,
      provider_id: hardware.provider_id || null,
    }).then((res) => {
      setProcessing(false)
      setRedirect(true)
    })
  }

  return (
    <>
      {redirect && <Redirect to='/app/hardware' />}

      <PageTitle>Añadir un proveedor</PageTitle>

      <form
        className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'
        onSubmit={handleSubmit}
      >
        <Label className='mt-4'>
          <span>Nombre</span>
          <Input
            name='hardware_name'
            className='mt-1'
            placeholder='Hardware...'
            required
            value={hardware.hardware_name}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Frecuencia del procesador (en GHz)</span>
          <Input
            name='cpu_frecuency'
            className='mt-1'
            placeholder='3.65'
            type='number'
            min='0'
            step='0.01'
            required
            value={hardware.cpu_frecuency}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Arquitectura del procesador</span>
          <Input
            name='cpu_architecture'
            className='mt-1'
            placeholder='arm64'
            required
            value={hardware.cpu_architecture}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Número de nucleos</span>
          <Input
            name='cpu_cores'
            className='mt-1'
            placeholder='8'
            type='number'
            min='0'
            step='1'
            required
            value={hardware.cpu_cores}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Tamaño de la memoria RAM (en GB)</span>
          <Input
            name='ram_size'
            className='mt-1'
            placeholder='8'
            type='number'
            min='0'
            step='1'
            required
            value={hardware.ram_size}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Tamaño del almacenamiento (en GB)</span>
          <Input
            name='storage_size'
            className='mt-1'
            placeholder='8'
            type='number'
            min='0'
            step='1'
            required
            value={hardware.storage_size}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <Input
            name='ssd'
            className='mt-1'
            type='checkbox'
            checked={hardware.ssd}
            onChange={handleChange}
          />
          <span className='ml-2'>¿Tiene una unidad de almacenamiento SSD?</span>
        </Label>

        <Label className='mt-4'>
          <span>Proveedor</span>
          <Select
            name='provider_id'
            className='mt-1'
            value={hardware.provider_id}
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
          <NavLink to='/app/hardware'>
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
