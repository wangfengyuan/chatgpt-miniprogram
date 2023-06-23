<div align="center">
    <img src="https://cos.codefe.top/images/aiminiprogram-intro.png" alt="ChatGPT Miniprogram" width='600' />
</div>

<p align="center"><samp>该小程序仅作为演示，如需部署请按照以下流程操作</samp></p>


<br>

## 技术栈
- uniapp + Vite + UnoCSS + Pinia + uview-plus 
- Nextjs + prisma + mongodb

## 功能
- 0成本
- 简洁聊天界面，内容可复制可分享
- 次数限制


## 运行

1. 克隆项目
```bash
git clone https://github.com/wangfengyuan/chatgpt-miniprogram.git
```

2. 进入项目目录
```bash
cd chatgpt-miniprogram
```

3. 安装依赖
```bash
pnpm install
```

4. 安装server依赖并在.env文件填入正确的环境变量
```bash
cd server 
cp .env.example .env
pnpm install
pnpm run dev
```

5. 打包小程序并导入开微信开发者工具
```
pnpm run dev:mp-weixin
```


## server端部署
参考文章 [0成本开发ChatGPT微信小程序](https://blog.codefe.top/0%E6%88%90%E6%9C%AC%E5%BC%80%E5%8F%91chatgpt%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F)

