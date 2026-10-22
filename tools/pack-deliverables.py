"""Rebuild the three delivery zips with a read-me inside each.

Named with a number and a purpose so the deploy package cannot be mistaken for
the one you double-click: the deploy build uses root-absolute URLs
(/assets/css/site.css), which is correct on a server and blank in a file system.

Run: python tools/pack-deliverables.py
"""

import os
import shutil
import zipfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
# Derive the site directory from this script's own location so the packer
# keeps working if the project folder is renamed (e.g. an Astro upgrade).
SITE = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
RETIRED = os.path.join(ROOT, "_retired-zips")
NOTE = "_请先读我.txt"

PREVIEW_NOTE = """Ruibit Power — 本地预览包

【怎么打开】
1. 把本压缩包完整解压到任意文件夹（不要在压缩软件里直接双击 index.html）。
2. 打开解压后的 index.html。

【说明】
这是整站的静态副本，所有链接和图片都已改写成相对路径，因此可以直接双击在本地浏览，
不需要服务器。首页、产品、方案、案例、技术、资源、博客、文章页都在里面。

【不要用它部署】
部署到 ruibitpower.com 请用 DEPLOY 包。本包是给人看的，不是给服务器用的。
"""

DEPLOY_NOTE = """Ruibit Power — 服务器部署包（dist）

【用途】
把本包里的全部文件上传到 ruibitpower.com 的网站根目录（public_html / www / 站点根）。

【为什么双击 index.html 会没有样式】
本站按站点根目录部署，资源路径是根绝对路径（/assets/css/site.css）。
用文件系统直接打开时，/assets/... 会被解析到磁盘根目录（如 C:\\assets\\...），
找不到文件，所以页面只剩纯文本。这是正常现象，不代表包坏了。

只想在本地看效果：请用 PREVIEW 包。
上传到域名根目录后：一切正常。

【路由】
站内使用目录式 URL（/products/xxx/），因此服务器需要支持目录索引。
Netlify 等静态托管开箱可用；Apache/Nginx 需开启 autoindex 或 try_files。
"""

SOURCE_NOTE = """Ruibit Power — 源码包

Astro 7 项目源码，含 data、组件、样式、内容（15 个产品 JSON、64 篇文章 markdown、
23 个项目案例与图片、public/downloads 下 12 份 PDF），以及 tools/ 下的构建与审计脚本
（含从 Publii 数据库导入文章的 import-publii-posts.py、参数审计 audit_full.py、
渲染实测 cdp_sweep.mjs、三包打包 pack-deliverables.py）。

本版起含 CMS 与 CI：public/admin/config.yml 是 Decap CMS 的字段定义，
.github/workflows/verify.yml 是 GitHub Actions 的质量门，netlify.toml 让 Netlify
在部署时也跑同一道门（npm run verify）。新增工具：
validate-content.mjs（内容与资源引用）、audit-cms.mjs（CMS 是否覆盖全部字段）、
audit-evidence.mjs（每页是否有可追溯来源）、audit-images.mjs（alt 与固有尺寸）、
sync-image-sizes.mjs（构建前生成 image-sizes.json）。

【后台：Decap CMS 本地模式，不在上线包里】
后台是本地编辑工具，npm run admin 启动；tools/pack-cloudflare.py 出包时会剔除
admin/，所以线上没有 /admin，也不需要 OAuth 或仓库配置。

backend 用 git-gateway，这是 Decap 本地代理文档给出的搭配（local_backend: true
配合 decap-server）。首次打开 /admin/index.html 会出现一个 Login 按钮，点一次就
进：本地代理直接应答，不弹窗、不跳 GitHub，登录态存为 {"backendName":"proxy"}。
换成 name: github 即使开着 local_backend 也会卡在登录页——已在浏览器里验证过。

decap-server 默认监听 0.0.0.0，等于把项目写权限开放给局域网；admin.mjs 已用
BIND_HOST=127.0.0.1 收回到本机。

Decap 脚本钉 3.16.3 并带 integrity 校验；升级时版本号和哈希要同时改。

【表单后端：worker/_worker.js → dist/_worker.js（单文件）】
Cloudflare 上用 Pages advanced mode 直接把询盘发到 sales@ruibitpower.com。

必须是**单文件** `_worker.js`，不能是 `_worker.js/` 目录。控制台拖拽上传只认
根目录下的同名文件；目录形式会被当成普通静态文件，worker 不注册，站点一切正常
但 /api/inquiry 会落到自定义 404 页——这是第一次上线时的现象。

发信按顺序择一，谁配了用谁：
1. RESEND_API_KEY —— 免费版 Pages 可用，线上走这条
2. send_email 绑定 EMAIL —— 仅 Workers 支持，Pages 的绑定列表里没有它
3. CF_EMAIL_API_TOKEN + CF_ACCOUNT_ID —— Email Sending REST，需 Workers Paid

部署前提：
1. 部署产物根目录要有 `_worker.js`（拖拽整个 dist 即可）。
   自检：GET /api/inquiry 返回 405（Method Not Allowed）；返回 404 页说明
   worker 没注册。
2. 用 Resend 的话，在 Resend 后台验证发信域，DNS 记录加在 Cloudflare；
   MAIL_FROM 必须是该域下的地址（验证子域只授权该子域，不能拿顶域地址发信；
   默认值已设为 website@inquiry.ruibitpower.com）。缺 key 时提交返回 503 not_configured，
   key 无效返回 502 missing_api_key。
3. Pages 项目里配 Secret `RESEND_API_KEY`（或另配 Cloudflare 那一组），
   再确认 `MAIL_TO` / `MAIL_FROM`。拖拽上传时都在
   Settings → Variables and Secrets 里配，wrangler.toml 只对 CLI 生效。

advanced mode 下 worker 接管全部请求，非 /api/inquiry 的请求转交 env.ASSETS；
漏掉这一步整站打不开，tools/test-worker.mjs 会验证这条。

表单本身没有改成只依赖 worker：JS 提交失败或端点不存在（404/405/501）时，
会退回原生 POST。

【响应头放在 public/_headers】
Netlify 与 Cloudflare Pages 都从发布目录读这个文件，所以同一份 dist/ 在两个平台
行为一致。不要再往 netlify.toml 里写 [[headers]]：Netlify 会把它和 _headers 一起
应用，每个头会发两遍。工具里的 audit-headers.mjs 会拦住这种写法，也会拦住
"同一个 URL 被两条规则设置同一个头"的情况（Cloudflare 会拼接、Netlify 不一定）。

注意：整站 CSP 是同一份策略，/admin/ 也继承它，所以 script-src 含 unpkg、
connect-src 含 api.github.com（CMS 保存直接走 GitHub API）。要按路径拆分就得用
Cloudflare 的 "! Header" 取消语法，而 Netlify 不支持它，因此不拆。

【本地运行】
1. 安装 Node.js 22（Astro 7.4 的 engines 要求 >= 22.22.0）与 Python 3
2. 本目录执行：npm ci
3. 预览：npm run dev      一键校验并构建：npm run verify（产物在 dist/）

【一个已知坑（已自动处理）】
Astro 生成内容类型时会自建一个 Vite 模块运行器，其中没有 require。任何从该依赖图
到达的 CommonJS 包（yaml、picomatch 等）都会被当作 ESM 求值，抛出
"require is not defined"，表现为“缓存失效后的第一次构建必挂”。

解法写在 astro.config.mjs：vite.ssr.noExternal = true，让这些依赖被内联转换而不是
外部化；另外 tools/prebuild-sync.mjs 在 build 前先跑一次允许失败的 astro sync 预热。

这两个措施只降低概率，没有消除问题：冷缓存下的首次构建仍可能失败一次，紧接着重跑
即通过。所以 CI 里应当把 npm run build 配一步重试，而不是当成确定性失败。

不要把它改回 noExternal: ['yaml'] 这种逐包列举的写法——那只解决第一个包，修 schema
时会换成 picomatch 再挂一次。也不要在 CI 里用 astro build 绕过 npm run build，
prebuild 的预热是稳定性的一部分。

【注意】
node_modules、dist、preview-offline 不在包内。
"""

SOURCE_ITEMS = [
    ".github",
    ".node-version",
    ".nvmrc",
    "assets-source",
    "assets-unused",
    "astro.config.mjs",
    "netlify.toml",
    "package.json",
    "package-lock.json",
    "public",
    "README.md",
    "src",
    "tools",
    "tsconfig.json",
    "vendor",
    "worker",
    "wrangler.toml",
]

OLD = [
    "ruibitpower-dist-FINAL.zip",
    "ruibitpower-offline-preview.zip",
    "ruibitpower-source-FINAL.zip",
]


def write_tree(zf, base_dir, arc_prefix=""):
    for current, _dirs, files in os.walk(base_dir):
        for name in files:
            full = os.path.join(current, name)
            rel = os.path.relpath(full, base_dir).replace("\\", "/")
            zf.write(full, (arc_prefix + rel) if arc_prefix else rel)


def build(destination, note, source_dir=None, source_items=None):
    if os.path.exists(destination):
        os.remove(destination)
    with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        if source_dir:
            write_tree(zf, source_dir)
        else:
            for item in source_items:
                full = os.path.join(SITE, item)
                if os.path.isfile(full):
                    zf.write(full, item)
                elif os.path.isdir(full):
                    write_tree(zf, full, item + "/")
        # utf-8-sig so Notepad on a Chinese Windows shows the text and not mojibake
        zf.writestr(NOTE, note.encode("utf-8-sig"))
    return os.path.getsize(destination)


def main():
    os.makedirs(RETIRED, exist_ok=True)

    targets = [
        ("ruibitpower-1-PREVIEW-本地预览.zip", PREVIEW_NOTE, os.path.join(SITE, "preview-offline"), None),
        ("ruibitpower-2-DEPLOY-服务器部署.zip", DEPLOY_NOTE, os.path.join(SITE, "dist"), None),
        ("ruibitpower-3-SOURCE-源码.zip", SOURCE_NOTE, None, SOURCE_ITEMS),
    ]

    for name, note, source_dir, source_items in targets:
        size = build(os.path.join(ROOT, name), note, source_dir, source_items)
        print("%-42s %6.2f MB" % (name, size / 1024 / 1024))

    for name in OLD:
        path = os.path.join(ROOT, name)
        if os.path.exists(path):
            shutil.move(path, os.path.join(RETIRED, name))
            print("retired", name)


if __name__ == "__main__":
    main()
