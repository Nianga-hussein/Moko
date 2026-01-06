
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
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        
        # Regex to replace header
        # Using ?s for single line mode to match across newlines
        $pattern = '(?s)<header class="admin-header">.*?</header>'
        
        if ($content -match $pattern) {
            $newContent = $content -replace $pattern, $newHeader
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -Force -ErrorAction Stop
            Write-Host "Updated header in $($file.Name)"
        }
    }
    catch {
        Write-Warning "Failed to update $($file.Name): $_"
    }
}
