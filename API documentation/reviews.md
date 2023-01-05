## Reviews

### Get all Reviews by a Product's id

Returns all the reviews that belong to a product specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/products/:productId/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "Reviews": [
            {
                "id": 1,
                "reviewerId": 1,
                "productId": 1,
                "review": "This was an awesome product!",
                "stars": 5,
                "createdAt": "2021-11-19 20:39:36",
                "updatedAt": "2021-11-19 20:39:36" ,
                "Reviewer": {
                    "id": 1,
                    "username": "Demo",
                    "email": "demo@aa.io"
                },
                "Product": {
                    "id": 1,
                    "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
                    "description": "Infant Toy",
                    "avalibility": 10,
                    "sellerId": 1,
                    "categoryId": 5,
                    "price": 30.99,
                    "previewImage": "image url",
                }
            }
        ]
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```


### Get all of the Current User's Reviews

Return all of the current user's posted reviews

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/reviews/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "Reviews": [
            {
                "id": 1,
                "reviewerId": 1,
                "productId": 1,
                "review": "This was an awesome product!",
                "stars": 5,
                "createdAt": "2021-11-19 20:39:36",
                "updatedAt": "2021-11-19 20:39:36" ,
                "Reviewer": {
                    "id": 1,
                    "username": "Demo",
                    "email": "demo@aa.io"
                },
                "Product": {
                    "id": 1,
                    "name": "Yeaye Crawling Crab Baby Toy Gifts，Infant Tummy Time Toys",
                    "description": "Infant Toy",
                    "avalibility": 10,
                    "sellerId": 1,
                    "categoryId": 5,
                    "price": 30.99,
                    "previewImage": "image url",
                }
            }
        ]
    }
    ```


### Create a Review for a Product based on the Product's id

Create and return a new review for a product specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/products/:productId/reviews
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome product!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "reviewerId": 1,
        "productId": 1,
        "review": "This was an awesome product!",
        "stars": 5,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found",
      "statusCode": 404
    }
    ```


### Edit a Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /api/reviews/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome product!",
      "stars": 5,
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
        "reviewerId": 1,
        "productId": 1,
        "review": "This was an awesome product!",
        "stars": 5,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Review

Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/reviews/:reviewId
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

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```
