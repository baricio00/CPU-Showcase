Key Features:
- Interactive CPU List: View and select from a list of CPUs, each with key details such as brand, model, and socket type.
- Responsive Design: a fluid user experience is provided on both desktop and mobile devices, with adaptive views that switch between list and detail modes based on screen size.
- CPU Information: Access information about each CPU, including clock speed, core count, threads, TDP, and pricing.
- Edit and Update: Edit CPU details and save updates directly from the interface. Changes are reflected in real-time and stored in a PostgreSQL database.
- Backend Integration: A Node.js server handles data retrieval and updates, ensuring smooth interaction between the frontend and the PostgreSQL database.

Initialization
- npm init -y
- npm install express pg cors
- npm install nodemon --save-dev
- create the express server
- npm install axios

Sample data for the database
CREATE TABLE socket (
    name VARCHAR(50) PRIMARY KEY
);
CREATE TABLE cpu ( cpu(id, brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur)
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    socket_name VARCHAR(50) REFERENCES socket(name),
    clockspeed NUMERIC(5, 2) NOT NULL,
    cores INTEGER NOT NULL,
    threads INTEGER NOT NULL,
    tdp INTEGER NOT NULL,
    price_eur NUMERIC(10, 2) NOT NULL
);

INSERT INTO socket (name) VALUES
('LGA1200'),
('LGA1700'),
('AM4'),
('TR4'),
('sTRX4');

INSERT INTO cpu (brand, model, socket_name, clockspeed, cores, threads, tdp, price_eur) VALUES
('Intel', 'Core i7-10700K', 'LGA1200', 3.8, 8, 16, 125, 379.99),
('AMD', 'Ryzen 9 3900X', 'AM4', 3.8, 12, 24, 105, 499.99),
('AMD', 'Threadripper 3960X', 'TR4', 3.8, 24, 48, 280, 1399.99),
('AMD', 'Ryzen 5 3600', 'AM4', 3.6, 6, 12, 65, 199.99),
('AMD', 'Ryzen 7 5800X', 'AM4', 3.8, 8, 16, 105, 399.99),
('Intel', 'Core i5-10400', 'LGA1200', 2.9, 6, 12, 65, 182.00),
('AMD', 'Ryzen 9 5950X', 'AM4', 3.4, 16, 32, 105, 799.99),
('Intel', 'Core i9-11900K', 'LGA1200', 3.5, 8, 16, 125, 539.00),
('AMD', 'Ryzen 5 5600X', 'AM4', 3.7, 6, 12, 65, 299.00),
('Intel', 'Core i5-12600K', 'LGA1700', 3.7, 10, 16, 125, 319.00),
('Intel', 'Core i7-12700K', 'LGA1700', 3.6, 12, 20, 125, 429.00),
('AMD', 'Ryzen Threadripper 3960X', 'TR4', 3.8, 24, 48, 280, 1399.99),
('AMD', 'Ryzen Threadripper 3990X', 'TR4', 2.9, 64, 128, 280, 3990.00),
('Intel', 'Core i9-12900K', 'LGA1700', 3.2, 16, 24, 125, 589.00),
('AMD', 'Ryzen 7 7700X', 'AM5', 4.5, 8, 16, 105, 399.00),
('Intel', 'Core i5-13600K', 'LGA1700', 3.5, 14, 20, 125, 319.00),
('AMD', 'Ryzen 9 7900X', 'AM5', 4.7, 12, 24, 170, 549.00);
