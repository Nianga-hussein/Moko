const categoriesData = [
    {
        id: "voyage-visa",
        title: "Voyage et Visa",
        image: "assets/media/Categories/3️⃣ Voyage & Mobilité.jpeg",
        folder: "3️⃣ Voyage & Mobilité",
        subcategories: [
            { title: "Destinations (pays, villes)", image: "Billetterie.jpeg" },
            { title: "Informations touristiques", image: "Études & mobilité internationale.jpeg" },
            { title: "Demande et renouvellement de visa", image: "Visa & immigration.jpeg" },
            { title: "Prise de rendez-vous ambassade", image: "Assistance consulaire.jpeg" },
            { title: "Réservation de billets d’avion", image: "Billetterie.jpeg" },
            { title: "Réservation d’hôtels et logements", image: "Hébergement.jpeg" },
            { title: "Assurances voyage", image: "Assurance voyage.jpeg" },
            { title: "Agences de voyage", image: "Hébergement.jpeg" },
            { title: "Location de véhicules", image: "Location courte durée.jpeg" },
            { title: "Formalités douanières", image: "Visa & immigration.jpeg" },
            { title: "Conseils et guides de voyage", image: "Études & mobilité internationale.jpeg" }
        ]
    },
    {
        id: "boutiques-commerces",
        title: "Boutiques et Commerces Locaux",
        image: "assets/media/Categories/1️⃣8️⃣ Commerce & Produits.jpeg",
        folder: "1️⃣8️⃣ Commerce & Produits",
        subcategories: [
            { title: "Alimentation et produits frais", image: "Commerce & Produits.jpg" },
            { title: "Supermarchés et épiceries", image: "Commerce & Produits.jpg" },
            { title: "Mode et accessoires", image: "Achat & revente.jpeg" },
            { title: "Beauté et cosmétiques", image: "Produits locaux & artisanaux.jpg" },
            { title: "Électronique et high-tech", image: "E-commerce.jpeg" },
            { title: "Maison et décoration", image: "Produits locaux & artisanaux.jpg" },
            { title: "Produits artisanaux locaux", image: "Produits locaux & artisanaux.jpg" },
            { title: "Librairies et papeteries", image: "Commerce & Produits.jpg" },
            { title: "Pharmacies et parapharmacies", image: "Commerce & Produits.jpg" },
            { title: "Restaurants et fast-food", image: "Commerce & Produits.jpg" }
        ]
    },
    {
        id: "education-formations",
        title: "Éducation et Formations",
        image: "assets/media/Categories/1️⃣4️⃣ Formation & Éducation.jpeg",
        folder: "1️⃣4️⃣ Formation & Éducation",
        subcategories: [
            { title: "Écoles primaires et secondaires", image: "Orientation & études.jpeg" },
            { title: "Universités et instituts supérieurs", image: "Orientation & études.jpeg" },
            { title: "Centres de formation professionnelle", image: "Formations professionnelles.jpeg" },
            { title: "Formations en ligne (e-learning)", image: "Formations digitales.jpeg" },
            { title: "Cours particuliers", image: "Coaching & mentorat.jpeg" },
            { title: "Langues étrangères", image: "Formations professionnelles.jpeg" },
            { title: "Informatique et numérique", image: "Formations digitales.jpeg" },
            { title: "Bureautique", image: "Formations professionnelles.jpeg" },
            { title: "Certifications professionnelles", image: "Certifications.jpeg" },
            { title: "Orientation académique et scolaire", image: "Orientation & études.jpeg" },
            { title: "Bourses et études à l’étranger", image: "Orientation & études.jpeg" }
        ]
    },
    {
        id: "maison-quotidien",
        title: "Services Quotidiens",
        image: "assets/media/Categories/1️⃣ Maison & Quotidien.jpeg",
        folder: "1️⃣ Maison & Quotidien",
        subcategories: [
            { title: "Ménage et nettoyage", image: "Ménage et nettoyage.jpeg" },
            { title: "Plomberie", image: "Dépannage domicile.jpeg" },
            { title: "Électricité", image: "Bricolage.jpeg" },
            { title: "Menuiserie", image: "Réparation et maintenance.jpeg" },
            { title: "Réparation d’électroménager", image: "Réparation et maintenance.jpeg" },
            { title: "Services informatiques", image: "Dépannage domicile.jpeg" },
            { title: "Jardinage", image: "Jardinage & extérieur.jpeg" },
            { title: "Gardiennage et sécurité", image: "Dépannage domicile.jpeg" },
            { title: "Livraison à domicile", image: "Déménagement & débarras.jpeg" },
            { title: "Services de conciergerie", image: "Organisation & rangement.jpeg" }
        ]
    },
    {
        id: "immobilier-logement",
        title: "Immobilier et Logement",
        image: "assets/media/Categories/1️⃣6️⃣ Immobilier.jpeg",
        folder: "1️⃣6️⃣ Immobilier",
        subcategories: [
            { title: "Vente de terrains", image: "Achat & vente.jpeg" },
            { title: "Vente de maisons et appartements", image: "Achat & vente.jpeg" },
            { title: "Location longue durée", image: "Location.jpeg" },
            { title: "Location courte durée", image: "Location.jpeg" },
            { title: "Colocation", image: "Location.jpeg" },
            { title: "Agences immobilières", image: "Gestion locative.jpeg" },
            { title: "Gestion immobilière", image: "Gestion locative.jpeg" },
            { title: "Construction et rénovation", image: "Dossiers immobiliers.jpeg" },
            { title: "Architecture et design", image: "Recherche de biens.jpeg" },
            { title: "Estimation immobilière", image: "Recherche de biens.jpeg" }
        ]
    },
    {
        id: "sante-bien-etre",
        title: "Santé et Bien-être",
        image: "assets/media/Categories/santé et bien etre .jpeg",
        folder: "1️⃣9️⃣ Santé bien etre",
        subcategories: [
            { title: "Hôpitaux et cliniques", image: "Soins à domicile.jpg" },
            { title: "Cabinets médicaux", image: "Soins à domicile.jpg" },
            { title: "Pharmacies", image: "Soins à domicile.jpg" },
            { title: "Laboratoires d’analyses", image: "Soins à domicile.jpg" },
            { title: "Médecines spécialisées", image: "Coaching santé.jpg" },
            { title: "Médecines traditionnelles", image: "Coaching santé.jpg" },
            { title: "Coaching santé", image: "Coaching santé.jpg" },
            { title: "Fitness et salles de sport", image: "Fitness & nutrition.jpg" },
            { title: "Spas et massages", image: "Bien-être mental.jpg" },
            { title: "Nutrition et diététique", image: "Fitness & nutrition.jpg" },
            { title: "Psychologie et bien-être mental", image: "Bien-être mental.jpg" }
        ]
    },
    {
        id: "evenements-loisirs",
        title: "Événements et Loisirs",
        image: "assets/media/Categories/1️⃣7️⃣ Événementiel & Loisirs.jpeg",
        folder: "1️⃣7️⃣ Événementiel & Loisirs",
        subcategories: [
            { title: "Concerts et spectacles", image: "Événements privés.jpeg" },
            { title: "Événements culturels", image: "Événements privés.jpeg" },
            { title: "Événements professionnels", image: "Événements professionnels.jpeg" },
            { title: "Mariages et cérémonies", image: "Organisation d’événements.jpeg" },
            { title: "Anniversaires", image: "Organisation d’événements.jpeg" },
            { title: "Loisirs sportifs", image: "Animation & logistique.jpeg" },
            { title: "Cinémas et théâtres", image: "Animation & logistique.jpeg" },
            { title: "Tourisme local", image: "Animation & logistique.jpeg" },
            { title: "Parcs de loisirs", image: "Location de matériel.jpeg" },
            { title: "Organisation événementielle", image: "Organisation d’événements.jpeg" },
            { title: "Location de matériel événementiel", image: "Location de matériel.jpeg" }
        ]
    },
    {
        id: "emploi-business",
        title: "Emploi – Business – Entreprises",
        image: "assets/media/Categories/7️⃣ Business & Entrepreneuriat.jpeg",
        folder: "7️⃣ Business & Entrepreneuriat",
        subcategories: [
            { title: "Offres d’emploi", image: "Conseil business.jpeg" },
            { title: "Recrutement", image: "Accompagnement startup.jpeg" },
            { title: "Freelance et missions", image: "Business plan.jpeg" },
            { title: "Stages et alternances", image: "Accompagnement startup.jpeg" },
            { title: "Création d’entreprise", image: "Structuration d’entreprise.jpeg" },
            { title: "Incubateurs et accélérateurs", image: "Accompagnement startup.jpeg" },
            { title: "Coworking", image: "Conseil business.jpeg" },
            { title: "Conseils business", image: "Conseil business.jpeg" },
            { title: "Marketing et communication", image: "Audit & diagnostic.jpeg" },
            { title: "Consulting", image: "Audit & diagnostic.jpeg" },
            { title: "Réseautage professionnel", image: "Conseil business.jpeg" },
            { title: "Appels d’offres", image: "Business plan.jpeg" }
        ]
    },
    {
        id: "transport-logistique",
        title: "Transport et Logistique",
        image: "assets/media/Categories/4️⃣ Transport & Logistique.jpeg",
        folder: "4️⃣ Transport & Logistique",
        subcategories: [
            { title: "Transport urbain", image: "Transport de personnes.jpeg" },
            { title: "Taxi et VTC", image: "Chauffeur privé.jpeg" },
            { title: "Transport interurbain", image: "Transport de personnes.jpeg" },
            { title: "Transport de marchandises", image: "Fret & marchandises.jpeg" },
            { title: "Déménagement", image: "Déménagement.jpeg" },
            { title: "Livraison express", image: "Livraison locale.jpeg" },
            { title: "Location de véhicules", image: "Chauffeur privé.jpeg" },
            { title: "Transport maritime", image: "Fret & marchandises.jpeg" },
            { title: "Transport aérien", image: "Fret & marchandises.jpeg" },
            { title: "Suivi et traçabilité des colis", image: "Stockage & entreposage.jpeg" },
            { title: "Entreprises logistiques", image: "Stockage & entreposage.jpeg" }
        ]
    },
    {
        id: "finance-paiements",
        title: "Finance et Paiements",
        image: "assets/media/Categories/1️⃣1️⃣ Finance & Paiements.jpeg",
        folder: "1️⃣1️⃣ Finance & Paiements",
        subcategories: [
            { title: "Banques", image: "Transfert d’argent.jpeg" },
            { title: "Micro-finance", image: "Transfert d’argent.jpeg" },
            { title: "Mobile money", image: "Réception de paiements.jpeg" },
            { title: "Paiements en ligne", image: "Réception de paiements.jpeg" },
            { title: "Transfert d’argent", image: "Transfert d’argent.jpeg" },
            { title: "Change de devises", image: "Transfert d’argent.jpeg" },
            { title: "Épargne et investissements", image: "Réception de paiements.jpeg" },
            { title: "Crédits et prêts", image: "Réception de paiements.jpeg" },
            { title: "Assurances", image: "Réception de paiements.jpeg" },
            { title: "Comptabilité et fiscalité", image: "Réception de paiements.jpeg" },
            { title: "Services fintech", image: "Réception de paiements.jpeg" }
        ]
    },
    {
        id: "demarches-administratives",
        title: "Démarches Administratives",
        image: "assets/media/Categories/5️⃣ Administratif & Démarches.jpeg",
        folder: "5️⃣ Administratif & Démarches",
        subcategories: [
            { title: "Carte nationale d’identité (CNI)", image: "Documents officiels.jpeg" },
            { title: "Passeport", image: "Documents officiels.jpeg" },
            { title: "Carte de résidence", image: "Documents officiels.jpeg" },
            { title: "Actes d’état civil", image: "Documents officiels.jpeg" },
            { title: "Création d’entreprise", image: "Démarches administratives.jpeg" },
            { title: "Déclarations fiscales", image: "Démarches administratives.jpeg" },
            { title: "Permis et autorisations", image: "Légalisation & apostille.jpeg" },
            { title: "Prise de rendez-vous administratifs", image: "Assistance consulaire.jpeg" },
            { title: "Services consulaires", image: "Assistance consulaire.jpeg" },
            { title: "Suivi de dossiers", image: "Démarches administratives.jpeg" },
            { title: "Digitalisation des démarches", image: "Traduction de documents.jpeg" }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.categoriesData = categoriesData;
}