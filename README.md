![NoCode API Builder Template](.github/template-cover.png)

# NoCode API Builder Template

Powerfull no-code API builder template. Clone this repo and start your no-code API builder today. The API builder allows you to create REST API endpoints using a visual editor. You may easily extend this template and add your own features.

This templates uses:

* [Next.js](https://github.com/vercel/next.js/)
* [Tailwindcss](https://github.com/tailwindlabs/tailwindcss)
* [🌇 Sequential Workflow Designer](https://github.com/nocode-js/sequential-workflow-designer)
* [🚚 Sequential Workflow Machine](https://github.com/nocode-js/sequential-workflow-machine)
* [⛽ Sequential Workflow Editor](https://github.com/nocode-js/sequential-workflow-editor)

The template supports two types of storage:

* `memory` - in-memory storage, used by default, for development purposes.
* `mongodb` - MongoDB storage, requires `MONGODB_URI` environment variable.

To choose storage type, set `STORAGE_TYPE` environment variable. You may do it by setting `.env` file:

```
STORAGE_TYPE=memory
```

or

```
STORAGE_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=nocodeApiBuilder
```

## 🚀 Deployment

To deploy this template, you need any compatible with Next.js hosting.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnocode-js%2Fnocode-api-builder-template&project-name=nocode-api-builder&repository-name=nocode-api-builder&env=STORAGE_TYPE,MONGODB_URI)

To deploy this template to Vercel you need to set `STORAGE_TYPE=mongodb` and `MONGODB_URI` environment variables. The memory storage doesn't work with cloud hosting.

## 🔨 Development

Clone this repository:

```bash
git clone https://github.com/nocode-js/nocode-api-builder-template.git
cd nocode-api-builder-template
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 💡 License

This template is released under the MIT license. You can use the template for free for any personal or commercial project. But you should note that, **this template uses one dependency that requires a license for commercial use**:

* [⛽ Sequential Workflow Editor](https://github.com/nocode-js/sequential-workflow-editor) - check the [license](https://nocode-js.com/sequential-workflow-editor/license) and the [pricing](https://nocode-js.com/sequential-workflow-editor/pricing).
