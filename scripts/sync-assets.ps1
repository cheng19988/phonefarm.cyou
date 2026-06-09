# Sync Cyou Phone Farm images from D:\网站搭建素材库
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8

$Base = "D:\网站搭建素材库"
$SitePack = Join-Path $Base "02_six_website_ready\phonefarm.cyou_full_service_site"
$Dest = Join-Path $PSScriptRoot "..\public\images"

if (-not (Test-Path $SitePack)) {
  Write-Error "Site pack not found: $SitePack"
}

Write-Host "Using: $SitePack"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item -Path (Join-Path $SitePack "*") -Destination $Dest -Recurse -Force

$CompanyDest = Join-Path $Dest "company"
New-Item -ItemType Directory -Force -Path $CompanyDest | Out-Null
Get-ChildItem -Path $Base -Directory | Where-Object { $_.Name -like "*照片*" } | ForEach-Object {
  Copy-Item (Join-Path $_.FullName "*.png") $CompanyDest -Force -ErrorAction SilentlyContinue
}

Write-Host "Synced $((Get-ChildItem $Dest -Recurse -File).Count) files to public/images"
