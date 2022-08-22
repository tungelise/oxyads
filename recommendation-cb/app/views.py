from app import app
from flask import Flask, request, jsonify
from app.contentbase_filtering.cb_model import ContentBase
import json
from random import randint
import random

@app.route('/')
def home():
   return "hello world!"


@app.route('/api/re-check', methods=['GET', 'POST'])
def welcome():
    return "It works!"


@app.route('/person/')
def hello():
    return jsonify({'name':'Jimit1',
                    'address':'India'})


@app.route('/api/recommend', methods=['GET', 'POST'])
def recommend():
    data = request.form
    content_base = ContentBase("./dataset/favorite.csv")
    content_base.fit()

    links = data.get('links')
    array_link = links.split(',')
    random.shuffle(array_link)
    try:
        results = []
        i = 0
        count = 10
        for link in array_link:
            number_result  = randint(1, count)
            if number_result < 5:
                number_result = 5
            count -=number_result
            sim_scores, values =  content_base.genre_recommendations(link, number_result)
            for value in values:
                result_tmp = {}
                i +=1
                result_tmp['id'] = i
                result_tmp['name'] = value
                results.append(result_tmp)
        random.shuffle(results)
        # import pdb
        # pdb.set_trace()
        #json_string = json.dumps(results)
        response = app.response_class(
            response=json.dumps(results),
            status=200,
            mimetype='application/json'
        )

    except:
        response = app.response_class(
            response={"not found"},
            status=404,
            mimetype='application/json'
        )
    return response