## **User API Spec**


|method|endpoint|Ket|
|:---:|:---|:---:|
|POST|_/api/users_|REGISTER|
|POST|_/api/users/login_|LOGIN|
|PATCH|_/api/users/current_|UPDATE USERS|
|GET|_/api/users/_|GET USERS|
|DELETE|_/api/users/logout_|LOGOUT|



## **REGISTER**
- **POST** - _/api/users_
  
- **Request Body**
    ```json
    {
        "username" : "zakikamil",
        "password" : "rahasia",
        "name" : "Zakiyudin Kamil Fikri"
    }
    ```

- **Response Body Success**
  ```json
  {
        "data" : {
            "username" : "zakikamil",
            "password" : "rahasia",
        }
  }
  ```

- **Response Body Failed**
  ```json
  {
        "error" : "username alredy registered"
  }
  ```


## **LOGIN**

- **POST** - _/api/users/login_
- **Request Body**
  ```json
  {
    "username" : "zakikamil",
    "password" : "rahasia"
  }
  ```

- **Response Body Success**
  ```json
  {
    "data" : {
        "token" : "jakjsjjKJAKKJskjaksdj18392" //uniqe token
    }
  }
  ```

- **Response Body Failed**
  ```json
  {
    "error" : "username & password are wrong"
  }
  ```

## **UPDATE USER**

- **PATCH** - _/api/users/current_
- **HEADERS :**
  - Authorization : Token
- **Request Body**
  ```json
  {
    "name" : "Zakiyudin Kamil Fikri Edit", //OPTIONAL
    "password" : "rahasia123" //OPTIONAL
  }
  ```
- **Response Body Success**
  ```json
  {
    "data" : {
        "name" : "Zakiyudin Kamil Fikri Edit"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "Name length Max 100"
  }
  ```


## **GET USER**

- **PATCH** - _/api/users_
- **HEADERS :**
  - Authorization : Token

- **Response Body Success**
  ```json
  {
    "data" : {
        "username" : "zakikamil",
        "name" : "Zakiyudin Kamil Fikri"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "Unauthorize token"
  }
  ```

## **LOGOUT**

- **DELETE** - _/api/users/logout_
- **HEADERS :**
  - Authorization : Token
- **Response Body Success**
  ```json
  {
    "data" : "OK"
  }
  ``` 
- **Response Body Failed**
  ```json
  {
    "error" : "Unauthorize token"
  }
  ```
