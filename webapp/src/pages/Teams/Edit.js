import React, { useState, useEffect } from 'react'
import { NavLink, Redirect, useParams } from 'react-router-dom'

import PageTitle from '../../components/Typography/PageTitle'
import { Input, Label, Textarea, Button } from '@windmill/react-ui'

import { Spinner } from '../../icons'

import RequestService from '../../services/Request.service'

function Edit() {
  const { id } = useParams()
  const [team, setTeam] = useState({
    team_name: '',
    team_description: '',
  })
  const [processing, setProcessing] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    RequestService.get(`/teams/${id}`).then((res) => {
      setTeam(res.data.team)
    })
  }, [])

  const handleChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setProcessing(true)
    RequestService.put(`/teams/${id}`, team).then((res) => {
      setProcessing(false)
      setRedirect(true)
      console.log(res)
    })
  }

  return (
    <>
      {redirect && <Redirect to='/app/teams' />}

      <PageTitle>Editar equipo</PageTitle>

      <form
        className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'
        onSubmit={handleSubmit}
      >
        <Label>
          <span>Nombre</span>
          <Input
            name='team_name'
            className='mt-1'
            placeholder='Equipo...'
            required
            value={team.team_name}
            onChange={handleChange}
          />
        </Label>

        <Label className='mt-4'>
          <span>Descripción</span>
          <Textarea
            name='team_description'
            className='mt-1'
            rows='3'
            placeholder='Añade una descipción del equipo'
            required
            value={team.team_description}
            onChange={handleChange}
          />
        </Label>
        <div className='flex justify-end mt-6'>
          <NavLink to='/app/teams'>
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
