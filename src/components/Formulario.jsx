import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #ffff;
    font-weight: 400;
    text-transform: uppercase;
    font-size: 18px;
    border-radius: 3px;
    transition: background-color .3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const monedas = [
    { id: 'USD', nombre: 'Dolar de Estados Unidos' },
    { id: 'COP', nombre: 'Peso Colombiano' },
    { id: 'EUR', nombre: 'Euro' },
    { id: 'GBP', nombre: 'Libra Esterlina' }
  ]

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
  const [criptomoneda, SelectCriptoMonedas] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map(cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })

      setCriptos(arrayCriptos)
    }
    consultarAPI()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {
      setError(true)
    }else{
      setError(false)
      setMonedas({
        moneda,
        criptomoneda
      })
    }
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>

        <SelectMonedas />
        <SelectCriptoMonedas />

        <InputSubmit
          type="submit"
          value='Cotizar'
        />
      </form>
    </>
  )
}

export default Formulario
