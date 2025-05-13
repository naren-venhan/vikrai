$ErrorActionPreference = "Continue"

Write-Host "Starting VikrAI rebranding process..."

# Create a log file
$logFile = "rename-log.txt"
"VikrAI Rebranding Log $(Get-Date)" | Out-File -FilePath $logFile

# Function to log messages
function Write-Log {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Message,
        [switch]$Error
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    
    if ($Error) {
        Write-Host $logMessage -ForegroundColor Red
        $logMessage | Out-File -FilePath $logFile -Append
    } else {
        Write-Host $logMessage
        $logMessage | Out-File -FilePath $logFile -Append
    }
}

# Phase 1: Rename directories
Write-Log "Phase 1: Renaming directories containing 'vikrai'"
$dirCount = 0
$dirSuccess = 0

$dirs = Get-ChildItem -Path .\ -Recurse -Directory | Where-Object { $_.Name -like "*vikrai*" } | Sort-Object -Property FullName -Descending
$totalDirs = $dirs.Count
Write-Log "Found $totalDirs directories to rename"

foreach ($dir in $dirs) {
    $dirCount++
    $newName = $dir.Name -replace "vikrai", "vikrai"
    $newPath = Join-Path -Path $dir.Parent.FullName -ChildPath $newName
    
    # Only rename if new directory doesn't exist already
    if (-not (Test-Path -Path $newPath)) {
        try {
            Write-Log "[$dirCount/$totalDirs] Renaming directory: $($dir.FullName) to $newPath"
            Rename-Item -Path $dir.FullName -NewName $newName -ErrorAction Stop
            $dirSuccess++
        } catch {
            Write-Log "Failed to rename directory: $($dir.FullName). Error: $($_.Exception.Message)" -Error
        }
    } else {
        Write-Log "Directory already exists: $newPath, skipping rename"
    }
}

Write-Log "Completed directory renaming: $dirSuccess out of $totalDirs successful"

# Phase 2: Rename files
Write-Log "Phase 2: Renaming files containing 'vikrai'"
$fileCount = 0
$fileSuccess = 0

$files = Get-ChildItem -Path .\ -Recurse -File | Where-Object { $_.Name -like "*vikrai*" } | Sort-Object -Property FullName -Descending
$totalFiles = $files.Count
Write-Log "Found $totalFiles files to rename"

foreach ($file in $files) {
    $fileCount++
    $newName = $file.Name -replace "vikrai", "vikrai"
    $newPath = Join-Path -Path $file.DirectoryName -ChildPath $newName
    
    # Only rename if new file doesn't exist already
    if (-not (Test-Path -Path $newPath)) {
        try {
            Write-Log "[$fileCount/$totalFiles] Renaming file: $($file.FullName) to $newPath"
            Rename-Item -Path $file.FullName -NewName $newName -ErrorAction Stop
            $fileSuccess++
        } catch {
            Write-Log "Failed to rename file: $($file.FullName). Error: $($_.Exception.Message)" -Error
        }
    } else {
        Write-Log "File already exists: $newPath, skipping rename"
    }
}

Write-Log "Completed file renaming: $fileSuccess out of $totalFiles successful"

# Phase 3: Replace content in files
Write-Log "Phase 3: Replacing 'vikrai' with 'vikrai' in file contents"
$contentCount = 0
$contentSuccess = 0
$fileExtensions = @("*.js", "*.jsx", "*.ts", "*.tsx", "*.json", "*.md", "*.yml", "*.yaml", "*.html", "*.css", "*.sh", "*.ps1")

# Create array for each extension to avoid too long command line
$textFiles = @()
foreach ($ext in $fileExtensions) {
    $extFiles = Get-ChildItem -Path .\ -Recurse -File -Include $ext | 
                Where-Object { -not $_.FullName.Contains("node_modules") -and 
                              -not $_.FullName.Contains(".git") -and
                              -not $_.FullName.Contains(".yarn") }
    $textFiles += $extFiles
}

$totalContentFiles = $textFiles.Count
Write-Log "Found $totalContentFiles files to process content"

foreach ($file in $textFiles) {
    $contentCount++
    try {
        # Try to read the file content
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction Stop
        
        # Only process files containing "vikrai"
        if ($content -match "vikrai" -or $content -match "vikrai" -or $content -match "vikrai") {
            Write-Log "[$contentCount/$totalContentFiles] Processing content: $($file.FullName)"
            
            # Multiple replacement patterns
            $newContent = $content -replace "vikrai", "vikrai" `
                                   -replace "vikrai", "VikrAI" `
                                   -replace "vikrai", "VIKRAI" `
                                   -replace "vikrai", "vikrai" `
                                   -replace "vikrai", "VikrAI" `
                                   -replace "@vikrai", "@vikrai"
            
            # Write the modified content back
            Set-Content -Path $file.FullName -Value $newContent -ErrorAction Stop
            $contentSuccess++
        }
    } catch {
        Write-Log "Error processing file content: $($file.FullName). Error: $($_.Exception.Message)" -Error
    }
}

Write-Log "Completed content replacement: $contentSuccess out of $totalContentFiles files processed"
Write-Log "VikrAI rebranding operation completed."

Write-Host "`nRebranding process completed. See $logFile for details." 
