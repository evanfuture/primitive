const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

module.exports = function(fileName, shapeCount = 100, shapeType = 1) {
    return new Promise((resolve, reject) => {
        const svgPath = fileName.replace(/\.[^/.]+$/, '.svg');
        const command = __dirname + '/./main';

        const child = spawn(command, ['-i', fileName, '-o', svgPath, '-n', shapeCount, '-m', shapeType]);

        child.on('close', (code) => {
            let svg = '';
            const readStream = fs.createReadStream(svgPath);

            readStream.on('data', function(chunk) {
                svg += chunk;
            }).on('end', function() {
                fs.unlinkSync(svgPath);
                resolve(svg);
            });
        });
    });
};
