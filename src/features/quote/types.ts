export interface ICita {
  personaje: string;
  cita: string;
  imagen: string;
  direccionPersonaje: string;
}

export interface InputCita{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
