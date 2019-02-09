# JEST

### Step 1. 安裝資源包

```
npm i -D jest babel-jest identity-obj-proxy
```

### Step 2. 加入配置

參考 [jest]

##### 1. 建立 jest.config.js

```
module.exports = {
    jest: {
        moduleNameMapper: {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
            "\\.(css|less)$": "identity-obj-proxy"
        }
    }
}
```

##### 2. 建立 fileMock.js

(檔名及路徑依照 jest.config.js 中設置)

```
module.exports = 'test-file-stub';
```
<!-- #####3. 建立 styleMock.js
(檔名及路徑依照 jest.config.js 中設置)
```
module.exports = {};
``` -->

### Step 3. 為組件加入 test case

為欲測試的組件 (e.g. MyComponent) 建立 MyComponent.test.js

```
import React from 'react';
import MyComponent from './MyComponent';

// test case 1
test('case 1 description', () => {

    // test case 1 測試內容
    ......

});

// test case 2
test('case 2 description', () => {

    // test case 2 測試內容
    ......

});
```

# ENZYME

### Step 1. 安裝資源包

```
npm i ajv
npm i -D jest enzyme jest-enzyme enzyme-adapter-react-16
```

### Step 2. 加入配置

為欲測試的組件 (e.g. MyComponent) 建立 MyComponent.test.js

##### 1. import React

MyComponent.test.js:

```
import React from 'react';
```

##### 2. import Enzyme

設定 adapter

MyComponent.test.js:

```
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new EnzymeAdapter()
});
```

### Step. 3 寫測試

Apis: [jest apis], [enzyme apis]

MyComponent.js: 加入 data-test

```
import React, { Component } from 'react';

class MyComponent extends Component {

    constructor (props) {

        super(props);

        this.state = {
            value: 0
        }

    }

    handleButtonClicked = () => {

        const newValue = this.state.value + 1;
        this.setState({ value: newValue });

    }

    render () {

        return (

            <div data-test="component-MyComponent">
                This is MyComponent. Value is 
                <span data-test="component-MyComponent-value">
                    {this.state.value}
                </span>.
                <button
                    onClick={this.handleButtonClicked}
                    data-test="component-MyComponent-button"
                >Increase value</button>
            </div>

        );

    }

}

```

MyComponent.test.js:

```
import MyComponent from './MyComponent';

// 測試 MyComponent 是否能 render
test('render MyComponent', () => {

    const wrapper = shallow(<MyComponent/>);
    const myComponent = wrapper.find('[data-test="component-MyComponent"]');

    expect(myComponent.length).toBe(1);

});

describe('value increment', () => {

    // 測試初始 value 是否正確
    test('value starts at 0', () => {

        const wrapper = shallow(<MyComponent/>);
        const initValue = wrapper.state('value');

        expect(initValue).toBe(0);

    });

    // 測試 value 是否正確改變
    test('increase value by clicking button', () => {

        // 從 99 開始
        const startValue = 99;
        const wrapper = shallow(<MyComponent/>);

        wrapper.state({ value: startValue });

        // 找到按鈕並 click
        const button = wrapper.find('[data-test="component-MyComponent-button"]');

        button.simulate('click');

        wrapper.update();

        // 取得新的 value
        const newValue = wrapper.find('[data-test="component-MyComponent-value"]').text();

        expect(newValue).toBe(startValue + 1);

    });
});
```

# 執行測試

### Step 1. 添加 script

在 package.json 添加

```
{
    "scripts": {
        "test": "jest --watch"
    }
}
```

### Step 2. 執行

```
npm run test
```

[jest]:https://jestjs.io/docs/zh-Hans/webpack
[jest apis]:https://jestjs.io/docs/zh-Hans/api#api
[enzyme apis]:https://airbnb.io/enzyme/docs/api/shallow.html