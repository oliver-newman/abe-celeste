from flask import Flask
app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def survey():
    if request.method == 'POST':
        pass
    else:
        return render_template('survey.html')
