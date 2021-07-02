from flask import Flask, redirect, url_for, render_template, request, send_from_directory, session
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from telegram import Bot
import requests
import os
from html import escape

app = Flask(__name__)
app.secret_key = 'KEQING'

limiter = Limiter(app, key_func=get_remote_address)

TELEGRAM_KEY = os.environ.get("TELEGRAM_KEY")
CHAT_ID = -1001520685235

# bot = Bot(TELEGRAM_KEY)

@app.route("/")
def home():
    return render_template("index.html")

sorts = [
            "quicksort", "bubblesort", "selectionsort", "insertionsort", "radixsort", "heapsort", "gnomesort", "mergesort",
            "bogosort", "shellsort", "shakersort", "bitonicsort", "oddevensort", "combsort", "pancakesort", "customsort"
        ]

for sort in sorts:
    fname = sort[:-4] + "_" + sort[-4:]

    fun = f"""
@app.route("/{sort}/", methods=["GET"])
def {fname}():
    return render_template("sorts/{sort}.html", audio=session.get("audio", True))"""

    exec(fun)

@app.route("/submit/", methods=["POST"])
@limiter.limit("5/hour")
def submit():
    code = request.json["code"]
    image = requests.post("https://carbonara.vercel.app/api/cook", json={"code": code, "theme": "one-dark"})

    bot.send_photo(chat_id=CHAT_ID, photo=image.content, caption=r'<pre><code>{}</code></pre>'.format(escape(code)), parse_mode="html")

    return "", 204

@app.route("/api/")
def api():
    return render_template("api.html")

@app.route("/audio/", methods=["PUT"])
def change_audio():
    session["audio"] = not session.get("audio", True)
    return "", 204

@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run(debug=True)
