# RAI-Craft

一个用来记录我们 Warcraft III 1v1 比赛 Elo 分数的项目。

## 使用方法

1. 在 `matches.csv` 中添加比赛结果，格式为：`datetime,player1,player2,winner`，其中时间精确到分钟，例如 `2023-08-27 19:30`。
2. 提交并推送。
3. GitHub Pages 页面会自动读取 CSV 并计算 Elo 排名。

## 本地预览

本地查看时需要通过 HTTP 访问以便 `fetch` 读取 CSV，例如：

```bash
python3 -m http.server
```

然后在浏览器中打开 `http://localhost:8000/`。

## GitHub Pages

在仓库设置中启用 GitHub Pages 后，`index.html` 会展示最新的 Elo 排名。
