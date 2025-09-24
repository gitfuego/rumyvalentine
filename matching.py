import os
import numpy as np
import pandas as pd
import random
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from sklearn.metrics.pairwise import euclidean_distances, cosine_similarity
from tqdm import tqdm

# Load environment variables
load_dotenv()

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

def get_responses():
    """Fetch responses and user preferences from the database."""
    query = """
    SELECT Users.email, Users.sex, Users.pref, 
           res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, 
           res11, res12, res13, res14, res15, res16, res17, res18, res19, res20, res21 
    FROM Responses 
    JOIN Users ON Responses.email = Users.email
    """
    return pd.read_sql(query, engine)

# Matches users only if they don't already have matches
# def get_responses():
#     """Fetch responses and user preferences from the database, excluding users who already have matches."""
#     query = """
#     SELECT Users.email, Users.sex, Users.pref, 
#            res1, res2, res3, res4, res5, res6, res7, res8, res9, res10, 
#            res11, res12, res13, res14, res15, res16, res17, res18, res19, res20, res21 
#     FROM Responses 
#     JOIN Users ON Responses.email = Users.email
#     WHERE Users.email NOT IN (
#         SELECT DISTINCT user1 FROM matches
#         UNION
#         SELECT DISTINCT user2 FROM matches
#     )
#     """
#     return pd.read_sql(query, engine)

def is_compatible(sex1, pref1, sex2, pref2):
    """Check if two users are compatible based on sex and preference."""
    return ((pref1 == 'a' or pref1 == sex2) and (pref2 == 'a' or pref2 == sex1))

def calculate_similarity(responses_df):
    """Calculate similarity scores between users."""
    features = responses_df.iloc[:, 3:].fillna(0)  # Skip email, sex, and pref columns
    emails = responses_df['email']
    sexes = responses_df['sex']
    prefs = responses_df['pref']
    
    distance_matrix = euclidean_distances(features)
    similarity_matrix = cosine_similarity(features)
    
    return emails, sexes, prefs, distance_matrix, similarity_matrix

def should_continue_matching(current_matches):
    """Determines if a user should receive additional matches based on a probability distribution."""
    if current_matches == 0:
        return True  # Ensure every user gets at least 1 match
    probabilities = {1: 0.5, 2: 0.3, 3: 0.15, 4: 0.05}  # Bias towards fewer matches
    return random.random() < probabilities.get(current_matches, 0)

def perform_matching(responses_df, threshold_euclidean=5, threshold_cosine=0.5, max_matches=5):
    """Match users based on similarity thresholds and compatibility, ensuring fewer users get 3-5 matches."""
    emails, sexes, prefs, distance_matrix, similarity_matrix = calculate_similarity(responses_df)
    matches = []
    user_match_count = {email: 0 for email in emails}  # Track number of matches per user
    num_users = len(emails)
    
    for i in tqdm(range(num_users)):
        user_matches = []
        best_fallback_match = None
        best_fallback_similarity = -1
        
        for j in range(num_users):
            if i != j and is_compatible(sexes[i], prefs[i], sexes[j], prefs[j]):
                if distance_matrix[i][j] <= threshold_euclidean and similarity_matrix[i][j] >= threshold_cosine:
                    user_matches.append((emails[i], emails[j], similarity_matrix[i][j]))
                elif similarity_matrix[i][j] > best_fallback_similarity:  # Fallback match
                    best_fallback_similarity = similarity_matrix[i][j]
                    best_fallback_match = emails[j]
        
        # Sort matches by similarity and limit to max_matches
        user_matches.sort(key=lambda x: -x[2])  # Sort in descending order of similarity
        for match in user_matches:
            user1, user2 = match[0], match[1]

            # Ensure both users stay under max_matches and apply weighted stopping rule
            if user_match_count[user1] < max_matches and user_match_count[user2] < max_matches:
                if should_continue_matching(user_match_count[user1]) and should_continue_matching(user_match_count[user2]):
                    matches.append((user1, user2))
                    user_match_count[user1] += 1
                    user_match_count[user2] += 1

            # Stop once the user reaches max_matches
            if user_match_count[user1] >= max_matches:
                break

        # Ensure at least one match if the user has none
        if user_match_count[emails[i]] == 0 and best_fallback_match:
            if user_match_count[best_fallback_match] < max_matches:
                matches.append((emails[i], best_fallback_match))
                user_match_count[emails[i]] += 1
                user_match_count[best_fallback_match] += 1
    
    return matches

def insert_matches(matches):
    """Insert matched pairs into the Matches table."""
    with engine.connect() as conn:
        query = text("INSERT INTO matches (user1, user2) VALUES (:user1, :user2) ON CONFLICT DO NOTHING")
        for user1, user2 in matches:
            conn.execute(query, {"user1": user1, "user2": user2})
        conn.commit()

def main():
    responses_df = get_responses()
    matches = perform_matching(responses_df)
    insert_matches(matches)
    print(f"Inserted {len(matches)} matches into the database.")

if __name__ == "__main__":
    main()
