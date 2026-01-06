
$files = Get-ChildItem "admin-*.html"

$newHeader = @"
            <header class="admin-header">
                <div class="header-left">
                    <button class="menu-toggle"><i class="fa fa-bars"></i></button>
                    <div class="header-search">
                        <i class="fa fa-search"></i>
                        <input type="text" placeholder="Rechercher...">
                    </div>
                </div>
                
                <div class="header-profile">
                    <div class="profile-info">
                        <span class="profile-name">Admin Principal</span>
                        <span class="profile-role">Super Administrateur</span>
                    </div>
                    <img src="https://via.placeholder.com/40" alt="Admin" class="profile-img">
                </div>
            </header>
"@

foreach ($file in $files) {
    # Skip dashboard and chat as I manually updated them or want to preserve specificities? 
    # Chat has "Messagerie Support" title in old header. New header has Search.
    # Dashboard has "Rechercher boutique...".
    # I'll update ALL to be consistent, or maybe keep Dashboard specific?
    # The prompt asked for "admin-chat.html utilise les couleur du site... n'oublie pas les page de ajouter..."
    # I'll update all to the standard header.
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # Regex to replace header
    $pattern = '(?s)<header class="admin-header">.*?</header>'
    
    if ($content -match $pattern) {
        $newContent = $content -replace $pattern, $newHeader
        [System.IO.File]::WriteAllText($file.FullName, $newContent)
        Write-Host "Updated header in $($file.Name)"
    }
}
