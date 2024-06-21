import React from 'react'
import { rest } from 'msw';
import { setupServer } from 'msw/node'
// Estamos usando nuestro propio render y no el de la librería
// a su vez que reexportamos todos los demás de la librería
// De esta manera podemos importar fireEvent y screen también.
import { render, fireEvent, screen } from '../../test-utils'
import Cita from './Cita'



const citaPersonaje = [
  {
    quote: "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
    character: "Homer Simpson",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
    characterDirection: "Right",

  }
]

const citaRandom = [
  {
    quote: "Oh Yeah!",
    character: "Duffman",
    image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FDuffman.png?1497567511709",
    characterDirection: "Left"
  }
]

export const handlers = [
  rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
    const data = req.url.searchParams.get('character') ? citaPersonaje : citaRandom
    console.log('Ejecutando desde msw', data)

    return res(
      ctx.status(200),
      ctx.json(data)
    )
  })

]


const server = setupServer(...handlers)


// Habilita el mock de la API antes de las pruebas.
beforeAll(() => server.listen())


// Restablece cualquier petición en tiempo de ejecución que podamos agregar durante las pruebas.
afterEach(() => server.resetHandlers())


// Deshabilita el mock de la API después de realizar las pruebas.
afterAll(() => server.close())



// test('muestra un mensaje de error si la solicitud de usuario falla', async () => {
//   server.use(
//     rest.get('https://thesimpsonsquoteapi.glitch.me/quotes', (req, res, ctx) => {
//       return res(ctx.status(500))
//     })
//   )

//   render(<Cita />)

//   fireEvent.click(screen.getByRole('button', { name: /Obtener cita aleatoria/i }))

//   expect(await screen.findByText(/Error: Request failed with status code 500/i)).toBeInTheDocument()
// })


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

    fireEvent.change(screen.getByLabelText(/Author Cita/i) as HTMLInputElement, { target: { value: 'Homer Simpson' } })
    const boton = await screen.findByText(/Obtener Cita/i);
    fireEvent.click(boton);
    expect(await screen.findByText(/All I'm gonna use this bed for is sleeping, eating and maybe building a little fort./i)).toBeInTheDocument()
    expect(screen.getByText(/Homer Simpson/i)).toBeInTheDocument()
  })
})

describe("Al ingresar un valor numérico", () => {
  test("debería mostrar un mensaje de error", async () => {
    render(<Cita />)

    fireEvent.change(screen.getByLabelText(/Author Cita/i) as HTMLInputElement, { target: { value: '123' } })
    const boton = await screen.findByText(/Obtener Cita/i);
    fireEvent.click(boton);
    expect (await screen.findByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument()
  })
})

