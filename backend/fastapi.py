from fastapi import FastAPI

app = FastAPI()


@app.get("/my-first-api")
def hello(name=None):

    if name is None:
        text = 'Hello!'

    else:
        text = 'Hello ' + name + '!'

    return text
