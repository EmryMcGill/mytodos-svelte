/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgsyj36aizmxhjn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ryhmngih",
    "name": "catagorie",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ncjltar4fsz479g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgsyj36aizmxhjn")

  // remove
  collection.schema.removeField("ryhmngih")

  return dao.saveCollection(collection)
})
