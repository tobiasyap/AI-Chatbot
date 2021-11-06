# Requires the PyMongo package.
# https://api.mongodb.com/python/current
from pymongo import MongoClient

doc_no = input("Type in the document number you want to delete (eg: RSE/SD/FS/02/520)")
if type(doc_no) != str:
    doc_no = str(doc_no)
client = MongoClient('mongodb://localhost:27017/test_db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')
myquery = { "doc_no": doc_no }
tempcollection = client['test_db']['filesystems']
if tempcollection.count_documents(myquery, limit=1) > 0:
    tempcollection.delete_one(myquery)
    print("File {} Deleted from Database".format(doc_no))
else:
    print("File {} Not found in Database".format(doc_no))



