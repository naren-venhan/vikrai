$ErrorActionPreference = "Continue"

Write-Host "Starting fix for files with square bracket characters..."

# Create a log file
$logFile = "bracket-files-fix.txt"
"VikrAI Bracket Files Fix Log $(Get-Date)" | Out-File -FilePath $logFile

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

# Function to process file content using .NET methods to avoid PowerShell path issues
function Process-BracketFile {
    param (
        [string]$filePath
    )
    
    try {
        # Use literal path to handle square brackets
        $content = [System.IO.File]::ReadAllText($filePath)
        
        # Check if file contains 'medusa'
        if ($content -match "medusa" -or $content -match "Medusa" -or $content -match "MEDUSA") {
            Write-Log "Processing: $filePath"
            
            # Perform replacements
            $newContent = $content -replace "medusa", "vikrai" `
                                  -replace "Medusa", "VikrAI" `
                                  -replace "MEDUSA", "VIKRAI" `
                                  -replace "medusajs", "vikrai" `
                                  -replace "MedusaJS", "VikrAI" `
                                  -replace "@medusajs", "@vikrai"
            
            # Write content back to file using .NET methods
            [System.IO.File]::WriteAllText($filePath, $newContent)
            return $true
        } else {
            return $false
        }
    } catch {
        Write-Log "Error processing file: $filePath - $($_.Exception.Message)" -IsError
        return $false
    }
}

# Find files with square brackets in paths, specifically in the generated directory
Write-Log "Finding files with square brackets in their names..."

# Get all directories first
$dirs = Get-ChildItem -Path . -Recurse -Directory | 
    Where-Object { -not $_.FullName.Contains("node_modules") -and 
                  -not $_.FullName.Contains(".git") -and
                  -not $_.FullName.Contains(".yarn") }

$bracketFiles = @()

foreach ($dir in $dirs) {
    # Use .NET methods to get files with brackets directly
    $dirPath = $dir.FullName
    try {
        $filesInDir = [System.IO.Directory]::GetFiles($dirPath)
        foreach ($file in $filesInDir) {
            if ($file -match "\[" -or $file -match "\]") {
                $bracketFiles += $file
            }
        }
    } catch {
        Write-Log "Error accessing directory: $dirPath - $($_.Exception.Message)" -IsError
    }
}

$totalFiles = $bracketFiles.Count
$processedCount = 0
$successCount = 0

Write-Log "Found $totalFiles files with square brackets to process"

foreach ($file in $bracketFiles) {
    $processedCount++
    Write-Log "[$processedCount/$totalFiles] Processing file: $file"
    
    $success = Process-BracketFile -filePath $file
    if ($success) {
        $successCount++
    }
}

Write-Log "Completed: $successCount of $totalFiles files successfully processed"
Write-Host "Bracket file processing completed! See $logFile for details." 