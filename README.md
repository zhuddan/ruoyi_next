# 基于 [RuoYi-Vue3](https://github.com/yangzongzhuan/RuoYi-Vue3.git) 的分支开发

## 优化内容

### 代码风格

- 采用 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 实现统一的代码格式化规范。

### 工程化

- 使用 [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) 实现模块的自动导入，减少手动引入的繁琐操作。
- 集成 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 实现组件的自动导入，提升开发效率。

### 样式优化

- 对 `layout` 样式进行重构，提升代码可维护性。
- 移除大部分 `scss` 样式，引入 [Tailwind CSS](https://tailwindcss.com/) 支持，简化样式管理。
- 使用 `CSS Variables` 替代了绝大多数 `scss` 变量，增强样式的动态性和可控性。

### 开发体验（DX）

- 新增 `jsconfig.json` 配置文件，并启用 `checkJs`，提供接近 TypeScript 的开发体验。
- 精简全局属性，仅保留必要的全局属性，并为其新增类型声明（见 `./src/vue-global.d.ts`）。
- 为 `Element Plus` 新增全局类型声明（详见 `./jsconfig.json#L10`）。
- 移除了所有使用 `getCurrentInstance()` 的代码，优化代码逻辑和可读性。
- 提供全面的全局导入和全局样式的类型提示，进一步提升开发便捷性。
