## Products

### Get all Products

Returns all the products.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/products
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
          "description": "Infant Toy",
          "avalibility": 10,
          "sellerId": 1,
          "categoryId": 5,
          "price": 30.99,
          "previewImage": "image url",
          "Seller": {
            "id": 1,
            "username": "johndoe",
            "email": "john@doe.com",
          },
          "Category": {
            "id": 1,
            "categoryName": "kids",
          },
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get all of the Current User's Product Listings

Return all of the current user's product listings

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/products/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
          "description": "Infant Toy",
          "avalibility": 10,
          "sellerId": 1,
          "categoryId": 5,
          "price": 30.99,
          "previewImage": "image url",
          "Seller": {
            "id": 1,
            "username": "johndoe",
            "email": "john@doe.com",
          },
          "Category": {
            "id": 1,
            "categoryName": "kids",
          },
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get the details of a product

Return a product's details based on the product id

* Require Authentication: False
* Request
  * Method: GET
  * URL: /api/products/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 1,
    "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
    "description": "Infant Toy",
    "avalibility": 10,
    "sellerId": 1,
    "categoryId": 5,
    "price": 30.99,
    "previewImage": "image url",
    "Seller": {
      "id": 1,
      "username": "johndoe",
      "email": "john@doe.com",
    },
    "Category": {
      "id": 1,
      "categoryName": "kids",
    },
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
  }
  ```


### Create a prodcuct listing

Create and return a new product

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/products
  * Body:

    ```json
    {
      "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
      "description": "Infant Toy",
      "avalibility": 10,
      "categoryId": 5,
      "price": 30.99,
      "previewImage": "image url",
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
      "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
      "description": "Infant Toy",
      "avalibility": 10,
      "sellerId": 1,
      "categoryId": 5,
      "price": 30.99,
      "previewImage": "image url",
      "Seller": {
        "id": 1,
        "username": "johndoe",
        "email": "john@doe.com",
      },
      "Category": {
            "id": 1,
            "categoryName": "kids",
          },
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "name": "Name required",
        "description": "Description required",
        "price": "Price is required and must be greater than 0",
        "avalibility": "Avalibility is required and must be greater than 0"
      }
    }
    ```

### Edit a product listing

Update an exisitng product.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  * Method: PUT
  * URL: /api/products/:productId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
      "description": "Infant Toy",
      "avalibility": 10,
      "categoryId": 5,
      "price": 30.99,
      "previewImage": "image url",
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
      "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
      "description": "Infant Toy",
      "avalibility": 10,
      "sellerId": 1,
      "categoryId": 5,
      "price": 30.99,
      "previewImage": "image url",
      "Seller": {
        "id": 1,
        "username": "johndoe",
        "email": "john@doe.com",
      },
      "Category": {
            "id": 1,
            "categoryName": "kids",
          },
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "name": "Name required",
        "description": "Description required",
        "price": "Price is required and must be greater than 0",
        "avalibility": "Avalibility is required and must be greater than 0"
      }
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

### Delete a product listing

Delete an existing product listing

* Require Authentication: true
* Require proper authorization: Product must belong to the current user.
* Request
  * Method: DELETE
  * URL: /api/products/:productId
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
