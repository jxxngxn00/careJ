# health.py

from flask import Blueprint, request, jsonify
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import random

health_blueprint = Blueprint('health', __name__)


# 데이터 로드
def load_data():
    file_path = './data/subset_data.xlsx'
    data = pd.read_excel(file_path)
    return data


subset_df = load_data()
features = subset_df[["지방(g)", "탄수화물(g)", "단백질(g)"]].values


# 식품 대분류 목록을 반환
@health_blueprint.route('/get_categories', methods=['GET'])
def get_categories():
    categories = subset_df['식품대분류'].unique().tolist()
    return jsonify({'categories': categories})


# 선택한 식품 대분류에 해당하는 식품 상세분류 목록을 반환
@health_blueprint.route('/get_subcategories', methods=['POST'])
def get_subcategories():
    data = request.json
    category = data['category']

    subcategories = subset_df[subset_df['식품대분류'] == category]['식품상세분류'].unique().tolist()

    return jsonify({'subcategories': subcategories})


# 선택한 식품 상세분류에 해당하는 식품 목록을 반환
@health_blueprint.route('/get_foods', methods=['POST'])
def get_foods():
    data = request.json
    subcategory_choice = data['subcategory_choice']

    food_options = subset_df[subset_df['식품상세분류'] == subcategory_choice]
    foods = food_options['식품명'].unique().tolist()

    return jsonify({'food_options': foods})


# 사용자에게 식품 대분류 입력 받기
@health_blueprint.route('/get_user_input', methods=['POST'])
def get_user_input():
    data = request.json
    cat = data['category']

    return jsonify({'category': cat})


# 사용자에게 식품 선택 받기
@health_blueprint.route('/get_food_choice', methods=['POST'])
def get_food_choice():
    data = request.json
    food_choice = data['food_choice']

    selected_food_details = subset_df[subset_df['식품명'] == food_choice]
    selected_food_subcategory = selected_food_details['식품상세분류'].iloc[0]
    selected_food_features = selected_food_details[["지방(g)", "탄수화물(g)", "단백질(g)"]].iloc[0].to_numpy()

    similarity_scores = cosine_similarity([selected_food_features], features)

    gl_mask = (subset_df["GL지수"] <= 10) & (subset_df["식품상세분류"] == selected_food_subcategory)
    filtered_indices = np.argsort(similarity_scores.flatten())[::-1]
    filtered_indices = [idx for idx in filtered_indices if gl_mask.iloc[idx]]

    top_recommendation_indices = [idx for idx in filtered_indices if subset_df.iloc[idx]["식품명"] != food_choice][:3]

    recommendations = subset_df.iloc[top_recommendation_indices]["식품명"].tolist()

    return jsonify({'recommendations': recommendations})
