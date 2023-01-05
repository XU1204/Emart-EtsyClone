## Favorites

### Get all items in current user's favorite list

Return all of the current user's favorite products

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/favorites
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Favorites": [
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


### Add a product to user's favorite list

Add a product to current user's favorite list

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/favorites
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
