# Requires the PyMongo package.
# https://api.mongodb.com/python/current
from pymongo import MongoClient
import pandas as pd
from datetime import date


client = MongoClient('mongodb://localhost:27017/test_db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')
filter={
    'boolean': 'Yes'
}
project={
    'user_query': 1,
    'feedback': 1,   
    'createdAt': 1
}

result = client['test_db']['feedbacks'].find(
  filter=filter,
  projection=project
)
df = pd.DataFrame(list(result))
today = date.today()
dn_date = today.strftime("%b_%d_%Y")
df.to_csv("feedback_data_{}.csv".format(dn_date))
