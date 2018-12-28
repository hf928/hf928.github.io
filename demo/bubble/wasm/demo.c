#include <math.h>
#include <stdbool.h>
#include <stddef.h>

#define CIRCLE_COUNT 10000
#define GRID_WIDTH 70
#define GRID_HEIGHT 120

float randomf ();
float expf (float);

struct Circle {
    float x;
    float y;
    float r;
};

struct CircleV {
    float vx;
    float vy;
};

struct Circle circleData[CIRCLE_COUNT];
struct CircleV circlevData[CIRCLE_COUNT];

int getCircleCount () {
    return CIRCLE_COUNT;
}

struct Circle* getCircleDataOffset () {
    return &circleData[0];
}

bool detectCircleCollision (float x1, float y1, float r1, float x2, float y2, float r2) {
    // 檢查邊框交叉點
    if (x1 + r1 < x2 - r2 || x1 - r1 > x2 + r2 ||
        y1 + r1 < y2 - r2 || y1 - r1 > y2 + r2)
        return false;
    // 圓心距 <半徑和
    return sqrtf(powf(x2 - x1, 2) + powf(y2 - y1, 2)) <= r1 + r2;
}

void init (float displayWidth, float displayHeight) {
  for (int i = 0; i < CIRCLE_COUNT; i++) {
        bool collision;
        float x, y, r;
        // loop 確保圓圈不重疊
        do {
            collision = false;
            x = displayWidth * randomf();
            y = displayHeight * randomf();
            // 大小 0.5 - 128, 指數分布
            r = ceilf(expf(randomf() * 8) / 23.2887);

            // 確保在範圍內
            if (displayWidth - (x + r) < 0 || x - r < 0 ||
                displayHeight - (y + r) < 0 || y - r < 0) {
                collision = true;
            }
            else {
                // 起始不碰撞
                for (int j = 0; j < i; j++) {
                    if (detectCircleCollision(x, y, r, circleData[j].x, circleData[j].y, circleData[j].r)) {
                        collision = true;
                        break;
                    }
                }
            }
        }
        while (collision);

        circleData[i].x = x;
        circleData[i].y = y;
        circleData[i].r = r;

        // 速度疊代
        circlevData[i].vx = (randomf() - 0.5) * 0.1;
        circlevData[i].vy = (randomf() - 0.5) * 0.1;
    }
}

struct CellCircle {
    int circleIndex;
    struct CellCircle* next;
};

struct CellCircle cellCircles[CIRCLE_COUNT * 4];
struct CellCircle* grid[GRID_WIDTH][GRID_HEIGHT];

void timeStep (float displayWidth, float displayHeight) {
    // 初始化格子
    for (int p = 0; p < GRID_WIDTH; p++) {
        for (int q = 0; q < GRID_HEIGHT; q++) {
            grid[p][q] = NULL;
        }
    }

    int cellCircleCount = 0;

    for (int i = 0; i < CIRCLE_COUNT; i++) {
        float xi = circleData[i].x;
        float yi = circleData[i].y;
        float ri = circleData[i].r;

        float vxi = circlevData[i].vx;
        float vyi = circlevData[i].vy;

        // 重力
        vyi += 0.0001;

        // 邊界處理
        if (displayWidth - (xi + ri) < 0 && vxi > 0 || xi - ri < 0 && vxi < 0) {
            vxi = -vxi;
        }
        if (displayHeight - (yi + ri) < 0 && vyi > 0 || yi - ri < 0 && vyi < 0) {
            vyi = -vyi;
        }

        circleData[i].x = xi + vxi;
        circleData[i].y = yi + vyi;
        circlevData[i].vx = vxi;
        circlevData[i].vy = vyi;

        // 檢查每個圓圈的格子範圍
        int leftCol = floorf((xi - ri) / displayWidth * GRID_WIDTH);
        int rightCol = floorf((xi + ri) / displayWidth * GRID_WIDTH);
        int topRow = floorf((yi - ri) / displayHeight * GRID_HEIGHT);
        int bottomRow = floorf((yi + ri) / displayHeight * GRID_HEIGHT);

        if (leftCol < 0)
            leftCol = 0;
        if (rightCol >= GRID_WIDTH)
            rightCol = GRID_WIDTH - 1;
        if (topRow < 0)
            topRow = 0;
        if (bottomRow >= GRID_HEIGHT)
            bottomRow = GRID_HEIGHT - 1;

        // 分配各個圓到格子
        for (int p = leftCol; p <= rightCol; p++) {
            for (int q = topRow; q <= bottomRow; q++) {
                struct CellCircle* cellCircle = &cellCircles[cellCircleCount++];
                cellCircle->circleIndex = i;
                cellCircle->next = grid[p][q];
                grid[p][q] = cellCircle;
            }
        }
    }

    // 碰撞檢測
    for (int p = 0; p < GRID_WIDTH; p++) {
        for (int q = 0; q < GRID_HEIGHT; q++) {
            struct CellCircle* iCellCircle = grid[p][q];

            // loop 檢查每個圓
            while (iCellCircle) {
                int i = iCellCircle->circleIndex;

                float xi = circleData[i].x;
                float yi = circleData[i].y;
                float ri = circleData[i].r;

                float vxi = circlevData[i].vx;
                float vyi = circlevData[i].vy;

                struct CellCircle* jCellCircle = iCellCircle;

                // 檢查
                while ((jCellCircle = jCellCircle->next)) {
                    int j = jCellCircle->circleIndex;

                    float xj = circleData[j].x;
                    float yj = circleData[j].y;
                    float rj = circleData[j].r;

                    if (detectCircleCollision(xi, yi, ri, xj, yj, rj)) {
                        float vxj = circlevData[j].vx;
                        float vyj = circlevData[j].vy;

                        // 算碰撞單位 vector
                        float collDx = xj - xi;
                        float collDy = yj - yi;
                        float collLen = sqrtf(collDx * collDx + collDy * collDy);
                        collDx = collDx / collLen;
                        collDy = collDy / collLen;

                        float cui = collDx * vxi + collDy * vyi;
                        float cuj = collDx * vxj + collDy * vyj;

                        // 遠離 skip
                        if (cui - cuj <= 0)
                            continue;

                        // 1D 彈性方程式計算碰撞後的合成速度 (系統內)
                        float massSum = ri + rj;
                        float massDiff = ri - rj;
                        float cvi = (cui * massDiff + 2 * rj * cuj) / massSum;
                        float cvj = (2 * ri * cui - cuj * massDiff) / massSum;

                        // 算速D
                        float dcvi = cvi - cui;
                        float dcvj = cvj - cuj;

                        // 碰撞向量使得速度變化
                        circlevData[i].vx = vxi + collDx * dcvi;
                        circlevData[i].vy = vyi + collDy * dcvi;
                        circlevData[j].vx = vxj + collDx * dcvj;
                        circlevData[j].vy = vyj + collDy * dcvj;
                    }
                }

                iCellCircle = iCellCircle->next;
            }
        }
    }
}
