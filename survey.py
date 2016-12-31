from flask import Flask, request, render_template
from random import randrange
import datetime as dt

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def survey():
    if request.method == 'POST':
        time = dt.now()
        location = request.form['location']
        subject_id = randrange(999999)
        subject_age = request.form['subject_age']
        subject_gender = request.form['subject_gender']
        answers = []
        for i in range(10):
            # TODO: might need to use explicit 'true'/'false' here
            phone = 'Yes' if request.form['phone{}'.format(i)] else 'No'
            answers.append((phone, request.form['answer{}'.format(i)]))
    else:
        return render_template('survey.html')
