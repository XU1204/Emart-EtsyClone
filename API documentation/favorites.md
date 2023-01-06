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
          "userId": 1,
          "productId": 1,
          "Product": {
            "id": 1,
            "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
            "description": "Infant Toy",
            "avalibility": 10,
            "sellerId": 1,
            "categoryId": 5,
            "price": 30.99,
            "previewImage": "image url",
          },
          "User": {
            "id": 1,
            "username": "johndoe",
            "email": "john@doe.com",
          }
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
      "productId": 1
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
      "userId": 1,
      "productId": 1,
      "Product": {
        "id": 1,
        "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
        "description": "Infant Toy",
        "avalibility": 10,
        "sellerId": 1,
        "categoryId": 5,
        "price": 30.99,
        "previewImage": "image url",
      },
      "User": {
        "id": 1,
        "username": "johndoe",
        "email": "john@doe.com",
      }
    }
    ```


### Delete a product from user's favorite list

Delete an existing favorite product

* Require Authentication: true
* Require proper authorization: Product must belong to the current user.
* Request
  * Method: DELETE
  * URL: /api/favorites/:favoriteId
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
