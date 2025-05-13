$ErrorActionPreference = "Continue"

Write-Host "Starting fix for files with special characters..."

# Create a log file
$logFile = "special-files-fix.txt"
"VikrAI Special Files Fix Log $(Get-Date)" | Out-File -FilePath $logFile

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
        # Use .NET methods to read file content instead of PowerShell's Get-Content
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
            
            # Write content back to file
            [System.IO.File]::WriteAllText($filePath, $newContent)
            return $true
        }
        return $false
    } catch {
        Write-Log "Error processing file: $filePath - $($_.Exception.Message)" -IsError
        return $false
    }
}

# Process files with square brackets in names
Write-Log "Processing files with special characters in names..."
$specialFiles = Get-ChildItem -Path .\ -Recurse -File | 
               Where-Object { $_.FullName -like "*`[*`]*" -and 
                             (-not $_.FullName.Contains("node_modules")) -and
                             (-not $_.FullName.Contains(".git")) }

$totalFiles = $specialFiles.Count
$processedCount = 0
$successCount = 0

Write-Log "Found $totalFiles files with special characters to process"

foreach ($file in $specialFiles) {
    $processedCount++
    Write-Log "[$processedCount/$totalFiles] Processing file: $($file.FullName)"
    
    $success = Process-FileContent -filePath $file.FullName
    if ($success) {
        $successCount++
    }
}

Write-Log "File processing completed: $successCount of $totalFiles files successfully processed"

# Process remaining generated files that may have been skipped
Write-Log "Processing files in generated directories..."
$genFiles = Get-ChildItem -Path .\www\utils\generated -Recurse -File | 
           Where-Object { (-not $_.FullName.Contains("node_modules")) -and
                         (-not $_.FullName.Contains(".git")) }

$totalGenFiles = $genFiles.Count
$genProcessedCount = 0
$genSuccessCount = 0

Write-Log "Found $totalGenFiles files in generated directories"

foreach ($file in $genFiles) {
    $genProcessedCount++
    Write-Log "[$genProcessedCount/$totalGenFiles] Processing generated file: $($file.FullName)"
    
    $success = Process-FileContent -filePath $file.FullName
    if ($success) {
        $genSuccessCount++
    }
}

Write-Log "Generated file processing completed: $genSuccessCount of $totalGenFiles files successfully processed"
Write-Host "File processing completed! See $logFile for details." 