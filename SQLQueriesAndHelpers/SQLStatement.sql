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
   YEAR(O.created_at) = YEAR(DATE_SUB(CURDATE(), INTERVAL -1 MONTH))
    AND MONTH(O.created_at) = MONTH(DATE_SUB(CURDATE(), INTERVAL -1 MONTH));
