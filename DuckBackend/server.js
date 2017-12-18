/* http server variables. */
var express = require('express');
var app = express();
var path = require('path');
var host = "0.0.0.0";
var port = "8080";

/* use case specific variables. */
var backend = require("./public/js/ducks_manager.js");
var fs = require('fs');

/* configure. */
app.all('*', function(req, res, next)
{
     var origin = req.get('origin'); 
     res.header("Access-Control-Allow-Origin", origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header("Access-Control-Allow-Headers", "Content-Type");
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
     next();
});

/*
 * Get all.
 * 
 * @param req
 * @param res
 */
app.get('/',function(req, res)
{
    // read data.
    var json = backend.read();
    
    // json content is null.
    if (json === undefined)
    {
        // return file not found (404).
        res.writeHead(404);
    }
    // json content is not null.
    else
    {
        // return ok (200).
        res.writeHead(200);
    }
    
    // return json.
    res.end(json);   
});

///* get. */
//app.get('/:id',function(req, res)
//{
//    /* write console entry. */
//    console.log("get/:id");
//    
//    /* variables. */
//    var id;
//    var entry = undefined;
//    
//    /* get id. */
//    id = req.params.id;
//    
//    /* get json. */
//    var data = json_file_manager.read("public/json/ducks.json");
//
//    /* go through entries in data. */
//    for (entry_index = 0; entry_index < data.length; entry_index++)
//    {
//        /* id matches. */
//        if (data[entry_index].id.toString() === id.toString())
//        {
//            /* store entry. */
//            entry = data[entry_index];
//        }
//    }
//    
//    /* return json. */
//    res.writeHead(200);
//    res.end(JSON.stringify(entry));   
//});

/*
 * Post
 * 
 * @param {type} req
 * @param {type} res
 */
app.post('/', function(req, res)
{
    // variables.
    var content = '';
    var json;

    // get content from request.
    req.on('data', function (data)
    {
        content += data;
    });
    
    // process content form request.
    req.on('end', function()
    {
       // write data.
       json = backend.write(JSON.parse(content));
    });
    
    // json content is null.
    if (json === undefined)
    {
        // return file not found (404).
        res.writeHead(404);
    }
    // json content is not null.
    else
    {
        // return ok (200).
        res.writeHead(200);
    }
    
    // return json.
    res.end(json);
});

//app.put('/', function(req, res)
//{
//    /* write message. */
//    console.log("SERVER: PUT/:id-method called.");
//    
//    /* variables. */
//    var id;
//    
//    /* get id. */
//    id = req.params.id;
//    
//    /* set message. */
//    var message = new Object();
//    message.message = "PUT";
//    message.id = id;
//    
//    /* return json. */
//    res.end(JSON.stringify(message));
//});

/* start server. */
var server = app.listen(port, host, function ()
{
    console.log('%s: Node server started on %s:%d ...', Date(Date.now() ), host, port);
});