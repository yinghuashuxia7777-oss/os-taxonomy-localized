# OS Taxonomy Localization Runbook

本项目现在采用“无 API key 的自动机器翻译平替版”流程。目标是减少人工 batch 操作，同时保持 JSON 结构、占位符和发布质量门稳定。

## 当前语言范围

- English: 保留原始源文件，默认主版本
- zh: 生成中文
- th: 生成泰语
- lo: 暂不生成，原因是当前无稳定免费翻译 provider

不要部署旧的 mock/sample 翻译。它们只用于早期 UI 测试，不是可发布译文。

## 1. 导出翻译单位

```bash
npm run localization:export
```

默认只导出 `zh` 和 `th`。可翻译字段只有：

- `topics.json`: `subject`, `domain`, `name`, `description`, `evidence[]`, `assessmentPrompt`
- `dependencies.json`: `note`, `reason`

`{{name}}` 会被保护为 `__NAME__`，导入时再恢复。

## 2. 自动翻译

```bash
npm run translation:auto
```

provider 自动检测顺序：

1. `TRANSLATE_UNITS_COMMAND` 指向的显式命令 provider
2. 已运行的本地 LibreTranslate: `http://127.0.0.1:5000`
3. 当前 Python 环境里的 `argostranslate`

如果没有可用 provider，脚本会写报告并停止，不会生成假翻译。

如需尝试项目本地安装和启动 LibreTranslate：

```bash
npm run translation:auto:install
```

这个命令只会在项目内创建 `.venv`，并尝试安装/启动 LibreTranslate。安装或模型下载失败时会停止并写入报告。

自动翻译输出：

- `localization_workbench/gemini_outputs/zh/auto_translated.jsonl`
- `localization_workbench/gemini_outputs/th/auto_translated.jsonl`
- `localization_workbench/translation_cache/zh.jsonl`
- `localization_workbench/translation_cache/th.jsonl`

缓存允许中断后续跑，已成功的 unit 不重复翻译。

## 3. 导入 JSONL 输出

```bash
npm run localization:import
```

生成：

- `data/topics_zh.json`
- `data/topics_th.json`
- `data/dependencies_zh.json`
- `data/dependencies_th.json`

不会生成 `topics_lo.json` 或 `dependencies_lo.json`。

## 4. 质量门

```bash
npm run localization:validate
```

只检查 `zh` 和 `th`。硬性校验包括：

- JSON parse 成功
- topics 数量为 1,590
- dependencies 数量为 3,221
- 不可翻译字段与英文源一致
- 数字字段、`standards`、`evidence` 数组长度一致
- `{{name}}` 出现次数一致
- 不允许空译文
- 不允许 `[zh]` / `[th]` mock 标记
- 不允许斜杠候选词
- 检查普通英文残留，但允许标准术语白名单

坏味道检查只作用于可翻译字段，不做全局硬杀。

失败时生成：

- `localization_workbench/reports/validation_issues.jsonl`
- `localization_workbench/reports/repair_candidates.jsonl`
- `localization_workbench/repair_batches/<lang>/repair_XXXX.jsonl`

## 5. 打包

```bash
npm run localization:package
```

只有质量门通过才会生成：

```text
os-taxonomy-localized-zh-th-release.zip
```

失败时只生成：

```text
os-taxonomy-localization-workbench-NOT-RELEASE.zip
```

## 报告说明

`localization_workbench/reports/translation_quality_report.md` 会明确写明：

- zh/th 已生成或阻断状态
- lo 未生成及原因
- 使用的 translation provider
- topics/dependencies 数量
- 结构校验结果
- `{{name}}` 校验结果
- 坏味道检查结果
- 抽样样本
- 风险说明：这是自动机器翻译平替版本，不是母语级人工翻译，正式上线仍建议人工抽检，尤其是泰语。
