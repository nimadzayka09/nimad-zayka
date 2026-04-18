from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import bcrypt
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Literal, Any, Dict
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Auth config
JWT_SECRET = os.environ.get("JWT_SECRET", "change-me-in-env")
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@nimadzayka.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "NimadZayka@2026")
ACCESS_TOKEN_HOURS = 12
security = HTTPBearer(auto_error=False)

app = FastAPI(title="Nimad Zayka API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class Variant(BaseModel):
    weight: str  # "20g", "50g", "100g"
    price: int   # INR


class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    local_name: str                          # e.g. Haldi, Mirchi
    category: Literal["standard_pouch", "premium_box"]
    short_description: str
    long_description: str
    image: str
    variants: List[Variant]
    tags: List[str] = []
    is_featured: bool = False


class InquiryItem(BaseModel):
    product_slug: str
    product_name: str
    weight: str
    price: int
    quantity: int = 1


class InquiryCreate(BaseModel):
    type: Literal["cart", "contact", "sample", "supplier", "career", "distributor", "influencer"]
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    city: Optional[str] = None
    message: Optional[str] = None
    items: Optional[List[InquiryItem]] = None


class Inquiry(InquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Admin auth models ----------
class AdminLoginIn(BaseModel):
    email: EmailStr
    password: str


class AdminLoginOut(BaseModel):
    token: str
    email: EmailStr
    role: str = "admin"


class AdminMe(BaseModel):
    email: EmailStr
    role: str = "admin"


# ---------- Product admin models ----------
class ProductCreate(BaseModel):
    slug: str
    name: str
    local_name: str
    category: Literal["standard_pouch", "premium_box"]
    short_description: str
    long_description: str
    image: str
    variants: List[Variant]
    tags: List[str] = []
    is_featured: bool = False


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    local_name: Optional[str] = None
    category: Optional[Literal["standard_pouch", "premium_box"]] = None
    short_description: Optional[str] = None
    long_description: Optional[str] = None
    image: Optional[str] = None
    variants: Optional[List[Variant]] = None
    tags: Optional[List[str]] = None
    is_featured: Optional[bool] = None


# ---------- Site settings ----------
class HeroSlide(BaseModel):
    key: str
    chapter: str
    title: str
    subtitle: str
    image: str
    cta_label: str
    cta_to: str


class SiteSettings(BaseModel):
    phone: str
    phone_raw: str
    email: EmailStr
    whatsapp: str
    hero_slides: List[HeroSlide]


class SiteSettingsUpdate(BaseModel):
    phone: Optional[str] = None
    phone_raw: Optional[str] = None
    email: Optional[EmailStr] = None
    whatsapp: Optional[str] = None
    hero_slides: Optional[List[HeroSlide]] = None


# ---------- Seed data ----------
SEED_PRODUCTS: List[dict] = [
    # Standard Pouch
    {
        "slug": "haldi-powder",
        "name": "Haldi (Turmeric Powder)",
        "local_name": "Haldi",
        "category": "standard_pouch",
        "short_description": "Sun-kissed Nimadi turmeric, stone-ground to a warm golden powder.",
        "long_description": "Our Haldi is sourced from select farms along the Narmada valley and sun-dried the traditional Nimadi way. Rich in curcumin, with an earthy aroma and a deep, warm color that brings life to every curry, dal and marinade.",
        "image": "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "100g", "price": 55}, {"weight": "200g", "price": 99}, {"weight": "500g", "price": 229}],
        "tags": ["Pure", "Stone Ground", "Farm Fresh"],
        "is_featured": True,
    },
    {
        "slug": "mirchi-powder",
        "name": "Mirchi (Red Chilli Powder)",
        "local_name": "Mirchi",
        "category": "standard_pouch",
        "short_description": "Fiery Nimadi red chillies, slow-dried and ground to a vivid crimson powder.",
        "long_description": "Hand-picked and naturally sun-dried Nimadi chillies deliver a balanced heat with a gentle smokiness. Perfect for tadka, sabzi and marinades — a crimson pop of flavour from the heart of Madhya Pradesh.",
        "image": "https://images.unsplash.com/photo-1583396618422-597b2755de1a?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "100g", "price": 65}, {"weight": "200g", "price": 119}, {"weight": "500g", "price": 279}],
        "tags": ["Spicy", "Sun Dried", "Authentic"],
        "is_featured": True,
    },
    {
        "slug": "dhaniya-powder",
        "name": "Dhaniya (Coriander Powder)",
        "local_name": "Dhaniya",
        "category": "standard_pouch",
        "short_description": "Aromatic coriander, roasted light and ground fine for a citrusy depth.",
        "long_description": "Light-roasted coriander seeds from Nimadi farms, ground fine to preserve their sweet, citrusy aroma. The everyday base note for dals, sabzis and gravies across Indian kitchens.",
        "image": "https://images.unsplash.com/photo-1599909366516-6c3dd1a5c47c?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "100g", "price": 45}, {"weight": "200g", "price": 85}, {"weight": "500g", "price": 199}],
        "tags": ["Aromatic", "Fine Ground"],
        "is_featured": True,
    },
    {
        "slug": "garam-masala-standard",
        "name": "Garam Masala",
        "local_name": "Garam Masala",
        "category": "standard_pouch",
        "short_description": "A classic household blend — warm, balanced, ready for every curry.",
        "long_description": "A time-tested family recipe blending cardamom, cinnamon, clove, cumin, pepper and bay leaf. Warm and balanced, this everyday garam masala lifts any curry, pulao or subzi with Nimadi soul.",
        "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "50g", "price": 69}, {"weight": "100g", "price": 129}],
        "tags": ["Blended", "Everyday"],
        "is_featured": True,
    },
    # Premium Box
    {
        "slug": "meat-masala-premium",
        "name": "Meat Masala — Premium Box",
        "local_name": "Meat Masala",
        "category": "premium_box",
        "short_description": "Robust, slow-blended masala crafted for mutton, chicken and keema.",
        "long_description": "A bold, slow-ground premium blend of 18 whole spices — built for rich mutton curries, chicken gravies and keema. Packaged in a keepsake box that preserves freshness and aroma.",
        "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "20g", "price": 39}, {"weight": "50g", "price": 89}, {"weight": "100g", "price": 159}],
        "tags": ["Premium", "Gift Box", "Non-Veg"],
        "is_featured": True,
    },
    {
        "slug": "garam-masala-premium",
        "name": "Garam Masala — Premium Box",
        "local_name": "Garam Masala",
        "category": "premium_box",
        "short_description": "A limited-batch, hand-selected garam masala in a premium gift box.",
        "long_description": "Our flagship Garam Masala, blended in small batches from hand-selected whole spices. Deeper, warmer and more fragrant than the everyday variant — presented in a premium Nimadi-art box.",
        "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "50g", "price": 99}, {"weight": "100g", "price": 179}],
        "tags": ["Premium", "Hand Blended"],
        "is_featured": False,
    },
    {
        "slug": "shahi-paneer-masala",
        "name": "Shahi Paneer Masala — Premium Box",
        "local_name": "Shahi Paneer",
        "category": "premium_box",
        "short_description": "Royal, creamy, mildly sweet — for restaurant-style paneer at home.",
        "long_description": "A regal blend of cashew-forward spices, cardamom and saffron notes, crafted to deliver rich, creamy, restaurant-style Shahi Paneer. Packed in a premium box for gifting and long shelf life.",
        "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "50g", "price": 95}, {"weight": "100g", "price": 169}],
        "tags": ["Premium", "Vegetarian", "Rich"],
        "is_featured": True,
    },
    {
        "slug": "dal-bati-masala",
        "name": "Dal Bati Masala — Premium Box",
        "local_name": "Dal Bati",
        "category": "premium_box",
        "short_description": "A Nimadi-style masala built for authentic Dal Bati & Baati Chokha.",
        "long_description": "A regional specialty from Nimad & Malwa — this masala brings the smoky, tangy, slow-simmered depth of traditional Dal Bati. A taste of home, bottled in a premium box.",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "50g", "price": 89}, {"weight": "100g", "price": 159}],
        "tags": ["Premium", "Regional", "Traditional"],
        "is_featured": True,
    },
    {
        "slug": "khada-masala",
        "name": "Khada Masala — Premium Box",
        "local_name": "Khada Masala",
        "category": "premium_box",
        "short_description": "Whole-spice medley for tadka, pulao, and slow-cooked curries.",
        "long_description": "A curated mix of whole spices — green cardamom, clove, cinnamon, black cardamom, bay leaf, pepper — for tempering dals, biryanis and slow-cooked curries. Sealed fresh in a premium box.",
        "image": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80",
        "variants": [{"weight": "50g", "price": 109}, {"weight": "100g", "price": 199}],
        "tags": ["Premium", "Whole Spice"],
        "is_featured": False,
    },
]


async def seed_products() -> None:
    count = await db.products.count_documents({})
    if count == 0:
        docs = [Product(**p).model_dump() for p in SEED_PRODUCTS]
        await db.products.insert_many(docs)
        logger_seed.info("Seeded %d products", len(docs))


# ---------- Auth helpers ----------
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(
    creds: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> dict:
    if creds is None or not creds.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    email = payload.get("sub")
    admin = await db.admins.find_one({"email": email}, {"_id": 0, "password_hash": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Admin no longer exists")
    return admin


async def seed_admin() -> None:
    existing = await db.admins.find_one({"email": ADMIN_EMAIL})
    if existing is None:
        await db.admins.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger_seed.info("Seeded admin %s", ADMIN_EMAIL)
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.admins.update_one(
            {"email": ADMIN_EMAIL},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
        )
        logger_seed.info("Updated admin password for %s", ADMIN_EMAIL)


DEFAULT_HERO_SLIDES: List[Dict[str, Any]] = [
    {
        "key": "haat-bazaar",
        "chapter": "1990 · हाट बाज़ार",
        "title": "जहाँ से शुरू हुआ सफ़र।",
        "subtitle": "Where our journey began.",
        "image": "https://customer-assets.emergentagent.com/job_spice-heritage-68/artifacts/9oqtmc1b_CF64513A-0.jpeg",
        "cta_label": "हमारी विरासत",
        "cta_to": "/about",
    },
    {
        "key": "founder",
        "chapter": "संस्थापक · Mukesh Kushwah",
        "title": "पिताजी की विरासत।",
        "subtitle": "Three decades of the Kushwah family promise.",
        "image": "https://customer-assets.emergentagent.com/job_spice-heritage-68/artifacts/8c3b81kp_1C1187C0-6.jpeg",
        "cta_label": "संस्थापक से मिलें",
        "cta_to": "/about",
    },
    {
        "key": "rajpur-plant",
        "chapter": "2023 · राजपुर, मध्य प्रदेश",
        "title": "नीमाड़ का असली ज़ायका।",
        "subtitle": "FSSAI-grade, women-powered Rajpur facility.",
        "image": "https://images.unsplash.com/photo-1581091870627-3a3b3e43b3a0?auto=format&fit=crop&w=1920&q=80",
        "cta_label": "मसाले देखें",
        "cta_to": "/products",
    },
]

DEFAULT_SETTINGS: Dict[str, Any] = {
    "key": "site",
    "phone": "+91 62659 96333",
    "phone_raw": "+916265996333",
    "email": "info@nimadzayka.com",
    "whatsapp": "916265996333",
    "hero_slides": DEFAULT_HERO_SLIDES,
}


async def seed_settings() -> None:
    existing = await db.settings.find_one({"key": "site"})
    if existing is None:
        await db.settings.insert_one(DEFAULT_SETTINGS.copy())
        logger_seed.info("Seeded default site settings")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Nimad Zayka API is live", "brand": "Nimad Zayka Spices Pvt. Ltd."}


@api_router.get("/products", response_model=List[Product])
async def list_products(category: Optional[str] = None, featured: Optional[bool] = None):
    q: dict = {}
    if category in ("standard_pouch", "premium_box"):
        q["category"] = category
    if featured is True:
        q["is_featured"] = True
    products = await db.products.find(q, {"_id": 0}).to_list(200)
    return products


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    product = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@api_router.get("/categories")
async def list_categories():
    return [
        {"key": "standard_pouch", "label": "Standard Pouch", "description": "Everyday kitchen essentials in value packs."},
        {"key": "premium_box", "label": "Premium Box", "description": "Small-batch, gift-worthy masalas in keepsake boxes."},
    ]


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.inquiries.insert_one(doc)
    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries(
    type: Optional[str] = None,
    _: dict = Depends(get_current_admin),
):
    q: dict = {}
    if type:
        q["type"] = type
    items = await db.inquiries.find(q, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


# ---------- Site settings (public + admin) ----------
@api_router.get("/settings", response_model=SiteSettings)
async def public_settings():
    doc = await db.settings.find_one({"key": "site"}, {"_id": 0, "key": 0})
    if not doc:
        return SiteSettings(**{k: v for k, v in DEFAULT_SETTINGS.items() if k != "key"})
    return doc


# ---------- Admin endpoints ----------
@api_router.post("/admin/login", response_model=AdminLoginOut)
async def admin_login(payload: AdminLoginIn):
    email = payload.email.lower()
    admin = await db.admins.find_one({"email": email})
    if not admin or not verify_password(payload.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(email)
    return AdminLoginOut(token=token, email=email, role="admin")


@api_router.get("/admin/me", response_model=AdminMe)
async def admin_me(admin: dict = Depends(get_current_admin)):
    return AdminMe(email=admin["email"], role=admin.get("role", "admin"))


@api_router.get("/admin/stats")
async def admin_stats(_: dict = Depends(get_current_admin)):
    products_count = await db.products.count_documents({})
    inquiries_count = await db.inquiries.count_documents({})
    by_type: dict = {}
    async for doc in db.inquiries.aggregate([
        {"$group": {"_id": "$type", "count": {"$sum": 1}}}
    ]):
        by_type[doc["_id"]] = doc["count"]
    return {
        "products": products_count,
        "inquiries": inquiries_count,
        "inquiries_by_type": by_type,
    }


@api_router.post("/admin/products", response_model=Product)
async def admin_create_product(
    payload: ProductCreate,
    _: dict = Depends(get_current_admin),
):
    if await db.products.find_one({"slug": payload.slug}):
        raise HTTPException(status_code=409, detail="Product with this slug already exists")
    product = Product(**payload.model_dump())
    await db.products.insert_one(product.model_dump())
    return product


@api_router.put("/admin/products/{slug}", response_model=Product)
async def admin_update_product(
    slug: str,
    payload: ProductUpdate,
    _: dict = Depends(get_current_admin),
):
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.products.find_one_and_update(
        {"slug": slug},
        {"$set": updates},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")
    return result


@api_router.delete("/admin/products/{slug}")
async def admin_delete_product(
    slug: str,
    _: dict = Depends(get_current_admin),
):
    result = await db.products.delete_one({"slug": slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"ok": True, "deleted": slug}


@api_router.put("/admin/settings", response_model=SiteSettings)
async def admin_update_settings(
    payload: SiteSettingsUpdate,
    _: dict = Depends(get_current_admin),
):
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    if "hero_slides" in updates:
        updates["hero_slides"] = [
            hs if isinstance(hs, dict) else hs.dict() for hs in updates["hero_slides"]
        ]
    await db.settings.update_one(
        {"key": "site"},
        {"$set": updates},
        upsert=True,
    )
    doc = await db.settings.find_one({"key": "site"}, {"_id": 0, "key": 0})
    return doc


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
logger_seed = logging.getLogger("nimad.seed")


@app.on_event("startup")
async def on_startup():
    await seed_products()
    await seed_admin()
    await seed_settings()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
