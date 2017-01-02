from flask import Flask, request, render_template, url_for, redirect
from random import randrange
from datetime import datetime as dt
import csv

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def survey():
    if request.method == 'GET':
        # Render new survey, using set A or B (opposite of the last time the
        # survey was given)
        with open('last_set_name.txt', 'r') as f:
            last_set_name = f.read()[0]
            set_name = 'A' if last_set_name == 'B' else 'B'
            return render_template('survey.html', set_name=set_name)
    elif request.method == 'POST':
        set_name = request.form['set_name']
        date = str(dt.now().date())
        time = str(dt.now().time())
        admin = request.form['admin']
        location = request.form['location']
        subject_id = randrange(999999999)
        subject_name = request.form['subject_name']
        subject_age = request.form['subject_age']
        subject_gender = request.form['subject_gender']

        with open('friendliness_data.csv', 'a', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter=',')
            for i in range(10):
                phone = request.form['phone{}'.format(i)]
                answer = request.form['answer{}'.format(i)]
                writer.writerow([subject_id, subject_age, subject_gender,
                                 subject_name, date, time, location, admin, i,
                                 phone, answer])

        # Update last set
        with open('last_set_name.txt', 'w') as f:
            f.write(set_name)

        return redirect('/')

