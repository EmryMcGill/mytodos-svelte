/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ncjltar4fsz479g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pmqnqvaf",
    "name": "color",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ncjltar4fsz479g")

  // remove
  collection.schema.removeField("pmqnqvaf")

  return dao.saveCollection(collection)
})
