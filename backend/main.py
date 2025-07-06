from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load products from JSON
with open('../common/products.json', 'r') as file:
    products = json.load(file)

@app.get("/api/products")
async def get_products():
    # Convert popularity score to out of 5
    for product in products:
        product['popularityScore'] = round((product['popularityScore'] + 1) * product['weight'] ) # need to multiply by real time gold price
    return products

# Bonus: Filtering endpoint
@app.get("/api/products/filter")
async def filter_products(min_price: float = 0, max_price: float = 1000, min_popularity: float = 0, max_popularity: float = 5):
    filtered = [
        product for product in products
        if min_price <= product.get('price', 0) <= max_price
        and min_popularity <= product['popularityScore'] <= max_popularity
    ]
    return filtered