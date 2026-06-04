# Sync Cyou Phone Farm images — D:\网站搭建素材库
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [Text.UTF8Encoding]::UTF8

$Base = "D:\网站搭建素材库"
$Preferred = Join-Path $Base "FINAL_phonefarm_6sites_package_CN\02_六个网站分类素材\03_phonefarm.cyou_full_service_site"
$Fallback = Join-Path $Base "02_six_website_ready\phonefarm.cyou_full_service_site"
$SitePack = if (Test-Path $Preferred) { $Preferred } else { $Fallback }
$Dest = Join-Path $PSScriptRoot "..\public\images"

if (-not (Test-Path $SitePack)) {
  Write-Error "Site pack not found. Tried:`n  $Preferred`n  $Fallback"
}

Write-Host "Using: $SitePack"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item -Path (Join-Path $SitePack "*") -Destination $Dest -Recurse -Force

$CompanyDest = Join-Path $Dest "company"
New-Item -ItemType Directory -Force -Path $CompanyDest | Out-Null
foreach ($n in @("公司照片1", "公司照片2", "公司照片3")) {
  $src = Join-Path $Base $n
  if (Test-Path $src) {
    Copy-Item (Join-Path $src "*.png") $CompanyDest -Force -ErrorAction SilentlyContinue
  }
}

Write-Host "Synced $((Get-ChildItem $Dest -Recurse -File).Count) files to public/images"
