from flask import Flask, render_template, request

from card_creator import generate_card

app = Flask(__name__)


def before_request():
    app.jinja_env.cache = {}


app.before_request(before_request)


def handle_card_drawing(request_cntnt):
    desc = request_cntnt.form['txtMsg']
    name = request_cntnt.form['txtName']
    r = request_cntnt.form['txtRed']
    g = request_cntnt.form['txtGreen']
    b = request_cntnt.form['txtBlue']
    energy = request_cntnt.form['txtMana']
    power = request_cntnt.form['txtPower']
    if r == "" or g == "" or b == "":
        r = 240
        g = 200
        b = 60

    inner_path = "cards/creature1.png"
    generate_card(name, desc, (int(r), int(g), int(b), 0), inner_path, energy, power)


@app.route('/', methods=['GET', 'POST'])
def main_site():
    if request.method == 'POST':
        handle_card_drawing(request)
        return '', 204
    else:
        return render_template('index.html')


if __name__ == '__main__':
    app.run()
