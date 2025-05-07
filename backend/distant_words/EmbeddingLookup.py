import pickle
import numpy as np
import gensim
import random


class WordListLoader:
    def __init__(self, filepath):
        self.words = self.load_words(filepath)

    def load_words(self, filepath):
        with open(filepath, "r") as file:
            words = [line.strip() for line in file if line.strip()]
        return words

    def get_words(self):
        return self.words

    def get_random_word(self):
        return random.choice(self.words)


class EmbeddingLookup:
    def __init__(self, embeddings_path="word2vec_model.bin", word_list_loader=None):
        # Load Word2Vec model from the file
        self.model = gensim.models.KeyedVectors.load_word2vec_format(embeddings_path, binary=True)

        # Use WordListLoader if provided, else use the entire vocabulary
        if word_list_loader:
            self.words = word_list_loader.get_words()
        else:
            self.words = list(self.model.key_to_index.keys())  # Get all words from the model
        print(len(self.words), "words loaded.")

    def cosine_similarity(self, vec1, vec2):
        return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

    def compute_distance_score(self, word1: str, word2: str):
        if word1 not in self.model or word2 not in self.model:
            raise ValueError(f"Word '{word1}' or '{word2}' not found in embeddings.")
        vec1 = self.model[word1]
        vec2 = self.model[word2]
        cosine_sim = self.cosine_similarity(vec1, vec2)
        distance_score = 1 - cosine_sim
        return distance_score

    def get_most_similar_word(self, word):
        if word not in self.model:
            raise ValueError(f"Word '{word}' not found in embeddings.")
        vec = self.model[word]

        # Use a subset of words for efficiency
        best_word = max(
            (w for w in self.words if w != word and w in self.model),
            key=lambda w: self.cosine_similarity(vec, self.model[w])
        )
        return best_word

    def get_most_distant_word(self, word):
        if word not in self.model:
            raise ValueError(f"Word '{word}' not found in embeddings.")
        vec = self.model[word]

        # Use a subset of words for efficiency
        worst_word = min(
            (w for w in self.words if w != word and w in self.model),
            key=lambda w: self.cosine_similarity(vec, self.model[w])
        )
        return worst_word

    def get_best_common_word(self, word1, word2):
        if word1 not in self.model or word2 not in self.model:
            raise ValueError(f"Word '{word1}' or '{word2}' not found in embeddings.")

        vec1 = self.model[word1]
        vec2 = self.model[word2]

        # Combine the vectors by averaging
        combined_vec = (vec1 + vec2) / 2

        # Normalize the combined vector
        combined_vec = combined_vec / np.linalg.norm(combined_vec)

        # Use a subset of words for efficiency
        best_word = max(
            (w for w in self.words if w != word1 and w != word2 and w in self.model),
            key=lambda w: self.cosine_similarity(combined_vec, self.model[w])
        )
        return best_word


if __name__ == "__main__":
    # Load a subset of words from a file
    word_list_loader = WordListLoader("animal_names.csv")  # Provide the path to your word list file

    # Create the EmbeddingLookup with the subset of words
    embeddings = EmbeddingLookup("/home/martin/Downloads/embeddings/GoogleNews-vectors-negative300.bin.gz", word_list_loader)

    # Test the get_best_common_word method
    print(embeddings.get_best_common_word("Donkey", "Monkey"))
