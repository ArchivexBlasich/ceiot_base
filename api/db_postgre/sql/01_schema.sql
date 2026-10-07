CREATE TABLE devices (
    device_id VARCHAR(255) PRIMARY KEY, 
    name VARCHAR(255), 
    key VARCHAR(255)
);

CREATE TABLE users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    key VARCHAR(255)
);