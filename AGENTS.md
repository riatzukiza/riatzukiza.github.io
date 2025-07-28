# AGENTS.md

## 🧱 Overview

This repo defines the **Promethean Framework**, a modular cognitive architecture for running AI agents with embodied reasoning, perception-action loops, and emotionally mediated decision structures.

**Duck** is one such agent—but Duck is not the system. He is a *resident* of the system.

Promethean includes services for STT, TTS, language modeling, emotional simulation, and real-time interaction across multiple modalities and memory interfaces.

---

## 📂 Repository Structure

```
agents/          # Specific personalities/instances like Duck
services/        # Modular cognitive subsystems (TTS, STT, Cephalon, Eidolon, etc)
bridge/          # Interface contracts (protocols, schemas, event names)
models/          # Weights, checkpoints, etc (managed via LFS or external storage)
data/            # Training/evaluation datasets and prompt logs
training/        # Fine-tuning and eval scripts
scripts/         # Build, test, deploy automation
tests/           # Unit and integration test suites
docs/            # System-level documentation and markdown exports
site/            # Website or UI content (optional)
```

---

## 📆 Language & Tooling

### Python & Hy

* Used in: `services/stt/`, `services/tts/`, `services/cephalon/`, `services/eidolon/`
* Hy is fully interoperable with Python; files may be written in `.hy` or `.py`
* Package management: `Pipfile` (prefer Pipenv)
* Testing: `pytest`
* Logging: `log.debug()` preferred
* Contributors unfamiliar with Hy may write modules in Python directly

### Sibilant, JavaScript & TypeScript

* Used in: `agents/duck/`, `services/io/`, some `core-js/` modules
* Compiled using: `scripts/build-js.sh` or `node ./scripts/compile.js`
* Shared macros/modules: `services/core-js/kit/`
* Future support planned for TypeScript transpilation from Sibilant
* Contributors may submit raw JS or TS modules—Sibilant is preferred but not mandatory
* If a module evolves entirely into JS or TS, it will be respected as-is if quality is maintained

---

## ⚙️ Codex Permissions

Codex is permitted to:

* Modify code in `services/`, `agents/`, `core-*` and `bridge/`
* Refactor classes, split logic, add logging or tracing
* Generate test cases for existing code
* Move or restructure files if target folder is listed in `MIGRATION_PLAN.md`
* Create and maintain markdown docs in `/docs/`

Codex is **not** allowed to:

* Push or pull model weights
* Modify anything under `site/` unless instructed
* Edit `.sibilant` macros without referencing header files
* Commit to `main` directly—PRs only

---

## 📡 Message Protocols

All inter-service communication must:

* Be defined in `bridge/protocols/` using JSONSchema, protobuf, or markdown tables
* Reference versioning in the schema (e.g. `stt-transcript-v1`)
* Conform to naming rules in `bridge/events/events.md`

---

## 🧬 Models

Model weights are stored in `/models/`:

| Service  | Format                  | Notes                                       |
| -------- | ----------------------- | ------------------------------------------- |
| STT      | OpenVINO IR (xml/bin)   | Whisper Medium prequantized                 |
| TTS      | ONNX + Tacotron/WaveRNN | Built with OpenVINO compatibility           |
| Cephalon | GGUF / LLaMA / Ollama   | Usually local-run via `llm_thought_loop.py` |

Model directories contain:

* `model-info.md`: describes source, version, date retrieved
* `download.sh`: optionally provided for large models
* `config.json`: if applicable

---

## 📊 Datasets

Datasets are kept in `/data/` and organized by domain:

* `stt/`: paired wav + text for transcription accuracy evals
* `tts/`: audio samples + transcripts
* `cephalon/`: chat logs, prompt sets, memory scaffolds
* `eidolon/`: time-series emotional state logs (csv/json)
* `prompts/`: prompt templates used by agents for LLM initialization

All datasets must include a `README.md` specifying:

* Source
* Format
* Licensing (if applicable)
* Intended use

---

## 🧪 Training + Evaluation

Training and fine-tuning are scripted under `/training/`:

* Each service has its own folder
* Outputs go to `/models/`
* Logs go to `/training/logs/`

Naming convention:

```
train_<service>_<purpose>.py
```

Example:

```
train_stt_quantize.py
train_cephalon_align_lora.py
```

---

## 🔐 Versioning and Storage Rules

* Use `.gitattributes` to track LFS-managed binaries (e.g., weights, wavs)
* Do **not** store raw datasets or models directly—use `download.sh` or link instructions
* All changes to `/models/`, `/data/`, or `/training/` must be documented in `MIGRATION_PLAN.md` or a note in `CHANGELOG.md`

---

## 📚 Documentation Standards

* Markdown only
* Use `[[Wikilinks]]` and `#hashtags` for Obsidian compatibility
* Code paths must be written like: `services/cephalon/langstream.py`
* All new modules must have a doc stub in `/docs/`

---

## 🧐 Agent Behavior Guidelines

Agents like Duck must:

* Implement `voice_in -> stt -> cephalon -> tts -> voice_out` loop
* Maintain local or persistent memory if enabled
* Be configurable via `/agents/{agent}/config.json`
* Specify their prompt logic in `/agents/{agent}/prompt.md`

---

## ✅ Next Steps

* [ ] Finalize `MIGRATION_PLAN.md`
* [ ] Set up `Makefile` for Python + JS build/test/dev
* [ ] Annotate legacy code with migration tags
* [ ] Create base `README.md` templates for each service
