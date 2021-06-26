from flask import Flask, redirect, url_for, render_template, request, send_from_directory

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/quicksort/")
def quick_sort():
    return render_template("sorts/quicksort.html")

@app.route("/bubblesort/")
def bubble_sort():
    return render_template("sorts/bubblesort.html")

@app.route("/selectionsort/")
def selection_sort():
    return render_template("sorts/selectionsort.html")

@app.route("/insertionsort/")
def insertion_sort():
    return render_template("sorts/insertionsort.html")

@app.route("/radixsort/")
def radix_sort():
    return render_template("sorts/radixsort.html")

@app.route("/heapsort/")
def heap_sort():
    return render_template("sorts/heapsort.html")

@app.route("/gnomesort/")
def gnome_sort():
    return render_template("sorts/gnomesort.html")

@app.route("/mergesort/")
def merge_sort():
    return render_template("sorts/mergesort.html")

@app.route("/bogosort/")
def bogo_sort():
    return render_template("sorts/bogosort.html")

@app.route("/shellsort/")
def shell_sort():
    return render_template("sorts/shellsort.html")

@app.route("/shakersort/")
def shaker_sort():
    return render_template("sorts/shakersort.html")

@app.route("/bitonicsort/")
def bitonic_sort():
    return render_template("sorts/bitonicsort.html")

@app.route("/oddevensort/")
def oddeven_sort():
    return render_template("sorts/oddevensort.html")

@app.route("/combsort/")
def comb_sort():
    return render_template("sorts/combsort.html")

@app.route("/pancakesort/")
def pancake_sort():
    return render_template("sorts/pancakesort.html")

@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run(debug=True)
