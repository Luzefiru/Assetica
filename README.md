# odin-inventory-app

A MongoDB inventory database application served with an Express.js REST API.

## Database Schema

This schema was made with [QuickDBD](https://www.quickdatabasediagrams.com/) for visualizing the relationships between the Mongoose Models.

- a `category` array field can have **1 or many** `Category` objects.
- a single `Category` object can belong to **0 or many** `Item` objects at any time.
- `URL` Strings are [Mongoose Virtuals](https://mongoosejs.com/docs/tutorials/virtuals.html) that are based on the base route URL and the `Schema.Types.ObjectId`.

<img src="./docs/diagram-schema.svg" width="100%" height="300px" />

```
Item
-
_id PK Schema.Types.ObjectID
name String
description String
category [Schema.Types.ObjectID] FK >-< Category._id
price Number
in_stock Number
URL String

Category
-
_id PK Schema.Types.ObjectID
name String
description String
URL String
```
