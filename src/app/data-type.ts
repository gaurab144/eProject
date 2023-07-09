// thi is the interface for the sigup of seller 
export interface signUp{
    name: string,
    password: string,
    email: string,
}

// this is the interface for login of seller
export interface login{
    password: string,
    email: string,
}
 
//this interface is for products type
export interface products{
    name: string
    price: number
    category: string
    desc: string
    img: string
    id: number
}
