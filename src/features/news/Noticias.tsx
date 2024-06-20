import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import NoticiaCard from "./NoticiaCard"
import React from 'react';
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias
} from "./styled";
import { NoticiaModalPremium } from "./NoticiaModalPremium";
import { NoticiaModalLibre } from "./NoticiaModalLibre";

/**
 * Interface para normalizar la data de noticias.
 */
export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

/**
 * Componente que muestra una lista de noticias.
 */
const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
    * Trae data de noticias de la API y actualiza el estado.
    */
    const obtenerInformacion = async () => {
      try {
        const respuesta = await obtenerNoticias();

        const data = respuesta.map((n) => {
          /**
          * Transforma la primera letra de cada palabra en un string a mayusculas.
          * @param title - El string para pasar a mayusculas.
          * @returns El string transformado a mayusculas.
          */
          const capitalizeTitle = (title: string) => {
            return title
              .split(" ")
              .map((str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
              })
              .join(" ");
          };

          const ahora = new Date();
          const minutosTranscurridos = Math.floor(
            (ahora.getTime() - n.fecha.getTime()) / 60000
          );

          return {
            id: n.id,
            titulo: capitalizeTitle(n.titulo),
            descripcion: n.descripcion,
            fecha: `Hace ${minutosTranscurridos} minutos`,
            esPremium: n.esPremium,
            imagen: n.imagen,
            descripcionCorta: n.descripcion.substring(0, 100),
          };
        });

        setNoticias(data);
      } catch (error) {
        setError("Ocurrió un error al obtener las noticias");
      }
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      {error ? (
        <div>{error}</div>
      ) : (
        <ListaNoticias>
          {noticias.map((n) => (
            <NoticiaCard key={n.id} n={n} setModal={setModal} />
          ))}
          {modal ? (
            modal.esPremium ? (
              <NoticiaModalPremium setModal={setModal} />
            ) : (
              <NoticiaModalLibre modal={modal} setModal={setModal} />
            )
          ) : null}
        </ListaNoticias>
      )}
    </ContenedorNoticias>
  );
};


//Al refactorizar el código para que sea más fácil de leer y mantener, se crearon tres componentes adicionales: NoticiaCard, NoticiaModalLibre y NoticiaModalPremium. 
//NoticiaCard se encarga de mostrar la información de una noticia en una tarjeta, 
//mientras que NoticiaModalLibre y NoticiaModalPremium se encargan de mostrar la información de una noticia en un modal, dependiendo de si la noticia es premium o no. 
//Estos componentes se importan y se utilizan en el componente principal Noticias. 
//Eso sigue el principio de responsabilidad única y facilita la reutilización de componentes en otras partes de la aplicación, 
//por lo cual tambien sigue el principio de abierto-cerrado.

export default Noticias;
