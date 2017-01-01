from flask import Flask, request, render_template, url_for, redirect
from random import randrange
from datetime import datetime as dt
import csv

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def survey():
    if request.method == 'POST':
        time = str(dt.now())
        admin = request.form['admin']
        location = request.form['location']
        subject_id = randrange(999999)
        subject_age = request.form['subject_age']
        subject_gender = request.form['subject_gender']
        with open('friendliness_data.csv', 'a', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            for i in range(10):
                # TODO: might need to use explicit 'true'/'false' here
                # phone = 'Yes' if request.form['phone{}'.format(i)] else 'No'
                phone = 'Phone'
                answer = request.form['answer{}'.format(i)]
                writer.writerow([subject_id, subject_age, subject_gender, time,
                                 location, admin, i, phone, answer])

    return render_template('survey.html')
