import React from 'react';
import { INoticiasNormalizadas } from './Noticias';
import { SuscribeImage, CloseButton as Close } from "../../assets";
import {
    ContenedorModal,
    TarjetaModal,
    CloseButton,
    ImagenModal,
    CotenedorTexto,
    TituloModal,
    DescripcionModal,
    BotonSuscribir
} from "./styled"

interface ModalPremiumProps {

    setModal: (value: INoticiasNormalizadas | null) => void;

}


export const NoticiaModalPremium: React.FC<ModalPremiumProps> = ({ setModal }) => {

    return (
        <ContenedorModal>
            <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                    <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                    <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                    <DescripcionModal>
                        Suscríbete a nuestro newsletter y recibe noticias de
                        nuestros personajes favoritos.
                    </DescripcionModal>
                    <BotonSuscribir
                        onClick={() =>
                            setTimeout(() => {
                                alert("Suscripto!");
                                setModal(null);
                            }, 1000)
                        }
                    >
                        Suscríbete
                    </BotonSuscribir>
                </CotenedorTexto>
            </TarjetaModal>
        </ContenedorModal>
    );
};