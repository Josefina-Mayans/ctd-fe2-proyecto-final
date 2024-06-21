import { INoticiasNormalizadas } from './Noticias';
import React from 'react';
import {
    TarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    BotonLectura
} from "./styled";

interface NoticiaCardProps {
    n: INoticiasNormalizadas;
    setModal: (value: INoticiasNormalizadas | null) => void;
    key: number;

}
//Tanto en este componente como en NoticiaModalPremium y NoticiaModalLibre se utilizan interfaces para las props 
//para poder tiparlas y que el código sea más legible y mantenible (Principio de segregación de interfaces).

const NoticiaCard: React.FC<NoticiaCardProps> = ({ n, setModal }) => {

    return (
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src={n.imagen} alt="news" />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>{n.descripcionCorta}</DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
        </TarjetaNoticia>
    );
};

export default NoticiaCard;