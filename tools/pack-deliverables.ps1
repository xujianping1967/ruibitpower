# Rebuild the three delivery zips with a read-me inside each and names that say
# what they are for. Run: powershell -NoProfile -File tools/pack-deliverables.ps1
# Note: built with arrays rather than here-strings, because PowerShell 5.1 fails
# to parse a here-string terminator in a script saved with LF line endings.

$ErrorActionPreference = 'Stop'
$sep = "`r`n"

$root = 'C:\Users\Administrator\AccioWork\2026-10-12-18-13-38-597-d4049ce3'
$site = Join-Path $root 'ruibitpower-site'
$stage = Join-Path $env:TEMP ('ruibit-zips-' + [guid]::NewGuid().ToString('N').Substring(0, 8))

$previewNote = @(
    'Ruibit Power — 本地预览包',
    '',
    '【怎么打开】',
    '1. 把本压缩包完整解压到任意文件夹（不要在压缩软件里直接双击 index.html）。',
    '2. 打开解压后的 index.html。',
    '',
    '【说明】',
    '这是整站的静态副本，所有链接和图片都已改写成相对路径，因此可以直接双击在本地浏览，',
    '不需要服务器。首页、产品、方案、案例、技术、资源、博客、文章页都在里面。',
    '',
    '【不要用它部署】',
    '部署到 ruibitpower.com 请用 DEPLOY 包。本包是给人看的，不是给服务器用的。'
) -join $sep

$deployNote = @(
    'Ruibit Power — 服务器部署包（dist）',
    '',
    '【用途】',
    '把本包里的全部文件上传到 ruibitpower.com 的网站根目录（public_html / www / 站点根）。',
    '',
    '【为什么双击 index.html 会没有样式】',
    '本站按站点根目录部署，资源路径是根绝对路径（/assets/css/site.css）。',
    '用文件系统直接打开时，/assets/... 会被解析到磁盘根目录（如 C:\assets\...），找不到文件，',
    '所以页面只剩纯文本。这是正常现象，不代表包坏了。',
    '',
    '只想在本地看效果：请用 PREVIEW 包。',
    '上传到域名根目录后：一切正常。',
    '',
    '【路由】',
    '站内使用目录式 URL（/products/xxx/），因此服务器需要支持目录索引（index.html）。',
    'Netlify 等静态托管开箱可用；Apache/Nginx 需开启 autoindex 或 try_files。'
) -join $sep

$sourceNote = @(
    'Ruibit Power — 源码包',
    '',
    'Astro 4 项目源码，含 data、组件、样式、内容（文章 markdown 与图片），以及 tools/ 下的',
    '构建与审计脚本（含从 Publii 数据库导入文章的 import-publii-posts.py）。',
    '',
    '【本地运行】',
    '1. 安装 Node.js 18+',
    '2. 本目录执行：npm install',
    '3. 预览：npm run dev      构建：npm run build（产物在 dist/）',
    '',
    '【注意】',
    'node_modules、dist、preview-offline 不在包内。'
) -join $sep

function New-Zip {
    param([string]$Source, [string]$NoteName, [string]$NoteText, [string]$Destination)

    $work = Join-Path $stage ([guid]::NewGuid().ToString('N').Substring(0, 8))
    New-Item -ItemType Directory -Force -Path $work | Out-Null
    Copy-Item -Path (Join-Path $Source '*') -Destination $work -Recurse -Force
    Set-Content -Path (Join-Path $work $NoteName) -Value $NoteText -Encoding UTF8
    if (Test-Path $Destination) { Remove-Item $Destination -Force }
    Compress-Archive -Path (Join-Path $work '*') -DestinationPath $Destination -CompressionLevel Optimal
}

New-Zip -Source (Join-Path $site 'preview-offline') -NoteName '_请先读我.txt' -NoteText $previewNote `
    -Destination (Join-Path $root 'ruibitpower-1-PREVIEW-本地预览.zip')

New-Zip -Source (Join-Path $site 'dist') -NoteName '_请先读我.txt' -NoteText $deployNote `
    -Destination (Join-Path $root 'ruibitpower-2-DEPLOY-服务器部署.zip')

$sourceItems = @('assets-source', 'assets-unused', 'astro.config.mjs', 'netlify.toml', 'package.json',
                 'package-lock.json', 'public', 'README.md', 'src', 'tools', 'tsconfig.json') |
    ForEach-Object { Join-Path $site $_ }

$work = Join-Path $stage 'source'
New-Item -ItemType Directory -Force -Path $work | Out-Null
Copy-Item -Path $sourceItems -Destination $work -Recurse -Force
Set-Content -Path (Join-Path $work '_请先读我.txt') -Value $sourceNote -Encoding UTF8
$sourceZip = Join-Path $root 'ruibitpower-3-SOURCE-源码.zip'
if (Test-Path $sourceZip) { Remove-Item $sourceZip -Force }
Compress-Archive -Path (Join-Path $work '*') -DestinationPath $sourceZip -CompressionLevel Optimal

# The three old names are retired so the wrong one cannot be picked again.
Add-Type -AssemblyName Microsoft.VisualBasic
foreach ($name in @('ruibitpower-dist-FINAL.zip', 'ruibitpower-offline-preview.zip', 'ruibitpower-source-FINAL.zip')) {
    $path = Join-Path $root $name
    if (Test-Path $path) {
        [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($path, 'OnlyErrorDialogs', 'SendToRecycleBin')
        Write-Output "recycled $name"
    }
}

Remove-Item -Path $stage -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem (Join-Path $root '*.zip') | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
