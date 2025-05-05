# API Performance Testing

This directory contains performance testing scripts for the API endpoints using Locust.

## Setup

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

## Running the Tests

To run the performance tests:

1. Start your API server
2. Run the Locust test:
```bash
python -m locust -f performance_test.py
```
3. Open your browser and go to http://localhost:8089
4. Configure the test parameters:
   - Number of users to simulate
   - Spawn rate (users per second)
   - Host (http://localhost:3000/)
5. Start the test

## Test Results

The test will provide real-time metrics including:
- Response times
- Requests per second
- Number of users
- Error rates

Results are displayed both in the web interface and printed to the console.

## Customizing Tests

To test different endpoints:
1. Open `performance_test.py`
2. Modify the `test_api_endpoint` and `test_post_endpoint` methods
3. Add new test methods as needed using the `@task` decorator

## Notes

- Adjust the `wait_time` in the `APIUser` class to control the frequency of requests
- Modify the payload in `test_post_endpoint` to match your API's requirements
- Add authentication if needed in the `on_start` method 