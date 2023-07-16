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
    quantity: undefined | number
    productId: number | undefined
}

// cart interface 
export interface cart{
    name: string
    price: number
    category: string
    desc: string
    img: string
    id: number | undefined
    quantity: undefined | number
    productId:number,
    userId:number
}

export interface priceSummary{
    price: number
    discount: number
    tax: number
    delivary: number
    total: number
}

export interface order{
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: number | undefined,
    id: number | undefined
}