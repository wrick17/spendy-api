##Spendy app API Documentation

This is any API for expense management for a group of people living together.

###Base URL:

    https://spendyapi.herokuapp.com/api/v1

###Headers:

    1) Content-Type: application/json
    2) Accept: application/json

##Api:

###1) Contributor

####Routes:

#####a) Create Contributor:

Creates a new contributor.

**`POST`**

Request URL:

>/contributor



Body:

    {
	    "name": "Utsav",
	    "active": "true"
	}
Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---

#####b) Get All Contributors:

Gets all the contributors with their expenditures within a date range.

**`GET`**

Request URL:

>/contributor

>/contributor?fromDate=2015-12-20&toDate=2015-12-25

Optional query parameters: 

* fromDate (datatype: date, format: javascript compatible date),
* toDate (datatype: date, format: javascript compatible date).

Response Status:

	200
Body:

	[
	  	{
		    "_id": "567adb29c2e84d98191b996d",
		    "name": "Utsav",
		    "__v": 0,
		    "expenditure": 28,
		    "active": true
	  	},
	  	{
		    "_id": "567adf0015f1541c113073b5",
		    "name": "Pratyush",
		    "__v": 0,
		    "expenditure": 0,
		    "active": true
	  	}
	]

---
#####c) Get A Contributor:

Gets a contributor with his total expenditure.

**`GET`**

Request URL:

>/contributor/id

Response Status:

	200
Body:

	{
  		"_id": "567adb29c2e84d98191b996d",
  		"name": "Utsav",
  		"__v": 0,
  		"expenditure": 28,
  		"active": true
	}

---
#####d) Update A Contributor:

Updates a contributor.

**`PUT`**

Request URL:

>/contributor/id

Body:

    {
	    "name": "Pratyush",
	    "active": "true"
	}
Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---
#####e) Delete A Contributor:

Deletes a contributor permanently.

**`DELETE`**

Request URL:

>/contributor/id

Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---

###2) Tag

####Routes:

#####a) Create Tag:

Creates a new tag.

**`POST`**

Request URL:

>/tag



Body:

    {
    	"name": "Groceries"
	}
Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---

#####b) Get All Tags:

Gets all the tags.

**`GET`**

Request URL:

>/tag



Response Status:

	200
Body:

	[
	  	{
		    "_id": "567adb29c2e84d98191b996d",
		    "name": "Groceries"
	  	},
	  	{
		    "_id": "567adf0015f1541c113073b5",
		    "name": "Vegetables"
	  	}
	]

---
#####c) Get A Tag:

Gets a tag.

**`GET`**

Request URL:

>/tag/id

Response Status:

	200
Body:

	{
  		"_id": "567adb29c2e84d98191b996d",
  		"name": "Groceries"
	}

---
#####d) Update A Tag:

Updates a tag.

**`PUT`**

Request URL:

>/tag/id

Body:

    {
	    "name": "Grocery"
	}
Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---
#####e) Delete A Tag:

Deletes a tag permanently.

**`DELETE`**

Request URL:

>/tag/id

Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---

###2) Entry

####Routes:

#####a) Create Entry:

Creates a new entry.

**`POST`**

Request URL:

>/entry



Body:

    {
    	"item": "potato",
        "cost": "28",
        "date": "2015-12-21",
        "contributorId": "567adf0015f1541c113073b5",
        "tagId": "567adb29c2e84d98191b996d"
	}
Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---

#####b) Get All Entries:

Gets all the entries.

**`GET`**

Request URL:

>/entry



Response Status:

	200
Body:

	[
    	{
        	"_id": "567adf0015f1541c113073f1"
            "item": "potato",
            "cost": "28",
            "date": "2015-12-21",
            "contributorId": "567adf0015f1541c113073b5",
            "tagId": "567adb29c2e84d98191b996d"
        }
	]

---
#####c) Get an Entry:

Gets an entry.

**`GET`**

Request URL:

>/entry/id

Response Status:

	200
Body:

	{
  		"_id": "567adf0015f1541c113073f1"
        "item": "potato",
        "cost": "28",
        "date": "2015-12-21",
        "contributorId": "567adf0015f1541c113073b5",
        "tagId": "567adb29c2e84d98191b996d"
	}

---
#####d) Update an Entry:

Updates an entry.

**`PUT`**

Request URL:

>/entry/id

Body:

    {
	    "item": "Rice",
        "cost": "48",
        "date": "2015-12-21",
        "contributorId": "567adf0015f1541c113073b5",
        "tagId": "567adb29c2e84d98191b996d"
	}
Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---
#####e) Delete an Entry:

Deletes an entry.

**`DELETE`**

Request URL:

>/entry/id

Response Status:

	200
Body:

	{
  		"message": "Success"
	}

---