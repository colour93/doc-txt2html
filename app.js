// 文档转换工具
// txt 转 html

// 写的很垃圾

const fs = require('fs');
const path = require('path');
const pretty = require('pretty');

init();

async function init () {

    // 检查文件夹是否存在
    if (!fs.existsSync('src')) fs.mkdirSync('src');
    if (!fs.existsSync('dist')) fs.mkdirSync('dist');

    // 读取所有 src 下文件
    const fileList = fs.readdirSync('src');

    // 读取 template
    const templateHtml = fs.readFileSync('template.html', { encoding: 'utf8' });

    // 遍历文件
    for (let i = 0; i < fileList.length; i++) {
        const fileName = fileList[i];
        const content = fs.readFileSync(path.join('src', fileName), { encoding: 'utf8' });

        // console.log(content);

        let contentHtml = templateHtml;
        let contentAry = content.split('\n');

        // 获取标题
        let title = contentAry.shift();
        contentHtml = contentHtml.replace(/\{\{title\}\}/g, title);

        // 去除空行
        if (contentAry[0] == '') contentAry.shift();
        
        // 遍历段落
        let textList = [];
        for (let j = 0; j < contentAry.length; j++) {
            const text = contentAry[j];
            if (text == '\r') textList.push(`<br>`)
            else textList.push(`<p>${text}</p>`);
        }

        contentHtml = contentHtml.replace(/\{\{text\}\}/g, textList.join('\n'));

        contentHtml = pretty(contentHtml);

        fs.writeFileSync(path.join('dist', path.basename(fileName, '.txt') + '.html'), contentHtml);
    }

}