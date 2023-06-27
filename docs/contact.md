# **Contact API Spec**

|method|endpoint|Ket|
|:---:|:---|:---:|
|POST|_/api/contacts_|CREATE|
|PATCH|_/api/contacts/:id_|UPDATE|
|GET|_/api/contacts/:id_|GET|
|GET|_/api/contacts/_|SEARCH|
|DELETE|_/api/contacts/:id_|REMOVE|
|GET|_/api/contacts/_|SEARCH|

## **Create Contact**
- **POST** - _/api/contacts_
- **Header**
  - **Authorization** : _token_
- **Request Body**
  ```json
  {
    "full_name" : "Zakiyudin Kamil Fikri",
    "nick_name" : "Kamil",
    "email" : "zakikamil@gmail.com",
    "phone" : "087657412312"
  }
  ```
- **Response Body Success**
  ```json
  {
    "data" : {
        "id" : 1,
        "full_name" : "Zakiyudin Kamil Fikri",
        "nick_name" : "Kamil",
        "email" : "zakikamil@gmail.com",
        "phone" : "087657412312"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "email not valid"
  }
  ```

## **Update Contact**
- **PATCH** - _/api/contacts/:id_
- **Header**
  -  **Authorization** : _token_
- **Request Body**
  ```json
  {
    "full_name" : "Zakiyudin Kamil Fikri Edit",
    "nick_name" : "Kamil Edit",
    "email" : "zakikamil@gmail.com",
    "phone" : "087657412312"
  }
  ```
- **Response Body Success**
  ```json
  {
    "data" : {
      "id" : 1,
      "full_name" : "Zakiyudin Kamil Fikri Edit",
      "nick_name" : "Kamil Edit",
      "email" : "zakikamil@gmail.com",
      "phone" : "087657412312"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "email not valid"
  }
  ```

## **Get Contact**
- **GET** - _/api/contacts/:id_
- **Header**
  -  **Authorization** : _token_
- **Request Body**
  ```json
  {
    "full_name" : "Zakiyudin Kamil Fikri Edit",
    "nick_name" : "Kamil Edit",
    "email" : "zakikamil@gmail.com",
    "phone" : "087657412312"
  }
  ```
- **Response Body Success**
  ```json
  {
    "data" : {
      "id" : 1,
      "full_name" : "Zakiyudin Kamil Fikri Edit",
      "nick_name" : "Kamil Edit",
      "email" : "zakikamil@gmail.com",
      "phone" : "087657412312"
    }
  }
  ```
- **Response Body Failed**
  ```json
  {
    "error" : "contact not found"
  }
  ```

## **Delete Contact**
- **DELETE** - _/api/contacts/:id_
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
    "error" : "contact not found"
  }
  ```

## **Search Contact**
- **GET** - _/api/contacts/_
- **Header**
  -  **Authorization** : _token_
- **Query Params** : 
  - name : search by full_name, nick_name, using like
  - email : search by email, using like
  - phone : search by phone, using like
  - page : number of page, default 1
  - size : size per page, default 10
  
- **Response Body Success**
  ```json
  {
    "data" : [
      {
        "id" : 1,
        "full_name" : "Zakiyudin Kamil Fikri Edit",
        "nick_name" : "Kamil Edit",
        "email" : "zakikamil@gmail.com",
        "phone" : "087657412312"
      },
      {
        "id" : 2,
        "full_name" : "Jhon Doe",
        "nick_name" : "Jhon",
        "email" : "jhondoe@gmail.com",
        "phone" : "0876574123444"
      },
    ],
    "pagination" : {
      "page" : 1,
      "total_page" : 5,
      "total_item" : 10
    }
  }
  ```