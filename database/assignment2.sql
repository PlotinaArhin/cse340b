-- Inserting VALUES into account table
INSERT INTO public.account (
	account_firstname,
	account_lastname,
	account_email,
	account_password
) VALUES (
	'Tony',
	'Stark',
	'tony@starkent.com',
	'Iam1ronM@n'
);

-- Modifying account_type to 'Admin' for account_id = 1
UPDATE public.account SET account_type = 'Admin' WHERE account_id = 1;

-- Deleting account_id = 1
DELETE FROM public.account WHERE account_id = 1;

-- REPLACING part of inv_decscription text for inv_id = 10
UPDATE public.inventory 
	SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
	WHERE inv_id = 10;

--INNER JOIN the classification table with the inventory table
SELECT inv_make, inv_model, classification_name FROM public.inventory 
	INNER JOIN public.classification
	ON inv_model = 'Sport';

-- REPLACING inv_images and inv_thumbnails for inventory table
UPDATE public.inventory
	SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
		inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');