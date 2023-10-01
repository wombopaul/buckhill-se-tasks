-- SQL statement to create a view that will be updated daily showing all the orders for the current week 
-- including products, clients, payments and status details.

CREATE VIEW CurrentWeekOrders AS
SELECT
    O.uuid,
    O.created_at,
    O.amount,
    O.products,
    CONCAT(U.first_name, ' ',  U.last_name) AS client_name,
    U.email,
    U.phone_number,
    P.type AS payment_type,
    P.details AS payment_details,
    S.title AS order_status,
    S.updated_at AS order_status_updated_at
FROM
    Orders O
    JOIN users U ON O.user_id = U.id
    JOIN payments P ON O.payment_id = P.id
    JOIN order_statuses S ON O.order_status_id = S.id
WHERE
   O.created_at >= DATE_ADD(CURRENT_DATE(), INTERVAL 1-DAYOFWEEK(CURRENT_DATE()) DAY)
    AND O.created_at <= DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL 1-DAYOFWEEK(CURRENT_DATE()) DAY), INTERVAL 6 DAY);


-- A view where we can visualize a weekly report with 7 columns, each column will be labeled with the day and date, 
-- and each row will show a concatenation of these elements and they will be separated by a double colon ::

-- order_uuid

-- number of products

-- order amount in cents


CREATE VIEW WeeklyReport AS
SELECT
    CASE WHEN DAYOFWEEK(o.created_at) = 2 THEN 
        CONCAT(o.uuid, '::', JSON_LENGTH(o.products), '::', CAST(o.amount * 100 AS SIGNED)) END AS Monday,
    CASE WHEN DAYOFWEEK(o.created_at) = 3 THEN 
        CONCAT(o.uuid, '::', JSON_LENGTH(o.products), '::', CAST(o.amount * 100 AS SIGNED)) END AS Tuesday,
    CASE WHEN DAYOFWEEK(o.created_at) = 4 THEN 
        CONCAT(o.uuid, '::', JSON_LENGTH(o.products), '::', CAST(o.amount * 100 AS SIGNED)) END AS Wednesday,
    CASE WHEN DAYOFWEEK(o.created_at) = 5 THEN 
        CONCAT(o.uuid, '::', JSON_LENGTH(o.products), '::', CAST(o.amount * 100 AS SIGNED)) END AS Thursday,
    CASE WHEN DAYOFWEEK(o.created_at) = 6 THEN 
        CONCAT(o.uuid, '::', JSON_LENGTH(o.products), '::', CAST(o.amount * 100 AS SIGNED)) END AS Friday,
    CASE WHEN DAYOFWEEK(o.created_at) = 7 THEN 
        CONCAT(o.uuid, '::', JSON_LENGTH(o.products), '::', CAST(o.amount * 100 AS SIGNED)) END AS Saturday,
    CASE WHEN DAYOFWEEK(o.created_at) = 1 THEN 
        CONCAT(o.uuid, '::', JSON_LENGTH(o.products), '::', CAST(o.amount * 100 AS SIGNED)) END AS Sunday
FROM (
    SELECT
        uuid,
        products,
        amount,
        DATE(created_at) AS created_at
    FROM
        orders
) AS o
WHERE
    O.created_at >= DATE_ADD(CURRENT_DATE(), INTERVAL 1-DAYOFWEEK(CURRENT_DATE()) DAY)
    AND O.created_at <= DATE_ADD(DATE_ADD(CURRENT_DATE(), INTERVAL 1-DAYOFWEEK(CURRENT_DATE()) DAY), INTERVAL 6 DAY);
