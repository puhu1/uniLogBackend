# uniLogBacken

### Dependencies
Node, mysql


### Installation
//Default port set on 8085 for API

Run the following commands.

``` bash

Need to import database file from database folder
Need to configure configure.development file
Set Permission to asset folder for logger

npm install;
npm start / node build/index.js;
```

### API LIST
```
1. http://localhost:8085/api/v1/chat/create
	Description: API to add new chat info

	method : POST
	body: {
			"userId" :"<<UserId>>",
			"postMessage":"<<postMessage>>"
		}

	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": true
	}

2. http://localhost:8085/api/v1/chat/getAll
	Description: API to get all chat list of this user

	method : Get
	
	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": [{
                "chatId":<<>>,
                "userId":<<>>,
                "postMessage":<<>>,
                "createdAt":<<>>            
            },{
                "chatId":<<>>,
                "userId":<<>>,
                "postMessage":<<>>,
                "createdAt":<<>>  
            }
        ]
	}




3. http://localhost:8085/api/v1/user/login
	Description: API for login user

	method : POST
	body: {
			"email":"<<Email>>",
			"password": "<<Password>>"
		}

	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": {
	        "userId": "d21e5bfc-0f8e-4b55-9b01-1c665b3cd262",
	        "name" :"<<User Name>>",
			"email":"<<Email>>",
	    }
	}
	
4. http://localhost:8085/api/v1/user/create
	Description: API for login user

	method : POST
	body: {
			"email":"<<Email>>",
			"name":"<<Name>>",
			"password": "<<Password>>"
			"confirmPassword": "<<Password>>"
		}

	O/p:
	{
	    "status": true,
	    "statusCode": "0",
	    "statusMessage": "Success",
	    "response": {
	        "userId": "d21e5bfc-0f8e-4b55-9b01-1c665b3cd262",
	        "name" :"<<User Name>>",
			"email":"<<Email>>",
	    }
	}

```

## Contributors
```
 1. Arina
```
