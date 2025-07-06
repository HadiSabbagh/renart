from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
import math
app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gold_price_url = "https://api.gold-api.com/price/XAU" # price is in oz


# Load products from JSON
with open('../common/products.json', 'r') as file:
    products = json.load(file)

@app.get("/api/products")
async def get_products():
    
    try:
        response = requests.get(gold_price_url)
        
        data = response.json()
        gold_price = data['price'] / 31.1035 # converted to price per gram
    
    except requests.exceptions.RequestException as e:
        print(f"Error occured while trying to retrieve gold price: {e}")
        
    for product in products:
        product['price'] = math.floor((product['popularityScore'] + 1) * product['weight'] * gold_price)
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