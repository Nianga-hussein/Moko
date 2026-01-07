
$files = Get-ChildItem "admin-*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $filename = $file.Name

    # Determine active section
    $active_dashboard = ""
    $active_boutique = ""
    $active_immobilier = ""
    $active_education = ""
    $active_voyage = ""
    $active_emploi = ""
    $active_service = ""
    $active_chat = ""

    if ($filename -like "*dashboard*") { $active_dashboard = "active" }
    elseif ($filename -like "*boutique*") { $active_boutique = "active" }
    elseif ($filename -like "*immobilier*") { $active_immobilier = "active" }
    elseif ($filename -like "*education*") { $active_education = "active" }
    elseif ($filename -like "*voyage*") { $active_voyage = "active" }
    elseif ($filename -like "*emploi*") { $active_emploi = "active" }
    elseif ($filename -like "*service*") { $active_service = "active" }
    elseif ($filename -like "*chat*") { $active_chat = "active" }

    # Construct new menu
    $newMenu = @"
            <ul class="sidebar-menu">
                <li><a href="admin-dashboard.html" class="$active_dashboard"><i class="fa fa-th-large"></i> Tableau de bord</a></li>
                <li><a href="admin-boutique.html" class="$active_boutique"><i class="fa fa-shopping-bag"></i> Boutique & Commerce</a></li>
                <li><a href="admin-immobilier.html" class="$active_immobilier"><i class="fa fa-building"></i> Immobilier & Logement</a></li>
                <li><a href="admin-education.html" class="$active_education"><i class="fa fa-graduation-cap"></i> Education & Formation</a></li>
                <li><a href="admin-voyage.html" class="$active_voyage"><i class="fa fa-plane"></i> Voyage & Visas</a></li>
                <li><a href="admin-emploi.html" class="$active_emploi"><i class="fa fa-briefcase"></i> Emploi & Business</a></li>
                <li><a href="admin-service.html" class="$active_service"><i class="fa fa-concierge-bell"></i> Services & Quotidien</a></li>
                <li><a href="admin-chat.html" class="$active_chat"><i class="fa fa-comments"></i> Messagerie</a></li>
                <li><a href="admin-utilisateurs.html"><i class="fa fa-users"></i> Utilisateurs</a></li>
                <li><a href="#"><i class="fa fa-cog"></i> Paramètres</a></li>
            </ul>
"@

    # Regex to replace the existing ul.sidebar-menu
    # We use ?s for single-line mode (dot matches newline)
    # The pattern matches <ul class="sidebar-menu"> ... </ul>
    $pattern = '(?s)<ul class="sidebar-menu">.*?</ul>'
    
    if ($content -match $pattern) {
        $newContent = $content -replace $pattern, $newMenu
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Updated $filename"
    } else {
        Write-Warning "Could not find sidebar-menu in $filename"
    }
}
