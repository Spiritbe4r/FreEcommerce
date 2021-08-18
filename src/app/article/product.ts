

export class ProductPayload {
    id:number;
    name:string;
    purchase_price:number;
    price:number;
    vat:number;
    category:number;
    stock:number;
    supplier:number;
    description:string;

    constructor(id:number,name:string,purchase_price:number,price:number,vat:number,category:number,stock:number,suplier:number,description:string) {
        this.id=id;
        this.name=name;
        this.purchase_price=purchase_price;
        this.price=price;
        this.vat=vat;
        this.category=category;
        this.stock=stock;
        this.supplier=suplier;
        this.description=description;
    }

}


