const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
});

app.post('/faliure',function(req,res){
    res.redirect('/');
});

app.post('/',function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);


    const data={
        members:[
            {
                email_address:email,
                status:'subscribed',
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName  
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url='https://us21.api.mailchimp.com/3.0/lists/3f89751abd';
    const options={
        method:'POST',
        auth:'mannanhanda:a359a5bbada89630c033e189197f901bd-us21'
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+'/success.html');
        }else{
            res.sendFile(__dirname+'/faliure.html');
        };
        response.on('data',function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});


app.listen(process.env.PORT||3000,function(){
    console.log('Server is running at port 3000');
});



