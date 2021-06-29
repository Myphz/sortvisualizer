from flask import Flask, redirect, url_for, render_template, request, send_from_directory, session

app = Flask(__name__)
app.secret_key = 'KEQING'

@app.route("/")
def home():
    return render_template("index.html")

sorts = ["quicksort", "bubblesort", "selectionsort", "insertionsort", "radixsort", "heapsort", "gnomesort", "mergesort", "bogosort", "shellsort", "shakersort", "bitonicsort", "oddevensort", "combsort", "pancakesort"]

for sort in sorts:
    fname = sort[:-4] + "_" + sort[-4:]

    fun = f"""
@app.route("/{sort}/", methods=["GET", "POST"])
def {fname}():
    if request.method == "POST":
        session["audio"] = not session.get("audio", True)
    return render_template("sorts/{sort}.html", audio=session.get("audio", True))"""

    exec(fun)

@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run(debug=True)
