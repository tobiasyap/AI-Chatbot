import os
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import spacy
import string
import gensim
import re
from spacy.lang.en.stop_words import STOP_WORDS
import tika
tika.TikaClientOnly = True
from tika import parser
import sys
from pymongo import MongoClient
print("phase 1")
def spacy_tokenizer(sentence):
 
    #remove distracting single quotes
    sentence = re.sub('\'','',sentence)

    #remove digits adnd words containing digits
    sentence = re.sub('\w*\d\w*','',sentence)

    #replace extra spaces with single space
    sentence = re.sub(' +',' ',sentence)

    #remove unwanted lines starting from special charcters
    sentence = re.sub(r'\n: \'\'.*','',sentence)
    sentence = re.sub(r'\n!.*','',sentence)
    sentence = re.sub(r'^:\'\'.*','',sentence)
    
    #remove non-breaking new line characters
    sentence = re.sub(r'\n',' ',sentence)
    
    #remove punctunations
    sentence = re.sub(r'[^\w\s]',' ',sentence)
    
    #creating token object
    tokens = spacy_nlp(sentence)
    
    #lower, strip and lemmatize
    tokens = [word.lemma_.lower().strip() if word.lemma_ != "-PRON-" else word.lower_ for word in tokens]
    
    #remove stopwords, and exclude words less than 2 characters
    tokens = [word for word in tokens if word not in stop_words and word not in punctuations and len(word) > 2]
    
    #return tokens
    return tokens

spacy_nlp = spacy.load('en_core_web_sm')

#create list of punctuations and stopwords
punctuations = string.punctuation
stop_words = spacy.lang.en.stop_words.STOP_WORDS

##FILE STORAGE DIRECTORY
source_directory = os.path.abspath(__file__ + "/../../../frontend/public/files/")

client = MongoClient('mongodb://localhost:27017/test_db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')
result = client['FS_Filesystem_Database']['filesystems'].find(filter={})
docs_name = list(result)
df2 = pd.DataFrame(docs_name)


def add_file(file_name):
    print("Running add_file")
    for title in df2['doc_no']:
        if file_name[:16] == title[:16]:
            myquery = { "doc_no": title }
            tempcollection = client['FS_Filesystem_Database']['filesystems']
            if tempcollection.count_documents(myquery, limit=1) > 0:
                tempcollection.delete_one(myquery)

    if file_name[-3:] != "doc" and file_name[-4:] != "docx" or file_name[0] == "~":
        continue
    lst = [file_name.split('.doc')[0]]
    parsed = parser.from_file(source_directory+"/"+ file_name, 'http://localhost:41000/')
    text = parsed["content"]

    name = lst[0]
    temp = text.split(name.replace('_','/').replace('V','/').replace('//','/').replace(' ',''))

    clean_text = spacy_tokenizer(text)

    clean_text = ' '.join(clean_text)
    print(text)
    print(clean_text + "nothing")
    return clean_text

if __name__ == '__main__':
    print("hello!!!")
    print(sys.argv[1])
    print(add_file(sys.argv[1]))
    sys.stdout.flush()