export class Usuario{
    id: number;
    correo: string;
    nombre: string;
    apellido: string;
    edad: number;

    constructor(id: number, nombre: string, apellido: string, edad: number, correo:string){
        this.correo = correo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.id = id;
    }
}