## Shopping Cart

### Get all items in current user's shopping cart

Returns all the items.

* Require Authentication: true
* Require proper authorization: Shopping cart must belong to the current user
* Request
  * Method: GET
  * URL: /api/carts
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Carts": [
        {
            "id": 1,
            "itemId": 1,
            "userId": 2,
            "quantity": 1,
            "User": {
                "id": 1,
                "email": "john.smith@gmail.com",
                "username": "JohnSmith",
            },
            "Item":{
                "id": 1,
                "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
                "description": "Infant Toy",
                "avalibility": 10,
                "sellerId": 1,
                "categoryId": 5,
                "price": 30.99,
                "previewImage": "image url",
            },
            "createdAt": "2021-11-19 20:39:36",
            "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```


### Get the information of cartain item in shopping cart
* Require Authentication: true
* Require proper authorization: Shopping cart must belong to the current user
* Request
  * Method: GET
  * URL: /api/carts/cartId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
      {
          "id": 1,
          "itemId": 1,
          "userId": 2,
          "quantity": 1,
          "User": {
              "id": 1,
              "email": "john.smith@gmail.com",
              "username": "JohnSmith",
          },
          "Item":{
              "id": 1,
              "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
              "description": "Infant Toy",
              "avalibility": 10,
              "sellerId": 1,
              "categoryId": 5,
              "price": 30.99,
              "previewImage": "image url",
          },
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
      }
  ```
* Error response: Couldn't find a product with given product Id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product not found.",
      "statusCode": 404
    }
    ```


### Add an item to current user's shopping cart

Add and return a new item

* Require Authentication: true
* Require proper authorization: Shopping cart must belong to the current user
* Request
  * Method: POST
  * URL: /api/carts
  * Body:

    ```json
    {
        "quantity": 1,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "itemId": 1,
        "userId": 2,
        "quantity": 1,
        "User": {
          "id": 1,
          "email": "john.smith@gmail.com",
          "username": "JohnSmith",
        },
        "Item":{
          "id": 1,
          "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
          "description": "Infant Toy",
          "avalibility": 10,
          "sellerId": 1,
          "categoryId": 5,
          "price": 30.99,
          "previewImage": "image url",
        },
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
    }
    ```


### Edit quantity of items in shopping cart

Update an exisitng product.

* Require Authentication: true
* Require proper authorization: Shopping cart must belong to the current user
* Request
  * Method: PUT
  * URL: /api/carts/:cartId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "quantity": 2,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "itemId": 1,
        "userId": 2,
        "quantity": 2,
        "User": {
          "id": 1,
          "email": "john.smith@gmail.com",
          "username": "JohnSmith",
        },
        "Item": {
          "id": 1,
          "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
          "description": "Infant Toy",
          "avalibility": 10,
          "sellerId": 1,
          "categoryId": 5,
          "price": 30.99,
          "previewImage": "image url",
        },
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
    }
    ```
* Error response: Couldn't find a product with given product Id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product not found.",
      "statusCode": 404
    }
    ```


### Delete an item in shopping cart

Delete an existing product listing

* Require Authentication: true
* Require proper authorization: Product must belong to the current user.
* Request
  * Method: DELETE
  * URL: /api/carts/:cartId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a product with given product Id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product not found.",
      "statusCode": 404
    }
    ```


### Checkout shopping cart

Clear all items inside shopping cart

* Require Authentication: true
* Require proper authorization: Product must belong to the current user.
* Request
  * Method: DELETE
  * URL: /api/carts
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```
