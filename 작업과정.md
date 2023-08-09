# CRA기반의 프로젝트에 MonoRepo 적용 하는 법
## 1. ROOT 프로젝트 설정
```cmd
mkdir monorepo-app
cd monorepo-app
yarn init

mkdir packages
```
- CRA를 통해 react app 생성

```cmd
create-react-app packages/app1
```

- root/package.json에 workspaces 등록

```json
{
    //...
    "workspaces": [
        "packages/*"
    ],
    //...
}
```
---
## 2. 공통 컴포넌트 패키지 구성
```cmd
mkdir packages\common
cd packages\common
yarn init

yarn add react react-dom
```
* 해당 패키지의 package.json name을 특정하기 쉬운 이름으로 작성(필수 x, 권장사항)
```json
//packages/common/package.json
{
    //...
    name: "@scv/common",
    //...
}
```
---

## 3. craco<sup>* **</sup>를 front-app 패키지에 추가
```cmd
# packages/app1
yarn add @craco/craco
```
* packages/app1/package.json의 scripts를 react-scripts에서 craco로 수정
```json
{
    ///...
    "scripts": {
        "start": "craco start",
        "build": "craco build",
        "test": "craco test",
        "eject": "craco eject"
    },
    ///...
}
```
---
#### * craco: Create-React-App Configuration Override. CRA의 설정을 덮어쓰기 위한 라이브러리. 웹팩 설정을 줄이기 위해 사용.
#### ** 사용이유: CRA는 기본적으로 src 내부의 파일만 빌드하도록 설정되어있음. 이를 바깥의 파일까지 끌고와 빌드하려는 용도.
---

## 4. craco.config.js 작성
```javascript
const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");
const absolutePath = path.join(__dirname, "../components");
module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat[absolutePath];
      }
      return webpackConfig;
    }
  }
};
```
