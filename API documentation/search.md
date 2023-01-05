## Search

### Get related products by searching keywords in the search bar

Returns all the products related to the keywords.
* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/search/keywords
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "SearchProducts": [
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
