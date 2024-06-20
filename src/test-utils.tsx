// Importamos las dependencias que vamos a utilizar
import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import quoteReducer from "./features/quote/citaSlice";
import { RootState } from "./app/store";
import { ESTADO_FETCH } from "./features/quote/constants";

// Creamos el custom render
const customRender = (
  ui: React.ReactElement,
{
    preloadedState,
    store = configureStore({
        reducer: {
            quote: quoteReducer,
        },
        preloadedState: { quote: preloadedState as { data: { personaje: string; cita: string; imagen: string; direccionPersonaje: string; } | null; estado: ESTADO_FETCH; } }, // Update the type of preloadedState
    }),
    ...renderOptions
}: {
    preloadedState?: { quote?: { data: { personaje: string; cita: string; imagen: string; direccionPersonaje: string; } | null; estado: ESTADO_FETCH; } | undefined; }; // Update the type of preloadedState
    store?: ReturnType<typeof configureStore>;
} = {}
) => {
  const Wrapper: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => <Provider store={store}>{children}</Provider>;

  render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
};

// re-exportamos todo
export * from "@testing-library/react";

// sobrescribimos el método render.
export { customRender as render };
