# **Address API Spec**

|method|endpoint|Ket|
|:---:|:---|:---:|
|POST|_/api/contacts/:id/addresses_|CREATE ADRESS|
|PUT|_/api/contacts/:id/addresses/:addressId_|UPDATE ADRESS|
|GET|_/api/contacts/:id/addresses/:addressId_|GET ADRESS|
|GET|_/api/contacts/:id/addresses_|LIST ADRESS|
|DELETE|_/api/contacts/:id/addresses/:addressId_|REMOVE ADRESS|

## **Create Address**
- **POST** - _/api/contacts/:id/addresses_
- **Header**
  - **Authorization** : _token_
- **Request Body**
  ```json
  {
    "street" : "jl.ahmad yanu",
    "city" : "Surabaya",
    "province" : "Jawa Timur",
    "country" : "Indonesia",
    "postal_code" : "61345"
  }
  ```
- **Response Body Success**
  ```json
  {
    "data" : {
        "id" : 1,
        "street" : "jl.ahmad yanu",
        "city" : "Surabaya",
        "province" : "Jawa Timur",
        "country" : "Indonesia",
        "postal_code" : "61345"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "fill is required"
  }
  ```

## **Update Address**
- **PUT** - _/api/contacts/:id/addresses/:addressId_
- **Header**
  -  **Authorization** : _token_
- **Request Body**
  ```json
  {
    "street" : "jl.ahmad yanu edit",
    "city" : "Surabaya edit",
    "province" : "Jawa Timur edit",
    "country" : "Indonesia edit",
    "postal_code" : "61345 edit"
  }
  ```
- **Response Body Success**
  ```json
  {
    "data" : {
        "id" : 1,
        "street" : "jl.ahmad yanu edit",
        "city" : "Surabaya edit",
        "province" : "Jawa Timur edit",
        "country" : "Indonesia edit",
        "postal_code" : "61345 edit"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "fill required"
  }
  ```

## **Get Address**
- **GET** - _/api/contacts/:id/addresses/:addressId_
- **Header**
  -  **Authorization** : _token_

- **Response Body Success**
  ```json
  {
    "data" : {
        "id" : 1,
        "street" : "jl.ahmad yanu edit",
        "city" : "Surabaya edit",
        "province" : "Jawa Timur edit",
        "country" : "Indonesia edit",
        "postal_code" : "61345 edit"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "Address not found"
  }
  ```

## **Delete Address**
- **DELETE** - _/api/contacts/:id/addresses/:addressId_
- **Header**
  -  **Authorization** : _token_

- **Response Body Success**
  ```json
  {
    "data" : "OKE"
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "Adress not found"
  }
  ```

  ## **List Address**
- **GET** - _/api/contacts/:id/addresses_
- **Header**
  -  **Authorization** : _token_

- **Response Body Success**
  ```json
  {
    "data" : [
        {
            "id" : 1,
            "street" : "jl.ahmad yanu",
            "city" : "Surabaya",
            "province" : "Jawa Timur",
            "country" : "Indonesia",
            "postal_code" : "61345"
        },
        {
            "id" : 2,
            "street" : "jl.Baiti",
            "city" : "Surabaya",
            "province" : "Jawa Timur",
            "country" : "Indonesia",
            "postal_code" : "61345"
        }
    ]
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "Address not found"
  }
  ```