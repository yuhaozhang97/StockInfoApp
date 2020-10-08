from flask import Flask, render_template, request, jsonify
from dateutil.relativedelta import relativedelta
from datetime import datetime
import requests

headers = {
    'Content-Type': 'application/json'
}

# EB looks for an 'application' callable by default.
application = Flask(__name__)


@application.route('/', methods=['GET'])
def render_home():
    return render_template('home.html')


@application.route('/search', methods=['GET'])
def search():
    keyword = request.args.get('keyword')
    API_TOKEN = '07e77e74fdeee3bdc52bb686cbf38fbe3e5aa0cc'
    url = 'https://api.tiingo.com/tiingo/daily/' + keyword + '?token=' + API_TOKEN

    res = requests.get(url).json()
    return jsonify(res)


@application.route('/stock', methods=['GET'])
def stock():
    keyword = request.args.get('keyword')
    API_TOKEN = '07e77e74fdeee3bdc52bb686cbf38fbe3e5aa0cc'
    url = 'https://api.tiingo.com/iex/' + keyword + '?token=' + API_TOKEN

    res = requests.get(url).json()
    return jsonify(res)


@application.route('/charts-data', methods=['GET'])
def charts_data():
    keyword = request.args.get('keyword')
    API_TOKEN = '07e77e74fdeee3bdc52bb686cbf38fbe3e5aa0cc'
    delta = relativedelta(months=-6)
    startDate = (datetime.now() + delta).strftime('%Y-%m-%d')
    columns = "open,high,low,close,volume"
    resampleFreq = "12hour"
    url = "https://api.tiingo.com/iex/" + keyword + "/prices?startDate=" + startDate + \
        "&resampleFreq=" + resampleFreq + "&columns=" + columns + "&token=" + API_TOKEN

    res = requests.get(url, headers=headers).json()

    return jsonify(res)


@application.route('/news', methods=['GET'])
def news():
    keyword = request.args.get('keyword')
    API_TOKEN = '6d9b3f4909c141ef9616f93c3d182a0d'
    url = 'https://newsapi.org/v2/everything?apiKey=' + API_TOKEN + '&q=' + keyword

    res = requests.get(url).json()
    return jsonify(res)


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.run()
