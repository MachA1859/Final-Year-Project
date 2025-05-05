from locust import HttpUser, task, between
import json
import time
from datetime import datetime

class APIUser(HttpUser):
    wait_time = between(1, 3)  # Wait 1-3 seconds between tasks
    
    def on_start(self):
        """Initialize any necessary setup before tests begin"""
        # You might need to add authentication here if required
        pass

    @task(1)
    def test_transactions_endpoint(self):
        """Test the transactions API endpoint"""
        start_time = time.time()
        
        response = self.client.get("/api/transactions")
        
        # Calculate response time
        response_time = time.time() - start_time
        
        # Log the results
        print(f"Test Time: {datetime.now()}")
        print(f"Endpoint: {response.url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response Time: {response_time:.2f} seconds")
        print("-" * 50)

    # @task(2)
    # def test_verify_otp_endpoint(self):
    #     """Test the OTP verification endpoint"""
    #     start_time = time.time()
    #     
    #     payload = {
    #         "userId": "test_user_id",
    #         "otp": "123456"  # Example OTP
    #     }
    #     response = self.client.post(
    #         "/api/verifyOTP",
    #         json=payload,
    #         headers={"Content-Type": "application/json"}
    #     )
    #     
    #     # Calculate response time
    #     response_time = time.time() - start_time
    #     
    #     # Log the results
    #     print(f"Test Time: {datetime.now()}")
    #     print(f"Endpoint: {response.url}")
    #     print(f"Status Code: {response.status_code}")
    #     print(f"Response Time: {response_time:.2f} seconds")
    #     print("-" * 50)

    # @task(3)
    # def test_send_otp_endpoint(self):
    #     """Test the OTP sending endpoint"""
    #     start_time = time.time()
    #     
    #     payload = {
    #         "phoneNumber": "+1234567890"  # Example phone number
    #     }
    #     response = self.client.post(
    #         "/api/sendOTP",
    #         json=payload,
    #         headers={"Content-Type": "application/json"}
    #     )
    #     
    #     # Calculate response time
    #     response_time = time.time() - start_time
    #     
    #     # Log the results
    #     print(f"Test Time: {datetime.now()}")
    #     print(f"Endpoint: {response.url}")
    #     print(f"Status Code: {response.status_code}")
    #     print(f"Response Time: {response_time:.2f} seconds")
    #     print("-" * 50) 