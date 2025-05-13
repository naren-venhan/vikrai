$ErrorActionPreference = "Continue"

Write-Host "Starting fix for vikraijs references..."

# Create a log file
$logFile = "vikraijs-fix.txt"
"VikrAI Naming Standardization Log $(Get-Date)" | Out-File -FilePath $logFile

# Function to log messages
function Write-Log {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Message,
        [switch]$IsError
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    
    if ($IsError) {
        Write-Host $logMessage -ForegroundColor Red
        $logMessage | Out-File -FilePath $logFile -Append
    } else {
        Write-Host $logMessage
        $logMessage | Out-File -FilePath $logFile -Append
    }
}

# Function to process file content
function Process-FileContent {
    param (
        [string]$filePath
    )
    
    try {
        # Skip files in node_modules and .git
        if ($filePath -match "node_modules" -or $filePath -match "\.git") {
            return $false
        }
        
        # Use .NET methods to read file content
        $content = [System.IO.File]::ReadAllText($filePath)
        
        # Check if file contains 'vikraijs'
        if ($content -match "vikraijs") {
            Write-Log "Processing: $filePath"
            
            # Original content for comparison
            $originalContent = $content
            
            # Perform replacements for URLs and references
            $newContent = $content -replace "vikraijs", "vikrai" `
                                   -replace "@vikraijs", "@vikrai" `
                                   -replace "https://www\.vikraijs\.com", "https://www.vikrai.com" `
                                   -replace "https://docs\.vikraijs\.com", "https://docs.vikrai.com" `
                                   -replace "discord\.gg/vikraijs", "discord.gg/vikrai" `
                                   -replace "twitter\.com/vikraijs", "twitter.com/vikrai" `
                                   -replace "github\.com/vikraijs", "github.com/vikrai"
            
            # Only write back if content changed
            if ($newContent -ne $originalContent) {
                [System.IO.File]::WriteAllText($filePath, $newContent)
                return $true
            }
        }
        return $false
    } catch {
        Write-Log "Error processing file: $filePath - $($_.Exception.Message)" -IsError
        return $false
    }
}

# Get all files
Write-Log "Finding files with 'vikraijs' references..."
$files = Get-ChildItem -Path . -Recurse -File | 
        Where-Object { -not $_.FullName.Contains("node_modules") -and 
                      -not $_.FullName.Contains(".git") -and
                      -not $_.FullName.Contains(".yarn") }

$totalFiles = $files.Count
$processedCount = 0
$successCount = 0

Write-Log "Found $totalFiles files to check"

foreach ($file in $files) {
    $processedCount++
    if ($processedCount % 100 -eq 0) {
        Write-Log "Progress: $processedCount/$totalFiles files checked"
    }
    
    $success = Process-FileContent -filePath $file.FullName
    if ($success) {
        $successCount++
    }
}

Write-Log "Completed: $successCount files updated to standardize on 'vikrai'"
Write-Host "Standardization completed! See $logFile for details." 