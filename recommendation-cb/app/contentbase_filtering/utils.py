import pandas as pandas
from pandas import read_csv, isnull, notnull
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer



def get_dataframe_favorite_csv(text):
    movie_cols = ['description', 'link', 'tag']
    favorite = pandas.read_csv(text, sep=',', names=movie_cols, encoding='latin-1')
    return favorite



# normalize matrix  -- matrix  favorite with tags 
def tfidf_matrix(favorite):
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 1), min_df=0)
    new_tfidf_matrix = tf.fit_transform(favorite['tag'])
    return new_tfidf_matrix



def cosine_sim(matrix):
    new_cosine_sim = linear_kernel(matrix, matrix)
    return new_cosine_sim
