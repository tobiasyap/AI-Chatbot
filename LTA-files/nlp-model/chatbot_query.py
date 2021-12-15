# -*- coding: utf-8 -*-

import string, json, re, os, sys
### Can be changed
sys.path.append("C:/Users/Sekhar/AppData/Local/Packages/PythonSoftwareFoundation.Python.3.8_qbz5n2kfra8p0/LocalCache/local-packages/Python38/site-packages")

import pandas as pd
import numpy as np
import gensim
import spacy
from gensim.similarities import MatrixSimilarity
from operator import itemgetter
from pymongo import MongoClient

""" Data Cleaning and Processing """
"""
Dependencies: spacy, string, re
"""
# Create list of punctuations and stopwords
spacy_nlp = spacy.load('en_core_web_sm')
punctuations = string.punctuation
stop_words = spacy.lang.en.stop_words.STOP_WORDS

#function for data cleaning and processing
#This can be further enhanced by adding / removing reg-exps as desired.
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
    
    return tokens

""" Loading saved files """
"""
Dependencies: os, sys, gensim, MatrixSimilarity
"""

# File directories to load saved files 
dirname = os.path.dirname(__file__)
model_name = os.path.join(dirname, 'chatbot_tfidf_model')
mm_name = os.path.join(dirname, 'chatbot_tfidf_model_mm')
dict_name = os.path.join(dirname, 'dictionary')
# docs_name = os.path.join(dirname, 'docs.txt')

client = MongoClient('mongodb://localhost:27017/test_db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')
result = client['FS_Filesystem_Database']['filesystems'].find(filter={})
docs_name = list(result)


# Load corpus, model and dictionary
chatbot_tfidf_corpus = gensim.corpora.MmCorpus(mm_name)
chatbot_tfidf_model = gensim.models.TfidfModel.load(model_name)
dictionary = gensim.corpora.dictionary.Dictionary.load(dict_name)

# Create TFIDF index
chatbot_tfidf_index = MatrixSimilarity(chatbot_tfidf_corpus, num_features = chatbot_tfidf_corpus.num_terms) 

""" Tf-Idf Model Matching"""
"""
Dependencies: spacy, gensim, re, string, pandas, itemgetter, json, sys
"""

def search_document(search_term, N=5):
    """
    Outputs top N documents most similar to query based on similarity score
    """
    # Convert query to tfidf matrix
    query_bow = dictionary.doc2bow(spacy_tokenizer(search_term))
    query_tfidf = chatbot_tfidf_model[query_bow]

    # Generate top N documents based on similarity score
    chatbot_tfidf_index.num_best = N
    chatbot_list = chatbot_tfidf_index[query_tfidf]
    chatbot_list.sort(key=itemgetter(1), reverse=True)

    # Return documents 
    # df1 = pd.read_json(docs_name)
    df1 = pd.DataFrame(docs_name)
    doc_names = []
    for j, doc in enumerate(chatbot_list):
        doc_names.append (
            {
                "Relevance": round((doc[1] * 100),2),
                "Document ID": df1.loc[doc[0]]["doc_no"],
                "Document Description": df1.loc[doc[0]]["title"]
            }
        )
        if j == (chatbot_tfidf_index.num_best-1):
            break
            
    return doc_names

if __name__ == '__main__':
    print(json.dumps(search_document(sys.argv[1])))
    sys.stdout.flush()

### Sample queries: ### 
# Where can we find the latest version of Process documents?
# What are the standards followed in Fare System?
# What are the Project Management processes to be followed in Fare System?
# What are the Software Development processes to be followed in Fare System?
# Where can we find the latest process checklists?
# What is the KPI template?