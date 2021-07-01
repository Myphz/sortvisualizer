from flask import Flask, redirect, url_for, render_template, request, send_from_directory, session
from telegram import Bot
import requests
import os

app = Flask(__name__)
app.secret_key = 'KEQING'

TELEGRAM_KEY = os.environ.get("TELEGRAM_KEY")
CHAT_ID = -1001520685235

@app.route("/")
def home():
    return render_template("index.html")

sorts = ["quicksort", "bubblesort", "selectionsort", "insertionsort", "radixsort", "heapsort", "gnomesort", "mergesort", "bogosort", "shellsort", "shakersort", "bitonicsort", "oddevensort", "combsort", "pancakesort", "customsort"]

for sort in sorts:
    fname = sort[:-4] + "_" + sort[-4:]

    fun = f"""
@app.route("/{sort}/", methods=["GET"])
def {fname}():
    return render_template("sorts/{sort}.html", audio=session.get("audio", True))"""

    exec(fun)

@app.route("/submit/", methods=["POST"])
def submit():
    code = request.json["code"]
    bot = Bot(TELEGRAM_KEY)
    image = requests.post("https://carbonara.vercel.app/api/cook", json={"code": code})

    bot.send_photo(CHAT_ID, image.content)
    bot.send_message(chat_id=CHAT_ID, text=r'<code>{}</code>'.format(code), timeout=15, parse_mode="html")

    return "", 204

@app.route("/audio/", methods=["PUT"])
def change_audio():
    session["audio"] = not session.get("audio", True)
    return "", 204

@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run(debug=True)
