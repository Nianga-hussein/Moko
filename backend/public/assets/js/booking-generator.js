(function($) {
    if (!$('#booking-tabs-container').length) return;

    const container = $('#booking-tabs-container');
    const contentContainer = $('#booking-content-container');

    // Clear existing content
    container.empty();
    contentContainer.empty();

    if (window.categoriesData) {
        window.categoriesData.forEach((cat, index) => {
            const isActive = index === 0 ? 'active' : '';
            const showActive = index === 0 ? 'show active' : '';
            
            // 1. Generate Tab Navigation
            // Use a generic icon if specific one not available easily, or map them.
            // For simplicity, we use a generic icon or try to map based on index or ID if we had a mapping.
            // We'll use a generic 'fa-check-circle' or similar, or try to be smart.
            let iconClass = 'fa-check-circle';
            if (cat.id.includes('maison')) iconClass = 'fa-home';
            else if (cat.id.includes('famille')) iconClass = 'fa-users';
            else if (cat.id.includes('voyage')) iconClass = 'fa-plane';
            else if (cat.id.includes('transport')) iconClass = 'fa-car';
            else if (cat.id.includes('administratif')) iconClass = 'fa-file-alt';
            else if (cat.id.includes('legal')) iconClass = 'fa-balance-scale';
            else if (cat.id.includes('business')) iconClass = 'fa-briefcase';
            else if (cat.id.includes('digital')) iconClass = 'fa-laptop-code';
            
            const tabHtml = `
                <li class="nav-item" role="presentation" style="flex: 0 0 auto;">
                    <a href="#${cat.id}" class="cus-btn primary ${isActive}" data-bs-toggle="tab" aria-selected="${index === 0}" role="tab" style="white-space: nowrap;">
                        <i class="fal ${iconClass} me-2"></i>
                        ${cat.title}
                    </a>
                </li>
            `;
            container.append(tabHtml);

            // 2. Generate Tab Content (The Form)
            // Populate subcategories options
            let optionsHtml = '<option value="" selected disabled>Choisir un service...</option>';
            cat.subcategories.forEach(sub => {
                optionsHtml += `<option value="${sub.title}">${sub.title}</option>`;
            });

            const contentHtml = `
                <div class="tab-pane fade ${showActive}" id="${cat.id}" role="tabpanel">
                    <div class="card border-0">
                        <div class="card-body p-0">
                            <form action="flight-booking.html" method="get">
                                <input type="hidden" name="category" value="${cat.id}">
                                <div class="booking-info mb-32">
                                    <div class="d-xl-flex align-items-center gap-24 d-lg-block d-flex flex-wrap">
                                        
                                        <!-- Service Selection -->
                                        <div class="custom-sel-input-block flex-grow-1">
                                            <label class="h6 color-medium-gray">Service souhaité</label>
                                            <select class="form-control border-0 p-0 h-auto" name="service" required style="font-weight: 600;">
                                                ${optionsHtml}
                                            </select>
                                        </div>

                                        <div class="vertical-line d-xl-block d-none"></div>

                                        <!-- Location -->
                                        <div class="custom-sel-input-block flex-grow-1">
                                            <label class="h6 color-medium-gray">Lieu</label>
                                            <input type="text" class="sel-input" name="location" placeholder="Ville, Quartier..." required>
                                        </div>

                                        <div class="vertical-line d-xl-block d-none"></div>

                                        <!-- Date -->
                                        <div class="input-date-picker">
                                            <label class="h6 color-medium-gray">Date souhaitée</label>
                                            <input type="text" class="sel-input date_from" name="date" placeholder="Date">
                                        </div>
                                    </div>
                                    
                                    <!-- Description / Details -->
                                    <div class="mt-3">
                                        <div class="custom-sel-input-block m-0 w-100">
                                            <label class="h6 color-medium-gray">Détails de la demande</label>
                                            <input type="text" class="sel-input p-0 w-100" name="details" placeholder="Précisez votre besoin (facultatif)">
                                        </div>
                                    </div>
                                </div>

                                <div class="row align-items-center">
                                    <div class="col-12 text-end">
                                        <button type="submit" class="cus-btn w-100 w-md-auto">
                                            Commander ce service <i class="fal fa-arrow-right ms-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            contentContainer.append(contentHtml);
        });

        // Re-initialize plugins for the newly injected content
        // 1. Datepicker
        if ($('.date_from').length) {
            $('.date_from').pickadate({
                format: 'dd mmmm, yyyy',
                formatSubmit: 'yyyy/mm/dd',
            });
        }
    }

})(jQuery);
