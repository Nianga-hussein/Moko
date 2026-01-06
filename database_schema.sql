-- Schéma de base de données pour MOKO Super-App
-- Ce schéma est conçu pour gérer tous les verticaux (Immo, Boutique, Visa, etc.)
-- via une interface administrateur unifiée.

-- 1. GESTION DES UTILISATEURS (CRM)
-- Gère les Admins, Clients, et Prestataires (Vendeurs, Agents Immo, etc.)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20) UNIQUE NOT NULL, -- Identifiant principal (Mobile First)
    password_hash VARCHAR(255),
    role ENUM('admin', 'client', 'provider', 'driver') DEFAULT 'client',
    avatar_url VARCHAR(255),
    address TEXT,
    city VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE, -- Pour les prestataires validés
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATALOGUE UNIFIÉ (Structure flexible)
-- Définit les grandes catégories : "Immobilier", "Boutique", "Voyage", "Éducation"
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL, -- ex: "Immobilier", "Smartphones", "France"
    slug VARCHAR(50) UNIQUE NOT NULL, -- ex: "immobilier", "smartphones", "visa-france"
    type ENUM('shop', 'real_estate', 'service', 'travel', 'education', 'event') NOT NULL, -- Définit le comportement
    parent_id INT, -- Pour les sous-catégories (ex: "Appartements" sous "Immobilier")
    icon_url VARCHAR(255),
    image_url VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 3. ITEMS & ANNONCES (Tableau de bord central)
-- Cette table stocke TOUT : Produits, Maisons, Écoles, Pays pour Visas.
-- Le champ 'attributes' (JSON) stocke les détails spécifiques.
CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT, -- Qui propose ce service ? (ex: L'agence immo, ou Moko Admin)
    category_id INT NOT NULL,
    title VARCHAR(150) NOT NULL, -- ex: "Villa 4 pièces", "iPhone 14", "Visa Tourisme"
    description TEXT,
    price DECIMAL(12, 2), -- Prix (Loyer, Prix produit, Frais dossier)
    currency VARCHAR(10) DEFAULT 'XAF',
    location VARCHAR(100), -- Pour Immo, Écoles, Services
    image_url VARCHAR(255),
    gallery_images JSON, -- Liste d'images supplémentaires
    
    -- Stocke les spécificités :
    -- Immo: {"bedrooms": 3, "bathrooms": 2, "surface": 150}
    -- Visa: {"documents_required": ["passport", "photo"], "duration": "90 days"}
    -- École: {"programs": ["License", "Master"], "accreditation": true}
    specific_attributes JSON, 
    
    status ENUM('active', 'inactive', 'sold', 'pending_review') DEFAULT 'active',
    stock_quantity INT DEFAULT 1, -- Pour les produits boutiques
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 4. COMMANDES & RÉSERVATIONS (Booking System)
-- Centralise toutes les demandes entrantes
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Le client
    item_id INT, -- Ce qui est réservé (peut être NULL si demande générique)
    
    booking_type ENUM('purchase', 'rental', 'appointment', 'application') NOT NULL,
    -- purchase: Achat boutique
    -- rental: Location immo
    -- appointment: RDV Service/Médical
    -- application: Dossier Visa/Inscription École
    
    status ENUM('pending', 'confirmed', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    
    -- Détails temporels
    scheduled_date DATE,
    scheduled_time TIME,
    
    -- Détails financiers
    total_amount DECIMAL(12, 2),
    payment_status ENUM('unpaid', 'paid', 'partial') DEFAULT 'unpaid',
    payment_method ENUM('cash', 'mobile_money', 'card') DEFAULT 'cash',
    
    delivery_address TEXT, -- Pour les livraisons boutiques
    user_notes TEXT, -- "Besoin d'une inspection", "Urgent"
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- 5. MESSAGERIE & SUPPORT (Chat)
-- Remplace WhatsApp par un système interne gérable
CREATE TABLE conversations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Client
    assigned_to INT, -- Agent Admin qui gère le dossier
    topic VARCHAR(100), -- ex: "Demande Visa France #123"
    status ENUM('open', 'closed', 'archived') DEFAULT 'open',
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL, -- Peut être le client ou l'admin
    content TEXT,
    message_type ENUM('text', 'image', 'document', 'location') DEFAULT 'text',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

-- 6. CONFIGURATION SYSTÈME
-- Pour gérer les bannières, taux de change, numéros sans coder
CREATE TABLE system_settings (
    setting_key VARCHAR(50) PRIMARY KEY, -- ex: "whatsapp_main_number", "exchange_rate_usd_xaf"
    setting_value TEXT,
    description VARCHAR(255)
);

-- DONNÉES D'EXEMPLE (SEEDING)
-- Pour montrer comment stocker différents types de données

-- 1. Catégories
INSERT INTO categories (name, slug, type) VALUES 
('Immobilier', 'immobilier', 'real_estate'),
('Smartphones', 'smartphones', 'shop'),
('Visas Europe', 'visas-europe', 'travel');

-- 2. Items (Polymorphisme en action)
-- A. Un Appartement (Immo)
INSERT INTO items (category_id, title, price, location, specific_attributes) 
VALUES (1, 'Appartement Moderne Plateau', 250000, 'Brazzaville', '{"bedrooms": 2, "bathrooms": 1, "furnished": true}');

-- B. Un Téléphone (Boutique)
INSERT INTO items (category_id, title, price, specific_attributes) 
VALUES (2, 'iPhone 14 Pro', 850000, '{"color": "Deep Purple", "storage": "256GB", "brand": "Apple"}');

-- C. Un Visa (Voyage)
INSERT INTO items (category_id, title, price, specific_attributes) 
VALUES (3, 'Visa France Court Séjour', 55000, '{"processing_time": "15 days", "requirements": ["passport", "bank_statement"]}');
