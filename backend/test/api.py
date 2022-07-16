from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/test")
async def root():
    return {"message": "Test"}


# uvicorn backend.api:app --reload
# http://127.0.0.1:8000/docs
# http://127.0.0.1:8000/redoc
