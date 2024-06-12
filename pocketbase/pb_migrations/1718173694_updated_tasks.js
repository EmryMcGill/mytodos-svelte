/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgsyj36aizmxhjn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ag4kai2z",
    "name": "dateString",
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
  const collection = dao.findCollectionByNameOrId("hgsyj36aizmxhjn")

  // remove
  collection.schema.removeField("ag4kai2z")

  return dao.saveCollection(collection)
})
