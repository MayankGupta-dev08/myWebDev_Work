let utility = {};

utility.fileTypes = {
    app: ['exe', 'dmg', 'pkg', "deb"],
    media: ["mp3", "mp4", "mkv", "m4a"],
    images: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    archives: ['zip', 'ar', 'rar', 'tar', 'iso', 'gz', 'xz', '7z'],
    codeFiles: ['cpp', 'class', 'java', 'py', 'html', 'css', 'js', 'json', 'svg'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'csv', 'pptx', 'odt', 'ods', 'odp',
                'odg', 'odf', 'txt', 'ps', 'tex']
}

module.exports = utility;