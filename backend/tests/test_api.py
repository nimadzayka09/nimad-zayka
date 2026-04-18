"""
Backend API Tests for Nimad Zayka Spices E-commerce Website
Tests: Products, Categories, Inquiries endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://spice-heritage-68.preview.emergentagent.com')


class TestRootEndpoint:
    """Test root API endpoint returns brand info"""
    
    def test_root_returns_brand_info(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "brand" in data
        assert data["brand"] == "Nimad Zayka Spices Pvt. Ltd."
        assert "Nimad Zayka API is live" in data["message"]


class TestProductsEndpoint:
    """Test /api/products endpoint - listing, filtering, single product"""
    
    def test_list_all_products_returns_9(self):
        """Should return 9 seeded products"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 9
        # Verify no MongoDB _id leak
        for product in data:
            assert "_id" not in product
            assert "id" in product
            assert "slug" in product
            assert "name" in product
            assert "variants" in product
    
    def test_filter_by_standard_pouch(self):
        """Filter by category=standard_pouch should return 4 products"""
        response = requests.get(f"{BASE_URL}/api/products?category=standard_pouch")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 4
        for product in data:
            assert product["category"] == "standard_pouch"
    
    def test_filter_by_premium_box(self):
        """Filter by category=premium_box should return 5 products"""
        response = requests.get(f"{BASE_URL}/api/products?category=premium_box")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 5
        for product in data:
            assert product["category"] == "premium_box"
    
    def test_filter_by_featured(self):
        """Filter by featured=true should return 7 products"""
        response = requests.get(f"{BASE_URL}/api/products?featured=true")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 7
        for product in data:
            assert product["is_featured"] == True
    
    def test_get_single_product_by_slug(self):
        """GET /api/products/haldi-powder should return the product"""
        response = requests.get(f"{BASE_URL}/api/products/haldi-powder")
        assert response.status_code == 200
        data = response.json()
        assert data["slug"] == "haldi-powder"
        assert data["name"] == "Haldi (Turmeric Powder)"
        assert data["category"] == "standard_pouch"
        assert "_id" not in data
        assert len(data["variants"]) == 3
    
    def test_get_unknown_product_returns_404(self):
        """GET /api/products/unknown-slug should return 404"""
        response = requests.get(f"{BASE_URL}/api/products/unknown-slug")
        assert response.status_code == 404
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Product not found"


class TestCategoriesEndpoint:
    """Test /api/categories endpoint"""
    
    def test_list_categories_returns_2(self):
        """Should return 2 categories"""
        response = requests.get(f"{BASE_URL}/api/categories")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 2
        keys = [c["key"] for c in data]
        assert "standard_pouch" in keys
        assert "premium_box" in keys


class TestInquiriesEndpoint:
    """Test /api/inquiries endpoint - create and list inquiries"""
    
    def test_create_cart_inquiry_with_items(self):
        """POST cart inquiry with items should succeed"""
        payload = {
            "type": "cart",
            "name": "TEST_Cart User",
            "email": "test_cart@example.com",
            "phone": "+919876543210",
            "city": "Indore",
            "message": "Bulk order inquiry",
            "items": [
                {"product_slug": "haldi-powder", "product_name": "Haldi", "weight": "100g", "price": 55, "quantity": 2},
                {"product_slug": "mirchi-powder", "product_name": "Mirchi", "weight": "200g", "price": 119, "quantity": 1}
            ]
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["type"] == "cart"
        assert data["name"] == "TEST_Cart User"
        assert data["email"] == "test_cart@example.com"
        assert len(data["items"]) == 2
        assert "id" in data
        assert "created_at" in data
        assert "_id" not in data
    
    def test_create_contact_inquiry(self):
        """POST contact inquiry should succeed"""
        payload = {
            "type": "contact",
            "name": "TEST_Contact User",
            "email": "test_contact@example.com",
            "message": "General inquiry about products"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["type"] == "contact"
        assert data["name"] == "TEST_Contact User"
    
    def test_create_supplier_inquiry(self):
        """POST supplier inquiry should succeed"""
        payload = {
            "type": "supplier",
            "name": "TEST_Supplier",
            "email": "test_supplier@example.com",
            "company": "Test Farm Co",
            "city": "Rajpur"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["type"] == "supplier"
        assert data["company"] == "Test Farm Co"
    
    def test_create_career_inquiry(self):
        """POST career inquiry should succeed"""
        payload = {
            "type": "career",
            "name": "TEST_Career Applicant",
            "email": "test_career@example.com",
            "message": "Interested in sales role"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["type"] == "career"
    
    def test_create_distributor_inquiry(self):
        """POST distributor inquiry should succeed"""
        payload = {
            "type": "distributor",
            "name": "TEST_Distributor",
            "email": "test_dist@example.com",
            "city": "Mumbai"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["type"] == "distributor"
    
    def test_create_influencer_inquiry(self):
        """POST influencer inquiry should succeed"""
        payload = {
            "type": "influencer",
            "name": "TEST_Influencer",
            "email": "test_influencer@example.com",
            "message": "Food blogger with 50k followers"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["type"] == "influencer"
    
    def test_reject_invalid_email(self):
        """POST with invalid email should return 422"""
        payload = {
            "type": "contact",
            "name": "Test",
            "email": "invalid-email"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
    
    def test_reject_invalid_type(self):
        """POST with invalid type should return 422"""
        payload = {
            "type": "invalid_type",
            "name": "Test",
            "email": "test@example.com"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
    
    def test_list_all_inquiries(self):
        """GET /api/inquiries should return list"""
        response = requests.get(f"{BASE_URL}/api/inquiries")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Verify no _id leak
        for inquiry in data:
            assert "_id" not in inquiry
    
    def test_filter_inquiries_by_type(self):
        """GET /api/inquiries?type=cart should filter"""
        response = requests.get(f"{BASE_URL}/api/inquiries?type=cart")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        for inquiry in data:
            assert inquiry["type"] == "cart"


class TestNoMongoIdLeak:
    """Verify MongoDB _id is not exposed in any response"""
    
    def test_products_no_id_leak(self):
        response = requests.get(f"{BASE_URL}/api/products")
        for item in response.json():
            assert "_id" not in item
    
    def test_single_product_no_id_leak(self):
        response = requests.get(f"{BASE_URL}/api/products/haldi-powder")
        assert "_id" not in response.json()
    
    def test_inquiries_no_id_leak(self):
        response = requests.get(f"{BASE_URL}/api/inquiries")
        for item in response.json():
            assert "_id" not in item
