/* variables. */
var fs = require('fs');
var ducks_file_name = "public/json/ducks.json";

/*
 * Read ducks from JSON file.
 * 
 * @return json
 */
module.exports.read = function()
{
    // variables.
    var json;
    
    try
    {
        // read json from file.
        json = fs.readFileSync(ducks_file_name);
        
        // return json.
        return json;
    }
    catch (exception)
    {
        // write error messages to console.
        console.log("ERROR: Reading ducks file failed!");
        console.log("ERROR: " + exception);
        
        // return undefined.
        return undefined;
    }
};

/*
 * Write ducks to JSON file.
 * 
 * @param data
 * @return json
 * 
 */
module.exports.write = function(data)
{
    // variables.
    var json;
    
    try
    {
        // write data to file.
        fs.writeFileSync(ducks_file_name, JSON.stringify(data, null, 4));
        
        // read json from file.
        json = fs.readFileSync(ducks_file_name);
        
        // return updated json.
        return json;
    }
    catch (exception)
    {
        // write error messages to console.
        console.log("ERROR: Writing ducks file failed!");
        console.log("ERROR: " + exception);
        
        // return undefined.
        return undefined;
    }
};