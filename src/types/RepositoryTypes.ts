//son las exportaciones de los tipos globales del proyecto
// y se encuentran en el archivo src/types/RepositoryTypes.ts
//esta tendra los reposito una interface generica para los repositorios 
// esta tendra los metodos de croud y los metodos de busqueda

export interface Repository< T = unknown> {
    create(data: T): Promise<T>;
    find(): Promise<T[]>;
}