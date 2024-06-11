/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgsyj36aizmxhjn")

  // remove
  collection.schema.removeField("cjv5hhwb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4m62hwju",
    "name": "date",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cjv5hhwb",
    "name": "dueDate",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("4m62hwju")

  return dao.saveCollection(collection)
})
