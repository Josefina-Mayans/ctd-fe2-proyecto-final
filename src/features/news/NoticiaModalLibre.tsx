import { INoticiasNormalizadas } from "./Noticias";
import { CloseButton as Close } from "../../assets";
import {
    ContenedorModal,
    TarjetaModal,
    CloseButton,
    ImagenModal,
    CotenedorTexto,
    TituloModal,
    DescripcionModal
} from "./styled"





interface ModalLibreProps {

    setModal: (value: INoticiasNormalizadas | null) => void;
    modal: INoticiasNormalizadas
}

export const NoticiaModalLibre: React.FC<ModalLibreProps> = ({ modal, setModal }) => {
    return (
        <ContenedorModal>
            <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                    <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={modal.imagen} alt="news-image" />
                <CotenedorTexto>
                    <TituloModal>{modal.titulo}</TituloModal>
                    <DescripcionModal>{modal.descripcion}</DescripcionModal>
                </CotenedorTexto>
            </TarjetaModal>
        </ContenedorModal>
    )
}