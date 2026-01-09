(function($) {
    'use strict';

    $(document).ready(function() {
        // Ensure data is available
        if (window.categoriesData) {
            renderMobileCategories(window.categoriesData);
            renderMobilePopularServices(window.categoriesData);
        } else {
            console.error("MOKO: categoriesData not found!");
        }

        // --- SEARCH BAR FUNCTIONALITY (Event Delegation for robustness) ---
        $(document).on('input', '.mobile-search-bar .search-input', function() {
            const query = $(this).val().toLowerCase().trim();
            const resultsContainer = $('#mobile-popular-container');
            const popularWrapper = $('#mobile-popular-wrapper');
            const categoriesWrapper = $('#mobile-categories-wrapper');
            
            // Check if data exists
            if (!window.categoriesData) return;

            if (query.length < 2) {
                // Restore order: Categories first, then Popular
                if (popularWrapper.length && categoriesWrapper.length) {
                    categoriesWrapper.insertBefore(popularWrapper);
                }
                
                // If query is too short, revert to popular services
                renderMobilePopularServices(window.categoriesData);
                return;
            }

            // Search active: Popular (Results) first, then Categories
            if (popularWrapper.length && categoriesWrapper.length) {
                popularWrapper.insertBefore(categoriesWrapper);
            }

            // Search Logic
            const matches = [];
            window.categoriesData.forEach(cat => {
                // 1. Check category title
                if (cat.title.toLowerCase().includes(query)) {
                    // If category matches, show its subcategories (all of them or limit)
                    if (cat.subcategories) {
                        cat.subcategories.forEach(sub => {
                            matches.push({ cat: cat, sub: sub });
                        });
                    }
                } 
                // 2. Check subcategories titles
                else if (cat.subcategories) {
                    cat.subcategories.forEach(sub => {
                        if (sub.title.toLowerCase().includes(query)) {
                            matches.push({ cat: cat, sub: sub });
                        }
                    });
                }
            });

            // Remove duplicates (in case subcategory matched AND category matched)
            const uniqueMatches = [];
            const seen = new Set();
            matches.forEach(item => {
                const key = item.sub.title;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueMatches.push(item);
                }
            });

            // Render Results
            resultsContainer.empty();
            if (uniqueMatches.length === 0) {
                resultsContainer.html(`
                    <div style="text-align:center; padding:30px 10px; color:#999;">
                        <i class="far fa-frown" style="font-size: 24px; margin-bottom: 10px;"></i><br>
                        Aucun service trouvé pour "${$(this).val()}"
                    </div>
                `);
            } else {
                uniqueMatches.forEach(item => {
                    const cat = item.cat;
                    const sub = item.sub;
                    
                    // Build Image Path
                    let imgPath = `assets/media/${cat.folder}/${sub.image}`;
                    
                    // Dynamic Price (or fixed base price)
                    // Use the 50.000 FCFA base as requested recently or random
                    const prices = ["10.000", "15.000", "25.000", "50.000"];
                    const price = prices[Math.floor(Math.random() * prices.length)];

                    const html = `
                        <div class="service-card">
                            <div class="service-img-box">
                                <img src="${imgPath}" alt="${sub.title}" onerror="this.src='${cat.image}'">
                            </div>
                            <div class="service-info">
                                <h5 class="service-name">${sub.title}</h5>
                                <div class="service-meta">
                                    <span class="service-rating"><i class="fas fa-star"></i> 4.8</span>
                                    <span class="service-category" style="font-size:10px; color:#999; margin-left:5px;">${cat.title}</span>
                                </div>
                                <div class="service-price">À partir de ${price} FCFA</div>
                                <div class="service-actions">
                                    <a href="service-details.html?category=${cat.id}&service=${encodeURIComponent(sub.title)}" class="btn-view">Détails</a>
                                    <a href="flight-booking.html?category=${cat.id}&service=${encodeURIComponent(sub.title)}" class="btn-book">Commander</a>
                                </div>
                            </div>
                        </div>
                    `;
                    resultsContainer.append(html);
                });
            }
        });
        // --- END SEARCH FUNCTIONALITY ---
    });

    function renderMobileCategories(data) {
        const container = $('#mobile-categories-container');
        if (!container.length) return;

        container.empty();
        
        // Limit to 8 for grid
        const limit = 8;
        
        data.slice(0, limit).forEach(cat => {
            // Shorten title
            let displayTitle = cat.title.split('&')[0].trim(); 
            if(displayTitle.length > 10) displayTitle = displayTitle.substring(0, 10) + '..';

            const html = `
                <a href="flight-listing.html?category=${cat.id}" class="category-item">
                    <div class="category-icon-box">
                        <img src="${cat.image}" alt="${cat.title}">
                    </div>
                    <span class="category-label">${cat.title}</span>
                </a>
            `;
            container.append(html);
        });
    }

    function renderMobilePopularServices(data) {
        const container = $('#mobile-popular-container');
        if (!container.length) return;

        container.empty();

        let count = 0;
        
        // Default popular view: Pick first subcategory of first 5 categories
        data.forEach(cat => {
            if (count >= 5) return; 
            
            if (cat.subcategories && cat.subcategories.length > 0) {
                const sub = cat.subcategories[0];
                let imgPath = `assets/media/${cat.folder}/${sub.image}`;
                const prices = ["10.000", "15.000", "25.000", "50.000"];
                const price = prices[Math.floor(Math.random() * prices.length)];

                const html = `
                    <div class="service-card">
                        <div class="service-img-box">
                            <img src="${imgPath}" alt="${sub.title}" onerror="this.src='${cat.image}'">
                        </div>
                        <div class="service-info">
                            <h5 class="service-name">${sub.title}</h5>
                            <div class="service-meta">
                                <span class="service-rating"><i class="fas fa-star"></i> 4.8</span>
                                <span class="service-reviews">(120 avis)</span>
                            </div>
                            <div class="service-price">À partir de ${price} FCFA</div>
                            <div class="service-actions">
                                <a href="service-details.html?category=${cat.id}&service=${encodeURIComponent(sub.title)}" class="btn-view">Détails</a>
                                <a href="flight-booking.html?category=${cat.id}&service=${encodeURIComponent(sub.title)}" class="btn-book">Commander</a>
                            </div>
                        </div>
                    </div>
                `;
                container.append(html);
                count++;
            }
        });
    }

})(jQuery);