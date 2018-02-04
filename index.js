const { spawn } = require('child_process');

module.exports = function(fileName, shapeCount = 100, shapeType = 1) {
    return new Promise((resolve, reject) => {
        let svg = '';
        const svgPath = fileName.replace(/\.[^/.]+$/, '.svg');
        const binary = process.platform === 'darwin' ? 'main' : 'main-linux';
        const command = __dirname + '/./' + binary;
        const child = spawn(command, ['-i', fileName, '-o', svgPath, '-p', '-n', shapeCount, '-m', shapeType]);

        child.stdout.on('data', function(data) {
             svg += data.toString();
        });
        child.on('close', function(code) {
            resolve(svg);
        });
    });
};
