from flask import Flask, render_template
import sys
import webview
import argparse

app: Flask = Flask(__name__, template_folder="src", static_folder="assets")
openfile = ""

@app.route("/")
def index() -> render_template:
    return render_template("index.html")

@app.route("/settings")
def settings() -> None:
    webview.create_window("Settings", "src/settings.html")
    return render_template("index.html")

def run():
    webview.create_window("Markdown Reader & Writer", app)
    webview.start()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-file", type=str, help="-file <filename>", required=False)
    args = parser.parse_args()

    if args.file:
        openfile = args.file
        run()
    else:
        run()