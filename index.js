const express = require('express');

const fs = require('fs');

const app = express();

const PORT = 8080;

const servidor = app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${servidor.address().port} `)
});

let listaProductos = [];

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }
    static productsList = [];

    save(title,price){
        Contenedor.productsList.push({'ID': Contenedor.productsList.length + 1, 'Title': title, 'Price': price})
        listaProductos.push({'ID': listaProductos.length + 1, 'Title': title, 'Price': price})
        fs.writeFileSync('./productos.txt',JSON.stringify(Contenedor.productsList) ,error =>{
            if (error) {
                console.log('Se ha producido un error al guardar el producto')
            } else {
                console.log('Guardado con exito!')
            }
        })
        return Contenedor.productsList.length;
    }

    getById(number){
        if (number-1 <= Contenedor.productsList.length){
            console.log(`Id: ${number} -`,Contenedor.productsList[number-1])
            return Contenedor.productsList[number-1]
        } else {
            console.log('Id: Null');
        }
    }


    // getAll(){
    //     for (let i = 1; i <= Contenedor.productsList.length;i++){
    //         console.log(Contenedor.productsList[i-1])
    //     }
    // }

    // deleteById(number){
    //     if (number-1 <= Contenedor.productsList.length){
    //         Contenedor.productsList.splice(number-1,number -1);
    //         fs.writeFileSync('./productos.txt',JSON.stringify(Contenedor.productsList) ,error =>{
    //         if (error) {
    //             console.log('Se ha producido un error al borrar el producto')
    //         } else {
    //             console.log(`Producto ${number} borrado con exito!`)
    //         }
    //         })
    //     } else{
    //         console.log('No hay producto para borrar.')
    //     }
    // }

    // deleteAll(){
    //     fs.unlink('./productos.txt',(error =>{
    //         if(error){
    //             console.log('Se ha producido un error')
    //         } else {
    //             while (Contenedor.productsList.length > 0){
    //                 Contenedor.productsList.pop();
    //             }
    //             console.log('Se ha borrado el archivo con exito')
    //             console.log(Contenedor.productsList)
    //         }
    //     }))
    // }
}

app.get('/', (req, res) => {
    res.send({message: `[1 - En /productos veras todos los productos.] _ [2 - En /productoRandom veras un producto al azar.]`})
    // le puse [] para que se notara la separacion de texto, no supe hacer cambio de linea. 😂
});

app.get('/productos', (req, res) => {
    res.send({listaProductos})
});

app.get('/productoRandom', (req, res) => {
    res.send({message: productos.getById(Math.floor((Math.random() * (listaProductos.length - 1 + 1)) + 1))})
});

servidor.on("error", e => console.log(`Error en servidor ${e}`))

const productos = new Contenedor('Productos.txt');
console.log(productos.save('Cuadro',30));
console.log(productos.save('Teclado',124));
console.log(productos.save('Celular',34));
console.log(productos.save('Monitor',342));
console.log(productos.save('Microfono',52));
console.log(productos.save('Mouse',1));
console.log(productos.save('Cable',93));
console.log(productos.save('Papel',58));
console.log(productos.save('Mochila',12));
console.log(productos.save('Volante',999));
// Si, son los 10 primeros productos que vi en mi habitacion jajaja
console.log(listaProductos)