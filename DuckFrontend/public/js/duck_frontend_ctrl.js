duck_frontend_app.controller('duck_frontend_ctrl', function ($scope, $http)
{
    $scope.id = '';
    $scope.first_name = '';
    $scope.last_name = '';
    $scope.email = '';
    $scope.incomplete = false;
    $scope.open_form = false;
    $scope.ducks;
    $scope.operation = '';

    /* get ducks. */
    $scope.get_ducks = function()
    {
        // define get request.
        var request = {
            method: 'get',
            url: "http://localhost:8080",
            headers: {'Content-type': 'application/json'}
        };
        
        // call server.
        $http(request).then(function(response)
        {
            $scope.ducks = response.data;
        });
    };
    
    /* post ducks. */
    $scope.post_ducks = function()
    {
        // define post request.
        var request = {
            method: 'post',
            url: "http://localhost:8080",
            headers: {'Content-type': 'application/json'},
            data: $scope.ducks
        };
        
        // call server.
        $http(request).then(function(response)
        {
            $scope.users = response.data;
        });
    };
    
    // get ducks via server.
    $scope.get_ducks();
    
    /* create. */
    $scope.create = function()
    {
        // open form.
        $scope.open_form = true;
        
        // set operation.
        $scope.operation = "CREATE";

        // set information status.
        $scope.incomplete = true;
        
        // reset values.
        $scope.id = '';
        $scope.first_name = '';
        $scope.last_name = '';
    };

    /* update. */
    $scope.update = function(id)
    {
        // open form.
        $scope.open_form = true;
        
        // set operation.
        $scope.operation = "UPDATE";

        // set information stauts
        $scope.incomplete = false;
        
        // set values.
        $scope.id = id;
        $scope.first_name = $scope.get_duck(id).first_name;
        $scope.last_name = $scope.get_duck(id).last_name;
    };
    
    /* save. */
    $scope.save = function()
    {
        // existing duck.
        if ($scope.operation === "UPDATE")
        {
            var modified_duck = $scope.get_duck($scope.id);
            modified_duck.first_name = $scope.first_name;
            modified_duck.last_name = $scope.last_name;
        }
        // new duck.
        else if ($scope.operation === "CREATE")
        {
            var new_duck = new Object();
            new_duck.id = $scope.get_next_id();
            new_duck.first_name = $scope.first_name;
            new_duck.last_name = $scope.last_name;
            
            $scope.ducks.push(new_duck);
        }
        
        // post changes.
        $scope.post_ducks();
        
        // close form.
        $scope.open_form = false;
    };
    
    /* delete. */
    $scope.delete = function(id)
    {
        // go through ducks.
        for (var duck_index = 0; duck_index < $scope.ducks.length; duck_index++)
        {
            // id matches.
            if (parseInt($scope.ducks[duck_index].id) === parseInt(id))
            {
                // remove duck.
                $scope.ducks.splice(duck_index, 1);
                
                // brek the loop.
                break;
            }
        }
        
        // update duck backend.
        $scope.post_ducks();

        // hide duck form.
        $scope.open_form = false;
    };
    
    /* cancel operation. */
    $scope.cancel = function()
    {
        // reset values
        $scope.id = '';
        $scope.first_name = '';
        $scope.last_name = '';
        
        // close form.
        $scope.open_form = false;
    };

    /* get duck. */
    $scope.get_duck = function (id)
    {
        for (var duck_index = 0; duck_index < $scope.ducks.length; duck_index++)
        {
            if ($scope.ducks[duck_index].id === id)
            {
                return $scope.ducks[duck_index];
            }
        }
    };
    
    /* get next id. */
    $scope.get_next_id = function()
    {
        var highest_id = 0;
        
        for (var duck_index = 0; duck_index < $scope.ducks.length; duck_index++)
        {
            if ($scope.ducks[duck_index].id > highest_id)
            {
                highest_id = $scope.ducks[duck_index].id;
            }
        }
        
        highest_id++;
        
        return highest_id;
    };

    /* watch for first_name. */
    $scope.$watch('first_name', function () {
        $scope.test();
    });
    
    /* watch for last_name. */
    $scope.$watch('last_name', function () {
        $scope.test();
    });

    /* test duck input. */
    $scope.test = function ()
    {
        if ($scope.first_name.length && $scope.last_name.length)
        {
            $scope.incomplete = false;
        }
        else
        {
            $scope.incomplete = true;
        }
        
        console.log($scope.incomplete);
    };
}); 