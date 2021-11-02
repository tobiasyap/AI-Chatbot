import os
# import textract
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import spacy
import string
import gensim
import re
from spacy.lang.en.stop_words import STOP_WORDS
import tika
#tika.initVM() # initialize Java server
tika.TikaClientOnly = True
from tika import parser

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
source_directory = os.path.abspath(__file__ + "/../../../files/")

data, docs = [], []
for i in os.listdir(source_directory):
    if i[-3:] != "doc" and i[-4:] != "docx" or i[0] == "~":
        continue
    lst = [i.split('.doc')[0]]
    # text = textract.process(source_directory + "/" + i)
    parsed = parser.from_file(source_directory+"/"+ i, 'http://localhost:41000/')
    text = parsed["content"]
    # text = textract.process(i)
    # text = text.decode("utf-8")
    name = lst[0]
    temp = text.split(name.replace('_','/').replace('V','/').replace('//','/').replace(' ',''))
    if len(temp) > 2:
        temp = [''.join(temp[0:2]), ''.join(temp)] #combining extra data
    lst.extend(temp)
    lst[1] = re.sub('\'','',lst[1])
    lst[1] = re.sub('[pic]','',lst[1])
    lst[1] = re.sub(r'\n: \'\'.*','',lst[1])
    lst[1] = re.sub(r'\n!.*','',lst[1])
    lst[1] = re.sub(r'^:\'\'.*','',lst[1])
    lst[1] = re.sub(r'\n',' ',lst[1])
    lst[1] = re.sub(r'[^\w\s]',' ',lst[1])
    lst[1] = re.sub('\t','',lst[1])
    lst[1] = re.sub(' +', ' ', lst[1])
    lst[1] = lst[1].lower()
    lst[1] = lst[1].strip()
    print(f'processed {i}')
    data.append(lst)
    if len(lst) > 3:
        print(i)

df1 = pd.DataFrame(data, columns=["document_id", "document_name", "word_text"])

df1['word_text_tokenized'] = df1['word_text'].map(lambda x: spacy_tokenizer(x))

#grouping according to doc id
lst = df1['document_id'].tolist()
org_lst = []
dupe_lst = []
while len(lst) > 0:
    subsect = lst[0][:16]
    temp_lst = [lst.pop(0),]
    index = 0
    while index < len(lst):
        if subsect in lst[index]:
            temp_lst.append(lst.pop(index))
            continue
        index += 1
    if len(temp_lst) > 1:
        dupe_lst.append(temp_lst)
    else:
        org_lst.extend(temp_lst)

# find latest version of every file
latest_versions = []
for lst in dupe_lst:
    lst = sorted(lst, key=lambda x: int(x[-1]), reverse=True)
    #highest version is root version
    if lst[0] in lst[1]:
        #bring first element to the back
        lst.append(lst.pop(0))
    latest_versions.append(lst[0])
# non duplicates
org_lst.extend(latest_versions)

df2 = df1[df1['document_id'].isin(org_lst)]

def convert_doc(row):
  parts = row['document_id'].split("_") # find the parent 
  parts_no = "/".join(parts)
  versioned = row['document_id'][-2] == 'V'
  parent = list(filter(lambda x: x.isalpha(), parts[::-1]))[0]
  # get document: currently missing cols doc_cat, doc_type, doc_no, sub_grp (same as parent), created date, revision_no. (version)
  doc = {
      "title": row['document_name'],  # actual title should be scraped from eQMS      
      # "doc_cat": ,    
      # "doc_type": ,   
      "doc_no": parts_no,      
      "doc": row['document_id'] + ".docx", # should be actual file      
      "grp": parts[0],         
      "subgrp": parent,   
      # "created": ,     
      # "revision_no": ,
      "text": spacy_tokenizer(row['word_text'])
      }
  if versioned:
    doc["revision_no"] = int(row['document_id'][-1])
    doc["doc_no"] = parts_no[:-3]
  return doc

docs = df2.apply(lambda x: convert_doc(x), axis=1)

##Create Dictionary
#get clean text to be used in dictionary
word_text = df2['word_text_tokenized']
word_text[0:5]

from gensim import corpora

#creating term dictionary
dictionary = corpora.Dictionary(word_text)

#filter out terms which occurs in less than 4 documents and more than 20% of the documents.
#NOTE: Since we have smaller dataset, we will keep this commented for now.
#dictionary.filter_extremes(no_below=4, no_above=0.2)

#list of few which which can be further removed
stoplist = set('hello and if this can would should could tell ask stop come go')
stop_ids = [dictionary.token2id[stopword] for stopword in stoplist if stopword in dictionary.token2id]
dictionary.filter_tokens(stop_ids)

dict_tokens = [[[dictionary[key], dictionary.token2id[dictionary[key]]] for key, value in dictionary.items() if key <= 50]]


##FEATURE EXTRACTION
corpus = [dictionary.doc2bow(doc) for doc in word_text]
word_frequencies = [[(dictionary[id], frequency) for id, frequency in line] for line in corpus[0:3]]

#BUILD TFIDF
chatbot_tfidf_model = gensim.models.TfidfModel(corpus, id2word=dictionary)

chatbot_tfidf_model.save('chatbot_tfidf_model_test')
dictionary.save('dictionary_test')

import pickle 
file = open('dict_test.txt', 'wb')
pickle.dump(dictionary, file)
file.close()

gensim.corpora.MmCorpus.serialize('chatbot_tfidf_model_mm_test', chatbot_tfidf_model[corpus])
