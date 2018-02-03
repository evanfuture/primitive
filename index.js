const { spawn } = require('child_process');

module.exports = function(fileName, shapeCount = 100, shapeType = 1) {
    return new Promise((resolve, reject) => {
        let svg = '';
        const svgPath = fileName.replace(/\.[^/.]+$/, '.svg');
        const command = __dirname + '/./main';
        const child = spawn(command, ['-i', fileName, '-o', svgPath, '-p', '-n', shapeCount, '-m', shapeType]);

        child.stdout.on('data', function(data) {
             svg += data.toString();
        });
        child.on('close', function(code) {
            resolve(svg);
        });
    });
};
