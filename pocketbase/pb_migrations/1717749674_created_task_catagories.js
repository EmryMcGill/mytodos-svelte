/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ncjltar4fsz479g",
    "created": "2024-06-07 08:41:14.034Z",
    "updated": "2024-06-07 08:41:14.034Z",
    "name": "task_catagories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pkmpanng",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ncjltar4fsz479g");

  return dao.deleteCollection(collection);
})
