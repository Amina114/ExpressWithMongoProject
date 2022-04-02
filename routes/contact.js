var express = require('express');
var router = express.Router();
var Contact = require('../model/Contact') ; 



/* GET users listing. */
router.get('/contact', function(req, res, next) {
    Contact.find(function(err , data){
        if (err) throw err ; 
        res.send(data) ; 

    })
});
router.get('/contact2', function(req, res, next) {
    Contact.find(function(err , data){

        if (err) throw err ; 
       res.render("contact.twig" , {data}) ; 

    })
});

   
//find by id
//post kkhater bech nati des valures f forualire
router.post('/search',function(req, res , next) {
   Contact.find({FullName : req.body.search , Phone : req.body.pn}, function(err , data){
       if (err) throw err ; 
       res.render("contact.twig", {data}) ; 
   }); 
   });

// ajouter
//ouvrir le fichier 
router.get('/addform', function(req, res, next) {
    
        res.render('add.twig') ; 
});
//action insert data eli t3aytelha f formulaire
router.post('/addaction' , function(req, res, next){
    var c = new Contact({
        FullName :  req.body.FullName , 
        Phone :  req.body.Phone 

    }); 
    c.save(); 
    res.redirect("/contact/contact2")
})


//update
router.get('/update/:id',function(req, res , next) {
    var ident = req.params.id ; 
    Contact.findById({_id : ident} , function(err , doc){
    if(err) throw err ; 
    res.render('update.twig' , {doc}) ; 
    })
  });
router.post('/updateaction' , function(req,res,next){
    var ident = req.body.id ; 
    Contact.findById({_id : ident} , function(err , doc){
        doc.FullName = req.body.FullName ; 
        doc.Phone = req.body.Phone 
        doc.save() ; 
    }) ; 
    res.redirect('/contact/contact2') ; 
})



//delete
router.get('/delete/:id', function(req, res, next) {
    var ident = req.params.id ; 
    Contact.findOneAndRemove({_id : ident} , function(err){
        res.redirect('/contact/contact2') ; 
    })
});








module.exports = router;
