"""
Backend API Tests for Nimad Zayka Admin Panel - Iteration 3
Tests: Admin Auth, Products CRUD, Inquiries (protected), Settings
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://spice-heritage-68.preview.emergentagent.com')

# Admin credentials from test_credentials.md
ADMIN_EMAIL = "nimadzayka@gmail.com"
ADMIN_PASSWORD = "Nikesh@09"


class TestAdminAuth:
    """Test admin authentication endpoints"""
    
    def test_login_valid_credentials(self):
        """POST /api/admin/login with valid creds → 200 {token, email, role}"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "token" in data
        assert data["email"] == ADMIN_EMAIL.lower()
        assert data["role"] == "admin"
        assert len(data["token"]) > 0
    
    def test_login_invalid_password(self):
        """POST /api/admin/login with wrong password → 401"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
    
    def test_login_malformed_email(self):
        """POST /api/admin/login with malformed email → 422"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": "not-an-email",
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
    
    def test_admin_me_with_valid_token(self):
        """GET /api/admin/me with Bearer token → 200 {email, role}"""
        # First login to get token
        login_resp = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_resp.json()["token"]
        
        # Now call /admin/me
        response = requests.get(f"{BASE_URL}/api/admin/me", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == ADMIN_EMAIL.lower()
        assert data["role"] == "admin"
    
    def test_admin_me_without_token(self):
        """GET /api/admin/me without token → 401"""
        response = requests.get(f"{BASE_URL}/api/admin/me")
        assert response.status_code == 401
    
    def test_admin_me_with_invalid_token(self):
        """GET /api/admin/me with invalid token → 401"""
        response = requests.get(f"{BASE_URL}/api/admin/me", headers={
            "Authorization": "Bearer invalid-token-here"
        })
        assert response.status_code == 401


class TestAdminStats:
    """Test admin stats endpoint"""
    
    @pytest.fixture
    def auth_headers(self):
        login_resp = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_resp.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_admin_stats_returns_counts(self, auth_headers):
        """GET /api/admin/stats returns {products, inquiries, inquiries_by_type}"""
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert "products" in data
        assert "inquiries" in data
        assert "inquiries_by_type" in data
        assert isinstance(data["products"], int)
        assert isinstance(data["inquiries"], int)
        assert isinstance(data["inquiries_by_type"], dict)


class TestInquiriesProtection:
    """Test that GET /api/inquiries is now protected"""
    
    @pytest.fixture
    def auth_headers(self):
        login_resp = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_resp.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_inquiries_without_token_returns_401(self):
        """GET /api/inquiries WITHOUT token → 401"""
        response = requests.get(f"{BASE_URL}/api/inquiries")
        assert response.status_code == 401
    
    def test_inquiries_with_token_returns_list(self, auth_headers):
        """GET /api/inquiries WITH token → list of inquiries"""
        response = requests.get(f"{BASE_URL}/api/inquiries", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        # Verify no _id leak
        for item in data:
            assert "_id" not in item


class TestAdminProductsCRUD:
    """Test admin products CRUD endpoints (all require Bearer token)"""
    
    @pytest.fixture
    def auth_headers(self):
        login_resp = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_resp.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_create_product(self, auth_headers):
        """POST /api/admin/products creates product"""
        payload = {
            "slug": "test-sambhar-masala-iter3",
            "name": "TEST Sambhar Masala",
            "local_name": "Sambhar",
            "category": "premium_box",
            "short_description": "Test product for iteration 3",
            "long_description": "This is a test product created during testing",
            "image": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
            "variants": [{"weight": "100g", "price": 99}],
            "tags": ["Test", "Premium"],
            "is_featured": False
        }
        response = requests.post(f"{BASE_URL}/api/admin/products", json=payload, headers=auth_headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["slug"] == "test-sambhar-masala-iter3"
        assert data["name"] == "TEST Sambhar Masala"
        assert "_id" not in data
        assert "id" in data
    
    def test_create_duplicate_slug_returns_409(self, auth_headers):
        """POST /api/admin/products with duplicate slug → 409"""
        # Try to create with existing slug
        payload = {
            "slug": "haldi-powder",  # This already exists
            "name": "Duplicate Test",
            "local_name": "Test",
            "category": "standard_pouch",
            "short_description": "Test",
            "long_description": "Test",
            "image": "https://example.com/img.jpg",
            "variants": [{"weight": "100g", "price": 50}]
        }
        response = requests.post(f"{BASE_URL}/api/admin/products", json=payload, headers=auth_headers)
        assert response.status_code == 409
        data = response.json()
        assert "detail" in data
    
    def test_update_product(self, auth_headers):
        """PUT /api/admin/products/{slug} updates product"""
        # Update the test product we created
        payload = {"name": "TEST Sambhar Masala Updated"}
        response = requests.put(
            f"{BASE_URL}/api/admin/products/test-sambhar-masala-iter3",
            json=payload,
            headers=auth_headers
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["name"] == "TEST Sambhar Masala Updated"
        assert "_id" not in data
    
    def test_toggle_featured(self, auth_headers):
        """PUT /api/admin/products/{slug} can toggle is_featured"""
        # Toggle featured on
        response = requests.put(
            f"{BASE_URL}/api/admin/products/test-sambhar-masala-iter3",
            json={"is_featured": True},
            headers=auth_headers
        )
        assert response.status_code == 200
        assert response.json()["is_featured"] == True
        
        # Toggle featured off
        response = requests.put(
            f"{BASE_URL}/api/admin/products/test-sambhar-masala-iter3",
            json={"is_featured": False},
            headers=auth_headers
        )
        assert response.status_code == 200
        assert response.json()["is_featured"] == False
    
    def test_delete_product(self, auth_headers):
        """DELETE /api/admin/products/{slug} removes product"""
        response = requests.delete(
            f"{BASE_URL}/api/admin/products/test-sambhar-masala-iter3",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] == True
        assert data["deleted"] == "test-sambhar-masala-iter3"
        
        # Verify it's gone
        get_response = requests.get(f"{BASE_URL}/api/products/test-sambhar-masala-iter3")
        assert get_response.status_code == 404
    
    def test_products_crud_without_token_returns_401(self):
        """All admin product endpoints without token → 401"""
        payload = {
            "slug": "test-no-auth",
            "name": "Test",
            "local_name": "Test",
            "category": "standard_pouch",
            "short_description": "Test",
            "long_description": "Test",
            "image": "https://example.com/img.jpg",
            "variants": [{"weight": "100g", "price": 50}]
        }
        # POST without auth
        response = requests.post(f"{BASE_URL}/api/admin/products", json=payload)
        assert response.status_code == 401
        
        # PUT without auth
        response = requests.put(f"{BASE_URL}/api/admin/products/haldi-powder", json={"name": "Test"})
        assert response.status_code == 401
        
        # DELETE without auth
        response = requests.delete(f"{BASE_URL}/api/admin/products/haldi-powder")
        assert response.status_code == 401


class TestSiteSettings:
    """Test site settings endpoints"""
    
    @pytest.fixture
    def auth_headers(self):
        login_resp = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_resp.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_public_settings_returns_data(self):
        """GET /api/settings (public) returns {phone, phone_raw, email, whatsapp, hero_slides[]}"""
        response = requests.get(f"{BASE_URL}/api/settings")
        assert response.status_code == 200
        data = response.json()
        assert "phone" in data
        assert "phone_raw" in data
        assert "email" in data
        assert "whatsapp" in data
        assert "hero_slides" in data
        assert isinstance(data["hero_slides"], list)
        assert len(data["hero_slides"]) >= 1
    
    def test_admin_update_settings(self, auth_headers):
        """PUT /api/admin/settings (admin only) updates settings"""
        # First get current settings
        current = requests.get(f"{BASE_URL}/api/settings").json()
        original_phone = current["phone"]
        
        # Update phone
        test_phone = "+91 99999 00000"
        response = requests.put(
            f"{BASE_URL}/api/admin/settings",
            json={"phone": test_phone},
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["phone"] == test_phone
        
        # Verify via public endpoint
        verify = requests.get(f"{BASE_URL}/api/settings").json()
        assert verify["phone"] == test_phone
        
        # Revert to original
        requests.put(
            f"{BASE_URL}/api/admin/settings",
            json={"phone": original_phone},
            headers=auth_headers
        )
    
    def test_admin_update_hero_slide_title(self, auth_headers):
        """PUT /api/admin/settings can update hero slide title"""
        # Get current settings
        current = requests.get(f"{BASE_URL}/api/settings").json()
        original_slides = current["hero_slides"]
        
        # Modify first slide title
        modified_slides = [s.copy() for s in original_slides]
        original_title = modified_slides[0]["title"]
        modified_slides[0]["title"] = "TEST Title Change"
        
        response = requests.put(
            f"{BASE_URL}/api/admin/settings",
            json={"hero_slides": modified_slides},
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert data["hero_slides"][0]["title"] == "TEST Title Change"
        
        # Revert
        modified_slides[0]["title"] = original_title
        requests.put(
            f"{BASE_URL}/api/admin/settings",
            json={"hero_slides": modified_slides},
            headers=auth_headers
        )
    
    def test_admin_settings_without_token_returns_401(self):
        """PUT /api/admin/settings without token → 401"""
        response = requests.put(
            f"{BASE_URL}/api/admin/settings",
            json={"phone": "+91 12345 67890"}
        )
        assert response.status_code == 401


class TestPublicInquiriesStillWork:
    """Regression: Public POST /api/inquiries still works"""
    
    def test_public_inquiry_submission(self):
        """POST /api/inquiries (public) still accepts inquiries"""
        payload = {
            "type": "contact",
            "name": "TEST_Iter3_Contact",
            "email": "test_iter3@example.com",
            "message": "Testing that public inquiry still works in iteration 3"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["type"] == "contact"
        assert data["name"] == "TEST_Iter3_Contact"
        assert "_id" not in data


class TestNoMongoIdLeak:
    """Verify MongoDB _id is not exposed in any admin response"""
    
    @pytest.fixture
    def auth_headers(self):
        login_resp = requests.post(f"{BASE_URL}/api/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        token = login_resp.json()["token"]
        return {"Authorization": f"Bearer {token}"}
    
    def test_admin_stats_no_id_leak(self, auth_headers):
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers=auth_headers)
        data = response.json()
        assert "_id" not in data
    
    def test_settings_no_id_leak(self):
        response = requests.get(f"{BASE_URL}/api/settings")
        data = response.json()
        assert "_id" not in data
        for slide in data.get("hero_slides", []):
            assert "_id" not in slide
