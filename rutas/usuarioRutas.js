const{Router}=require('express');//Solo pide una cosa de un elemento de express
const ruta=Router(); 
const User=require('../modelos/usuarioModelo'); //Los objetos se escriben con una mayuscula

ruta.get('/',(req,res)=>{
    res.send('raiz de usuarios');
});

//Formulario nuevo usuario dentro de la app
ruta.get('/Registrarse',(req,res)=>{
    res.render('Registrarse');
}); 

// Guardar el usuario desde la app
ruta.post('/Registrarse', (req,res)=>{
     const user=new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
        
     });
     user.save()
     .then(()=>{
        res.redirect('https://picturesecurity.herokuapp.com/principal');
     })
     .catch((err)=>{
         res.status(400).send('Error al insertar el usuario')
     })
});

//Guarda el usuario API
ruta.post('/api/nuevoUsuario', (req,res)=>{
    const user=new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        number: req.body.number,
    });
    user.save()
    .then(()=>{
     res.json("insertado");
    })
    .catch((err)=>{
        res.json("error"); //Cambia en la forma en que se puede leer un resultado
    })
});

//Mostrar los usuarios dentro de la app 
ruta.get('/mostrarUsuarios',(req,res)=>{
    User.find({"estado":true})
    .then((usu)=>{
        console.log(usu);
        res.render('mostrarUsuarios',{usu});
    })
    .catch(()=>{
        res.status(400).send("Error al traer la informacion");
    });
});


//Mostrar usuarios con el API
ruta.get('/api/mostrarUsuarios',(req,res)=>{
    User.find({"estado":true})
    .then((usu)=>{
        res.json(usu);
    })
    .catch(()=>{
        res.json("error");
    });
});

//Buscar por id en la app
ruta.get('/buscar/:id',(req,res)=>{
     User.findById(req.params.id)
     .then((usu)=>{
        res.render('modificarUsuario',{usu});
     })
     .catch((err)=>{
         res.status(400).send("Error al recuperar el registro"+err);
     })
});

//Modificar usuario en la app
ruta.post('/modificarUsuario',(req,res)=>{  
    var id=req.body.id;
    var datos={
        nombre: req.body.nombreModificar,
        usuario: req.body.usuarioModificar, 
        password: req.body.passwordModificar
    }
    User.findByIdAndUpdate(id,datos,{new:true}) //encuentra primero un id y tambien sirve para crear nuevos registros
    .then(()=>{
       res.redirect('/usuarios/mostrarUsuarios');
    })
    .catch((err)=>{
            res.status(400).send("Error al modificar el registro"+err);
    });
});


//Buscar por id API
ruta.get('/api/buscar/:id',(req,res)=>{
    User.findById(req.params.id)
    .then((usu)=>{
       res.json(usu);
    })
    .catch((err)=>{
        res.json("error");
    })
});

//Modificar usuario en la API
ruta.post('/api/modificarUsuario',(req,res)=>{  
   var id=req.body.id;
   var datos={
       nombre: req.body.nombreModificar,
       usuario: req.body.usuarioModificar, 
       password: req.body.passwordModificar
   }
   User.findByIdAndUpdate(id,datos,{new:true}) //encuentra primero un id y tambien sirve para crear nuevos registros
   .then(()=>{
      res.json("actualizado")
   })
   .catch((err)=>{
           res.json("error");
   });
});

//Eliminar Logico usuario dentro de la app
ruta.get('/eliminar/:id',(req,res)=>{  
   User.findByIdAndDelete(req.params.id)
   .then(()=>{
       res.redirect('/usuarios/mostrarUsuarios');
   })
   .catch((err)=>{
    res.status(400).send("Error al modificar el registro"+err);
   }); 
});

//Eliminar Fisico usuario dentro de la app
ruta.get('/eliminar/:id',(req,res)=>{  
    User.findByIdAndUpdate(req.params.id)
    .then(()=>{
        res.redirect('/usuarios/mostrarUsuarios');
    })
    .catch((err)=>{
     res.status(400).send("Error al modificar el registro"+err);
    }); 
 });

 //Eliminar usuario API
ruta.get('/api/eliminar/:id',(req,res)=>{  
    User.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json("eliminado")
    })
    .catch((err)=>{
     res.json("Error");
    }); 
 });

ruta.get('/inicio',(req,res)=>{  
res.render('inicio');
});

ruta.get('/nosotros',(req,res)=>{
    
res.render('nosotros');
});

ruta.get('/blog',(req,res)=>{
    
    res.render('blog');
    });


ruta.get('/contactanos',(req,res)=>{
    
res.render('contactanos');
});




module.exports=ruta;//Para que exporte todo lo que se le aigna a la ruta