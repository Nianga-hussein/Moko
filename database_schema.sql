-- Ce schéma est conçu pour gérer tous les verticaux (Immo, Boutique, Visa, etc.)
-- via une interface administrateur unifiée.

-- ============================================================================
-- SECTION 1 · UTILISATEURS (CRM)
-- - Admins, Clients, Prestataires, Livreurs
-- - Identifiant principal: numéro de téléphone (mobile-first)
-- ============================================================================

-- 1. GESTION DES UTILISATEURS (CRM)
-- Gère les Admins, Clients, et Prestataires (Vendeurs, Agents Immo, etc.)
-- Table: users
-- Rôle: Répertoire central des personnes (clients, admins, prestataires, livreurs).
-- Colonnes clés:
--   - phone_number: identifiant principal pour connexion et contact.
--   - role: profil métier en français (admin, client, prestataire, livreur).
--   - is_verified: indique la validation d’un compte (ex: prestataire).
-- Relations principales:
--   - items.provider_id (qui publie), bookings.user_id (qui réserve),
--     conversations.user_id (client), balances.user_id (solde),
--     deliveries.driver_id (livreur), etc.
-- Usages courants:
--   - Gestion de profils, vérifications, affectations d’agents, recherche/filtrage.
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20) UNIQUE NOT NULL, -- Identifiant principal (Mobile First)
    password_hash VARCHAR(255),
    role ENUM('admin', 'client', 'prestataire', 'livreur') DEFAULT 'client',
    avatar_url VARCHAR(255),
    address TEXT,
    city VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE, -- Pour les prestataires validés
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SECTION 2 · CATALOGUE UNIFIÉ
-- - Catégories et sous-catégories pour Boutique, Immo, Voyage, Éducation, Événements
-- ============================================================================
-- Définit les grandes catégories : "Immobilier", "Boutique", "Voyage", "Éducation"
-- Table: categories
-- Rôle: Taxonomie commune pour classer les éléments du catalogue.
-- Colonnes clés:
--   - type: comportement métier (boutique, immobilier, voyage, education, evenement).
--   - parent_id: structure d’arborescence (catégorie/sous-catégorie).
-- Relations:
--   - Référencée par items.category_id.
-- Usages:
--   - Filtrage par domaines et sous-domaines, affichage d’icônes/images.
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL, -- ex: "Immobilier", "Smartphones", "France"
    slug VARCHAR(50) UNIQUE NOT NULL, -- ex: "immobilier", "smartphones", "visa-france"
    type ENUM('boutique', 'immobilier', 'service', 'voyage', 'education', 'evenement') NOT NULL, -- Définit le comportement
    parent_id INT, -- Pour les sous-catégories (ex: "Appartements" sous "Immobilier")
    icon_url VARCHAR(255),
    image_url VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ============================================================================
-- SECTION 3 · ANNONCES & ÉLÉMENTS DU CATALOGUE
-- - Produits, Biens, Services, Dossiers Visa, Formations, Événements
-- - Spécificités stockées en JSON (attributs_specifiques)
-- ============================================================================
-- Cette table stocke TOUT : Produits, Maisons, Écoles, Pays pour Visas.
-- Le champ 'attributes' (JSON) stocke les détails spécifiques.
-- Table: items
-- Rôle: Table polymorphe pour tout type d’élément/annonce (produit, bien, visa, service, formation, événement).
-- Colonnes clés:
--   - specific_attributes (JSON): attributs propres au type (ex: “bedrooms”, “documents_required”).
--   - status: état de publication (actif, inactif, vendu, en_revision).
--   - stock_quantity: stock pour les produits de boutique.
-- Relations:
--   - provider_id -> users (prestataire), category_id -> categories (classification).
-- Usages:
--   - Listing catalogue, fiches détaillées, passage en révision, disponibilité.
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
    
    status ENUM('actif', 'inactif', 'vendu', 'en_revision') DEFAULT 'actif',
    stock_quantity INT DEFAULT 1, -- Pour les produits boutiques
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ============================================================================
-- SECTION 4 · RÉSERVATIONS & COMMANDES
-- - Réservations polyvalentes: achat, location, rendez-vous, demande
-- - Statuts et paiements unifiés
-- ============================================================================
-- Centralise toutes les demandes entrantes
-- Table: bookings
-- Rôle: Demandes/réservations multi-domaines (achat, location, rendez-vous, demande).
-- Colonnes clés:
--   - booking_type: nature de la demande.
--   - scheduled_date/scheduled_time: planification (rdv, livraison, visite).
--   - payment_status/method: état et méthode de paiement.
-- Relations:
--   - user_id -> users (client), item_id -> items (élément ciblé).
-- Index:
--   - idx_bookings_user_status (plus bas) accélère le tri par client/statut.
-- Usages:
--   - Traitement en back-office, suivi planning et paiements.
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Le client
    item_id INT, -- Ce qui est réservé (peut être NULL si demande générique)
    
    booking_type ENUM('achat', 'location', 'rendez_vous', 'demande') NOT NULL,
    -- purchase: Achat boutique
    -- rental: Location immo
    -- appointment: RDV Service/Médical
    -- application: Dossier Visa/Inscription École
    
    status ENUM('en_attente', 'confirmee', 'en_traitement', 'terminee', 'annulee') DEFAULT 'en_attente',
    
    -- Détails temporels
    scheduled_date DATE,
    scheduled_time TIME,
    
    -- Détails financiers
    total_amount DECIMAL(12, 2),
    payment_status ENUM('non_paye', 'paye', 'partiel') DEFAULT 'non_paye',
    payment_method ENUM('especes', 'mobile_money', 'carte') DEFAULT 'especes',
    
    delivery_address TEXT, -- Pour les livraisons boutiques
    user_notes TEXT, -- "Besoin d'une inspection", "Urgent"
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- ============================================================================
-- SECTION 5 · MESSAGERIE & SUPPORT (Chat)
-- - Remplace WhatsApp par un système interne traçable
-- - Conversations assignées à un agent
-- ============================================================================
-- Remplace WhatsApp par un système interne gérable
-- Table: conversations
-- Rôle: Canal de support par client, assigné à un agent, avec statut (ouvert/fermé/archivé).
-- Colonnes clés:
--   - topic: contexte (ex: “Demande Visa France #123”).
--   - last_message_at: ordonnancement par activité récente.
-- Relations:
--   - user_id -> users (client), assigned_to -> users (agent).
CREATE TABLE conversations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- Client
    assigned_to INT, -- Agent Admin qui gère le dossier
    topic VARCHAR(100), -- ex: "Demande Visa France #123"
    status ENUM('ouvert', 'ferme', 'archive') DEFAULT 'ouvert',
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Table: messages
-- Rôle: Messages d’une conversation (texte, image, document, localisation).
-- Colonnes clés:
--   - is_read: lecture/non-lu pour badger côté agent.
--   - message_type: type de contenu pour affichage approprié.
-- Relations:
--   - conversation_id -> conversations, sender_id -> users.
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL, -- Peut être le client ou l'admin
    content TEXT,
    message_type ENUM('texte', 'image', 'document', 'localisation') DEFAULT 'texte',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

-- ============================================================================
-- SECTION 6 · CONFIGURATION SYSTÈME
-- - Paramètres globaux modifiables sans déploiement (numéros, taux, etc.)
-- ============================================================================
-- Pour gérer les bannières, taux de change, numéros sans coder
-- Table: system_settings
-- Rôle: Paramètres globaux (clé/valeur) pour opérabilité sans déploiement.
-- Usages:
--   - Numéro WhatsApp principal, taux de change, bannières et annonces système.
CREATE TABLE system_settings (
    setting_key VARCHAR(50) PRIMARY KEY, -- ex: "whatsapp_main_number", "exchange_rate_usd_xaf"
    setting_value TEXT,
    description VARCHAR(255)
);

-- DONNÉES D'EXEMPLE (SEEDING)
-- Pour montrer comment stocker différents types de données

-- 1. Catégories
INSERT INTO categories (name, slug, type) VALUES 
('Immobilier', 'immobilier', 'immobilier'),
('Smartphones', 'smartphones', 'boutique'),
('Visas Europe', 'visas-europe', 'voyage');

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
-- Table: roles
-- Rôle: Référentiel des rôles métiers (ex: agent_visa, manager_boutique).
-- Usages:
--   - Complément de users.role pour combinaisons multiples par utilisateur.
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);
-- Table: user_roles
-- Rôle: Liaison N:N entre users et roles (plusieurs rôles par utilisateur).
-- Usages:
--   - Gestion fine des permissions et capacités métiers.
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
-- Table: enterprises
-- Rôle: Entités “productrices” (boutiques, agences immo, écoles, organisateurs).
-- Usages:
--   - Grouper items, afficher logo/marque, organiser événements.
CREATE TABLE enterprises (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table: user_enterprises
-- Rôle: Appartenance d’utilisateurs à des entreprises (employés, agents, gérants).
-- Usages:
--   - Contrôle d’accès aux items liés à l’entreprise.
CREATE TABLE user_enterprises (
    user_id INT NOT NULL,
    enterprise_id INT NOT NULL,
    role_label VARCHAR(50),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, enterprise_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
);
-- Table: user_verifications
-- Rôle: Suivi de la vérification d’identité (document, SMS, email, manuel).
-- Usages:
--   - Qualité, conformité, activation de comptes prestataires.
CREATE TABLE user_verifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    status ENUM('non_verifie','en_attente','verifie','rejete') DEFAULT 'non_verifie',
    method ENUM('document','sms','email','manuel') DEFAULT 'document',
    verified_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Table: balances
-- Rôle: Solde par devise (MoKo Pay) pour un utilisateur.
-- Points clés:
--   - UNIQUE (user_id, currency) pour éviter les doublons de compte par devise.
CREATE TABLE balances (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    currency VARCHAR(10) DEFAULT 'XAF',
    amount DECIMAL(14,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (user_id, currency),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Table: transactions
-- Rôle: Mouvement financier (crédit/débit) lié à un utilisateur.
-- Points clés:
--   - source documente l’origine (commande, retrait, dépôt, remboursement, ajustement).
-- Index:
--   - idx_transactions_user_created pour historisation rapide.
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount DECIMAL(14,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'XAF',
    direction ENUM('credit','debit') NOT NULL,
    source ENUM('commande','retrait','depot','remboursement','ajustement') NOT NULL,
    reference VARCHAR(100),
    meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_transactions_user_created ON transactions(user_id, created_at);
-- Table: orders
-- Rôle: Commande transactionnelle (statut: en_attente, paye, annule, rembourse, terminee).
-- Usages:
--   - Back-office de commandes, KPI, reporting.
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    status ENUM('en_attente','paye','annule','rembourse','terminee') DEFAULT 'en_attente',
    total_amount DECIMAL(14,2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'XAF',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- Table: order_items
-- Rôle: Lignes d’une commande (produit/service/visa/billet/bien).
-- Usages:
--   - Calcul des totaux, reporting par type d’article.
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT,
    item_type ENUM('produit','service','visa','billet_evenement','bien_immobilier') NOT NULL,
    title VARCHAR(150),
    quantity INT DEFAULT 1,
    unit_price DECIMAL(14,2) DEFAULT 0,
    meta JSON,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);
-- Table: visa_reservations
-- Rôle: Dossiers de visas par utilisateur, associés éventuellement à une entreprise.
-- Usages:
--   - Suivi des statuts (en_attente, soumis, approuve, rejete, annule) et des RDV.
CREATE TABLE visa_reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    enterprise_id INT,
    country VARCHAR(100),
    status ENUM('en_attente','soumis','approuve','rejete','annule') DEFAULT 'en_attente',
    appointment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
);
-- Table: properties
-- Rôle: Biens immobiliers (location/vente) publiés par des entreprises.
-- Usages:
--   - Listing et statut (disponible, loue, vendu, inactif).
CREATE TABLE properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enterprise_id INT,
    title VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    price DECIMAL(14,2),
    status ENUM('disponible','loue','vendu','inactif') DEFAULT 'disponible',
    listed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
);
-- Table: events
-- Rôle: Événements (organisés par entreprises) avec planning et statut.
-- Usages:
--   - Agenda, ventes, suivi d’exécution (planifie, termine, annule).
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enterprise_id INT,
    name VARCHAR(150) NOT NULL,
    start_date DATE,
    end_date DATE,
    location VARCHAR(150),
    status ENUM('planifie','termine','annule') DEFAULT 'planifie',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
);
-- Table: event_tickets
-- Rôle: Types de billets (nom, prix, devise, statut).
-- Usages:
--   - Gestion des stocks, ventes, affichage boutique billetterie.
CREATE TABLE event_tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    name VARCHAR(100),
    price DECIMAL(14,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'XAF',
    status ENUM('actif','inactif','epuise') DEFAULT 'actif',
    FOREIGN KEY (event_id) REFERENCES events(id)
);
-- Table: conversation_participants
-- Rôle: Participants d’une conversation (client, admin, agent) pour multi-acteurs.
CREATE TABLE conversation_participants (
    conversation_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('client','admin','agent') DEFAULT 'client',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (conversation_id, user_id),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Table: notifications
-- Rôle: Notifications utilisateur (contenu, lu/non-lu).
-- Usages:
--   - Alertes système, confirmations, rappels.
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Table: audit_logs
-- Rôle: Journal des actions (qui, quoi, sur quelle cible) pour traçabilité.
-- Usages:
--   - Conformité, diagnostic des incidents, audit interne.
CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    actor_user_id INT,
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50),
    target_id INT,
    details JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_user_id) REFERENCES users(id)
);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
-- Table: user_ratings
-- Rôle: Note d’un utilisateur (score 1–5) et commentaire optionnel.
-- Usages:
--   - Messagerie: afficher “Note Client”, scoring qualité.
CREATE TABLE user_ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    rater_user_id INT,
    score TINYINT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rater_user_id) REFERENCES users(id)
);
-- Table: enterprise_ratings
-- Rôle: Notes/avis sur une entreprise (ex: boutique).
-- Usages:
--   - Étoiles dans listings, classements marketplace.
CREATE TABLE enterprise_ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enterprise_id INT NOT NULL,
    user_id INT,
    score TINYINT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Table: property_visits
-- Rôle: Demandes et programmations de visites immobilières (planning).
-- Index:
--   - idx_property_visits_property_date pour agenda par bien/date.
CREATE TABLE property_visits (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    user_id INT NOT NULL,
    visit_date DATE,
    visit_time TIME,
    status ENUM('demande','programme','effectue','annule') DEFAULT 'demande',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE INDEX idx_property_visits_property_date ON property_visits(property_id, visit_date);
-- Table: deliveries
-- Rôle: Suivi de livraison de commande (assignation livreur, états).
-- Usages:
--   - Opérations/logistique, temps de traitement, KPI livraison.
CREATE TABLE deliveries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    driver_id INT,
    status ENUM('en_attente','assignee','recuperee','en_transit','livree','annulee') DEFAULT 'en_attente',
    assigned_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    meta JSON,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);
CREATE INDEX idx_deliveries_order_status ON deliveries(order_id, status);
