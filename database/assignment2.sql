-- #########################################################################
-- Assignment 2 - Task 1 SQL Statements
-- #########################################################################

-- Query 1: Insert new record for Tony Stark into the account table.
-- Note: Assumes account_id is auto-generated (SERIAL) and account_type has a default value or is nullable.
-- If account_type requires a value, adjust accordingly (e.g., add 'Client').
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'IamironM@n');

-- Query 2: Modify the Tony Stark record to change the account_type to 'Admin'.
-- Assumes 'account_type' is an ENUM or VARCHAR field that can accept 'Admin'.
-- Uses the email address to uniquely identify the record, as the account_id might vary.
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- Query 3: Delete the Tony Stark record from the database.
-- Uses the email address to uniquely identify the record.
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- Query 4: Modify the "GM Hummer" record in the inventory table.
-- Replaces "small interiors" with "a huge interior" in the inv_description field.
-- Assumes there's a record where inv_make = 'GM' and inv_model = 'Hummer'.
-- Adjust the WHERE clause if needed to uniquely identify the correct record (e.g., using inv_id).
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer'; -- Use inv_id if known for better precision

-- Query 5: Select make, model, and classification name for "Sport" category items.
-- Uses an INNER JOIN between the inventory and classification tables.
SELECT
    i.inv_make,
    i.inv_model,
    c.classification_name
FROM
    inventory AS i
INNER JOIN
    classification AS c ON i.classification_id = c.classification_id
WHERE
    c.classification_name = 'Sport';

-- Query 6: Update inv_image and inv_thumbnail paths in the inventory table.
-- Adds '/vehicles' in the middle of the path for all records.
-- Example: /images/car.jpg becomes /images/vehicles/car.jpg
UPDATE inventory
SET
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

-- End of Task 1 Queries
