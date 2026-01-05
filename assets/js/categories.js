const mokoCategories = [
    {
        id: 1,
        name: "Maison & Quotidien",
        icon: "fa-home",
        image: "1️⃣ Maison & Quotidien.jpeg",
        subcategories: [
            "Ménage & nettoyage",
            "Dépannage domicile",
            "Réparations & maintenance",
            "Bricolage",
            "Jardinage & extérieur",
            "Déménagement & débarras",
            "Organisation & rangement"
        ]
    },
    {
        id: 2,
        name: "Famille & Assistance",
        icon: "fa-users",
        image: "2️⃣ Famille & Assistance.jpeg",
        subcategories: [
            "Babysitting",
            "Garde d’enfants",
            "Aide aux personnes âgées",
            "Aide à domicile",
            "Accompagnement quotidien",
            "Assistance familiale"
        ]
    },
    {
        id: 3,
        name: "Voyage & Mobilité",
        icon: "fa-plane",
        image: "3️⃣ Voyage & Mobilité.jpeg",
        subcategories: [
            "Billetterie",
            "Hébergement",
            "Location courte durée",
            "Visa & immigration",
            "Assurance voyage",
            "Études & mobilité internationale"
        ]
    },
    {
        id: 4,
        name: "Transport & Logistique",
        icon: "fa-truck",
        image: "4️⃣ Transport & Logistique.jpeg",
        subcategories: [
            "Transport de personnes",
            "Chauffeur privé",
            "Livraison locale",
            "Livraison internationale",
            "Déménagement",
            "Fret & marchandises",
            "Stockage & entreposage"
        ]
    },
    {
        id: 5,
        name: "Administratif & Démarches",
        icon: "fa-file-signature",
        image: "5️⃣ Administratif & Démarches.jpeg",
        subcategories: [
            "Démarches administratives",
            "Documents officiels",
            "Traduction de documents",
            "Légalisation & apostille",
            "Assistance consulaire"
        ]
    },
    {
        id: 6,
        name: "Légal & Juridique",
        icon: "fa-balance-scale",
        image: "6️⃣ Légal & Juridique.jpeg",
        subcategories: [
            "Création d’entreprise",
            "Domiciliation",
            "Rédaction de contrats",
            "Conseil juridique",
            "Formalités légales"
        ]
    },
    {
        id: 7,
        name: "Business & Entrepreneuriat",
        icon: "fa-briefcase",
        image: "7️⃣ Business & Entrepreneuriat.jpeg",
        subcategories: [
            "Conseil business",
            "Audit & diagnostic",
            "Business plan",
            "Accompagnement startup",
            "Structuration d’entreprise"
        ]
    },
    {
        id: 8,
        name: "Digital & Technologie",
        icon: "fa-laptop-code",
        image: "8️⃣ Digital & Technologie.jpeg",
        subcategories: [
            "Création de sites web",
            "Développement d’applications",
            "E-commerce",
            "Automatisation",
            "Solutions SaaS",
            "Support technique"
        ]
    },
    {
        id: 9,
        name: "Design & Création",
        icon: "fa-paint-brush",
        image: "9️⃣ Design & Création.jpeg",
        subcategories: [
            "Logo & identité visuelle",
            "Branding",
            "UX/UI design",
            "Graphisme",
            "Design print & digital"
        ]
    },
    {
        id: 10,
        name: "Marketing & Communication",
        icon: "fa-bullhorn",
        image: "🔟 Marketing & Communication.jpeg",
        subcategories: [
            "Marketing digital",
            "Réseaux sociaux",
            "Publicité en ligne",
            "SEO & visibilité",
            "Stratégie de marque",
            "Création de contenu"
        ]
    },
    {
        id: 11,
        name: "Finance & Paiements",
        icon: "fa-money-bill-wave",
        image: "1️⃣1️⃣ Finance & Paiements.jpeg",
        subcategories: [
            "Transfert d’argent",
            "Réception de paiements"
        ]
    },
    {
        id: 12,
        name: "Comptabilité & Gestion",
        icon: "fa-calculator",
        image: "1️⃣2️⃣ Comptabilité & Gestion.jpeg",
        subcategories: [
            "Comptabilité",
            "Gestion financière",
            "Fiscalité",
            "Paie & RH",
            "Reporting & contrôle"
        ]
    },
    {
        id: 13,
        name: "Sourcing & Recherche",
        icon: "fa-search",
        image: "1️⃣3️⃣ Sourcing & Recherche.jpeg",
        subcategories: [
            "Sourcing produits",
            "Recherche fournisseurs",
            "Recherche prestataires",
            "Études de marché",
            "Analyse concurrence",
            "Recherche sur mesure"
        ]
    },
    {
        id: 14,
        name: "Formation & Éducation",
        icon: "fa-graduation-cap",
        image: "1️⃣4️⃣ Formation & Éducation.jpeg",
        subcategories: [
            "Formations professionnelles",
            "Formations digitales",
            "Coaching & mentorat",
            "Certifications",
            "Orientation & études"
        ]
    },
    {
        id: 15,
        name: "Emploi & Opportunités",
        icon: "fa-briefcase",
        image: "1️⃣5️⃣ Emploi & Opportunités.jpeg",
        subcategories: [
            "Recherche d’emploi",
            "Coaching emploi",
            "CV & lettres",
            "Recrutement",
            "Opportunités business"
        ]
    },
    {
        id: 16,
        name: "Immobilier",
        icon: "fa-building",
        image: "1️⃣6️⃣ Immobilier.jpeg",
        subcategories: [
            "Recherche de biens",
            "Location",
            "Achat & vente",
            "Gestion locative",
            "Dossiers immobiliers"
        ]
    },
    {
        id: 17,
        name: "Événementiel & Loisirs",
        icon: "fa-calendar-alt",
        image: "1️⃣7️⃣ Événementiel & Loisirs.jpeg",
        subcategories: [
            "Organisation d’événements",
            "Événements privés",
            "Événements professionnels",
            "Location de matériel",
            "Animation & logistique"
        ]
    },
    {
        id: 18,
        name: "Commerce & Produits",
        icon: "fa-shopping-cart",
        image: "1️⃣8️⃣ Commerce & Produits.jpeg",
        subcategories: [
            "Achat & revente",
            "E-commerce",
            "Dropshipping",
            "Distribution",
            "Produits locaux & artisanaux"
        ]
    },
    {
        id: 19,
        name: "Santé & Bien-être",
        icon: "fa-heartbeat",
        image: "santé et bien etre .jpeg",
        subcategories: [
            "Bien-être général",
            "Coaching santé",
            "Fitness & nutrition",
            "Soins à domicile",
            "Bien-être mental"
        ]
    },
    {
        id: 20,
        name: "Accompagnement & Service personnalisé",
        icon: "fa-hands-helping",
        image: "2️⃣0️⃣ Accompagnement & Service personnalisé.jpeg",
        subcategories: [
            "Demandes sur mesure",
            "Gestion complète de projets",
            "Assistance personnelle",
            "Assistance professionnelle",
            "Services premium"
        ]
    }
];
