const express=require('express');
const path=require('path');
const usuarios=require('./rutas/usuarioRutas');
const mongoose=require('mongoose');

//mongodb+srv://CesarValentin:<password>@cluster0.dwxse.mongodb.net/aplicacion1?retryWrites=true&w=majority


mongoose.connect('mongodb+srv://AntonioMartinez:E2wOWKayYiLCkfHH@cluster0.dokoe.mongodb.net/PictureSecurity?retryWrites=true&w=majority')
.then(()=>{
    console.log('Conectado a mongoDB')
})
.catch(()=>{
    console.log('Error al conectarse a mongoDB');
});

const app=express(); //Para el servidor

app.use('/estatico',express.static(path.join(__dirname,"webPages")));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.use('/usuarios',usuarios); //Para entra es diagonal usuarios y despues el nombre de la pagina

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('Servidor en el puerto '+port);
});