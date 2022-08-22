from app.contentbase_filtering.utils import get_dataframe_favorite_csv, tfidf_matrix, cosine_sim
import pandas as pd

class ContentBase(object):
    """
        Khởi tại dataframe "favorites" với hàm "get_dataframe_favorites_csv"
    """
    def __init__(self, favorites_csv):
        self.favorites = get_dataframe_favorite_csv(favorites_csv)
        self.tfidf_matrix = None
        self.cosine_sim = None

    def build_model(self):
        """
            Tách các giá trị của genres ở từng link đang được ngăn cách bởi '|'
        """
        self.favorites['tag'] = self.favorites['tag'].str.split('|')
        self.favorites['tag'] = self.favorites['tag'].fillna("").astype('str')
        self.tfidf_matrix = tfidf_matrix(self.favorites)
        self.cosine_sim = cosine_sim(self.tfidf_matrix)

    def refresh(self):
        """
             Chuẩn hóa dữ liệu và tính toán lại ma trận
        """
        self.build_model()

    def fit(self):
        self.refresh()


    def genre_recommendations(self, title, top_x):
        titles = self.favorites['link']
        indices = pd.Series(self.favorites.index, index=self.favorites['link'])
        idx = indices[title]
        sim_scores = list(enumerate(self.cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:top_x + 1]
        favorite_indices = [i[0] for i in sim_scores]
        return sim_scores, titles.iloc[favorite_indices].values