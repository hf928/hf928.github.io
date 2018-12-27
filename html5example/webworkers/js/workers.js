let max = 1e8,
    temp = 0,
    times = 0,
    i;

postMessage('1億次累加運算開始 (1+2+3+4+...+1億)');
postMessage('-----------------------------------');

while (max) {

    times = times + 1;
    temp = temp + times;

    i = 1;

    for (i; i <= 10; i++) {

        if (i * 1e7 === times) postMessage(`完成: ${i}0%，目前累計: ${temp}`);

    };

    max = max - 1;

};

postMessage('-----------------------------------');
postMessage('運算結束');
