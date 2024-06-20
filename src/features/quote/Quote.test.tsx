import React from 'react'
import { HttpResponse, http, delay } from 'msw';
import { setupServer } from 'msw/node'
// Estamos usando nuestro propio render y no el de la librería
// a su vez que reexportamos todos los demás de la librería
// De esta manera podemos importar fireEvent y screen también.
import { render, fireEvent, screen } from '../../test-utils'
import Cita from './Cita'


export const handlers = [
 http.get('https://thesimpsonsquoteapi.glitch.me/quotes', async() => {
   const quote = {
    "quote": "Oh Yeah!",
    "character": "Duffman",
    "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FDuffman.png?1497567511709",
    "characterDirection": "Left"
  }
  const mockResponse = {Search: quote} 
   await delay(150)
   return HttpResponse.json(mockResponse)
 })
]


const server = setupServer(...handlers)


// Habilita el mock de la API antes de las pruebas.
beforeAll(() => server.listen())


// Restablece cualquier petición en tiempo de ejecución que podamos agregar durante las pruebas.
afterEach(() => server.resetHandlers())


// Deshabilita el mock de la API después de realizar las pruebas.
afterAll(() => server.close())

jest.mock("./Cita", () => () => <div>MockedCita</div>)


test('muestra un mensaje de error si la solicitud de usuario falla', async () => {
 server.use(
   http.get('https://thesimpsonsquoteapi.glitch.me/quotes', async() => {
    return new HttpResponse(null, {
        status: 500,
      })
   })
 )

 render(<Cita />)

 fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))

 expect(await screen.findByText(/Error: Request failed with status code 500/i)).toBeInTheDocument()
})


describe("Al presionar el botón 'Obtener cita aleatoria'", () => {
 test("debería mostrar la cita", async () => {
   render(<Cita />)

   fireEvent.click(screen.getByRole('button', { name: /Obtener cita aleatoria/i }))

   expect(await screen.findByText(/Oh Yeah!/i)).toBeInTheDocument()
   expect(screen.getByText(/Duffman/i)).toBeInTheDocument()
 })
})

describe("Al ingresar un personaje y presionar el botón 'Obtener cita'", () => {
    test("debería mostrar una cita de ese personaje", async () => {
        render(<Cita />)
    
        fireEvent.change(screen.getByLabelText(/Author Cita/i) as HTMLInputElement, { target: { value: 'Duffman' } })
        expect((screen.getByLabelText(/Author Cita/i) as HTMLInputElement).value).toBe('Duffman')
    })
})

describe("Al ingresar un valor numérico", () => {
    test("debería mostrar un mensaje de error", async () => {
        render(<Cita />)
    
        fireEvent.change(screen.getByLabelText(/Author Cita/i) as HTMLInputElement, { target: { value: '123' } })
        expect((screen.getByLabelText(/Author Cita/i) as HTMLInputElement).value).toBe('123')
        expect( screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument()
    })
})

