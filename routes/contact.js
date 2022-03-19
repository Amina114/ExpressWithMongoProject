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
router.get('/getbyid/:id',function(req, res , next) {
    const ident = (req.params.id).trim() ; 
    Contact.findById(ident).then(data=>{
        if(!data){
            res.status(404).send({message : "Not found contact with id" + ident}) ; 
        }else
        res.send(data)
    }); 
   });

// ajouter
router.get('/addform', function(req, res, next) {
    
        res.render('add.twig') ; 
});

router.post('/addaction' , function(req, res, next){
    var c = new Contact({
        FullName :  req.body.FullName , 
        Phone :  req.body.Phone 

    }); 
    c.save(); 
    res.redirect("/contact/contact2")
})

//update
router.get('/update',function(req, res , next) {
    res.render('update.twig') ; 
   });
router.put('/updateaction/:id', function(req, res, next) {
    var c = req.body ; 
    var ident = (req.params.id).trim() ; 
    Contact.findByIdAndUpdate(ident, c , {useFindAndModify:false}).then(data=>{
        res.send(data) ; 
    })
  
});

//update
router.get('/update',function(req, res , next) {
   res.render('update.twig') ; 
  });

router.put('/updateaction', function(req, res){
    res.send('here') ; 
    /*
    
    var collection = db.get('contacts');
    var FullName = req.body.FullName ; 
    console.log(FullName) ; 
    var item = {
        FullName: req.body.FullName,
        Phone: req.body.Phone
    };
    var id = req.params.id;
    collection.update(
    {_id: id}, {
        $set: item
    });
    res.redirect('/contact/contact2');
    */
});


//delete
router.get('/delete/:id', function(req, res, next) {
    var ident = req.params.id ; 
    Contact.findOneAndRemove({_id : ident} , function(err){
        res.redirect('/contact/contact2') ; 
    })
});








module.exports = router;
